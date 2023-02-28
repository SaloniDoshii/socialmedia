/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  //view all user
  showUser: async (req, res) => {
    console.log("user:", req.userData);
    const id = req.userData.id;
    console.log("userid", id);
    const user = await User.find({
      select: ["email", "username", "profilepic"],
    })
      .where({
        id: { "!=": req.userData.id },
      })
      .sort([{ createdAt: "DESC" }]);

    if (user) {
      res.status(500).json({
        message: " success ",
        user: user,
      });
    } else {
      res.status(500).json({
        message: " error ",
      });
    }
    console.log("user", user);
  },

  //user login
  userLogin: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username, isActive: true });

    if (!user) {
      res.status(500).json({
        message: " You are deactivated by Admin ",
      });
    } else {
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ email: user.email, id: user.id }, "secret");
          console.log(token);
          const data = await User.updateOne({ id: user.id }).set({
            token: token,
          });
          console.log(data);

          res.status(201).json({
            message: "user login successfully",
            data,
          });
        } else {
          res.status(500).json({
            message: "Password is incorrect ",
          });
        }
      } else {
        res.status(500).json({
          message: "err",
        });
      }
    }
  },

  //create user
  userCreate: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const profilepic = req.body.profilepic;
    const d = new Date();
    d.getTime();

    console.log(req.body);
    const users = await User.find({ username: username });
    const mailid = await User.find({ email: email });
    if (users.length != 0) {
      res.status(201).json({
        message: "Username already exists ",
      });
    }
    if (mailid.length != 0) {
      res.status(201).json({
        message: "Email id already exists ",
      });
    } else {
      const user = await User.create({
        id: sails.config.constants.UUID(),
        email: email,
        password: password,
        username: username,
        profilepic: profilepic,
        createdAt: d,
      }).fetch();
      if (user) {
        res.status(201).json({
          message: "User created successfully ",
        });
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  },

  //user can change password
  changePassword: async (req, res) => {
    try {
      const password = req.body.password;
      let newpassword = req.body.newpassword;
      console.log(req.body);
      const d = new Date();
      d.getTime();
      let hash = await bcrypt.hashSync(newpassword, 10, (err, hash) => {
        if (err) {
          // throw new Error(err);
          console.log(err);
        }
        newpassword = hash;
      });
      console.log(hash);
      console.log("user:", req.userData);
      const id = req.userData.id;
      console.log("id:", id);
      const data = await User.updateOne({ id: id }).set({
        password: hash,
        updatedAt: d,
      });
      res.status(201).json({
        message: " Password updated successfully ",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //user can change profile picture
  changeProfilepicture: async (req, res) => {
    try {
      const profilepic = req.body.profilepic;
      const newprofilepic = req.body.newprofilepic;
      const d = new Date();
      d.getTime();
      console.log("user:", req.userData);
      const id = req.userData.id;
      console.log("id:", id);
      const data = await User.updateOne({ id: id }).set({
        profilepic: newprofilepic,
        updatedAt: d,
      });
      res.status(201).json({
        message: " profilepic updated successfully ",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //user can view a single user
  viewuser: async (req, res) => {
    const id = req.params.id;
    const user = await User.find({
      select: ["email", "username", "profilepic"],
    }).where({
      id: req.params.id,
    });
    const post = await Post.find({ userid: id });
    const likes = await Likes.find({ userid: id });
    const comment = await Comments.find({ userid: id });

    if (user) {
      res.status(201).json({
        message: "view user ",
        user,
        post,
        likes,
        comment,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },

  //user logout
  userLogout: async (req, res) => {
    try {
      console.log("user:", req.userData);
      const id = req.userData.id;
      console.log("userid", id);
      //updates token null
      const data = await User.update({ id: id }).set({
        token: null,
      });
      res.status(500).json({
        message: " Logout successfully ",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
