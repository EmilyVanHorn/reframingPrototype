Session.set("ideasMostRecent", "IDEAS");
Session.set("framesMostRecent", "FRAMES");

Template.layout1.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));
});

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
    if(Session.get("started") == "notStarted"){
        if(Session.get("ideasMostRecent") && tinyMCE.get("itext")){
            Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));  
        }
        if(Session.get("framesMostREcent") && tinyMCE.get("itext")){
            Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));    
        }
    }
};

Template.layout2.events({
    'click #done': function(e){
        if(Session.get("time") > 0){
            saveData();

            EventLogger.logFinished();
            var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
            MyUsers.update(Router.current().params.userID, {state: "7."+ newState});
            redirect(user(Router.current().params.userID).state); 
        }
        else{
            alert("There's still time left! Keep Going!");   
        }
    },
    'click #quit': function(e){
        saveData();
        Session.set("started", "Quit");
        Router.go("NoParticipation");
        EventLogger.logExitStudy(Router.current().route.path());
    },
    'click .back': function(e){
        saveData();
        Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));
        Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));  
        
        tinymce.get('itext').remove();
        tinymce.get('ftext').remove();
        
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logBackToProblemBrief();
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        Router.go(version, {userID: Router.current().params.userID});
    }
});

Template.layout2.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        alert(state);
        return (state < "6");  
    }
});

Template.TabBox.helpers({
    notV1: function(){
        if(Router.current().route.path() == "/activity1"){
            return false;
        }
        else{
            return true;   
        }
    },
    isV3: function(){
        if(Router.current().route.path() == "/activity3"){
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
        EventLogger.logCommentClick(idea);
    },
    'click #MoreInfo': function(e){
        var idea = listOfIdeas.findOne({'clicked': true}).openIDEOid;
        EventLogger.logMoreInfoClick(idea);
    },
    'click #ids': function(e){
        EventLogger.logIdeaEntryClick();
    },
    'click #fr': function(e){
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
            EventLogger.logTimeout();
            alert("Time's Up! Finish up any last thoughts and then click 'Done' at the bottom.");
            var done = document.getElementById("done");
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
        from: "ideas",
        content: tinyMCE.get("itext").getContent({format : 'text'}),
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        from: "ideas",
        content: tinyMCE.get("itext").getContent({format : 'raw'}),
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "text",
        from: "frames",
        content: tinyMCE.get("ftext").getContent({format : 'text'}),
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        from: "frames",
        content: tinyMCE.get("ftext").getContent({format : 'raw'}),
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    
    console.log("Data Saved to Collection");
}



Template.insts2.events({
   'click #agree': function(){
        //Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterActivity("version2");
       
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
       
        var newState = user(Router.current().params.userID).state.substring(2);
        MyUsers.update(Router.current().params.userID, {state: "6."+ newState});
        
        //intervals(900);//10minute interval
        intervals(10);
        
   }
});

Template.insts2.helpers({
    isV1: function(){
        return isV1(Router.current().params.userID);
    },
    isV2: function(){
        return isV2(Router.current().params.userID);
        
    },
    isV3: function(){
        return isV3(Router.current().params.userID);
    }
});



















