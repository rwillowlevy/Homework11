const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./public/index.html"))
});  
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});  
app.get("/api/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./db/db.json"))
});
app.post("/api/notes", function(req,res){
  var postnote = req.body
  fs.readFile("./db/db.json", "utf-8", function(err, data){
    var rdfile = JSON.parse(data)
    rdfile.push(postnote)
    fs.writeFile("./db/db.json", JSON.stringify(rdfile), function(err){
    if(err) throw err; 
    return res.json(rdfile)
    })
  })
})
app.delete("/api/notes/:id", function(req,res){
  var trash = req.params.id;
  fs.readFile("./db/db.json", "utf-8", function(err, data){
    var dltfile = JSON.parse(data)
    for(let i = 0; i < dltfile.length; i++){
      if(dltfile[i].title == trash){
            dltfile.splice(i, 1)
    }
    }
    fs.writeFile("./db/db.json", JSON.stringify(dltfile), function(err){
      if(err) throw err;
      return res.json(dltfile)
    })
  })
})


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});