Template.activity1.onCreated(function(){
    Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
});