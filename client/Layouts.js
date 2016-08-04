CLOCK_TIME = 30;

Template.layout1.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));
});

Template.layout2.rendered = function(){
    $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template

    if(TempData.find({varName: "timer", currentTime: {$gt: 0}}).count() > 0){
        console.log("resume");
        intervals(TempData.find({varName: "timer"}).fetch()[0].currentTime);
    }
};

Template.layout2.created = function(){
    this.subscribe("userInput", Router.current().params.userID);
    this.subscribe("timerVar");
    this.subscribe("users", Router.current().params.userID);
};

Template.layout2.events({
    'click #done': function(e){
        if(Session.get("time") == 0){
            saveData();

            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logFinished();
            var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set: {state: "7."+ newState}});
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
    'click #Problem': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logBackToProblemBrief();
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
    },
    'click #Partners': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logPartnerReminder();
    },
    'click #Conferences': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logConferenceReminder();
    }
});

Template.layout2.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "6");
    },
    getRecentIdeas: function(){
        var ideas = UserInput.find({authorID: Router.current().params.userID, from: 'ideas'}, {sort: {time: -1}});
        if(ideas.count() > 0){
            return ideas.fetch()[0].content;
        }
    },
    getRecentFrames: function(){
        var frames = UserInput.find({authorID: Router.current().params.userID, from: 'frames'}, {sort: {time: -1}});
        if(frames.count() > 0){
            return frames.fetch()[0].content;
        }
    },
    enabled: function(){
        /*console.log(isV1(user(Router.current().params.userID)));
        if(isV1(user(Router.current().params.userID))){
            return "disabled";
        }*/

        if(user(Router.current().params.userID).state.substring(2) == "Version1"){
            return "disabled";
        }
    },
    columns: function(){
        if(user(Router.current().params.userID).state.substring(2) == "Version1"){
            return "col-sm-6";
        }
        else{
            return "col-sm-3";
        }
    },
    isdone: function(){
        //locks after timer runs out
        /*if(TempData.find({varName: "timer"}).fetch()[0].currentTime <= 0){
            return "disabled";
        }*/

        //locks after user hits "done"
        if(user(Router.current().params.userID).state > "7"){
            return "disabled";
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
    if(TempData.find({varName: "timer"}).count() > 0){
        TempData.update(TempData.find({varName: "timer"}).fetch()[0]._id, {$set: {currentTime: clock}});
    }
    else{
        TempData.insert({
            varName: "timer",
            currentTime: clock,
            userID: Router.current().params.userID
        });
        console.log("insert");
    }

    var timeLeft = function(){
        if(clock > 0){
            clock--;
            Session.set("time", clock);
            TempData.update(TempData.find({varName: "timer"}).fetch()[0]._id, {$set: {currentTime: clock}});

            if(clock == 9){
                alert("10 Second Warning! Finish up your last thoughts.");
            }

        }//if
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logTimeout();
            alert("Time's Up! Click ‘Continue’ at the bottom. If you like, you can finish whatever you were typing before doing so.");
            var done = document.getElementById("done");
            return Meteor.clearInterval(interval);

        }

        if(TempData.find({varName: "timer"}).fetch()[0].currentTime % 10 == 0){
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

Template.insts2.created = function(){
    Meteor.subscribe("users", Router.current().params.userID);
    Meteor.subscribe("timerVar");
}

Template.insts2.events({
   'click #agree': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterActivity("version2");

        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");

        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        var newState = user(Router.current().params.userID).state.substring(2);
        MyUsers.update(Router.current().params.userID, {$set: {state: "6."+ newState}});

        //intervals(900);//10minute interval
        intervals(CLOCK_TIME);

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
