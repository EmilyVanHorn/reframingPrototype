Template.ideasList.helpers({
    idea: Ideas.find()
});

Template.themesList.helpers({
    theme: Themes.find()
});

Template.idea_item.helpers({
});

Template.input.events({
    submit: function(e){
        e.preventDefault();
        value = e.target.firstElementChild.value;
        Themes.insert({
            content: value
        });
        e.target.firstElementChild.value = "";
    }
});

 function done(){
            //save themes
            //write to file?
            //themesData = Themes.find().fetch();
            //console.log(themesData);
            //alert('hi');
        }