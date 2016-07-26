Template.ideaPad.rendered = function(){
    tinymce.init({
        selector: '#itext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
   });
};

Template.framePad.rendered = function(){
    tinymce.init({
        selector: '#ftext',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: "400px",
    });
};

Template.layout2.created = function(){
    intervals(10);//10second interval --do it on the start button
};

Template.layout2.events({
    'click #done': function(e){
        Router.go("thankyou");   
    },
    'click #quit': function(e){
        Router.go("NoParticipation");
    },
    'click .back': function(e){
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
            return Meteor.clearInterval(interval);   
        }
        
        if(Session.get("time") % 5 == 0){
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



















