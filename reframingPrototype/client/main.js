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
    'submit': function(e){
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
    }, 
    
    'click .button': function(e){
        if(confirm("Are you sure you are finished? Click ok to confirm, Cancel to continue.")){
            window.open(Router.go('/finished'));
        }
        else{  
        }
    }
    
    
});

function getDownloadFile(){
    //save themes
    var data = [];
    var userThemes = Themes.find();
    userThemes.forEach(function(theme){
         data += theme.content + "\n";
    });

    var textFile = null;
    var text = new Blob([data], {type: 'text/plain'});
    if(textFile !== null){
        window.URL.revokeObjectURL(textFile);   
    }

    textFile = window.URL.createObjectURL(text);
    
    return textFile
}

Template.download.events({
    'click #downloadLink': function(e){
        var link = document.getElementById('downloadLink');
        link.href = getDownloadFile();
        
        Meteor.call("removeAllThemes");
    }
});