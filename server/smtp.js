  Meteor.startup(function () {
    // code to run on server at startup
    process.env.MAIL_URL = 'smtp://postmaster@sandboxb97fc2c86dfe4ee8b09bee311c259b9e.mailgun.org:88416156833619c9c6ed0c5c4cf2cb84@smtp.sendgrid.net:587';
    //console.log(process.env);
  });
