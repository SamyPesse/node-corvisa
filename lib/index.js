var _ = require("lodash");
var Q = require("q");
var request = require("request");

var Application = require("./application");

function Corvisa(apiKey, apiSecret, opts) {
    if (!Corvisa.prototype.isPrototypeOf(this)) return new Corvisa(apiKey, opts);

    this.options = _.defaults(opts || {}, {
        key: apiKey,
        secret: apiSecret,
        endpoint: "https://api.us1.corvisa.io"
    });
}

// HTTP request to the api
Corvisa.prototype.request = function(mode, method, args) {
    var that = this;
    var deferred = Q.defer();

    request[mode.toLowerCase()](this.options.endpoint+"/"+method, {
        'auth': {
            'user': this.options.key,
            'pass': this.options.secret,
            'sendImmediately': false
        },
        'json': true,
        'headers': {
            'User-Agent': 'node-corvisa',
            'Content-Type': 'application/json'
        },
        'strictSSL': false,
        'body': args
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(body);
        } else {
            error = error || new Error(response.statusCode);
            error.code = response.statusCode;
            error.response = response;
            error.body = body;
            deferred.reject(error);
        }
    });

    return deferred.promise;
};
Corvisa.prototype.post = _.partial(Corvisa.prototype.request, "post");
Corvisa.prototype.get = _.partial(Corvisa.prototype.request, "get");

// Return an application client
Corvisa.prototype.application = function(appId) {
    return (new Application(this, appId));
}

// Send a SMS
// Reference: https://code.corvisacloud.com/restapi/outbound_sms.html
Corvisa.prototype.sendSMS = function(from, sms) {
    if (!sms) {
        sms = from;
        from = undefined;
    }

    from = from || this.options.from;
    if (!_.isArray(sms)) sms = [sms];
    if (!from) return Q.reject(new Error("Need 'from' in client options"));

    return this.post("sms", {
        from_number: from,
        messages: _.map(sms, function(s) {
            return {
                to_number: s.to,
                text: s.text
            }
        })
    });
};

module.exports= Corvisa;
