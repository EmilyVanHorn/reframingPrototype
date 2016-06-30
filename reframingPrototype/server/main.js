import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    removeAllIdeas: function(){
        Ideas.remove({});   
    },
    removeAllThemes: function(){
        Themes.remove({});   
    }
});

Meteor.publish('ideasPublication', function() {
    return Ideas.find();
  });

Meteor.publish('themesPublication', function() {
    return Themes.find({owner: this.userId});
  });
