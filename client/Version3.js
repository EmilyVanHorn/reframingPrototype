//window.scrollTo(0,0);


Template.Version3.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version3.helpers({
    first: function(){
        
        return (!Session.get("ActivityStarted"));   
    }
});

Template.Version3.events({
    'click #continue': function(e){
        if(Session.get("ActivityStarted") == false){
            //EventLogger.logEnterActivity("version3");
        }
        else{
            EventLogger.logReEnterActivity("version3");   
        }
        //Session.set("ActivityStarted", true);
        Router.go("activity3");   
    },
    'click #quit': function(e){
        EventLogger.logExitStudy(Router.current().route.path());
        Router.go("NoParticipation");   
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        EventLogger.logEnterProblemBrief("version3");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
    }
});