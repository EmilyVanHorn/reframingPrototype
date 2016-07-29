Template.Version3.onCreated = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
    
    Session.set("currentUser", user(Router.current().params.userID));
};

Template.Version3.helpers({
    first: function(){
        
        return (user(Router.current().params.userID).state < 4);   
    }
});

Template.Version3.events({
    'click #continue': function(e){
        if(user(Router.current().params.userID) < 4){
            //EventLogger.logEnterActivity("version3");
        }
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logReEnterActivity("version3");   
        }
        //Session.set("ActivityStarted", true);
        var newState = "5" + user(Router.current().params.userID).state.substring(1);
        MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: newState}});
        Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
        redirect(user(Router.current().params.userID).state);  
    },
    'click #quit': function(e){
        if(confirm("Are you sure you want to quit?")){
            EventLogger.logExitStudy(Router.current().route.path());
            Router.go("NoParticipation", {userID: Router.current().params.userID});  
        }
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        var newState = "4" + user(Router.current().params.userID).state.substring(1);
        MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: newState}});
        Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
        
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version3");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
    },
    'click .alert': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExternalLinkClick(e.target.href);
    }
});