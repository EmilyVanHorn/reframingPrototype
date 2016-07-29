Session.set("ideasMostRecent", "IDEAS");
Session.set("framesMostRecent", "FRAMES");

redirect = function(currentState){
    if(currentState == "1"){
        Router.go("consent", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "2"){
        Router.go("Instructions", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "3.Version1"){
        Router.go("Version1", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "3.Version2"){
        Router.go("Version2", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "3.Version3"){
        Router.go("Version3", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "5.Version1"){
        Router.go("activity1", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "5.Version2"){
        Router.go("activity2", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "5.Version3"){
        Router.go("activity3", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "8"){
        Router.go("survey", {userID: user(Router.current().params.userID)._id});
    }
    else if(currentState == "9"){
        Router.go("NoParticipation", {userID: user(Router.current().params.userID)._id});
    }
    else{
        Router.go("signin");
    }
};






Template.ideaPad.rendered = function(){
    tinymce.init({
        selector: '#itext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
   });
        tinymce.get("itext").setContent(Session.get("ideasMostRecent"));
};

Template.framePad.rendered = function(){
    tinymce.init({
        selector: '#ftext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
    });
        tinymce.get('ftext').setContent(Session.get("framesMostRecent"));
};

Template.layout2.created = function(){
    Session.set("currentUser", user(Router.current().params.userID));
    if(Session.get("started") == "notStarted"){
        if(Session.get("ideasMostRecent") && tinyMCE.get("itext")){
            Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));  
        }
        if(Session.get("framesMostREcent") && tinyMCE.get("itext")){
            Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));    
        }
    }
    else if(Session.get("started") == "Done"){
        Router.go("thankyou"); 
    }
    else if(Session.get("started") == "Quit"){
        Router.go("NoParticipation");   
    }
    
    Session.set("started", "started");
};

Template.layout2.events({
    'click #done': function(e){
        Session.set("started", "Done");
        saveData();
        MyUsers.update(user(Router.current().params.userID)._id, {
            $set: {finished: true}
        });
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFinished();
        Router.go("Survey");   
    },
    'click #quit': function(e){
        if(confirm("Are you sure you want to quit?")){
            saveData();
            Session.set("started", "Quit");
            Router.go("NoParticipation");
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logExitStudy(Router.current().route.path());
        }
        else{
            
        }
        
    },
    'click .back': function(e){
        saveData();
        Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));
        Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));  
        
        tinymce.get('itext').remove();
        tinymce.get('ftext').remove();
        
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logBackToProblemBrief();
        history.back();   
    }
});

Template.layout2.helpers({
    first: function(){
        if(user(Router.current().params.userID).state < 6){
            return true;   
        }
        else{
            return false;   
        }
    }
});

Template.TabBox.helpers({
    notV1: function(){
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(version == "Version1"){
            return false;
        }
        else{
            return true;   
        }
    },
    isV3: function(){
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(version == "Version3"){
            return true;
        }
        else{
            return false;   
        }
    }
});

Template.TabBox.events({
    'click #comm': function(e){
        var idea = listOfIdeas.findOne({'clicked': true}).openIDEOid;
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logCommentClick(idea);
    },
    'click #MoreInfo': function(e){
        var idea = listOfIdeas.findOne({'clicked': true}).openIDEOid;
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logMoreInfoClick(idea);
    },
    'click #ids': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logIdeaEntryClick();
    },
    'click #fr': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFrameEntryClick();
    }
});

function intervals(clock){
    var timeLeft = function(){
        if(clock > 0){
            clock--;
            Session.set("time", clock);
        }//if
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logTimeout();
            alert("Time's Up! Finish up any last thoughts and then click 'Done' at the bottom.");
            var done = document.getElementById("done");
            done.disabled = false;
            return Meteor.clearInterval(interval);  
            
        }
        
        if(tinyMCE.get('itext') &&
           tinyMCE.get('ftext') &&
           Session.get('time') % 30 == 0){
            saveData();   
        }
    };//timeLeft
    
    var interval = Meteor.setInterval(timeLeft, 1000);
}//intervals

function saveData(){
    var id = this._id;
    var date = new Date();
    UserInput.insert({
        ID: id,
        type: "text",
        content: tinyMCE.get("itext").getContent({format : 'text'}),
        authorID: user(Router.current().params.userID)._id,
        authorName: user(Router.current().params.userID).name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("itext").getContent({format : 'raw'}),
        authorID: user(Router.current().params.userID)._id,
        authorName: user(Router.current().params.userID).name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "text",
        content: tinyMCE.get("ftext").getContent({format : 'text'}),
        authorID: user(Router.current().params.userID)._id,
        authorName: user(Router.current().params.userID).name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("ftext").getContent({format : 'raw'}),
        authorID: user(Router.current().params.userID)._id,
        authorName: user(Router.current().params.userID).name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
}

Template.moreInfo.helpers({
    moreInfo: function(){
        return listOfIdeas.findOne({"clicked": true}).moreInfo;   
    },
    comment: function(){
        idea = listOfIdeas.findOne({"clicked": true}).openIDEOid;
        //alert(idea);
        return Comments.find({"ideaID": idea});
    },
    isV3: function(){
        if(Router.current().route.path() == "/activity3"){
            return true;
        }
        else{
            return false;   
        }
    },
    isV2: function(){
        if(Router.current().route.path() == "/activity2"){
            return true;
        }
        else{
            return false;   
        }
    },
    id: function(){
        return listOfIdeas.findOne({"clicked": true}).openIDEOid;
    }
});

Template.insts2.events({
   'click #agree': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterActivity("version1");
        Session.set("ActivityStarted", true);
       
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
        var newState = "6" + user(Router.current().params.userID).state.substring(1);
        MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: newState}});
        Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
        
        //intervals(900);//10minute interval
        intervals(10);
        
   }
});

Template.insts2.helpers({
    isV1: function(){
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(version == "Version1"){
            return true;
        }
        else{
            return false;   
        }
    },
    isV2: function(){
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(version == "Version2"){
            return true;
        }
        else{
            return false;   
        }
        
    },
    isV3: function(){
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(version == "Version3"){
            return true;
        }
        else{
            return false;   
        }
    }
});















