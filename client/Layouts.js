

Template.layout1.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));
});

Template.layout2.rendered = function(){
    $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
};

Template.framePad.rendered = function(){
}
    

Template.layout2.created = function(){
};

Template.layout2.events({
    'click #done': function(e){
        if(Session.get("time") == 0){
            saveData();
            
            Session.set("currentUser", user(Router.current().params.userID));
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
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9"); 
    },
    'click .back': function(e){
        saveData();
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logBackToProblemBrief();
        var version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        Router.go(version, {userID: Router.current().params.userID});
    },
    'focus #IdeasInput':function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logIdeaEntryFocus();
        //e.target.tooltip();
    },
    'focus #FramesInput': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFrameEntryFocus();
        //e.target.tooltip();
    },
    'click #instReminder':function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logInstructionReminder();
        
    },
    'click #frameReminder': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFramingReminder();
    }
});

Template.layout2.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "6");  
    },
    getRecentIdeas: function(){
        var ideas = UserInput.find({authorID: Router.current().params.userID, from: 'ideas'}, {sort: {time: -1}});
        
        if(ideas.count() == 0){
            return "Type your ideas here ...";
        }
        else{
            return ideas.fetch()[0].content;
        }
    },
    getRecentFrames: function(){
        var frames = UserInput.find({authorID: Router.current().params.userID, from: 'frames'}, {sort: {time: -1}});
       if(frames.count() == 0){
            return "Type your frames here ...";
        }
        else{
            return frames.fetch()[0].content;
        }
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
        return isV3(Router.current().params.userID);
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
        
        if(Session.get('time') % 10 == 0){
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
        from: "ideas",
        content: document.getElementById("IdeasInput").value,
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        from: "frames",
        content: document.getElementById("FramesInput").value,
        authorID: Router.current().params.userID,
        time: date.valueOf(),
        readableTime: date.toString()
    });
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
        
        intervals(900);//10minute interval
        //intervals(30);
        
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

Template.msgReminder.helpers({
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


















