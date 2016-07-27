Session.set("ideasMostRecent", "IDEAS");
Session.set("framesMostRecent", "FRAMES");

Template.ideaPad.rendered = function(){
    tinymce.init({
        selector: '#itext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
   });
        tinymce.get("itext").setContent(Session.get("ideasMostRecent"));
};

Template.framePad.rendered = function(){
    tinymce.init({
        selector: '#ftext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
    });
        tinymce.get('ftext').setContent(Session.get("framesMostRecent"));
};

Template.layout2.created = function(){
    if(Session.get("started") == "notStarted"){
        if(Session.get("ideasMostRecent") && tinyMCE.get("itext")){
            Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));  
        }
        if(Session.get("framesMostREcent") && tinyMCE.get("itext")){
            Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));    
        }
        //intervals(900);//10second interval --do it on the start button
        intervals(10);
    }
    else if(Session.get("started") == "Done"){
        Router.go("thankyou"); 
    }
    else if(Session.get("started") == "Quit"){
        Router.go("NoParticipation");   
    }
    
    Session.set("started", "started");
};

Template.layout2.events({
    'click #done': function(e){
        Session.set("started", "Done");
        saveData();
        MyUsers.update(Session.get("currentUser")._id, {
            $set: {finished: true}
        });
        Router.go("thankyou");   
    },
    'click #quit': function(e){
        saveData();
        Session.set("started", "Quit");
        Router.go("NoParticipation");
    },
    'click .back': function(e){
        saveData();
        Session.set("ideasMostRecent", tinyMCE.get("itext").getContent({format: 'raw'}));
        Session.set("framesMostRecent", tinyMCE.get("ftext").getContent({format: 'raw'}));  
        
        tinymce.get('itext').remove();
        tinymce.get('ftext').remove();
        history.back();   
    }
});

function intervals(clock){
    var timeLeft = function(){
        if(clock > 0){
            clock--;
            Session.set("time", clock);
        }//if
        else{
            alert("Time's Up! Finish up any last thoughts and then click 'Done' at the bottom.");
            return Meteor.clearInterval(interval);  
        }
        
        if(tinyMCE.get('itext') &&
           tinyMCE.get('ftext') &&
           Session.get('time') % 30 == 0){
            saveData();   
        }
    };//timeLeft
    
    var interval = Meteor.setInterval(timeLeft, 1000);
}//intervals

function saveData(){
    var id = this._id;
    var date = new Date();
    UserInput.insert({
        ID: id,
        type: "text",
        content: tinyMCE.get("itext").getContent({format : 'text'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("itext").getContent({format : 'raw'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "text",
        content: tinyMCE.get("ftext").getContent({format : 'text'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
    UserInput.insert({
        ID: id,
        type: "raw",
        content: tinyMCE.get("ftext").getContent({format : 'raw'}),
        authorID: Session.get("currentUser")._id,
        authorName: Session.get("currentUser").name,
        time: date.valueOf(),
        readableTime: date.toString()
    });
}



















