const CONFIG = require("../config/config");
var Mailgun = require("mailgun-js");
var mailgun = new Mailgun({ apiKey: CONFIG.mg_key, domain: CONFIG.mg_domain });


exports.sendEmail = function (destination, options) {
  var data = {
    from: "Network Maintenance <kevin16u26ao11@gmail.com>",
    to: destination,
    subject: options.subject,
    html: options.body,
  };

  if (options.cc) {
    data.cc = options.cc;
  }
  
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, function (err, response) {
      if (err) {
        reject(err);
        return err;
      }
      resolve({
        destination: destination,
        response: response,
      });
    });
  });
};
