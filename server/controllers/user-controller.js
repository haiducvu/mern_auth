const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const getListUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.log("error", error);
  }
};

const postUser = (req, res) => {
  try {
    // save data to use collection
    const { username, password, email, role } = req.body;
    // create data to database
    userModel.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email: email,
      role: role,
    });
    res.status(200).send("create user success");
  } catch (error) {
    // // send code error to use refresh token
    // if( error instanceof jwt.TokenExpiredError) {
    //   return res.status(401).send('Token Expried');
    // }
    // console.log('error', error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userModel.findByIdAndRemove(userId);
    return res.status(200).send("delete user success");
  } catch (error) {}
};

module.exports = {
  getListUsers: getListUsers,
  postUser: postUser,
  deleteUser: deleteUser,
};
