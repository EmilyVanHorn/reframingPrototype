/*-----------------------------------------------------------------------------
    LAYOUT_ONE.JS OUTLINE
    search "##{functionName}" for any of the templateNames listed below to eas-
    ily find it's code and a more detailed description

    layout1.onCreated:          when layout1 is created, save currentUser
    signin.js:                  signin logic from IDEAGENS
    consent.js:                 consent logic from IDEAGENS and events
    instructions.events
        continue                    continue to problem brief
        quit                        quit early
        submit                      submit practice data
    instructions.helpers        
        msg                         chooses the message to be printed next
                                    to the continue button on the instructions
                                    page
    Version1.events             button clicks like #continue, #quit, #agree...
    Version1.helpers
    Version2.created
    Version2.events             button clicks like #continue, #quit, #agree...
    Version2.helpers
    Version3.created
    Version3.events             button clicks like #continue, #quit, #agree...
    Version3.helpers
    moreStuff.events            button clicks like #continue, #quit, #agree...    
    survey.events               button clicks like #continue, #quit, #agree...
    survey.helpers
    thankyou.helpers
    
    chooseVersion               chooses the version/condition the user
                                will be participating in randomly
    saveTempData                save survey data to Temp for recall
    saveSurveyResponse          save survey data to survey response for 
                                analysis
    
------------------------------------------------------------------------------*/

//=============================================================================VARIABLE_DICTIONARY
var practiceFinished = false;           //##practice: changes the nature of the continue
                                        //button depending on whether the user has seen
                                        //the practice problem or not.
Session.set('msg', "When you are ready, click \"Continue\" to try out a practice problem.");
                                        //##practice: Session variable that determines
                                        //what message to print next to the continue button
                                        //depending on whether the user has clicked it before.
/*
    ##layout1.onCreated
    when layout1 is loaded for the first time (check this), set currentUser
    *****SESSION VARIABLE CURRENT USER IS NECESSARY FOR LOGGER FUNCTIONS ****
    TODO: fix logger functions to remove the need.
*/
Template.layout1.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));
});


/*
    ##signin.js
    THIS CODE WAS TAKEN FROM IDEAGENS
    IMPORTANT PARTS FOR THIS CODE ARE MARKED
    THE REST MAY OR MAY NOT BE NECESSARY
*/
var logger = new Logger('Client:Exp:MturkLogin');
// Comment out to use global logging level
//Logger.setLevel('Client:Exp:MturkLogin', 'trace');
//Logger.setLevel('Client:Exp:MturkLogin', 'debug');
Logger.setLevel('Client:Exp:MturkLogin', 'info');
//Logger.setLevel('Client:Exp:MturkLogin', 'warn');

//Template.signin= function() {
//  // Ensure scroll to top of window
//  window.scrollTo(0,0);
//}

/********************************************************************
 * Login Page event listeners 
 * *****************************************************************/
Template.signin.events({
    'click #continue': function () {
        //login user
        var userName = $('input#name').val().trim();
        logger.info("Logging in user with name: " + userName);
        var user = LoginManager.loginUser(userName);//--------------------This is important for logging in the user
        var role = RoleManager.defaults['HcompFacilitator'];
        //var role = RoleManager.defaults['Participant'];
        Session.set("currentRole", role);
        Router.go("consent",//--------------------------------------------This is important for moving on to the next page
          {userID: user._id});//                                          TODO: convert to state machine notation.

    /********************* Disable experiment logic ************/
    },
    'keyup input#name': function (evt) {
      if(evt.keyCode==13) {
        $('#continue').click();
      }
    }
});
//-----------------------------------------------------------------------END SIGNIN.JS


/*
    ##consent.js
    THIS CODE WAS TAKEN FROM IDEAGENS
    IMPORTANT PARTS FOR THIS CODE ARE MARKED
    THE REST MAY OR MAY NOT BE NECESSARY
    
*/
// Configure logger for ExperimentManager
var logger = new Logger('Client:Hcomp:Consent');
// Comment out to use global logging level
Logger.setLevel('Client:Hcomp:Consent', 'trace');
//Logger.setLevel('Managers:Experiment', 'debug');
// Logger.setLevel('Managers:Experiment', 'info');
//Logger.setLevel('Managers:Experiment', 'warn');
//Template.TextPage.helper({
//});

Template.consent.events({
    'click #continue': function(e){//-------------------------------------This is important for moving on to the next page
        //log consent
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logConsent();
        //increment state and continue
        MyUsers.update(Router.current().params.userID, {$set: {state: "2"}});
        redirect("2");
    },
    'click #quit': function(e){//-----------------------------------------This is important for quitting early
        //log early exit
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        
        //update state and continue
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");  
    }
});

