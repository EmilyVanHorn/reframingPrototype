var practiceFinished = false;
Session.set('msg', "When you are ready, click \"Continue\" to try out a practice problem.");

// TODO: log start and end of tutorial

Template.instructionPage.events({
    'click #continue': function(){
        if(!practiceFinished){
            document.getElementById("contain").className = "";
            practiceFinished = true;
            Session.set("msg", "When you are ready, click \"Continue\" to go to the next page, where you'll learn about the design problem you will be solving.");

        }
        else{
            MyUsers.update(Router.current().params.userID, {$set: {state: "3."+chooseVersion()}});
            redirect(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state);
        }

    },
    'click #quit': function(){
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9");
    },
    'click #Submit':function(){
        var date = new Date()
            UserInput.insert({
                type: "text",
                from: "practice",
                content: document.getElementById("practiceFrames").value,
                authorID: Router.current().params.userID,
                time: date.valueOf(),
                readableTime: date.toString()
            });
    },
});


Template.instructionPage.helpers({
    msg: function(){
        return Session.get("msg");
    }
});
function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    MyUsers.update(Router.current().params.userID, {$set: {condition: rand}});
    return "Version" + rand;
}
