/*Router.route('/',{
    //name:'inst',
    //template: 'inst'
    name:'OpenIDEO1',
    template:'OpenIDEO1'
});*/

Router.route('/',{
    name: 'newInst',
    template: 'newInst'
});
Router.route("/Login",{
    name:"login",
    template: "setup"
});
Router.route("version2/home", {
    name:'homeNoMeta',
    template: 'homeNoMeta'
});
Router.route("version3/home",{
    name:'home',
    template: 'home'
});
Router.route("/crowd",{
    name:'crowd',
    template: 'aboutTheCrowd'
});
Router.route("/version1",{
    name:'OpenIDEO1',
    template:'OpenIDEO1'
});
Router.route("/version2",{
    name:'OpenIDEO2',
    template:'OpenIDEO2'
});

Router.route("/inst",{
   name: 'inst',
    template:'inst'
});
Router.route("/thankyou",{
    name: 'thankyou',
    template: 'thankyou'
});