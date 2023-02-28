/**
 * FilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//

module.exports = {
  //uploading image for post and profile picture
  images: async (req, res) => {
    let image = req.file("profilepic");
    console.log("images", image);
    let profilepic = await image.upload(
      {
        dirname: process.env.BASE_PATH,
      },
      (err, profilepic) => {
        if (err) {
          console.log(err);
        }
        console.log(profilepic);
        res.status(200).json({ message: "image uploaded", profilepic });
      }
    );
    console.log(profilepic);
  },
};
