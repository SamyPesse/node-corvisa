# Corvisa REST API client for Node

[![npm version](https://badge.fury.io/js/corvisa.svg)](http://badge.fury.io/js/corvisa)

Documentation for the REST API can be found at https://code.corvisacloud.com/restapi.html. This API is using promises.

### Installation

```
$ npm install corvisa
```

### Documentation

Create a client using your API key:

```js
var Corvisa = require("corvisa");

var corvisa = new Corvisa("YOUR_API_KEY")
```

Options can be passed as a second argument to the constructor:

```js
var corvisa = new Corvisa("YOUR_API_KEY", {
    // Default phone number for sending sms
    phone: "+15554447001",

    // Endpoint for the Rest API
    endpoint: "https://api.us1.corvisa.io"
});
```

#### SMS

Send a single sms using:

```js
corvisa.sendSMS({
    to: "+14145554444",
    from: "+15554447001",
    message: "Hello World"
})
.then(function() {
    // SMS sent!
})
```

Or a batch of SMS using:

```js
corvisa.sendSMS([
    {
        to: "+14145554444",
        from: "+15554447001",
        message: "Hello John Doe!"
    },
    {
        to: "+14145554447",
        from: "+15554447001",
        message: "Hello!"
    }
])
.then(function() {
    // SMS sent!
})
```

If a phone number is specified in the client configuration, you can directly use:

```js
corvisa.sendSMS("+14145554444", "Hello You ;)")
.then(function() {
    ...
});
```

##### Voice Applications

Create a client for an application using `client.application`:

```js
var app = client.application("your-app-id");
```
