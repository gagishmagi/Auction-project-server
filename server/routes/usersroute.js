const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users");

router.get("/users/", (req, res, next) => {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});
router.get("/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => res.json(data))
    .catch(next);
});
router.post("/users", async (req, res, next) => {
  const email = req.body.email;
  let password = req.body.password;
  const passworddd = await bcrypt.hash(password, 5);
  console.log(passworddd);
  req.body.password = passworddd;
  console.log(req.body.password);
  User.find({ email }).then((data) =>
    data.length > 0
      ? console.log("you  already have an account")
      : req.body.email
      ? User.create(req.body)
          .then((data) => res.json(data))
          .catch(next)
      : res.json({ error: "this input is emty" }).catch(next)
  );
});
router.post("/users/login", async (req, res, next) => {
  // const email = req.body.email
  // console.log(req.body.password);
  // const password =  req.body.password
  // console.log(password);
  // User.find({email,password}).then((data)=>data.length>0?res.json({valid:"logged",user:data[0]}):res.json("wrong"))

  const { email, password } = req.body;
  const userrr = await User.findOne({ email });

  console.log(password);
  if (userrr) {
    const result = await bcrypt.compare(password, userrr.password);
    if (result) {
      res.json({ valid: "logged", user: userrr });
    } else {
      res.json({ valid: "wrong", user: {} });
    }
  } else {
    res.json({ valid: "not", user: {} });
  }

  // User.find({email,password}).then((data)=> res.json(data))
  // User.find({email,password}).then((data)=> console.log(data))
});

router.delete("/users/:id", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.patch("/users/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
});

module.exports = router;
