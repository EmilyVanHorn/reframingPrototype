Template.thankyou.helpers({
  completionCode: function() {
    return user(Router.current().params.userID).completionCode;
  }
})
