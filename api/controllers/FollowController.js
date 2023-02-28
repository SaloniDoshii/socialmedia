/**
 * FollowController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //show all followers
  getFollowers: async (req, res) => {
    console.log("user:", req.userData);
    const id = req.userData.id;
    console.log("userid", id);
    const user = await Follow.find()
      .where({
        followid: id,
        isFollow: true,
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

  //show all following
  getFollowing: async (req, res) => {
    console.log("user:", req.userData);
    const id = req.userData.id;
    console.log("userid", id);
    const user = await Follow.find()
      .where({
        userid: id,
        isFollow: true,
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

  //user can follow another user
  statusFollow: async (req, res) => {
    console.log("user:", req.userData);
    const userid = req.userData.id;
    console.log("id:", userid);
    const followid = req.params.id;

    const d = new Date();
    d.getTime();

    console.log(req.body);
    const follow = await Follow.findOne({ followid: followid, userid: userid });
    if (follow) {
      const follow = await Likes.updateOne({
        followid: followid,
      }).set({ isFollow: true, updatedAt: d });
      res.status(201).json({
        message: "Like successfully ",
        follow,
      });
    } else {
      const follow = await Follow.create({
        id: sails.config.constants.UUID(),
        userid: userid,
        followid: followid,
        createdAt: d,
      }).fetch();
      if (follow) {
        res.status(201).json({
          message: "Following successfully ",
          follow,
        });
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  },

  //user can unfollow another user
  statusUnfollow: async (req, res) => {
    try {
      console.log("user:", req.userData);
      const id = req.userData.id;
      console.log("id:", id);
      const followid = req.body.followid;
      const status = await Follow.updateOne({ followid: followid }).set({
        isFollow: false,
      });
      res.status(201).json({
        message: " Unfollow successfully ",
        status,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
