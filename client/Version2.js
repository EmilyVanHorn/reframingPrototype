//window.scrollTo(0, 0);



Template.Version2.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version2.helpers({
    first: function(){
        return (!Session.get("ActivityStarted"));   
    }
});

Template.Version2.events({
    'click #continue': function(e){
        if(Session.get("ActivityStarted") == false){
            EventLogger.logEnterActivity("version2");
        }
        else{
            EventLogger.logReEnterActivity("version2");   
        }
        Session.set("ActivityStarted", true);
        Router.go("activity2");   
    },
    'click #quit': function(e){
        EventLogger.logExitStudy(Router.current().route.path());
        Router.go("NoParticipation");   
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        EventLogger.logEnterProblemBrief("version2");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
    }
});

