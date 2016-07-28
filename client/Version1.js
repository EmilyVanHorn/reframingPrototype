//window.scrollTo(0,0);


Template.Version1.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version1.helpers({
    first: function(){
        return (!Session.get("ActivityStarted"));   
    }
});

Template.Version1.events({
    'click #continue': function(e){
        if(Session.get("ActivityStarted") == false){
            //EventLogger.logEnterActivity("version1");
        }
        else{
            EventLogger.logReEnterActivity("version1");   
        }
        //Session.set("ActivityStarted", true);
        Router.go("activity1");   
    },
    'click #quit': function(e){
        EventLogger.logExitStudy(Router.current().route.path());
        Router.go("NoParticipation");   
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        EventLogger.logEnterProblemBrief("version1");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
    }
});