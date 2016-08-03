Meteor.publish("ideas", function(){
    return listOfIdeas.find();
});

Meteor.publish("AllUsers", function(){
    return MyUsers.find();
});

Meteor.publish("users", function(currentUserID){
    return MyUsers.find({_id: currentUserID});
});

Meteor.publish("userInput", function(currentUserID){
    return UserInput.find({authorID: currentUserID});
});

Meteor.publish("timerVar", function(currentUserID){
    return TempData.find({varName: "timer", userID: currentUserID});
});