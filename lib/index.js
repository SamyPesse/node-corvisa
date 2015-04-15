var _ = require("lodash");
var Q = require("q");

var Application = require("./application");

function Corvisa(apiKey, opts) {
    this.options = _.defaults(opts || {}, {
        key: apiKey,
        endpoint: "https://api.us1.corvisa.io"
    });
}

// Return an application client
Corvisa.prototype.application = function(appId) {
    return (new Application(this, appId));
}

// Send a SMS
// Reference: https://code.corvisacloud.com/restapi/outbound_sms.html
Corvisa.prototype.sendSMS = function() {

};

module.exports= Corvisa;
