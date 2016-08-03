
Template.survey.events({
    'click #continue': function(e){
        e.preventDefault();
        
        for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
            
            var q = document.getElementById('q'+i).innerHTML;
            var a = document.getElementById('a'+i).value;
            SurveyResponse.insert({
                question: q,
                answer: a,
                authorID: user(Router.current().params.userID)._id,
            });
        }//for
        
         MyUsers.update(Router.current().params.userID, {$set: {state: "8"}});
         redirect(user(Router.current().params.userID).state);
    },//click
    'click #Back2Work': function(){
        version = MyUsers.find({_id: Router.current().params.userID}).fetch()[0].state.substring(9);
        window.open(Router.url("activity3", {userID: Router.current().params.userID}), "_blank");
        //Router.go("activity" + version, {userID: Router.current().params.userID});
    }
});//template

Template.survey.helpers({
    getResponse: function(id){
        if(TempData.find({authorID: Router.current().params.userID}).count() == 0){
            return "";   
        }
        else{
            var qest = document.getElementById("q"+id);
            return TempData.find({authorID: Router.current().params.userID, q: qest.innerHTML}, {sort: {time: -1}})  
        }
    }
});

function saveTempData(){
    var date = new Date().getTime();
     for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
        var q = document.getElementById('q'+i).innerHTML;
        var a = document.getElementById('a'+i).value;
        TempData.insert({
            question: q,
            answer: a,
            authorID: user(Router.current().params.userID)._id,
            time: date,
        });
    }
}