

Template.Version3.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version3.events({
    'click #continue': function(e){
        Router.go("activity3");   
    },
    'click #quit': function(e){
        Router.go("NoParticipation");   
    }
});