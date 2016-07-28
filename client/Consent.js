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
    'click #continue': function(e){
        checkPermissions(Session.get("currentUser").name);
    },
    'click #quit': function(e){
        EventLogger.logExitStudy();
        Router.go("NoParticipation");   
    }
});

function checkPermissions(userName){
    if(MyUsers.find({name: userName, finished: true}).count() == 0){
        EventLogger.logConsent();
        Router.go("Instructions");
    }
    else{
        alert("This username has already been used. If you've completed this exercise before, thank you, but you may not complete it again. Please click 'Quit' to exit. If you haven't, please try another username.");
        EventLogger.logDenyParticipation();
        Router.go("signin");
    }
}


