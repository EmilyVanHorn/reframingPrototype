/*var clock = 10;

var timeLeft = function() {
    if (clock > 0) {
        clock--;
        Session.set("time", clock);
        return console.log(clock);
    }
    else {
        console.log("That's All Folks");
        return Meteor.clearInterval(interval);
    }
};

var interval = Meteor.setInterval(timeLeft, 1000);

if(Meteor.isClient) {
    Template.registerHelper("time", function() {
    return Session.get("time");
    });
}*/


Template.timer.helpers({
    getTime: function(){
       /* if(MyUsers.find().fetch()[0].state < "6"){
            Session.set("time", 0);
        }
        else{
            Session.set("time", TempData.find({varName: "timer"}).fetch()[0].currentTime);
        }
        */
        
        var currentTime = Session.get("time");
        //var currentTime = TempData.find({varName: "timer"}).fetch()[0].currentTime;
        
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