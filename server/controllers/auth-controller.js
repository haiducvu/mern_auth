const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // create data to database
    userModel.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email: email,
      role: "regular",
    });
    return res.status(200).send("resgister user");
  } catch (error) {
    console.log("error", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email,
    });
    // check email exist
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // check password
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res.status(400).send("Invalid email or password");
    }

    const jwtToken = jwt.sign({
      _id: user.id,
      username: user.username,
      role: user.role,
    }, process.env.SECRET_JWT, { expiresIn: 3600 });  // expire token

    return res.status(200).send({
      accessToken: jwtToken
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  register: register,
  login: login,
};
