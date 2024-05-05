const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
//const path = require("path");
const userRouter = require("./routes/user.routes");
const courseModel = require('./models/course.model');
const couseRouter = require("./routes/couse.route");
const router = express.Router();


const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+"/uploads/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const li = file.originalname.split(".");
   //console.log(li)
    cb(null, req.params.id + "." + li[li.length - 1]);
  },
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: "*", // Replace with your app's domain
  optionsSuccessStatus: 200,
  //Credential: true
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use("/api/users", userRouter);

// userRouter.use("/",async (req,res,next)=>{
//   //check for jwt token
//   const token = req.headers.cookie.split("=")[1];
//   // console.log(token)
//   if (token) {
//     jwt.verify(token, process.env.SECRET, {}, async (err, userData) => {
//       if (err) throw err;
//       req.user = await userModel.findById(userData._id)
//       next();
//     });
//   } else {
//     res.status(401).send("Access Denied");;
//   }

// });



app.use("/api/course", couseRouter);


app.use('/api/uploads', express.static(__dirname + '/uploads'));


app.post('/api/upload/:id', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the uploaded file (e.g., save information to the database)
  // For now, just send a success response with the file details
  res.send({
    message: 'File uploaded successfully.',
    fileDetails: {
      url: '/api/uploads/'+file.filename,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size+"b",
    },
  });
});




app.use("/", (req, res) => {
  res.send("<h1>welcome!</h1>");
});

module.exports = app;