/*
    ##instructions.events 
*/
Template.instructionPage.events({
    //##continue: the first time the user clicks continue(practiceFinished == false),
    //  start the practice problem
    //TODO: log start and end of practice
    'click #continue': function(){
        if(!practiceFinished){
            document.getElementById("contain").className = "";
            practiceFinished = true;
            Session.set("msg", "When you are ready, click \"Continue\" to go to the next page, where you'll learn about the design problem you will be solving.");

        }
        //afterwards, update state and continue to next phase
        else{
            MyUsers.update(Router.current().params.userID, {$set: {state: "3."+chooseVersion()}});
            redirect(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state);
        }

    },
    //##quit:
    'click #quit': function(){
        //log exit early
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        //update state and continue
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");
    },
    //##submit:
    //when user submits their practice work, save their answers 
    //reveal of our answers is not in the javascript, it is a 
    //bootsrap data-toggle: collapse
    'click #Submit':function(){
        var date = new Date()
            UserInput.insert({
                type: "text",
                from: "practice",
                content: document.getElementById("practiceFrames").value,
                authorID: Router.current().params.userID,
                time: date.valueOf(),
                readableTime: date.toString()
            });
    },
});

/*
    ##instructions.helpers
*/
Template.instructionPage.helpers({
    //##msg: returns the msg to be printed next to the continue button
    msg: function(){
        return Session.get("msg");
    }
});

/*
    ##Version1.events
*/
Template.Version1.events({
    //##continue
    'click #continue': function(e){
//        //Log re-enter if user comes back after the initial visit to this page
//        //NOT USEFUL NOW THAT WE'RE USING MODALS INSTEAD
//        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < 4){
//            //EventLogger.logEnterActivity("version1");
//        }
//        else{
//            EventLogger.logReEnterActivity("version1");
//        }
        
        //increment state and continue to next phase
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "4"){
            MyUsers.update(Router.current().params.userID, {$set: {state: "5."+ newState}});
        }
        redirect(user(Router.current().params.userID).state);

    },
    //##quit
    'click #quit': function(e){
        //log early exit
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        //update state and continue
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");
    },
    //##agree
    //user has clicked 'ok' on the popup
    'click #agree': function(e){
        
        //remove backdrop and popup
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        //log that the user has visited the problem brief
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version1");

        //increment the state to reflect entering the problem brief
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set: {state: "4."+ newState}});
        }
    },
    //##.alert
    //external links that we want to track have been tagged with and 'alert' class
    'click .alert': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExernalLinkClick(e.target.href);
    }
});

/*
    ##Version1.helpers
*/
Template.Version1.helpers({
    //##first
    //returns true if it is the user's first visit to the page as determined by the
    //user's state
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");
    }
});

/*
    ##Version2.created
    scrolls problem brief page to top
*/
Template.Version2.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

/*
    ##Version2.events
*/
Template.Version2.events({
    //##continue
    'click #continue': function(e){
        //Log re-enter if user comes back after the initial visit to this page
//        //NOT USEFUL NOW THAT WE'RE USING MODALS INSTEAD
//        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < 4){
//            //EventLogger.logEnterActivity("version1");
//        }
//        else{
//            EventLogger.logReEnterActivity("version1");
//        }
        
        //##increment state and continue to next phase
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "4"){
            MyUsers.update(Router.current().params.userID, {$set: {state: "5."+ newState}});
        }
            redirect(user(Router.current().params.userID).state);
    },
    //##quit
    'click #quit': function(e){
        //log early exit
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        
        //update user's state and continue
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");
    },
    //##agree
    //user has clicked 'ok' on the popup for the page
    'click #agree': function(e){
        //remove backdrop and popup
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        //log entry to problem brief
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version2");

        //increment state reflecting the first visit to this page
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set :{state: "4."+ newState}});
        }
    },
    //##alert
    //links that we want to track in the logs are tagged with .alert class
    'click .alert': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExernalLinkClick(e.target.href);
    }
});

/*
    ##Version2.helpers
*/
Template.Version2.helpers({
    //##first
    //returns true if the user has never visited the page before as determined
    //by the user's state
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");
    }
});

/*
    ##Version3.created
    scrolls problem brief page to top
*/
Template.Version3.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

/*
    ##Version3.events
*/
Template.Version3.events({
    //##continue
    'click #continue': function(e){
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < "4"){
            //EventLogger.logEnterActivity("version1");
        }
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logReEnterActivity("version3");
        }
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "4"){
            MyUsers.update(Router.current().params.userID, {$set: {state: "5."+ newState}});
        }
            redirect(user(Router.current().params.userID).state);
    },
    //##quit
    'click #quit': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");
    },
    //##agree
    //user has clicked the 'ok' button on the instruction popup
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");

        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version3");

        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set :{state: "4."+ newState}});
        }
    },
    //##alert
    //links that we want to track are tagged with .alert class for logging
    'click .alert': function(e){
        EventLogger.logExernalLinkClick(e.target.href);
    }
});

