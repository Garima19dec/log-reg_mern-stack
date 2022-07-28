import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/dblogreg", () => {
  console.log("database is connected");
});

//schema is created
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//model is created
let User = new mongoose.model("User", userSchema);

// route is created

app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        resp.send({ message: "login successfully", user: user });
      } else {
        return resp.send({ message: "password is incorrect" });
      }
    } else {
      resp.send({ message: "user is not registered" });
    }
  });
});

app.post("/register", (req, resp) => {
  const { name, email, password } = req.body;

  //findOne will check if user email  is already present or not if present then it will not register

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      resp.send({ message: "user already exists" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          resp.send(err);
        } else {
          resp.send({
            message: "Successfully registered... Now you can login!!",
          });
        }
      });
    }
  });
});

app.listen(9002, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`port is running on 9002 `);
});
