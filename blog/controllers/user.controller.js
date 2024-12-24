const User = require("../models/user.schema");
const bcrypt = require("bcryptjs");

exports.getSignupPage = (req, res) => {
  res.render("signup");
};

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.signup = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send(existingUser.username);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, role });
    await user.save();
    res.cookie("role", role).cookie("id", user._id);
    res.status(201).send(`Account created successfully ${username}`);
  } catch (err) {
    res.status(500).send("Error creating account");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid Credentials.");
    }
    res.cookie("role", user.role).cookie("id", user._id);
    res.status(200).send(`Welcome User ${user.username}`);
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};
