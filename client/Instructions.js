Template.instructionPage.events({
    'click #continue': function(){
        Router.go(chooseVersion());
    },
    'click #quit': function(){
        EventLogger.logExitStudy(Router.current().route.path());
        Router.go("NoParticipation");
    }
});

function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    return "Version" + rand;
}