var id = [
    {
        content: "Idea number 1",
        likes: 5,
        comments: 24 
    },
    {
        content: "Idea 2",
        likes: 12,
        comments: 1234
    },
    {
        content: "Idea 3",
        likes: 7,
        comments: 1234
    },
    {
        content: "hi",
        likes: 1,
        comments: 122
    },
    {
        content: "laksjdflkajsdl;fjk laskdjfas klfjsd;lfkjasjf laskjd asdlk as asldkjfa;lsdj as aslkdjflaksjdf asdfasf aslkjdflkasf laksjdflkajsdl;fjk laskdjfas klfjsd;lfkjasjf laskjd asdlk as asldkjfa;lsdj as aslkdjflaksjdf asdfasf aslkjdflkasf laksjdflkajsdl;fjk laskdjfas klfjsd;lfkjasjf laskjd asdlk as asldkjfa;lsdj as aslkdjflaksjdf asdfasf aslkjdflkasf laksjdflkajsdl;fjk laskdjfas klfjsd;lfkjasjf laskjd asdlk as asldkjfa;lsdj as aslkdjflaksjdf asdfasf aslkjdflkasf laksjdflkajsdl;fjk laskdjfas klfjsd;lfkjasjf laskjd asdlk as asldkjfa;lsdj as aslkdjflaksjdf asdfasf aslkjdflkasf",
        likes: 123,
        comments: 1234
}];
var i = 0;
var wait = setInterval(function(){
    
    Ideas.insert({
    content: "New Idea: " + i,
    likes: 5,
    comments: 10
});
    //if no more ideas stop interval
    i++;
    if(i > 1){
        clearInterval(wait);   
    }
    
                                 }, 3000);


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