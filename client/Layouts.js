Session.set("ideasMostRecent", "IDEAS");
Session.set("framesMostRecent", "FRAMES");

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
        MyUsers.update(Session.get("currentUser")._id, {
            $set: {finished: true}
        });
        EventLogger.logFinished();
        Router.go("Survey");   
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
        
        EventLogger.logBackToProblemBrief();
        history.back();   
    }
});

Template.layout2.helpers({
    first: function(){
        return (!Session.get("ActivityStarted"));      
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
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("itext").getContent({format : 'raw'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "text",
        content: tinyMCE.get("ftext").getContent({format : 'text'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("ftext").getContent({format : 'raw'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
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
        EventLogger.logEnterActivity("version1");
        Session.set("ActivityStarted", true);
       
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
        
        //intervals(900);//10minute interval
        intervals(10);
        
   }
});

Template.insts2.helpers({
    isV1: function(){
        if(Router.current().route.path() == "/activity1"){
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
    isV3: function(){
        if(Router.current().route.path() == "/activity3"){
            return true;
        }
        else{
            return false;   
        }
    }
});



















