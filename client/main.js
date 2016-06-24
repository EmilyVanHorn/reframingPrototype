var ideas = [
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

Template.ideasList.helpers({
    idea: ideas
});

Template.themesList.helpers({
    theme: Themes.find()
});

Template.input.events({
    submit: function(e){
        value = e.target.firstElementChild.value;
        Themes.insert({
            content: value
        });
    }
});