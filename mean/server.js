/*var moongose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
//console.log(" version " + moongose.version);

const CourseRoute = require("./routes");

app.use("/api", CourseRoute);
//app.use(express.bodyParser());
/*
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  next();
});
------------------------------------------------










*/

var express = require("express");
var app = express();
var port = 3000;
var cors = require("cors");
app.use(cors());
app.use(
  cors({
    origin: " http://localhost:4200/",
  })
);
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/bdd_mean");
var Schema = mongoose.Schema;

var fs = require("fs");
var multer = require("multer");
var path = require("path");

var imgPath = "/path/to/some/img.png";
// data: Buffer, contentType: String }
var courseSchema = new Schema({
  titre: String,
  categorie: String,
  description: String,
  img: String,
});
courseSchema.index({ titre: "text" });
var cours = mongoose.model("cours", courseSchema);
var bodyParser = require("body-parser");
const CourseRoute = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  next();
});
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./angular/src/assets/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
//upload.single("file")
var upload = multer({ storage: storage });

app.post("/cours", upload.single("file"), (req, res, next) => {
  var newCourse = new cours();
  newCourse.titre = req.body.titre;
  newCourse.categorie = req.body.categorie;
  newCourse.description = req.body.description;
  console.log(req.file.filename);
  newCourse.img = req.file.filename;
  console.log(req.file.path);
  newCourse.save(function (err, insertedCourse) {
    if (err) {
      console.log(`upload.single error: ${error}`);

      console.log("erreur aicha");
    } else {
      res.json(insertedCourse);
      // res.redirect("/courses");
    }
  });
});

app.get("/courses", function (req, res) {
  cours.find({}).exec(function (err, cours) {
    if (err) {
      console.log("erreur");
    } else {
      res.json(cours);
    }
  });
});

app.get("/courses/:id", function (req, res) {
  cours.findById(req.params.id).exec(function (err, cours) {
    if (err) {
      console.log("erreur");
    } else {
      res.json(cours);
    }
  });
});

app.put("/update/:id", function (req, res) {
  cours.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        titre: req.body.titre,
        categorie: req.body.categorie,
        description: req.body.description,
      },
    },
    { new: true },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

app.delete("/delete/:id", function (req, res) {
  cours.findByIdAndRemove(req.params.id, function (error, data) {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
      console.log("Data deleted successfully");
    }
  });
});
app.get("/find/:query", cors(), function (req, res) {
  var query = req.params.query;
  cours.find(
    {
      $text: {
        $search: query,
      },
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error",
          })
        );
      }
    }
  );
});
app.listen(port);
console.log("serveur lance sur le port 3000");
module.exports = CourseRoute;
