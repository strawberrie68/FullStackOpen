const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.post("/", async (request, response) => {
  const {username, name, password} = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({error: "Please provide both username and password."})
      .end();
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "You username and password must be longer than 3 charaters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
