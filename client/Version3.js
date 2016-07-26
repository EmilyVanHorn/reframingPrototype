Template.Version3.events({
    'click #continue': function(e){
        Router.go("activity3");   
    },
    'click #quit': function(e){
        Router.go("NoParticipation");   
    }
});