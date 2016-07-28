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
Router.route('/consent',{
    name: 'consent',
    template: 'consent'
});

/*
    ##WhatIsFraming: explains what framing is
    ##aboutFraming
    
    status: IN-PROGRESS
    TODO:
        - write an explaination to include
        - make continue button work
*/
Router.route('/aboutFraming',{
    name: 'whatIsFraming',
    template: 'whatIsFraming'
});

Router.route('Version1', {
    name: 'Version1',
    template: 'Version1'
});

Router.route("Version1Tutorial", {
    name: "Version1Tutorial",
    template: "Version1Tutorial"
});

Router.route("Version2", {
    name: 'Version2',
    template: 'Version2'
});

Router.route("Version2Tutorial", {
    name: "Version2Tutorial",
    template: "Version2Tutorial"
});

Router.route("Version3Tutorial",{
    name: "Version3Tutorial",
    template: "Version3Tutorial"
});

Router.route('Version3', {
    name: 'Version3',
    template: 'Version3'
});

Router.route('activity1', function(){
    this.render('activity1');
    this.layout('layout2');
});

Router.route('activity2', function(){
    this.render('activity2');
    this.layout("layout2");
});

Router.route('activity3', function(){
    this.render('activity3');
    this.layout('layout2');
});
/*
    ##temp
*/
Router.route('/layout2Testing', function(){
    this.render('temp');
    this.layout('layout2');
});
Router.route('/thankyou', function(){
    this.render('thankyou');
    this.layout('layout1');
});
Router.route('/NoParticipation', function(){
    this.render('NoParticipation');
    this.layout('layout1');
});

Router.route('/Instructions', function(){
    this.render('instructionPage');
    this.layout('layout1');
});
Router.route('/Survey', function(){
    this.render('survey');
    this.layout('layout1');
});


