
function Application(client, appId) {
    this.client = client;
}

// Schedule a call
// Reference: https://code.corvisacloud.com/restapi/call_scheduling.html
Application.prototype.schedule = function(opts) {
    return this.client.post("channel/schedule", opts);
};

module.exports = Application;
