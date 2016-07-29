user = function(userid){
    return MyUsers.find({_id: userid}).fetch()[0];
};

Template.consent.created = function(){
    
    
};

Template.consent.events({
    'click #continue': function(e){
        //console.log(user(Router.current().params.userID));
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logConsent();
        MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: "2"}});
        console.log(user(Router.current().params.userID).state);
        redirect(user(Router.current().params.userID).state);
    },
    'click #quit': function(e){
        if(confirm("Are you sure you want to quit?")){
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logExitStudy(Router.current().route.path());
            MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: 9}});
            console.log(user(Router.current().params.userID).state);
            redirect(user(Router.current().params.userID).state);  
        }
        else{
            
        } 
    }
});