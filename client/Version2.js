//window.scrollTo(0, 0);



Template.Version2.created = function(){
    Session.set("currentUser", user(Router.current().params.userID));
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version2.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");
    }
});

Template.Version2.events({
    'click #continue': function(e){
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < "4"){
            //EventLogger.logEnterActivity("version1");
        }
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logReEnterActivity("version2");   
        }
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(!MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 2) == "4"){
            MyUsers.update(Router.current().params.userID, {state: "5."+ newState});
        }
        redirect(user(Router.current().params.userID).state);
    },
    'click #quit': function(e){
        EventLogger.logExitStudy(Router.current().route.path());
        Router.go("NoParticipation");   
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version2");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
        
        if(!MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 2) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {state: "4."+ newState});
        }
    },
    'click .alert': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExernalLinkClick(e.target.href);
    }
});