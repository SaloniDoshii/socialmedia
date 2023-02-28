/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  AdminController: {
    //authorization on routes except admin login
    adminLogout: "check-auth",
    userStatus: "check-auth",
    getUser: "check-auth",
    userStatus: "check-auth",
    viewPost: "check-auth",
  },

  UserController: {
    //authorization on all routes except user create and user login
    changePassword: "check-auth",
    changeProfilepicture: "check-auth",
    showUser: "check-auth",
    viewuser: "check-auth",
    userLogout: "check-auth",
  },

  FilesController: {
    //authorization on all routes
    "*": "check-auth",
  },

  FollowController: {
    //authorization on all routes
    "*": "check-auth",
  },
  PostController: {
    //authorization on all routes
    "*": "check-auth",
  },
  LikesController: {
    //authorization on all routes
    "*": "check-auth",
  },
  CommentsController: {
    //authorization on all routes
    "*": "check-auth",
  },
};
