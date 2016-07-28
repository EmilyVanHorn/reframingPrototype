var currentDivClicked;

Template.activity2.helpers({
    idea: function(){
        return listOfIdeas.find();   
    }
});

Template.idea_item2.events({
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