/*
    ##Version3.helpers
*/
Template.Version3.helpers({
    //##first
    //returns true if the user has not visit this page before as determined by the
    //user's state
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");
    }
});

/*
    ##moreStuff.events
*/
Template.moreStuff.events({
    //##show-hide-partners
    //logs show/hide partners
  'click #show-hide-partners': function() {
    EventLogger.logSeeMoreProblemInfo();
  },
    //##partner-header
  'click .partner-header': function(e, target) {
    var which = e.currentTarget.id;
    EventLogger.logSeeChallengePartner(which);
  },
});

/*
    ##survey.events
*/
Template.survey.events({
    //##continue
    //save survey data
    'click #continue': function(e){
        e.preventDefault();

        // grab all text input
        $('.q-text').each(function(index) {
          var q = this.id;
          var a = this.value;
          saveSurveyResponse(q, a);
        })

        // radio button items - just do each for now, no time for elegance!
        saveSurveyResponse("gender", $("input[name='gender']:checked").val());
        saveSurveyResponse("english-first", $("input[name='lang1']:checked").val());
        saveSurveyResponse("design-projects", $("input[name='design-projects']:checked").val());
        saveSurveyResponse("design-employ", $("input[name='design-employ']:checked").val());
        saveSurveyResponse("design-course", $("input[name='design-course']:checked").val());

        // selects
        saveSurveyResponse("age", $("input[name='age']").val());

        // for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
        //
        //     var q = document.getElementById('q'+i).innerHTML;
        //     var a = document.getElementById('a'+i).value;
        //     SurveyResponse.insert({
        //         question: q,
        //         answer: a,
        //         authorID: user(Router.current().params.userID)._id,
        //     });
        // }//for

         //increment state and continue to next phase
         MyUsers.update(Router.current().params.userID, {$set: {state: "8"}});
         redirect(user(Router.current().params.userID).state);
    },//click
    //##Back2Work
    //opens a new tab for the user to see his/her workspace
    'click #Back2Work': function(){
        version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(9);
        window.open(Router.url("activity" + version, {userID: Router.current().params.userID}), "_blank");
        //Router.go("activity" + version, {userID: Router.current().params.userID});
    }
});
/*
    ##survey.helpers
*/
Template.survey.helpers({
    //##getResponse
    //Returns the most recent survey data that exists in TempData 
    //or, if not exists, an empty string.
    getResponse: function(id){
        if(TempData.find({authorID: Router.current().params.userID}).count() == 0){
            return "";
        }
        else{
            var qest = document.getElementById("q"+id);
            return TempData.find({authorID: Router.current().params.userID, q: qest.innerHTML}, {sort: {time: -1}})
        }
    },
    //##hadInspirations
    //returns true if user participated in version/condition 2 or 3
    hadInspirations: function() {
      var condition = MyUsers.findOne(Router.current().params.userID).condition;
      if (condition > 1) {
        return true;
      } else {
        return false;
      }
    },
    //##hadRationale
    //returns true if user participated in version/condition 3
    hadRationale: function() {
      var condition = MyUsers.findOne(Router.current().params.userID).condition;
      if (condition == 3) {
        return true;
      } else {
        return false;
      }
    },
});

/*
    ##thankyou.helpers
*/
Template.thankyou.helpers({
  //##completionCode
  //returns a completion code for the participant to use on MTurk
  completionCode: function() {
    return user(Router.current().params.userID).completionCode;
  }
})



//=============================================================================FILE LEVEL FUNCTIONS
/*
    ##chooseVersion
    chooses a random number between 1 and 3 that represents the
    version/condition the user will be participating in.
*/
function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    MyUsers.update(Router.current().params.userID, {$set: {condition: rand}});
    return "Version" + rand;
}

/*
    ##saveTempData
    save survey inputs to TempData collection
*/
function saveTempData(){
    var date = new Date().getTime();
     for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
        var q = document.getElementById('q'+i).innerHTML;
        var a = document.getElementById('a'+i).value;
        TempData.insert({
            question: q,
            answer: a,
            authorID: user(Router.current().params.userID)._id,
            time: date,
        });
    }
}

/*
    ##saveSurveyResponse
    save survey data to SurveyResponse collection
*/
function saveSurveyResponse(q, a) {
  SurveyResponse.insert({
    question: q,
    answer: a,
    authorID: user(Router.current().params.userID)._id,
  })
}
