//var logger = new Logger('Client:Exp:MturkLogin');
//// Comment out to use global logging level
////Logger.setLevel('Client:Exp:MturkLogin', 'trace');
////Logger.setLevel('Client:Exp:MturkLogin', 'debug');
//Logger.setLevel('Client:Exp:MturkLogin', 'info');
////Logger.setLevel('Client:Exp:MturkLogin', 'warn');

Template.signin.rendered = function() {
  // Ensure scroll to top of window
  window.scrollTo(0,0);
}


/********************************************************************
 * Login Page event listeners 
 * *****************************************************************/
Template.signin.events({
    'click button.nextPage': function () {
        //console.log("clicked continue");
        //login user
        var userName = $('input#name').val().trim();
        //UNCOMMENT THIS!!!!! logger.info("Logging in user with name: " + userName);
        var user = LoginManager.loginUser(userName);
        var role = RoleManager.defaults['Participant'];
        Session.set("currentRole", role);
        Router.go("Consent",
          {userID: user._id});

    /********************* Disable experiment logic ************/
    },
    'keyup input#name': function (evt) {
      if(evt.keyCode==13) {
        //console.log("enter released, clicking continue");
        $('#nextPage').click();
      }
    },
});