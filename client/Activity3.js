var mouseOverInTime;
var currentDivClicked;
Session.set("idNumber", 0);

Template.activity3.rendered = function(){
    $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
};

Template.activity3.helpers({
    idea: function(){
        return listOfIdeas.find();   
    },
    incrementID: function(){
        Session.set("idNumber", Session.get("idNumber") + 1);   
    }
});

Template.idea_item3.events({
//    'click div': function(e){
//        var text = e.target.firstChild.nodeValue;
//        var old = null;
//        if(old = listOfIdeas.find({'clicked': true}).fetch()[0]){
//        }
//        else{
//            old = listOfIdeas.find().fetch()[0];  
//        }
//        var newClick = listOfIdeas.find({'content': text}).fetch()[0];
//        listOfIdeas.update({_id: old._id}, {
//            $set: {clicked: false}
//        });
//        
//        listOfIdeas.update({_id: newClick._id}, {
//            $set: {clicked: true}
//        });
//        
//        if(!currentDivClicked){
//            currentDivClicked = e.target.parentElement;   
//        }
//        else{
//            currentDivClicked.style="background-color: white";   
//        }
//        e.target.parentElement.style="background-color: lightblue";
//        currentDivClicked = e.target.parentElement;
//        
//        EventLogger.logIdeaClick(listOfIdeas.findOne({"clicked": true}).openIDEOid);
//    },
    'click .readMore': function(e){
        var text = e.target.parentElement.children[0].innerHTML;
        var idea = listOfIdeas.find({content: text}).fetch()[0];
//        var old = null;
//        if(!(old = listOfIdeas.find({'clicked':true}).fetch()[0])){
//            old = listOfIdeas.find().fetch()[0]
//        }
//        listOfIdeas.update({_id: idea._id}, {
//            $set:{clicked: true} 
//        });
        Session.set("currentUser", user(Router.current().params.userID));
        EventLogger.logMoreInfoClick(idea.openIDEOid);
        
        Router.go("details", {userID: Router.current().params.userID, _id: idea._id});
    },
    'mouseover .glyphicon[data-toggle="tooltip"]': function(e){
        mouseOverInTime = new Date().getTime();
    },
    'mouseout .glyphicon[data-toggle="tooltip"]': function(e){
        var outTime = new Date().getTime();
        
        var hoverTime = (outTime - mouseOverInTime)/1000;
        
        if(hoverTime > 0.5){
            var id = e.target.id;
            Session.set("currentUser", user(Router.current().params.userID));
            EventLogger.logMoreInfoClick(id);
        }
       
    }
});


/*$('.hoverable').hover(   
    function(){       
        $(this).data('inTime', new Date().getTime());
    },    
    function(){       
        var outTime = new Date().getTime();       
        var hoverTime = (outTime - $(this).data('inTime'))/1000;        
        $('#hoverResult').html('you were hovering for ' + hoverTime + 's');
    }
);*/


Template.commentList.helpers({
    comment: function(){
        idea = listOfIdeas.findOne({_id: Router.current().params._id}).openIDEOid;
        //alert(idea);
        return Comments.find({"ideaID": idea});
    },
    id: function(){
        return Session.get("idNumber");
    }
});

Template.details.helpers({
    id: function(){
        return Router.current().params._id;   
    }
});

Template.details.events({
    'click #comm': function(e){
        var idea = listOfIdeas.findOne({_id: Router.current().params._id}).openIDEOid;
        EventLogger.logCommentClick(idea);
    },
    'click #MoreInfo': function(e){
        var idea = listOfIdeas.findOne({_id: Router.current().params._id}).openIDEOid;
        EventLogger.logMoreInfoClick(idea);
        document.getElementById('info').scrollTop = 0;
    },
    'click .zoomOut': function(e){
           Router.go("activity3", {userID: Router.current().params.userID});
    }
});
    
Template.moreInfo.helpers({
    moreInfo: function(){
        return listOfIdeas.findOne({_id: Router.current().params._id}).moreInfo;   
    },
    comment: function(){
        idea = listOfIdeas.findOne({_id: Router.current().params._id}).openIDEOid;
        //alert(idea);
        return Comments.find({"ideaID": idea});
    },
    isV3: function(){
        return isV3(user(Router.current().params.userID));
    },
    isV2: function(){
        return isV2(user(Router.current().params.userID));
    },
    id: function(){
        return listOfIdeas.findOne({"clicked": true}).openIDEOid;
    }
});