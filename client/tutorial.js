Template.TreatmentTutorialFlow.events({
    //Welcome
    'click .treatment-tutorial-welcome-gotit': function() {
        $("#treatment-tutorial-welcome").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-timer").addClass("visible-tutorial-treatment");
        $(".timer").css({border: "10px solid #F5A623",width: 200,float: "right",clear: "right"});
        EventLogger.logTutorialStepComplete(1,tutorialLengthTreatment);
    },
    //Timer
    'click .treatment-tutorial-timer-gotit': function() {
        $("#treatment-tutorial-timer").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-exit").addClass("visible-tutorial-treatment");
        $(".timer").css({border: "none"});
        $(".exitStudy").css({border: "10px solid #F5A623"});
//        $(".ideation-prompt-treatment").css({"z-index": 100});
        EventLogger.logTutorialStepComplete(2,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-timer-goback': function() {
        $("#treatment-tutorial-timer").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-welcome").addClass("visible-tutorial-treatment");
        $(".timer").css({border: "none"});
        EventLogger.logTutorialStepRewind(2,tutorialLengthTreatment);
    },
    //Exit Early
    'click .treatment-tutorial-exit-gotit': function() {
        $("#treatment-tutorial-exit").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-prompt").addClass("visible-tutorial-treatment");
        $(".ideation-prompt-treatment").css({
            border: "10px solid #F5A623",
            "z-index": 60
        });
        $(".exitStudy").css({border: "none"});
        $(".tutorial-backdrop").remove();
        var height = $(window).height() - 50; //Navbar height=50
        $(".task-list-header").append(
            "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        );
        $(".general-idea-entry").append(
            "<div class='tutorial-backdrop'></div>"
        );
        $(".ideation-prompt-treatment").zIndex(60);
        EventLogger.logTutorialStepComplete(3,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-exit-goback': function() {
        $("#treatment-tutorial-exit").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-timer").addClass("visible-tutorial-treatment");
        $(".timer").css({border: "10px solid #F5A623",width: 200,float: "right",clear: "right"});
        $(".exitStudy").css({border: "none"});
        EventLogger.logTutorialStepRewind(3,tutorialLengthTreatment);
    },
    //Prompt
    'click .treatment-tutorial-prompt-gotit': function() {
        $("#treatment-tutorial-prompt").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-ideaEntry").addClass("visible-tutorial-treatment");
        $(".ideation-prompt-treatment").css({
            border:"none",
            "z-index": 20
        });
        $(".idea-input-box").css({
          border: "10px solid #F5A623",
          "z-index": "60",
          position: "relative"
        });
        EventLogger.logTutorialStepComplete(4,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-prompt-goback': function() {
        $("#treatment-tutorial-prompt").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-exit").addClass("visible-tutorial-treatment");
        $(".ideation-prompt-treatment").css({
            border: "none",
            "z-index": 20 
        });
        $(".tutorial-backdrop").remove();
        var height = $(window).height() - 50; //Navbar height=50
        $(".tutorial-page-treatment").append(
            "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        );
        $(".exitStudy").css({border: "10px solid #F5A623"});
        EventLogger.logTutorialStepRewind(4,tutorialLengthTreatment);
    },
    //ideaEntry
    'click .treatment-tutorial-ideaEntry-gotit': function() {
        $("#treatment-tutorial-ideaEntry").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-ideaEntryTry").addClass("visible-tutorial-treatment");
        // $("#treatment-tutorial-ideaEntryTry").removeClass("treatment-tutorial-background");
        $(".idea-input-box").css({border: "none"});
        $(".general-idea-entry .tutorial-backdrop").remove();
        $("#treatment-tutorial-highlight-ideaEntryTry").remove();
        EventLogger.logTutorialStepComplete(5,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-ideaEntry-goback': function() {
        $("#treatment-tutorial-ideaEntry").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-prompt").addClass("visible-tutorial-treatment");
        $(".ideation-prompt-treatment").css({border: "10px solid #F5A623"});
        $(".idea-input-box").css({
            border: "none",
            "z-index": 20
        });
        $(".ideation-prompt-treatment").css({
            border: "10px solid #F5A623",
            "z-index": 60
        });
        EventLogger.logTutorialStepRewind(5,tutorialLengthTreatment);
    },
    
    //ideaEntryTry
    'click #treatment-tutorial-ideaEntryTry-gotit': function() {
        $('#treatment-tutorial-ideaEntryTry-gotit').attr('disabled',true);
        $('.treatment-tutorial-ideaEntryTry-goback').attr('disabled',true);
        // $("#treatment-tutorial-ideaEntryTry").removeClass("treatment-tutorial-background");
        // $('.treatment-tutorial-background').zIndex(51);
        $("#treatment-tutorial-highlight-ideaEntryTry").remove();
        alert("Ready, set, go! Click 'ok' and the timer will start!");
        $('.ideation-prompt-treatment').text("Alternative uses for a bowling pin");
        var startTime = timer.msToTime(fluencyTaskLength);
        logger.trace("Fluency task length is: " + startTime);
        EventLogger.logFluencyTaskBegin();
        countdown.start(fluencyTaskLength);
    },
    'click .treatment-tutorial-ideaEntryTry-goback': function() {
        $("#treatment-tutorial-ideaEntryTry").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-ideaEntry").addClass("visible-tutorial-treatment");
        $(".get-task").css({
            border: "none",
            "z-index": 20 
        });
        $(".idea-input-box").css({
            border: "10px solid #F5A623",
            "z-index": 60 
        });
        $(".idea-input-box").css({border: "10px solid #F5A623"});
        var height = $(window).height() - 50; //Navbar height=50
        $(".general-idea-entry").append(
            "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        );
        // $('.treatment-tutorial-background').zIndex("auto");
        $("#treatment-tutorial-ideaEntryTry").append(
          "<div id='treatment-tutorial-highlight-ideaEntryTry' class='treatment-tutorial-highlight-container'><div class='treatment-tutorial-highlight'></div></div>"
        );
        logger.trace("IDEA ENTRY TRY");
        EventLogger.logTutorialStepRewind(6,tutorialLengthTreatment);
    },
    
    //Inspire Me 
    'click .treatment-tutorial-inspireMe-gotit': function() {
        $("#treatment-tutorial-inspireMe").removeClass("visible-tutorial-treatment");
        // $("#treatment-tutorial-inspireMeTry").addClass("visible-tutorial-treatment");
        $("#treatment-tutorial-inspirationCardTry").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-inspireMeTry").removeClass("treatment-tutorial-background");
        $(".get-task").removeClass("get-task-disabled");
        if ($(".ideate-task").length == 0) {
          logger.debug("Found no tasks yet, getting a task");
          $(".get-task").click();
        } else {
          logger.debug("Task has already been pulled");
        }
        $(".ideate-task").css({
            border: "10px solid #F5A623",
            "z-index": 60
        });
        $(".get-task").css({
            border: "none",
            "z-index": 20 
        });
        document.getElementById("treatment-tutorial-inspirationCardTry-gotit").disabled = true;
        // var height = $(window).height() - 50; //Navbar height=50
        // $(".task-list-header").append(
            // "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        // );
        //$(".task-list-header .tutorial-backdrop").remove();
        EventLogger.logTutorialStepComplete(7,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-inspireMe-goback': function() {
        $("#treatment-tutorial-inspireMe").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-ideaEntryTry").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-ideaEntryTry").removeClass("treatment-tutorial-background");
        $(".get-task").css({
            border: "none",
            "z-index": 20
        });
        $(".general-idea-entry .tutorial-backdrop").remove();
        //$(".task-list-header").append(
            //"<div class='tutorial-backdrop'></div>"
        //);
        EventLogger.logTutorialStepRewind(7,tutorialLengthTreatment);
    },
    
    //Inspiration Card Try
    'click #treatment-tutorial-inspirationCardTry-gotit': function() {
        logger.trace("Inspiration card try*****************");
        $("#treatment-tutorial-inspirationCardTry").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-inspirationCardMany").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-ideaEntryTry").addClass("treatment-tutorial-background");
//      // Move backdrop to same hierachical level as the task-list-pane
        $(".task-list-header .tutorial-backdrop").remove();
        //$(".task-lists").append(
            //"<div class='tutorial-backdrop'></div>"
        //);
        //$(".task-list-pane").css({
            //border: "10px solid #F5A623", 
            //height: "auto",
            //"z-index": 60
        //});
        // $(".get-task").click();
        // $(".get-task").click();
        $(".ideate-task").css({
            border: "none",
            "z-index": 20 
        });
        EventLogger.logTutorialStepComplete(8,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-inspirationCardTry-goback': function() {
        $("#treatment-tutorial-inspirationCardTry").removeClass("visible-tutorial-treatment");
        // $("#treatment-tutorial-inspirationCard").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-ideaEntryTry").addClass("treatment-tutorial-background");
        $(".ideate-task").css({
            border: "none",
            "z-index": 20
        });
        // $(".task-list-header .tutorial-backdrop").remove();
        $("#treatment-tutorial-inspireMe").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-inspireMe").addClass("treatment-tutorial-background");
        $(".get-task").addClass("get-task-disabled");
        $(".get-task").css({
            border: "10px solid #F5A623",
            "z-index": 60
        });
        if ($(".ideate-task").length > 0) {
          logger.debug("Removing existing pulled tasks");
          var tasks = DummyTasks.find({'authorID': Session.get("currentUser")._id,
              'promptID': Session.get("currentPrompt")._id})
          tasks.forEach(function(task) {
            logger.debug("removing task with id: " + task._id);
            DummyTasks.remove({'_id': task._id});
          });
        }
        EventLogger.logTutorialStepRewind(8,tutorialLengthTreatment);
    },
    
    //Inspiration Card Many 
    'click .treatment-tutorial-inspirationCardMany-gotit': function() {
        $("#treatment-tutorial-inspirationCardMany").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-directions").addClass("visible-tutorial-treatment");
//        $("#treatment-tutorial-pleaseWait").removeClass("treatment-tutorial-background");
        // $(".task-list-pane").css({
            // border: "none",
            // "z-index": 20
        // });
        $(".get-task").zIndex(20);
        var height = $(window).height() - 50; //Navbar height=50
        $(".task-list-header").append(
            "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        );
        //$(".general-idea-entry .tutorial-backdrop").remove();
        //$("#directions-container-treatment").css({
            //position: "relative",
            //background: "#F5F5F5",
            //"z-index": 60
        //});
        $(".ideator-directions-treatment").css({
            border: "10px solid #F5A623",
            background: "#FFF",
            position: "relative",
            "z-index": 60
        });
        $(".hcomp-ideation-pane").zIndex(10);
        $("#directions-content").removeClass("collapse");
        $("#directions-content").addClass("collapse in");
        EventLogger.logTutorialStepComplete(9,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-inspirationCardMany-goback': function() {
        $("#treatment-tutorial-inspirationCardMany").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-inspirationCardTry").addClass("visible-tutorial-treatment");
        var height = $(window).height() - 50; //Navbar height=50
        $(".task-list-header").append(
            "<div class='tutorial-backdrop' style='height: " + height + "px;'></div>"
        );
        $(".ideate-task").css({
            border: "10px solid #F5A623",
            "z-index": 60
        });
        EventLogger.logTutorialStepRewind(9,tutorialLengthTreatment);
    },
    
    //Directions
    'click .treatment-tutorial-directions-gotit': function() {
        $("#treatment-tutorial-directions").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-pleaseWait").addClass("visible-tutorial-treatment");
        $("#treatment-tutorial-pleaseWait").removeClass("treatment-tutorial-background");
        //$("#directions-container-treatment").css({
            //border: "none",
            //"z-index": 20
        //});
        $(".ideator-directions-treatment").css({
            border: "none",
            background: "#F5F5F5",
            position: "relative",
            "z-index": 20
        });
        // Mark the Participant as ready to begin
        // ExperimentManager.logParticipantReady(Session.get("currentParticipant"));  
        EventLogger.logTutorialStepComplete(10,tutorialLengthTreatment);
        EventLogger.logTutorialComplete();
    },
    'click .treatment-tutorial-directions-goback': function() {
        $("#treatment-tutorial-directions").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-inspirationCardMany").addClass("visible-tutorial-treatment");
        $(".ideator-directions-treatment").css({
            border: "none",
            background: "#F5F5F5",
            position: "relative",
            "z-index": 20
        });
        //$(".task-list-pane").css({border: "10px solid #F5A623", height: "auto"});
        //$(".general-idea-entry").append(
            //"<div class='tutorial-backdrop'></div>"
        //);
        $(".task-list-header .tutorial-backdrop").remove();
        EventLogger.logTutorialStepRewind(10,tutorialLengthTreatment);
    },
    //Please Wait
    'click .treatment-tutorial-pleaseWait-gotit': function() {
        $(".tutorial-backdrop").remove();
        $("#treatment-tutorial-pleaseWait").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-pleaseWait").addClass("treatment-tutorial-background");
        transitionToIdeation();
        EventLogger.logTutorialStepComplete(11,tutorialLengthTreatment);
    },
    'click .treatment-tutorial-pleaseWait-goback': function() {
        $("#treatment-tutorial-pleaseWait").removeClass("visible-tutorial-treatment");
        $("#treatment-tutorial-directions").addClass("visible-tutorial-treatment");
        $("#treatment-tutorial-pleaseWait").addClass("treatment-tutorial-background");
        $(".ideator-directions-treatment").css({
            border: "10px solid #F5A623",
            background: "#FFF",
            position: "relative",
            "z-index": 60
        });
        EventLogger.logTutorialStepRewind(11,tutorialLengthTreatment);
    },
});