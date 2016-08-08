/*-----------------------------------------------------------------------------
    LAYOUT_TWO.JS OUTLINE:
    search "##{{functionName}}" for any of the templateNames listed below to eas-
    ily find it's code and a more detailed description

    layout2.created:            subscriptions
    layout2.rendered:           activate tooltips
                                resume timer if necessary
    layout2.events:
        done:                       save word; send to survey
        quit:                       save word; close out program
        problem_def_dropdown:       problem definition popup (#MyModalProblem)
        focus_on_ideas:             log event
        focus_on_frames:            log event
        instructions_dropdown:      instructions popup(insts2 with msgReminder text)
        sol_vs_frames_dropdown:     sol_vs_frames popup(insts2 with msgFraming text)
        challenge_partners_dropdown:challenge partners popup(#myModalChallengePartners)
    layout2.helpers:
        first:                       return true if first visit to activity page
        getRecentIdeas:              returns most recent data from userInput -- ideas
        getRecentFrames:             returns most recent data from userInput -- frames
        enabled:                     hides Inspirations on version/condition 1
        columns:                     resizes solutions and frames depending on version/condition
        isdone:                      locks textbox after "done" is clicked
        showRationale:               returns true if rationale's should be displayed
    activity2.helpers:
        idea:                        returns meteor collection cursor for all ideas in 
                                         server/ideaData.js
    activity3.rendered:          activate tooltips
    activity3.events:
        hover_tooltip:           tooltip mouseover + mouseout; logs only significant hovers
    activity3.helpers:
    insts2.created:              subscriptions
    insts2.events:   
    msgReminder.helpers:
        idea:                        returns meteor collection cursor for all ideas in 
                                         server/ideaData.js   
        agree:                       click ok on popup--> increment state and start activity
    insts2.helpers:
    timer.created:               subscriptions
    timer.helpers
    
    intervals:                   timer algorithm
    saveData:                    saves user idea and frame data to userInput collection
    
-----------------------------------------------------------------------------*/

//=======================================================================================VARIABLE_DICTIONARY
CLOCK_TIME = 900;                   //time limit for activity in seconds
var mouseOverInTime;                //from ##idea_item3.events --> ##hover_tooltip
                                    //records start time for tooltip hover

/*
    ##layout2.created
    when layout2 loads for the first time (check this) subscribe to relivant collections
*/
//======================================================================================LAYOUT_2_CREATED
Template.layout2.created = function(){
    this.subscribe("userInput", Router.current().params.userID);
    this.subscribe("timerVar");
    this.subscribe("users", Router.current().params.userID);
};

/*
    ##layout2.rendered
    when layout2 is loaded (check this), activate tooltips and resume timer if
        necessary.
*/
//=====================================================================================LAYOUT_2_RENDERED
Template.layout2.rendered = function(){
    //activate tooltips
    $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template

    //Allows timer to resume after refreshes.
    //Intervals shut down on navigating away from the page. Restart using most
    //  current time value
    if(TempData.find({varName: "timer", currentTime: {$gt: 0}}).count() > 0){
        intervals(TempData.find({varName: "timer"}).fetch()[0].currentTime);
    }
};

/*
    ##layout2.events
*/
//=======================================================================================LAYOUT_2_EVENTS
Template.layout2.events({
    
    //##done
    //Activity is complete
    'click #done': function(e){
//      Time has run out
//          save data
//          log status in EVENT collection using logger.js
//          increment state of current user from MyUsers collection
//          create completionCode (for MTurk)
//          navigate to next phase (state machine defined in globalFunctions.js)
        if(Session.get("time") == 0){
            saveData();
//            *****Session.set is necessary for logger******
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logFinished();
            
            var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
            var completionCode = Random.hexString(20).toLowerCase();
            MyUsers.update(Router.current().params.userID, {$set: {completionCode: completionCode}});
            MyUsers.update(Router.current().params.userID, {$set: {state: "7."+ newState}});
            redirect(user(Router.current().params.userID).state);
        }
//      Time has not run out yet, do not let them stop.
        else{
            alert("There's still time left! Keep Going!");
        }
    },
    //##quit
//  User has quit early
    'click #quit': function(e){
        saveData();//save data thus far
    
        //log status in EVENT collection using logger.js
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
    
        
        //create completionCode (for MTurk)
        var completionCode = "inc-" + Random.hexString(20).toLowerCase();
        MyUsers.update(Router.current().params.userID, {$set: {completionCode: completionCode}});
        
        //save state of current user from MyUsers collection
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        
        //navigate to next phase (state machine defined in globalFunctions.js)
        redirect("9");
    },
    //##problem_def_dropdown
    //User has clicked on the problem definition dropdown
    //Log in EVENT collection using logger.js
    'click #Problem': function(){
        //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logBackToProblemBrief();
    },
    //##focus_on_ideas
    //User has switched focus to the #IdeasInput textarea
    //Log in EVENT collection using logger.js
    'focus #IdeasInput':function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logIdeaEntryFocus();
    },
    //##focus_on_frames
    //User has switched focus to the #FramesInput textarea
    //Log in EVENT collection using logger.js
    'focus #FramesInput': function(e){
        //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFrameEntryFocus();
    },
    //##instructions_dropdown
    //User has clicked on the Instructions dropdown
    //Log in EVENT collection using logger.js
    'click #instReminder':function(){
        //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logInstructionReminder();

    },
    //##sol_vs._frames_dropdown
    //User has clicked on the Solutions vs. Frames dropdown
    //Log in EVENT collection using logger.js
    'click #frameReminder': function(){
        //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logFramingReminder();
    },
    //##challenge_partners_dropdown
    //User has clicked on the Challenge Partners dropdown
    //Log in EVENT collection using logger.js
    'click #Partners': function(){
        //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logPartnerReminder();
    }
});
/*
    ##layout2.helpers
*/
//===============================================================================================HELPERS

