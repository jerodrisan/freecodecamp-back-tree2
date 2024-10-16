require('dotenv').config()
var bodyParser = require('body-parser')
let express = require('express');
let app = express();

console.log("Hello World")

let absolutPathIndex =  __dirname + "/views/index.html"
let absolutPathAsset =  __dirname + "/public/" 

//Creamos un middleware para poner los assets del index.html
let middleware = express.static(absolutPathAsset)
app.use("/public",middleware)



//Creamos un middleware para manejar las URL encodeds para poder ser usado en peticiones post
//haciendo uso de un bodyparser. 
//Cuando se usan el extender:false , los valores solo pueden ser strings o arrays
app.use(bodyParser.urlencoded({extended: false}))



//Añadimos un middleware para facilitar informacion en la peticion:
app.use(function(req,res, next){
    let method= req.method
    let path=req.path
    let ip = req.ip
    console.log(method,path,'-',ip)
    next()
})


//Ejm de chaining middlewares para ver una fecha:
app.get('/now', (req,res,next)=>{
    //Pillamos la hora
    req.time=new Date().toString()
    next()
}, (req,res)=>{
    //devolvemos en la respuesta la hora en formato json:    
    res.json({time:req.time})
})



app.get("/",function(req, res){
    //res.send("Hello World")    
    //Servimos el archivo index.html usando un middleware para verlo con su css:
    res.sendFile(absolutPathIndex)
})


app.get("/json", function(req, res){

     //Servir un json: (En este caso la ruta del get la cambiamos a : "/json")
    //El metodo res.json() transforma un objeto en json
    //let Obj = {message: "Hello json"}
    //res.json(Obj) --> Salida : {"message":"Hello json"}


    //Uso del archivo .env. En este caso vamos a guardar en .env una variable MESSAGE_STYLE=uppercase
    //Hyay que importar arriba require('dotenv').config()
    //Vamos a poner en mayusculas "Hello json":
    let Obj = {message: "Hello json"}
    if(process.env.MESSAGE_STYLE==="uppercase"){        
        Obj.message=Obj.message.toUpperCase()
    }            
    res.json(Obj)
})


//params 
//your-app-rootpath/freecodecamp/echo.
app.get('/:word/echo', (req,res)=>{
    const word= req.params.word
    const path = req.path
    const arr = path.split('/') //--> pillamos la palabra echo del path
   
    //console.log(word,' ',path, ' ',arr[2]) //--> freecodecamp   /freecodecamp/echo   echo
    res.json({[arr[2]]:word})
})



//Otra forma de pillar los params usando query strings:
//--->  /name?first=firstname&last=lastname
app.get('/name',(req,res)=>{
    const firstName = req.query.first
    const lastName = req.query.last
    res.json({name :`${firstName} ${lastName}`})
   
})


//peticiones post
//previamente hay que instalar el paquete body-parser con npm : npm install body-parser
//y requerirlo arriba con var bodyParser = require('body-parser')

app.post('/name', (req,res)=>{
    //enviamos los datos creados desde el formulario en la ruta "/" a traves de peticion GET:
    const firstName=req.body.first
    const lastName=req.body.last
    res.json({name :`${firstName} ${lastName}`})

})











































 module.exports = app;
