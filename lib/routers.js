/******************************************************************************
    ROUTERS.JS OUTLINE
    search "##{routeName}" for any of the routeNames listed below to easily
    find it's code and a more detailed description
    
    default:                signin
    signin:
    consent:
        aboutFraming
    temp:                  for testing
    
*******************************************************************************/

Router.configure({
    layoutTemplate: 'layout1'
});

/* 
    ##signIn: user signs in with username
    ##default
    
    status: IN-PROGRESS
    TODO: 
        - make actual logging in work
        - figure out the logger
        - make continue button work
        
*/
Router.route('/', {
    name: 'signin',
    tempate:'signin'
});

/*
    ##consent:  give user expectations, instructions and other useful information
    
    status: IN-PROGRESS
    TODO:
        - write up a consent form
        - make continue button work
*/
Router.route('/consent/:userID', {
    name: 'consent',
    template: 'consent',
    data: function(){
        return this.params.userID;
    }
});

Router.route('Version1/:userID', {
    name: 'Version1',
    template: 'Version1',
    data: function(){
        return this.params.userID;   
    }
});

Router.route("Version2/:userID", {
    name: 'Version2',
    template: 'Version2',
    data: function(){
        return this.params.userID;   
    }
});

Router.route('Version3/:userID', {
    name: 'Version3',
    template: 'Version3',
    data: function(){
        return this.params.userID;   
    }
});

Router.route('activity1/:userID', {
    name: "activity1",
    template: "activity1",
    layoutTemplate: "layout2",
    data: function(){
        return this.params.userID;   
    }   
});

Router.route('activity2/:userID', {
    name: "activity2",
    template: "activity2",
    layoutTemplate: "layout2",
    data: function(){
        return this.params.userID;   
    }   
});

Router.route('activity3/:userID', {
    name: "activity3",
    template: "activity3",
    layoutTemplate: "layout2",
    data: function(){
        return this.params.userID;   
    }   
});

Router.route('/thankyou',{
    template: "thankyou",
    layoutTemplate: "layout1",
    data: function(){
        return this.params.userID;   
    }
});
Router.route('/NoParticipation',{
    template: "NoParticipation",
    layoutTemplate: "layout1",
    data: function(){
        return this.params.userID;   
    }
});

Router.route('/Instructions/:userID', {
    name: 'Instructions',
    template: 'instructionPage',
    data: function(){
        return this.params.userID;
    }
});
Router.route('/Survey',{
    template: "survey",
    layoutTemplate: "layout1",
    data: function(){
        return this.params.userID;   
    }
});


