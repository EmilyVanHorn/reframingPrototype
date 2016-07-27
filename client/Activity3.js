Session.set("idNumber", 0);

Template.activity3.helpers({
    idea: function(){
        return listOfIdeas.find();   
    },
    incrementID: function(){
        Session.set("idNumber", Session.get("idNumber") + 1);   
    }
});

Template.idea_item3.helpers({
    id: function(){
        return Session.get("idNumber");
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
