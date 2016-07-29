Template.instructionPage.onCreated(function(){
    Session.set("currentUser", user(Router.current().params.userID));

});

Template.instructionPage.events({
    'click #continue': function(){
        var version = chooseVersion();
        MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: "3." + version}});
        Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
        console.log(user(Router.current().params.userID).state);
        redirect(user(Router.current().params.userID).state);
    },
    'click #quit': function(){
        if(confirm("Are you sure you want to quit?")){
            MyUsers.update(user(Router.current().params.userID)._id, {$set: {state: 9}});
            console.log(user(Router.current().params.userID).state);
            redirect(user(Router.current().params.userID).state);
        }
        else{
            
        } 
    }
});

function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    return "Version" + rand;
}