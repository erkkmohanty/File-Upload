var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+'-'+file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        console.log(req);
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.json({
            success:true,
            path:req.file.path
        })
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});