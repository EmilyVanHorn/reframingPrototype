Template.ideasList.helpers({
    idea: Ideas.find()
});

Template.themesList.helpers({
    theme: Themes.find()
});

Template.idea_item.helpers({
   timer:function(){
        var time = Math.floor((Math.random * 5000) + 1000);
        var timePassed = 0;
        var wait = setTimeout(function(){
            timePassed++;
            alert(timePassed);}, 5000);
    } 
});

Template.input.events({
    submit: function(e){
        value = e.target.firstElementChild.value;
        Themes.insert({
            content: value
        });
    }
});

 function done(){
            //save themes
            //write to file?
            //themesData = Themes.find().fetch();
            //console.log(themesData);
            alert('hi');
        }