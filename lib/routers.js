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
    tempate:'signin',
    waitOn: function(){
        return Meteor.subscribe("AllUsers");
    }
});

/*
    ##consent:  give user expectations, instructions and other useful information

    status: IN-PROGRESS
    TODO:
        - write up a consent form
        - make continue button work
*/
Router.route('/consent/:userID',{
    name: 'consent',
    template: 'consent',
    layoutTemplate: 'layout1',
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
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

Router.route('Version1/:userID', {
    name: 'Version1',
    template: 'Version1',
    layoutTemplate: "layout1",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});

Router.route('Version2/:userID', {
    name: 'Version2',
    template: 'Version2',
    layoutTemplate: "layout1",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});

Router.route('Version3/:userID', {
    name: 'Version3',
    template: 'Version3',
    layoutTemplate: "layout1",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});

Router.route('activity1/:userID', {
    name: 'activity1',
    template: 'activity1',
    layoutTemplate: "layout2",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
        var subscriptions = [
            Meteor.subscribe("users", this.params.userID),
            Meteor.subscribe("timerVar", this.params.userID)
        ];

        return subscriptions;
    }
});

Router.route('activity2/:userID', {
    name: 'activity2',
    template: 'activity2',
    layoutTemplate: "layout2",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
        var subscriptions = [
                Meteor.subscribe("users", this.params.userID),
                Meteor.subscribe("ideas"),
                Meteor.subscribe("timerVar", this.params.userID)
            ];
        return subscriptions;
    }
});

Router.route('activity3/:userID', {
    name: 'activity3',
    template: 'activity3',
    layoutTemplate: "layout2",
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
        var subscriptions = [
                Meteor.subscribe("users", this.params.userID),
                Meteor.subscribe("ideas"),
                Meteor.subscribe("timerVar", this.params.userID)
            ];
        return subscriptions;
    }
});

Router.route('/thankyou', function(){
    this.render('thankyou');
    this.layout('layout1');
});
Router.route('/NoParticipation/:userID',{
    name: 'NoParticipation',
    template: 'NoParticipation',
    layoutTemplate: 'layout1',
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});

Router.route('/Instructions/:userID', {
    name: 'instructions',
    template: 'instructionPage',
    layoutTemplate: 'layout1',
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});
Router.route('/Survey/:userID', {
    name: 'survey',
    template: 'survey',
    layoutTemplate: 'layout1',
    data: function(){
        var userID = this.params.userID;
    },
    waitOn: function(){
       var subscriptions = [
         Meteor.subscribe("survey", this.params.userID),
        //  Meteor.subscribe("temp"),
         Meteor.subscribe("users", this.params.userID)
      ];
      return subscriptions;
    }
});
Router.route('/activity3/:userID/:_id', {
    name: "details",
    template: "details",
    layoutTemplate: "layout2",
    data: function(){
        var idea= this.params._id;
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});

Router.route('/activity2/:userID/:_id',{
    name: "details2",
    template: "details2",
    layoutTemplate: "layout2",
    data: function(){
        var idea = this.params._id;
        var userID = this.params.userID;
    },
    waitOn: function(){
       return Meteor.subscribe("users", this.params.userID)
    }
});
