/////// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint...
app.get('/api/hello', function (req, res) { 
  res.json({ greeting: 'hello API' });
});



app.get('/api/whoami', (req, res)=>{ 
  //Para la IP:
  const ipaddress = req.headers['cf-connecting-ip'] 
          // || req.headers['x-real-ip']
             || req.headers['x-forwarded-for'] //Usaremos este metodo
          // || req.socket.remoteAddress 
  //console.log('ip', ipaddress) 

  //Para el idioma: 
  //metodo 1: 
  const leng = req.acceptsLanguages()  
  let languages =""
  for (let i=0; i < leng.length; i++){     
     languages += i< leng.length-1 ? leng[i]+"," :  leng[i]
  }
  //Metodo dos: (usaremos este metodo)
  const languages2= req.headers['accept-language']  

  //Para el software : 
  const software = req.headers['user-agent']
  console.log(software)
  res.json({ipaddress , language:languages2, software})
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
