var _ = require("lodash");

function Application(client, appId) {
    this.client = client;
    this.appId = appId;
}

// Schedule a call
// Reference: https://code.corvisacloud.com/restapi/call_scheduling.html
Application.prototype.schedule = function(opts) {
    return this.client.post("channel/schedule", _.extend(opts || {}, {
        application: this.appId
    }));
};

module.exports = Application;
