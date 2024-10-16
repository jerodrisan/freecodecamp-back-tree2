var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
  // console.log('reqfile', req.file)  /// 
  // console.log('reqbody', req.body)
  try{
    const {originalname:name, mimetype:type, size} = req.file
    // console.log(name, type, size)

    res.status(200).json({name, type, size})
  }catch ( error){
    console.error(console.error())
    res.status(500).json({error:"error al procesar los datos" })
  } 
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
