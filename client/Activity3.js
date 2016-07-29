var currentDivClicked;
Session.set("idNumber", 0);

Template.activity3.onCreated(function(){
    Session.set("currentUser", MyUsers.findOne({_id: Router.current().params.userID}));
});

Template.activity3.helpers({
    idea: function(){
        return listOfIdeas.find();   
    },
    incrementID: function(){
        Session.set("idNumber", Session.get("idNumber") + 1);   
    }
});

Template.idea_item3.events({
    'click div': function(e){
        var text = e.target.firstChild.nodeValue;
        var old = null;
        if(old = listOfIdeas.find({'clicked': true}).fetch()[0]){
        }
        else{
            old = listOfIdeas.find().fetch()[0];  
        }
        var newClick = listOfIdeas.find({'content': text}).fetch()[0];
        listOfIdeas.update({_id: old._id}, {
            $set: {clicked: false}
        });
        
        listOfIdeas.update({_id: newClick._id}, {
            $set: {clicked: true}
        });
        
        if(!currentDivClicked){
            currentDivClicked = e.target.parentElement;   
        }
        else{
            currentDivClicked.style="background-color: white";   
        }
        e.target.parentElement.style="background-color: lightblue";
        currentDivClicked = e.target.parentElement;
        
        EventLogger.logIdeaClick(listOfIdeas.findOne({"clicked": true}).openIDEOid);
    }
});

Template.commentList.helpers({
    comment: function(){
        idea = listOfIdeas.findOne({"clicked": true}).openIDEOid;
        //alert(idea);
        return Comments.find({"ideaID": idea});
    },
    id: function(){
        return Session.get("idNumber");
    }
});
