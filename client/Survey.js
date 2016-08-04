
Template.survey.events({
    'click #continue': function(e){
        e.preventDefault();

        // grab all text input
        $('.q-text').each(function(index) {
          var q = this.id;
          var a = this.value;
          saveSurveyResponse(q, a);
        })

        // radio button items - just do each for now, no time for elegance!
        saveSurveyResponse("gender", $("input[name='gender']:checked").val());
        saveSurveyResponse("english-first", $("input[name='lang1']:checked").val());
        saveSurveyResponse("design-projects", $("input[name='design-projects']:checked").val());
        saveSurveyResponse("design-employ", $("input[name='design-employ']:checked").val());
        saveSurveyResponse("design-course", $("input[name='design-course']:checked").val());

        // selects
        saveSurveyResponse("age", $("input[name='age']").val());

        // for(var i = 1; i < document.getElementsByClassName('q').length + 1; i++){
        //
        //     var q = document.getElementById('q'+i).innerHTML;
        //     var a = document.getElementById('a'+i).value;
        //     SurveyResponse.insert({
        //         question: q,
        //         answer: a,
        //         authorID: user(Router.current().params.userID)._id,
        //     });
        // }//for

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
    },
    hadInspirations: function() {
      var condition = MyUsers.findOne(Router.current().params.userID).condition;
      if (condition > 1) {
        return true;
      } else {
        return false;
      }
    },
    hadRationale: function() {
      var condition = MyUsers.findOne(Router.current().params.userID).condition;
      if (condition == 3) {
        return true;
      } else {
        return false;
      }
    },
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

function saveSurveyResponse(q, a) {
  SurveyResponse.insert({
    question: q,
    answer: a,
    authorID: user(Router.current().params.userID)._id,
  })
}
