redirect = function(currentState){
    switch(currentState){
        case "1":
            Router.go("consent",{userID: Router.current().params.userID})
            break;
        case "2":
            Router.go("instructions",{userID: Router.current().params.userID})
            break;
        case "3.Version1":
            Router.go("Version1",{userID: Router.current().params.userID})
            break;
        case "3.Version2":
            Router.go("Version2",{userID: Router.current().params.userID})
            break;
        case "3.Version3":
            Router.go("Version3",{userID: Router.current().params.userID})
            break;
        case "4.Version1":
            Router.go("Version1",{userID: Router.current().params.userID})
            break;
        case "4.Version2":
            Router.go("Version2",{userID: Router.current().params.userID})
            break;
        case "4.Version3":
            Router.go("Version3",{userID: Router.current().params.userID})
            break;
        case "5.Version1":
            Router.go("activity1",{userID: Router.current().params.userID})
            break;
        case "5.Version2":
            Router.go("activity2",{userID: Router.current().params.userID})
            break;
        case "5.Version3":
            Router.go("activity3",{userID: Router.current().params.userID})
            break;
        case "6.Version1":
            Router.go("activity1",{userID: Router.current().params.userID})
            break;
        case "6.Version2":
            Router.go("activity2",{userID: Router.current().params.userID})
            break;
        case "6.Version3":
            Router.go("activity3",{userID: Router.current().params.userID})
            break;
        case "7.Version1":
            Router.go("survey",{userID: Router.current().params.userID})
            break;
        case "7.Version2":
            Router.go("survey",{userID: Router.current().params.userID})
            break;
        case "7.Version3":
            Router.go("survey",{userID: Router.current().params.userID})
            break;
        case "9":
            Router.go("NoParticipation",{userID: Router.current().params.userID})
            break;
        default:
            Router.go("signin",{userID: Router.current().params.userID})
            break;
            
    }
};

user = function(param){
    return MyUsers.find({_id: param}).fetch()[0];
}

isV1 = function(user){
    return (user.state.substring(2) == "Version1");
};
isV2 = function(user){
    return (user.state.substring(2) == "Version2");
};
isV3 = function(user){
    return (user.state.substring(2) == "Version3ß");
};