Template.consent.events({
    'click #continue': function(e){
        checkPermissions(Session.get("currentUser").name);
    },
    'click #quit': function(e){
        Router.go("NoParticipation");   
    }
});

function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    return "Version" + rand;
}

function checkPermissions(userName){
    if(MyUsers.find({name: userName, finished: true}).count() == 0){
        Router.go(chooseVersion());
    }
    else{
        alert("This username has already been used. If you've completed this exercise before, thank you, but you may not complete it again. Please click 'Quit' to exit. If you haven't, please try another username.");
        Router.go("signin");
    }
}


