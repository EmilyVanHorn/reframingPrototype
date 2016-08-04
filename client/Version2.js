//window.scrollTo(0, 0);



Template.Version2.created = function(){
    Session.set("currentUser", user(Router.current().params.userID));
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version2.rendered = function(){
    Session.set("currentUser", user(Router.current().params.userID));
};

Template.Version2.helpers({
    first: function(){
        var state = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state;
        return (state < "4");
    }
});

Template.Version2.events({
    'click #continue': function(e){
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state < "5"){
            //EventLogger.logEnterActivity("version1");
        }
        else{
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logReEnterActivity("version2");
        }
        var newState = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(2);
        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "4"){
            MyUsers.update(Router.current().params.userID, {$set: {state: "5."+ newState}});
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
        EventLogger.logEnterProblemBrief("version2");

        backdrop.parentElement.removeChild(backdrop);
        inst.parentElement.removeChild(inst);

        if(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(0, 1) == "3"){
            var newState = user(Router.current().params.userID).state.substring(2);
            MyUsers.update(Router.current().params.userID, {$set :{state: "4."+ newState}});
        }
    },
    'click .alert': function(e){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExernalLinkClick(e.target.href);
    }
});

Template.moreStuff.events({
  'click #show-hide-partners': function() {
    EventLogger.logSeeMoreProblemInfo();
  },
  'click .partner-header': function(e, target) {
    var which = e.currentTarget.id;
    EventLogger.logSeeChallengePartner(which);
  },
});
