Template.Version1.created = function(){
    setTimeout(function() {
        window.scrollTo(0, 0);
    },1);
    
    
};

Template.Version1.events({
    'click #continue': function(e){
        Router.go("activity1");   
    }
});