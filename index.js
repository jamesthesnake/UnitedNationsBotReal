
var express = require('express')
    var bodyParser = require('body-parser')
    var request = require('request')
    var app = express()
    // messenger.getProfile(id, cb)     
    
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
				    if(text == 'whats up'|| "what's up"){
					sendHiMessage(sender)
					continue 
				    }
				    else if(text == 'here is my phone number'){
                                        sendPhoneMessage(sender)
                                        continue
                                    }
				    else if( text == "let me donate to refugees" ){
					sendDictMessage(sender)
					continue

				    }
				    else if(text.includes(" what is the united nations charter")){
					sendCharterMessage(sender)
					continue
				    }
				    else if( text.includes( "what impact will i have" )){
					//var number=  text.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
					try{
					var number = text.match(/\d/g);
					number = number.join("");
					}catch(err){
					 number=0
					}      
					sendRefugeeMessage(sender,number)
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
			3})

var token = "<YOUR TOKEN HERE>"


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
    function sendCharterMessage(sender){
	messageData={
	    text:"WE THE PEOPLES OF THE UNITED NATIONS DETERMINED to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and to reaffirm faith in fundamental human rights, in the dignity and worth of the human person, in the equal rights of men and women and of nations large and small, and to establish conditions under which justice and respect for the obligations arising from treaties and other sources of international law can be maintained, and to promote social progress and better standards of life in larger freedom, AND FOR THESE ENDS to practice tolerance and live together in peace with one another as good neighbours, and to unite our strength to maintain international peace and security, and to ensure, by the acceptance of principles and the institution of methods, that armed force shall not be used, save in the common interest, and to employ international machinery for the promotion of the economic and social advancement of all peoples, HAVE RESOLVED TO COMBINE OUR EFFORTS TO ACCOMPLISH THESE AIMS Accordingly, our respective Governments, through representatives assembled in the city of San Francisco, who have exhibited their full powers found to be in good and due form, have agreed to the present Charter of the United Nations and do hereby establish an international organization to be known as the United Nations."
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
	    text:"Hello Citizen of the World, ${profile.first_name}!"
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
	text:"Will be inputed into UN databases! thank you for your help!"
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
function sendRefugeeMessage(sender,number){
    messageData={
        text:"You will donate "+ number +" dollars per month which can educate  " + number/30 + " childern in Iraq, or  give dental aid to  " +number/50+ " childern or " + number/30 +" emergency kits"
	//        "attachment": {
	//  "type": "template",
	//  "payload": {
	//      "template_type": "generic",
	//      "elements": [{
	//              "title": "Get in School",
	//              "subtitle": "Straight to United Nations",
	//              "image_url": "http://afronoveles.info/wp-content/uploads/2015/10/un.jpg",
	//              "buttons": [{
	//                      "type": "web_url",
	//                      "url": "http://tinyurl.com/refugeegive ",
	//                      "title": "web url"
	//                  }, {
	///                      "type": "postback",
	//                     "title": "Postback",
	//                      "payload": "Payload for first element in a generic bubble",
	//                  }],
	//          }, {
	//              "title": "Get in dentsitry",
	//              "subtitle": "Element #2 of an hscroll",
	///              "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
	//             "buttons": [{
	//                      "type": "web_url",
	//                      "url": "www.venmo.com ",
	//                      "title": "venmo"
	//                  }, {
	//                      "type": "postback",
	//                      "title": "Postback",
	//                      "payload": "Payload for second element in a generic bubble",
	//                  }],
	//          }]
	//  }
        //}

    }
    //    sendDictMessage(sender)
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
			"subtitle": "Straight to United Nations",
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
			"title": "via venmo",
			"subtitle": "Element #2 of an hscroll",
			"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
			"buttons": [{
				"type": "web_url",
				"url": "www.venmo.com ",
				"title": "venmo"
			    }, {
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
