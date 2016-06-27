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



Template.ideasList.helpers({
    idea: Ideas.find()
});

Template.themesList.helpers({
    theme: Themes.find()
});

Template.theme_item.helpers({
    
});

Template.idea_item.helpers({
});

Template.input.events({
    submit: function(e){
        e.preventDefault();
        value = e.target.firstElementChild.value;
        e.target.firstElementChild.value = "";

        Themes.insert({
            content: value,
            active: meta[metaIndex].active,
            total: meta[metaIndex].total,
            prob: meta[metaIndex].prob
        });
        
        if (metaIndex == (meta.length - 1)){
            metaIndex = 0;       
        }
        else{
            metaIndex++;   
        }
        
        
        
    }
});