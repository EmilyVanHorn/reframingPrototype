var metaIndex = 0;
var meta=[
    {
        active: 10,
        total: 100,
        prob: 15
    },
    {
        active: 38,
        total: 100,
        prob: 80
    },
    {
        active: 62,
        total: 100,
        prob: 20
    },
    ];


Template.ideasList.onCreated(function() {
    Meteor.subscribe('ideasPublication');
});
Template.ideasList2.onCreated(function() {
  Meteor.subscribe('ideasPublication');
});

Template.ideasList.helpers({
    idea: Ideas.find()
    //idea: ideaData
});

Template.ideasList2.helpers({
    //idea: Ideas.find()
    idea: Ideas.find()
});

Template.instText.events({
    'click a': function(){
        if(Meteor.userId()){
            Router.go("/home");    
        }
        else{
            alert("Please sign in before starting the brainstorm");   
        }
    }
});

Template.themesList.onCreated(function() {
  Meteor.subscribe('themesPublication');
});

Template.themesList.helpers({
    theme: Themes.find(),
    moreInfo: function(){ 
        return Ideas.findOne({"clicked": true}).content;
    }
});

Template.theme_item.helpers({
    
});

Template.idea_item.events({
    'click div': function(e){
        var text = e.target.firstChild.nodeValue;
        var old;
        if(old = Ideas.find({'clicked': true}).fetch()[0]){
        }
        else{
            old = Ideas.find().fetch()[0];   
        }
        var newClick = Ideas.find({'content': text}).fetch()[0];
        Ideas.update({_id: old._id}, {
            $set: {clicked: false}
        });
        
        Ideas.update({_id: newClick._id}, {
            $set: {clicked: true}
        });
    }
});

Template.input.events({
    'submit': function(e){
        e.preventDefault();
        value = e.target.firstElementChild.value;
        e.target.firstElementChild.value = "";

        Themes.insert({
            content: value,
            active: meta[metaIndex].active,
            total: meta[metaIndex].total,
            prob: meta[metaIndex].prob,
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
        
        if (metaIndex == (meta.length - 1)){
            metaIndex = 0;       
        }
        else{
            metaIndex++;   
        } 
    }
});

Template.InspireMe.events({
    'click #continue': function(e){
        //go to the "next" page as determined by a switch statement?
        Router.go("/home");   
    }
});

