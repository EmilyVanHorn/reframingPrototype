var practiceFinished = false;

Template.instructionPage.events({
    'click #continue': function(){
        if(!practiceFinished){
            document.getElementById("contain").className = "";  
            practiceFinished = true;
        }
        else{
            var date = new Date()
            UserInput.insert({
                type: "text",
                from: "practice",
                content: document.getElementById("practiceFrames").value,
                authorID: Router.current().params.userID,
                time: date.valueOf(),
                readableTime: date.toString()
            });
            MyUsers.update(Router.current().params.userID, {$set: {state: "3."+chooseVersion()}});
            redirect(MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state);
        }
        
    },
    'click #quit': function(){
        EventLogger.logExitStudy();
        MyUsers.update(Router.current().params.userID, {$set: {state: "9"}});
        redirect("9"); 
    }
});

function chooseVersion(){
    var rand = Math.floor((Math.random() * 3) + 1);
    return "Version" + rand;
}