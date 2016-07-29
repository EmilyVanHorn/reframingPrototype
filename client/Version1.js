//window.scrollTo(0,0);


Template.Version1.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));
});

Template.Version1.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");  
    }
});

Template.Version1.events({
    'click #continue': function(e){
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < 4){
            //EventLogger.logEnterActivity("version1");
        }
        else{
            EventLogger.logReEnterActivity("version1");   
        }
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "4"){
            MyUsers.update(Router.current().params.userID, {state: "5."+ newState});
        }
        redirect(user(Router.current().params.userID).state);
        
    },
    'click #quit': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");  
    },
    'click #agree': function(e){
        var backdrop = document.getElementById("backdrop");
        var inst = document.getElementById("instructions");
        
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logEnterProblemBrief("version1");
        
        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);
        
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set: {state: "4."+ newState}});
        }
    },
    'click .alert': function(e){
        EventLogger.logExernalLinkClick(e.target.href);
    }
});