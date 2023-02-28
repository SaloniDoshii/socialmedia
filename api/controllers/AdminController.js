/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  //admin login
  adminLogin: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      res.status(500).json({
        message: "Email id is not registered ",
      });
    } else {
      if (await bcrypt.compare(password, admin.password)) {
        const id = admin.id;
        const token = jwt.sign({ email: admin.email, id: admin.id }, "secret");
        console.log(token);
        const data = await Admin.updateOne({ id: admin.id }).set({
          token: token,
        });
        console.log(data);

        res.status(201).json({
          message: "Admin login successfully ",
          data: token,
        });
      } else {
        res.status(500).json({
          message: "Password is incorrect ",
        });
      }
    }
  },

  //create static admin
  // adminCreate: async (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const d = new Date();
  //   d.getTime();

  //   console.log(req.body);
  //   const admin = await Admin.create({
  //     id: sails.config.constants.UUID(),
  //     email: email,
  //     password: password,
  //     createdAt: d,
  //   }).fetch();
  //   if (admin) {
  //     res.status(201).json({
  //       message: "Admin created successfully ",
  //       admin,
  //     });
  //   } else {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   }
  //   console.log(admin);
  // },

  //admin show user
  getUser: async (req, res) => {
    //pagination
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const pagelimit = parseInt(limit);
    if (limit) {
      const getuser = await User.find()
        .skip(skip)
        .limit(pagelimit)
        .sort([{ createdAt: "DESC" }]);
      if (getuser) {
        res.status(500).json({
          message: " All user ",
          getuser: getuser,
        });
      } else {
        res.status(500).json({
          message: " error ",
        });
      }
    } else {
      let search = req.query.search;
      if (!search) {
        const getuser = await User.find().sort([{ createdAt: "DESC" }]);
        if (getuser) {
          res.status(500).json({
            message: " All user ",
            getuser: getuser,
          });
        } else {
          res.status(500).json({
            message: " error ",
          });
        }
      } else {
        //search
        const user = await User.find({ username: { contains: search } });
        console.log(user);
        res.status(200).json({ user: user });
      }
    }
  },

  // userstatus active and inactive
  userStatus: async (req, res) => {
    try {
      const userid = await User.findOne({ id: req.params.id });
      const isActive = req.body.isActive;

      const data = await User.updateOne({ id: req.params.id }).set({
        isActive: isActive,

        updatedAt: new Date(),
      });
      res.status(201).json({
        message: " Status updated successfully ",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  //view user post
  viewPost: async (req, res) => {
    const post = await Post.find().sort([{ createdAt: "DESC" }]);
    if (post) {
      res.status(500).json({
        message: " All post ",
        post: post,
      });
    } else {
      res.status(500).json({
        message: " error ",
      });
    }
  },
  //admin logout
  adminLogout: async (req, res) => {
    try {
      console.log("user:", req.userData);
      const id = req.userData.id;
      console.log("userid", id);
      //updates token null
      const data = await Admin.update({ id: id }).set({
        token: null,
      });
      res.status(500).json({
        message: " Logout successfully ",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
