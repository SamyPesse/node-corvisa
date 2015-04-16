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

var corvisa = new Corvisa("YOUR_API_KEY", "YOUR_API_SECRET")
```

Options can be passed as a second argument to the constructor:

```js
var corvisa = new Corvisa("YOUR_API_KEY", {
    // Default phone number for sending sms
    from: "+15554447001",

    // Endpoint for the Rest API
    endpoint: "https://api.us1.corvisa.io"
});
```

#### SMS

Send a single sms using:

```js
corvisa.sendSMS("+15554447001", {
    to: "+14145554444",
    text: "Hello World"
})
.then(function() {
    // SMS sent!
})
```

Or a batch of SMS using:

```js
corvisa.sendSMS("+15554447001", [
    {
        to: "+14145554444",
        text: "Hello John Doe!"
    },
    {
        to: "+14145554447",
        text: "Hello!"
    }
])
.then(function() {
    // SMS sent!
})
```

##### Voice Applications

Create a client for an application using `client.application`:

```js
var app = client.application("your-app-id");
```

Schedule a call:

```js
app.schedule({

})
.then(function() {
    // Corvisa is calling me!
});
```

##### Direct REST call

```js
// POST request to https://api.us1.corvisa.io/method_name
corvisa.post("method_name", { ... })
.then(function() {
    ...
});

// GET request to https://api.us1.corvisa.io/method_name
corvisa.get("method_name")
.then(function() {
    ...
});
```
