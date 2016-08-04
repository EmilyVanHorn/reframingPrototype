/********************************************************************
 * Configuring Pince logger to enable multi-level logging for
 * system monitoring to console
 *******************************************************************/
//Set global message logging level
Logger.setLevel('info');

// Configure logger for event logging
var logger = new Logger('Tools:Logging');
// Comment out to use global logging level
// Logger.setLevel('Tools:Logging', 'trace');
//Logger.setLevel('Tools:Logging', 'debug');
Logger.setLevel('Tools:Logging', 'info');
//Logger.setLevel('Tools:Logging', 'warn');

EventLogger = (function () {
  return {
    /*****************************************************************
    * Global object for logging high level system events to database
    ******************************************************************/
    log: function(msg, data) {
      /*
      *  log any event. If insufficient data is given, warning is
      *  logged, but does not throw error
      *   Input:
      *   type - the EventType associated with this event
      *   data - (Optional) the data to be associated with the event
      *       Specified as an object where only fieldNames specified
      *       in type are stored
      */
      //The current user is assumed to have generated the event
      var user = Session.get("currentUser");
      var event = new Event(msg, user);
      //Index participantID and experimentID if experiment is set
      var exp = Session.get("currentExp");
      if (exp) {
        var part = Session.get("currentParticipant");
        if (part) {
          event['participantID'] = part._id;
          event['conditionID'] = part.conditionID;
        }
        event['expID'] = exp._id;
      }

      //Set each field provided in data
      if (typeof data != undefined) {
        for (var field in data) {
          event[field] = data[field];
        }
      }
      //Insert into db
      event._id = Events.insert(event);
      return event;
    },

    remove: function(events) {
      /**************************************************************
       * Remove a set of logged events
       *    This is primarily to support tests and needs to eventually
       *    be secured.
       * @params
       *    events: an array or cursor of events to be removed
       * @return
       *    n/a
       *************************************************************/
      if (hasForEach(events)) {
        ids = getIDs(events);
        if (Meteor.isServer) {
          Events.remove({_id: {$in: ids}});
        } else {
          events.forEach(function(event) {
            Events.remove({_id: event._id});
          });
        }
      } else {
        Events.remove({_id: events._id});
      }

    },

    logUserLogin: function () {
      var msg = "User logged into experiment";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
    },
    logBeginRole: function() {
      var role = Session.get("currentRole");
      var prompt = Session.get("currentPrompt");
      var msg = "User began role " + role.title;
      //var type = EventTypeManager.get(msg);
      var data = {'promptID': prompt._id,
          'role': role.title
      };
      this.log(msg, data);
    },
    logEndRole: function() {
      var role = Session.get("currentRole");
      var prompt = Session.get("currentPrompt");
      var msg = "User ended role " + role.title;
      //var type = EventTypeManager.get(msg);
      var data = {'promptID': prompt._id,
          'role': role.title
      };
      this.log(msg, data);
    },
    /** Experiment Events**/
    logConsent: function () {
      var msg = "User consented to experiment";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
      console.log(msg);
    },
    logDenyParticipation: function() {
      var msg = "User was denied participation in experiment";
      //var type = EventTypeManager.get(msg);
      //var exp = Session.get("currentExperiment")
      //var data = {'expID': exp._id, 'expDescr': exp.description}
      this.log(msg);
    },
    logExitStudy: function(prompt) {
      var msg = "User exited study early";
      var data = {'pageOfExit': prompt};
      this.log(msg, data);
    },
    logTutorialStarted: function () {
      var msg = "User started a tutorial";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
      var part = Session.get("currentParticipant");
      Participants.update({_id: part._id},
        {$set: {tutorialStarted: true}});
    },
    // logFluencyTaskBegin: function () {
    //   var msg = "User started fluency measure task";
    //   //var type = EventTypeManager.get(msg);
    //   this.log(msg);
    //   // logger.debug(msg);
    //   var part = Session.get("currentParticipant");
    //   Participants.update({_id: part._id},
    //     {$set: {fluencyStarted: true}});
    // },
    // logFluencyTaskComplete: function () {
    //   var msg = "User finished fluency measure task";
    //   //var type = EventTypeManager.get(msg);
    //   this.log(msg);
    //   // logger.debug(msg);
    //   var part = Session.get("currentParticipant");
    //   Participants.update({_id: part._id},
    //     {$set: {fluencyFinished: true}});
    // },
    logTutorialComplete: function () {
      var msg = "User finished a tutorial";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
      logger.debug(msg);
      ExperimentManager.logParticipantReady(Session.get("currentParticipant"));
    },
    logEnterIdeation: function() {
      var msg = "User entered ideation";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
    },
    logBeginIdeation: function() {
      var msg = "User began ideation";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
      var part = Session.get("currentParticipant");
      if (part) {
        Participants.update({_id: part._id},
        {$set: {hasStarted: true}});
      }
    },
    logSurveyBegan: function () {
      var msg = "User began survey";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
      var part = Session.get("currentParticipant");
      if (part) {
        Participants.update({_id: part._id},
        {$set: {surveyStarted: true}});
      }
    },
    logSurveyComplete: function () {
      var msg = "User completed survey";
      //var type = EventTypeManager.get(msg);
      this.log(msg);
    },
    logSubmittedSurvey: function(response) {
      var msg = "User submitted survey";
      var exp = Session.get("currentExp");
      logger.trace("Current experiment: " + JSON.stringify(exp));
      //var type = EventTypeManager.get(msg);
      var data = {'responseID': response._id,
          'expID': exp._id
      };
      this.log(msg, data);
    },
    logShowHideClick: function(isHidden) {
      var msg = "User clicked show/hide instructions";
      //var type = EventTypeManager.get(msg);
      var data = {'isHidden': isHidden};
      logger.debug(data);
      this.log(msg, data);
    },
    logIdeaClick: function(id){
        var msg = "User clicked on an idea";
        var data = {'ideaID': id};
        this.log(msg, data);
        console.log(msg, data);
    },
    logCommentClick: function(id){
        var msg = "User clicked to see the comments on an idea";
        var data = {'openIDEOid(idea)': id};
        this.log(msg, data);
        console.log(msg, data);
    },
    logMoreInfoClick: function(id){
        var msg = "User clicked to see more information about the idea";
        var data = {'openIDEOID(idea)': id};
        this.log(msg, data);
        console.log(msg, data);
    },
    logBackToProblemBrief: function(){
        var msg = "User clicked the Problem dropdown";
        this.log(msg);
        console.log(msg);
    },
    logExternalLinkClick: function(url){
        var msg = "User followed an external link in the problem brief";
        var data = {'url': url};
        this.log(msg, data);
        console.log(msg, data);
    },
    logEnterProblemBrief: function(version){
        var msg = "User entered the problem brief";
        var data = {'version': version};
        this.log(msg, data);
        console.log(msg, data);
    },
    logSeeMoreProblemInfo: function() {
      var msg = "User clicked to see more info about problem";
      this.log(msg);
    },
    logSeeChallengePartner: function(which) {
      var msg = "User clicked to see a challenge partner";
      var data = {'partner': which};
      this.log(msg, data);
    },
    logEnterActivity: function(version){
        var msg = "User entered the activity";
        var data = {'version': version};
        this.log(msg, data);
        console.log(msg, data);
    },
    logReEnterActivity: function(version){
        var msg = "User reEntered the activity from the problem brief";
        var data = {'version': version};
        this.log(msg, data);
        console.log(msg, data);
    },
    logFinished: function(){
        var msg = "User has finished the activity";
        this.log(msg);
        console.log(msg);
    },
    logFrameEntryFocus: function(){
        var msg = "User has switched to the frame entry box.";
        this.log(msg);
        console.log(msg);
    },
    logIdeaEntryFocus(){
       var msg = "User has switched to the idea entry box.";
       this.log(msg);
       console.log(msg);
    },
    logIdeaClick(id){
        var msg = "User has clicked on an idea.";
        var data = {'openIDEOid(idea)': id};
        this.log(msg, data);
        console.log(msg, data);
    },
    logTimeout(){
        var msg = "User has run out of time.";
        this.log(msg);
        console.log(msg);
    },
    logInstructionReminder(){
        var msg = "User has clicked on the instructions dropdown";
        this.log(msg);
        console.log(msg);
    },
    logFramingReminder(){
        var msg = "User has clicked on the framing dropdown";
        this.log(msg);
        console.log(msg);
    },
    logPartnerReminder(){
        var msg = "user has clicked on the partners dropdown";
        this.log(msg);
        console.log(msg);
    },
    logConferenceReminder(){
        var msg = "User has clicked on the Rio dropdown";
        this.log(msg);
        console.log(msg);
    }
    // TODO: log show/hide info on problem brief, see more info, etc.
  };
}());
