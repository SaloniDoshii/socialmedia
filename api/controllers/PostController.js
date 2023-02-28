/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //view all post
  showPost: async (req, res) => {
    //pagination
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const pagelimit = parseInt(limit);
    if (limit) {
      const getpost = await Post.find()
        .skip(skip)
        .limit(pagelimit)
        .sort([{ createdAt: "DESC" }]);
      if (getpost) {
        res.status(500).json({
          message: " All post ",
          getpost: getpost,
        });
      } else {
        res.status(500).json({
          message: " error ",
        });
      }
    } else {
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
    }
  },

  //create post
  postCreate: async (req, res) => {
    console.log("user:", req.userData);
    const userid = req.userData.id;
    console.log("id:", userid);
    const image = req.body.image;
    const text = req.body.text;
    const d = new Date();
    d.getTime();

    console.log(req.body);

    const post = await Post.create({
      id: sails.config.constants.UUID(),
      image: image,
      text: text,
      userid: userid,
      createdAt: d,
    }).fetch();
    if (post) {
      res.status(201).json({
        message: "post created successfully ",
        post,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};
