


Template.Version2.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
};

Template.Version2.events({
    'click #continue': function(e){
        Router.go("activity2");   
    }
});