Template.layout2.helpers({
    //##first
    first: function(){
        //if this is the first time you have been to the activity page as determined by
        //  the user's state, return true
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "6");
    },
    //##getRecentIdeas
    getRecentIdeas: function(){
        //returns the most recently saved userInput idea data.
        var ideas = UserInput.find({authorID: Router.current().params.userID, from: 'ideas'}, {sort: {time: -1}});
        if(ideas.count() > 0){
            return ideas.fetch()[0].content;
        }
    },
    //##getRecentFrames
    getRecentFrames: function(){
        //returns the most recently saved userInput frames data
        var frames = UserInput.find({authorID: Router.current().params.userID, from: 'frames'}, {sort: {time: -1}});
        if(frames.count() > 0){
            return frames.fetch()[0].content;
        }
    },
    //##enabled
    enabled: function(){
        //disables an element if user is in version/condition 1
        //used for hiding the Inspirations from version/condition 1 participants
        if(user(Router.current().params.userID).state.substring(2) == "Version1"){
            return "disabled";
        }
    },
    //##columns
    columns: function(){
        //chooses the width of the element depending on the version/condition
        //used for resizing ideas and frames when Inspriation is gone.
        if(user(Router.current().params.userID).state.substring(2) == "Version1"){
            return "col-sm-6";
        }
        else{
            return "col-sm-3";
        }
    },
    //##isdone
    isdone: function(){
        //disables an element if the user has clicked on the "done" button at some point
        //used for locking the ideas and frames textareas after activity is complete
        if(user(Router.current().params.userID).state > "7"){
            return "disabled";
        }
    },
    //##showRationale
    showRationale: function() {
      //returns true if user is in version/condition 3
      //used for displaying rationales in version/condition 3
      if(user(Router.current().params.userID).condition == 3) {
        return true;
      } else {
        return false;
      }
    }
});

/*
    ##activity2.helpers
*/
Template.activity2.helpers({
    //##ideas 
    //returns a meteor cursor containing all of the ideas in the system
    idea: function(){
        return listOfIdeas.find();   
    }
});

/*
    ##activity3.rendered
    activate tooltips
*/
Template.activity3.rendered = function(){
    $('[data-toggle="tooltip"]').tooltip()
};

/*
    ##idea_item3.events
*/
Template.idea_item3.events({
    //##hover_tooltip
    'mouseover .glyphicon[data-toggle="tooltip"]': function(e){
        //save start time
        mouseOverInTime = new Date().getTime();
    },
    'mouseout .glyphicon[data-toggle="tooltip"]': function(e){
        var outTime = new Date().getTime();
        var hoverTime = (outTime - mouseOverInTime)/1000;
        
        //log to EVENT collectino if the user is hovering on purpose, not a
        //  random scroll
        if(hoverTime > 0.5){
            var id = e.target.id;
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logMoreInfoClick(id);
        }
    }
});

/*
    ##activity3.helpers
*/
Template.activity3.helpers({
    //##idea: 
    //return a meteor cursor for all ideas in server/idea/Data.js
    idea: function(){
        return listOfIdeas.find();   
    }
});

/*
    ##insts2.created
    when insts2 first loads, subscribe to relivant collections
*/
Template.insts2.created = function(){
    Meteor.subscribe("users", Router.current().params.userID);
    Meteor.subscribe("timerVar");
}//insts2.created

