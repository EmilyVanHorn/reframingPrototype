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
Router.route("/finished",{
    name:'finished',
    template: 'download'
});