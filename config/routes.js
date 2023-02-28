/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  //admin static signup route
  //  'POST /signup/create': "AdminController.adminCreate",
  //admin login
  "POST /admin/login": "AdminController.adminLogin",
  //admin logout
  "POST /admin/logout": "AdminController.adminLogout",
  //admin can view user
  "GET /admin/getuser": "AdminController.getUser",
  //admin change status
  "GET /admin/viewpost": "AdminController.viewPost",
  //admin view post
  "POST /admin/userstatus/:id": "AdminController.userStatus",

  //upload images
  "POST /uploads": "FilesController.images",

  //user create
  "POST /user/create": "UserController.userCreate",
  //user login
  "POST /user/login": "UserController.userLogin",
  //user change password
  "POST /user/changepassword": "UserController.changePassword",
  //user change profile picture
  "POST /user/changeprofilepicture": "UserController.changeProfilepicture",
  //user can view all user
  "GET /user/get": "UserController.showUser",
  //user can view single user by user id
  "GET /user/view/:id": "UserController.viewuser",
  //user logout
  "POST /logout": "UserController.userLogout",

  //user can follow another user
  "POST /user/follow/:id": "FollowController.statusFollow",
  //user can unfollow the following user
  "POST /user/unfollow": "FollowController.statusUnfollow",
  //user can see all followers
  "GET /user/getfollower": "FollowController.getFollowers",
  //user can see all following
  "GET /user/getfollowing": "FollowController.getFollowing",

  //user can create post
  "POST /user/post": "PostController.postCreate",
  //user can see all post
  "GET /user/getpost": "PostController.showPost",

  //user can like post by post id
  "POST /user/like/:id": "LikesController.statusLike",
  //user can dislike post by post id
  "POST /user/dislike/:id": "LikesController.statusDislike",

  //user can comment on another post by post id
  "POST /user/comment/:id": "CommentsController.commentCreate",
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
