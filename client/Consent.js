// Configure logger for ExperimentManager
var logger = new Logger('Client:Hcomp:Consent');
// Comment out to use global logging level
Logger.setLevel('Client:Hcomp:Consent', 'trace');
//Logger.setLevel('Managers:Experiment', 'debug');
// Logger.setLevel('Managers:Experiment', 'info');
//Logger.setLevel('Managers:Experiment', 'warn');
//Template.TextPage.helper({
//});

//Template.consent.rendered = function(){
//    Session.set("currentUser", user(Router.current().params.userID));
//};

Template.consent.events({
    'click #continue': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logConsent();
        MyUsers.update(Router.current().params.userID, {$set: {state: "2"}});
        redirect("2");
    },
    'click #quit': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");  
    }
});

