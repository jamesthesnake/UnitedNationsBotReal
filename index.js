
var express = require('express')
    var bodyParser = require('body-parser')
    var request = require('request')
    var app = express()

    app.set('port', (process.env.PORT || 5000))

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // parse application/json
    app.use(bodyParser.json())

    // index
    app.get('/', function (req, res) {
	    res.send('hello world i am a secret bot')
	})
    //add a hashtable to easy communciate
    // for facebook verification
    app.get('/webhook/', function (req, res) {
	    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	    }
	    res.send('Error, wrong token')
	})

    // to post data
    app.post('/webhook/', function (req, res) {
	            messaging_events = req.body.entry[0].messaging
		    for (i = 0; i < messaging_events.length; i++) {
			    event = req.body.entry[0].messaging[i]
			        sender = event.sender.id
			    if (event.message && event.message.text) {
				text = event.message.text.toLowerCase()
				    if (text === 'generic') {
					sendGenericMessage(sender)
					continue
				    }
				     if(text == 'whats up'){
					sendHiMessage(sender)
					continue 
				    }
				    else if(text == 'here is my phone Number'){
                                        sendPhoneMessage(sender)
                                        continue
                                    }
				    else if(text== "let me donate to refugees"){
					sendDictMessage(sender)
					continue

				    }
				    else if(text == "account link"){
					sendAccountLink(sender)
					continue
					}

				    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    }
			    if (event.postback) {
				text = JSON.stringify(event.postback)
				sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
				    continue
			    }
		    }
		    res.sendStatus(200)
	})

var token = "EAAMeZARHIFrMBAFUtJ6QMa7uf6ZCmKa4nRVMxaV7ZC8PBnWIovAotP8iZCfGUCTIzSwKgyvSMY4AqZATpjdnsDE8xH5L1Xeoep5EMVZBflDegNtsE59f0xG5KMG2nC6pZCAUYW5G8GEj44p9InCvdm7bdNbl5fP1UQjG6jubJMBrAZDZD"


    function sendTextMessage(sender, text) {
    messageData = {
	text:text
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
	    json: {
		recipient: {id:sender},
		message: messageData,
	    }
	}, function(error, response, body) {
	    if (error) {
		console.log('Error sending messages: ', error)
	    } else if (response.body.error) {
		console.log('Error: ', response.body.error)
	    }
	})
}
    function sendHiMessage(sender){
	messageData={
	    text:"Hello Citizen of the World!"
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		    qs: {access_token:token},
		    method: 'POST',
		    json: {
		    recipient: {id:sender},
			message: messageData,
			}
	    }, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
			} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
			}
	    })

	    }
function sendPhoneMessage(sender){
    messageData={
	text:"Will be inputed into UN databases!"
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
		recipient: {id:sender},
		    message: messageData,
		    }
	}, function(error, response, body) {
	    if (error) {
		console.log('Error sending messages: ', error)
		    } else if (response.body.error) {
		console.log('Error: ', response.body.error)
		    }
	})


}
function sendDictMessage(sender){
    messageData={
	    "attachment": {
		"type": "template",
		"payload": {
		    "template_type": "generic",
		    "elements": [{
			    "title": "Refugee Donations",
			    "subtitle": "Straight to Un",
			    "image_url": "http://afronoveles.info/wp-content/uploads/2015/10/un.jpg",
			    "buttons": [{
				    "type": "web_url",
				    "url": "http://tinyurl.com/refugeegive ",
				    "title": "web url"
				}, {
				    "type": "postback",
				    "title": "Postback",
				    "payload": "Payload for first element in a generic bubble",
				}],
			}, {
			    "title": "Second card",
			    "subtitle": "Element #2 of an hscroll",
			    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
			    "buttons": [{
				    "type": "postback",
				    "title": "Postback",
				    "payload": "Payload for second element in a generic bubble",
				}],
			}]
		}
	    }
    }

	
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
		recipient: {id:sender},
		    message: messageData,
		    }
	}, function(error, response, body) {
	    if (error) {
		console.log('Error sending messages: ', error)
		    } else if (response.body.error) {
		console.log('Error: ', response.body.error)
		    }
	})
	}
	
function sendAccountLink(sender){
    messageData={
"attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Welcome to M-Bank",
          "image_url": "http://www.example.com/images/m-bank.png",
    "buttons": [{
	"type": "account_link",
            "url": "https://www.example.com/oauth/authorize"
	    }]
    }]
      }
}
    }
    request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token:token},
                method: 'POST',
                json: {
                recipient: {id:sender},
                    message: messageData,
                    }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
                    } else if (response.body.error) {
                console.log('Error: ', response.body.error)
                    }
        })
}
function sendGenericMessage(sender) {
    messageData = {
	"attachment": {
	    "type": "template",
	    "payload": {
		"template_type": "generic",
		"elements": [{
			"title": "First card",
			"subtitle": "Element #1 of an hscroll",
			"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
			"buttons": [{
				"type": "web_url",
				"url": "https://www.messenger.com",
				"title": "web url"
			    }, {
				"type": "postback",
				"title": "Postback",
				"payload": "Payload for first element in a generic bubble",
			    }],
		    }, {
			"title": "Second card",
			"subtitle": "Element #2 of an hscroll",
			"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
			"buttons": [{
				"type": "postback",
				"title": "Postback",
				"payload": "Payload for second element in a generic bubble",
			    }],
		    }]
	    }
	}
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
		recipient: {id:sender},
		    message: messageData,
		    }
	}, function(error, response, body) {
	    if (error) {
		console.log('Error sending messages: ', error)
		    } else if (response.body.error) {
		console.log('Error: ', response.body.error)
		    }
	})
	}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
	    })