/*
    ##insts2.events
*/
Template.insts2.events({
    /*
        ##agree
        when user clicks 'ok' on the insts2 activit instructions popup:
        -TODO: turn insts2 into a modal instead of this fake modal
    */
   'click #agree': function(){
       //log activity to EVENTS collection
       //*****Session.set is necessary for logger******
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterActivity("version2");

        //remove backdrop and popup
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        //increment state
        var newState = user(Router.current().params.userID).state.substring(2);
        MyUsers.update(Router.current().params.userID, {$set: {state: "6."+ newState}});

        //start timer
        intervals(CLOCK_TIME);

   }
});//insts2.events

/*
    ##insts2.helpers
*/
Template.insts2.helpers({
    //##isV1: calls global function isV1 (returns true if version/condition 1
    isV1: function(){
        return isV1(Router.current().params.userID);
    },
    //##isV2: calls global function isV2 (returns true if version/condition 2
    isV2: function(){
        return isV2(Router.current().params.userID);

    },
    //##isV3: calls global function isV3 (returns true if version/condition 3
    isV3: function(){
        return isV3(Router.current().params.userID);
    }
});

/*
    ##msgReminder.helpers
*/
Template.msgReminder.helpers({
    //##isV1: calls global function isV1 (returns true if version/condition 1
    isV1: function(){
        return isV1(Router.current().params.userID);
    },
    //##isV2: calls global function isV2 (returns true if version/condition 2
    isV2: function(){
        return isV2(Router.current().params.userID);

    },
    //##isV3: calls global function isV3 (returns true if version/condition 3
    isV3: function(){
        return isV3(Router.current().params.userID);
    }
});

/*
    ##timer.created
*/
Template.timer.created = function(){
    Meteor.subscribe("timerVar");
};

/*  
    ##timer.helpers
*/
Template.timer.helpers({
    //##getTime returns current time to display to timer template
    getTime: function(){
        //get current time in seconds
        var currentTime = TempData.find({varName: "timer"}).fetch()[0].currentTime;
        
        //convert to minutes:seconds format
        var min = Math.floor(currentTime/60);
        var sec = currentTime - (min*60);
        
        //add placeholders for single digit values
        if(min < 10){
            min = "0"+min;   
        }
        if(sec < 10){
            sec = "0"+sec;   
        }
        
        return min + ":" + sec;
    }
});


//===============================================================================================FILE_LEVEL_FUNCTIONS
/*
    ##intervals 
    contains the timer algorithm
*/
//===============================================================================================INTERVALS
function intervals(clock){//clock is the time limit in seconds
    //SETUP CODE
    //if there exists a timer variable in TempData (with current userID -- see 
    //  server/publications.js) reset currentTime
    if(TempData.find({varName: "timer"}).count() > 0){
        TempData.update(TempData.find({varName: "timer"}).fetch()[0]._id, {$set: {currentTime: clock}});
    }
    //if no timer variable (with current userID -- see server/publications.js),
    //  create one with currentTime == clock
    else{
        TempData.insert({
            varName: "timer",
            currentTime: clock,
            userID: Router.current().params.userID
        });
        console.log("insert");
    }

    //REPEATED CODE
    var timeLeft = function(){
        //if time not up, count down
        if(clock > 0){
            clock--;
            //save most recent time to variable
            TempData.update(TempData.find({varName: "timer"}).fetch()[0]._id, {$set: {currentTime: clock}});
            
            //10 second warning
            //clock == 9 because the timer on screen is still currently displaying 10
            if(clock == 9){
                alert("10 Second Warning! Finish up your last thoughts.");
            }

        }//end_if
        else{
            //if time is up, log to EVENTS collection, alert user, and stop interval
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logTimeout();
            alert("Time's Up! Click ‘Continue’ at the bottom. If you like, you" + 
                  "can finish whatever you were typing before doing so.");
            
            //TODO: found out what this line is for.
            var done = document.getElementById("done");
            return Meteor.clearInterval(interval);

        }
        
        //save user's ideas and frames to UserInput collection every 10 seconds
        if(TempData.find({varName: "timer"}).fetch()[0].currentTime % 10 == 0){
            saveData();
        }
    };//timeLeft
    
    //start interval
    var interval = Meteor.setInterval(timeLeft, 1000);
}//intervals

/*  
    ##saveData
    saves data from #IdeasInput and #FramesInput to UserInput collection
*/
//===============================================================================================SAVE_DATA
function saveData(){
    var date = new Date();  //record date first so both entries have the same timestamp
    UserInput.insert({
        from: "ideas",      
        content: document.getElementById("IdeasInput").value,
        authorID: Router.current().params.userID,
        time: date.valueOf(), //UNIX timestamp
        readableTime: date.toString()//human readable format
    });
    UserInput.insert({
        from: "frames",
        content: document.getElementById("FramesInput").value,
        authorID: Router.current().params.userID,
        time: date.valueOf(),//UNIX timestamp
        readableTime: date.toString()//human readable format
    });
}