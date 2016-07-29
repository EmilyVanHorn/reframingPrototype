Template.survey.events({
    'click #continue': function(e){
        e.preventDefault();
        
        for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
            var q = document.getElementById('q'+i).innerHTML;
            var a = document.getElementById('a'+i).value;
            SurveyResponse.insert({
                question: q,
                answer: a,
                authorID: Session.get("currentUser")._id,
            });
        }//for
        
        Router.go("thankyou");
    }//click
});//template