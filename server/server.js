Accounts.urls.verifyEmail = function (token) {
    var url="http://localhost:3000/verify-email/" + token;
    return url;
};


Meteor.startup(function() {
    // read environment variables from Meteor.settings
    if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
        for(var variableName in Meteor.settings.env) {
            process.env[variableName] = Meteor.settings.env[variableName];
        }
    }


});

Meteor.methods({
    "createUserAccount": function(options) {
        if(!Users.isAdmin(Meteor.userId())) {
            throw new Meteor.Error(403, "Access denied.");
        }

        var userOptions = {};
        if(options.username) userOptions.username = options.username;
        if(options.email) userOptions.email = options.email;
        if(options.password) userOptions.password = options.password;
        if(options.profile) userOptions.profile = options.profile;
        if(options.profile && options.profile.email) userOptions.email = options.profile.email;

        Accounts.createUser(userOptions);
    },
    "updateUserAccount": function(userId, options) {
        if(!Users.isAdmin(Meteor.userId())) {
            throw new Meteor.Error(403, "Access denied.");
        }

        var userOptions = {};
        if(options.username) userOptions.username = options.username;
        if(options.email) userOptions.email = options.email;
        if(options.password) userOptions.password = options.password;
        if(options.profile) userOptions.profile = options.profile;
        if(options.profile && options.profile.email) userOptions.email = options.profile.email;

        if(userOptions.email) {
            var email = userOptions.email;
            delete userOptions.email;
            userOptions.emails = [{ address: email }];
        }

        var password = "";
        if(userOptions.password) {
            password = userOptions.password;
            delete userOptions.password;
        }

        Users.update(userId, { $set: userOptions });

        if(password) {
            Accounts.setPassword(userId, password);
        }
    }
});

Accounts.onCreateUser(function (options, user) {
    user.roles = ["admin"];

    if(options.profile) {
        user.profile = options.profile;
        //Accounts.sendVerificationEmail(userId, email);
    }



    return user;
});

Users.before.insert(function(userId, doc) {
    if(doc.emails && doc.emails[0] && doc.emails[0].address) {
        doc.profile = doc.profile || {};
        doc.profile.email = doc.emails[0].address;
    }
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
    if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
        modifier.$set.profile.email = modifier.$set.emails[0].address;
    }
});

Accounts.onLogin(function (info) {

});
Meteor.methods({
    mosquereg: function( user, email, pw) {
        // The users is a new one - create it
        user.roles = ["mosque"];
        user.email = email;
        user.password = pw;
        userId = Accounts.createUser(user);
        //Meteor.users.update(userId, {$set:{"roles":["mosque"]}});

        console.log("Email to verify:" +email + " | userId: "+userId);
        return userId;
        // this needs to be done on the server.
        //Accounts.sendVerificationEmail(userId, email); //send email
        // updateOffset: function(offset){
        //   Meteor.users.update(Meteor.userId(), {$set: {"profile.offset": offset}});
        // }
    }
});
Meteor.methods({
    changeMyPassword:function(userid,pass) {
        Accounts.setPassword(userid, pass);
    }
});


Meteor.startup(function () {
    // test with gmail
    process.env.MAIL_URL="smtp://postmaster%40sandboxb97fc2c86dfe4ee8b09bee311c259b9e.mailgun.org:88416156833619c9c6ed0c5c4cf2cb84@smtp.mailgun.org:25";
    // test with SendGrid
    // process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';

    //console.log(process.env);
    Meteor.methods
    ({
        sendEmail: function (to, from, subject, text)
        {
            console.log("*** sendEmail ***");

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            this.unblock();

            Email.send
            ({
                to: to,
                from: from,
                subject: subject,
                text: text
            });
        }
    });
});
