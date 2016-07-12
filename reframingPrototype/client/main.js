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

var version;

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

Template.themesList3.onCreated(function(){
    Meteor.subscribe('commentsPublication');
});

Template.themesList.helpers({
    theme: Themes.find(),
    moreInfo: function(){ 
        return Ideas.findOne({"clicked": true}).moreInfo;
    }
});

Template.themesList3.helpers({
    theme: Themes.find(),
    moreInfo: function(){ 
        return Ideas.findOne({"clicked": true}).moreInfo;
    },
    comment: function(){
        idea = Ideas.findOne({"clicked": true}).openIDEOid;
        //alert(idea);
        return Comments.find({"ideaID": idea});
    }
});

Template.theme_item.helpers({
    
});



Template.idea_item.events({
    'click div': function(e){
        var text = e.target.firstChild.nodeValue;
        var old = null;
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

Template.idea_item2.events({
    'click div': function(e){
        var text = e.target.firstChild.nodeValue;
        var old = null;
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

Template.NextPhase.events({
    'click #continue': function(e){
        //go to the "next" page as determined by a switch statement?
        var path = Router.current().route.path();
        
        switch(path){
            case "/":
                Router.go("/login");
                break;
            case '/Login':
                /*if(Meteor.userId()){
                    switch(version){
                        case 1:
                            Router.go('/version1');
                            break;
                        case 2:
                            Router.go('/version2');
                            break;
                        case 3:
                            Router.go('/version2');
                            break;
                    }   
                }
                else{
                    alert("Please sign in before starting the brainstorm");   
                }*/
                switch(version){
                    case 1:
                        Router.go('/version1');
                        break;
                    case 2:
                        Router.go('/version2');
                        break;
                    case 3:
                        Router.go('/version2');
                        break;
                }   
                break;
            default:
                switch(version){
                    case 2:
                        Router.go('homeNoMeta');
                        break;
                    case 3:
                        Router.go('home');
                        break;
                }
        }  
    },
    'click #quit': function(e){
        Router.go("/thankyou");   
    }
});

Template.setup.events({
    'mouseover #1, mouseover #2, mouseover #3': function(e){
        e.target.style=
            "background-color: black;" +
            "color: white;" +
            "font-size: 20px;"
            
    },
    'mouseout #1, mouseout #2, mouseout #3': function(e){
        e.target.style=
            "background-color: white;" +
            "color: black;" +
            "font-size: 14px;"
    },
    'click #1': function(e){
        version = 1;
        
    },
    'click #2': function(e){
        //Router.go('/version2/home');
        version = 2;
    },
    'click #3': function(e){
        //Router.go('/version3/home');
        version = 3;
    }
});

Template.done.events({
    'click #done':function(e){
        Router.go("/thankyou");   
    }
});

