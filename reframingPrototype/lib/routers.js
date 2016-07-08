Router.route('/',{
    name:'inst',
    template: 'inst'
});
Router.route("/home", {
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