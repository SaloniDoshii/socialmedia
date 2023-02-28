/**
 * CommentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //create comment
  commentCreate: async (req, res) => {
    console.log("user:", req.userData);
    const userid = req.userData.id;
    const postid = req.params.id;
    console.log("id:", userid);

    const comment = req.body.comment;
    const d = new Date();
    d.getTime();
    console.log(req.body);

    const comments = await Comments.create({
      id: sails.config.constants.UUID(),
      userid: userid,
      postid: postid,
      comment: comment,
      createdAt: d,
    }).fetch();
    if (comments) {
      res.status(201).json({
        message: "Comment done successfully ",
        comments,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};
