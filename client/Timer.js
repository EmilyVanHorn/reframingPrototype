Template.timer.created = function(){
    Meteor.subscribe("timerVar");
};

Template.timer.helpers({
    getTime: function(){
       // var currentTime = Session.get("time");
        var currentTime = TempData.find({varName: "timer"}).fetch()[0].currentTime;
        
        var min = Math.floor(currentTime/60);
        var sec = currentTime - (min*60);
        
        if(min < 10){
            min = "0"+min;   
        }
        if(sec < 10){
            sec = "0"+sec;   
        }
        
        return min + ":" + sec;
    }
});