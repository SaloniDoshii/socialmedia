/**
 * LikesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //user can like the post
  statusLike: async (req, res) => {
    console.log("user:", req.userData);
    const userid = req.userData.id;
    console.log("id:", userid);
    const postid = req.params.id;

    const d = new Date();
    d.getTime();

    console.log(req.body);
    const likes = await Likes.findOne({ postid: postid, userid: userid });
    if (likes) {
      const like = await Likes.updateOne({
        postid: postid,
      }).set({ isLike: true, updatedAt: d });
      res.status(201).json({
        message: "Like successfully ",
        like,
      });
    } else {
      const like = await Likes.create({
        id: sails.config.constants.UUID(),
        userid: userid,
        postid: postid,
        createdAt: d,
      }).fetch();
      if (like) {
        res.status(201).json({
          message: "Like successfully ",
          like,
        });
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  },

  //user can dislike the post
  statusDislike: async (req, res) => {
    console.log("user:", req.userData);
    const userid = req.userData.id;
    console.log("id:", userid);
    const postid = req.params.id;

    const d = new Date();
    d.getTime();

    const like = await Likes.updateOne({
      postid: postid,
    }).set({ isLike: false, updatedAt: d });
    if (like) {
      res.status(201).json({
        message: "Dislike successfully ",
        like,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};
