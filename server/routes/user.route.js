const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/users", authenticate, UserController.getLoggedInUser); // Get object of the single user that is logged in;
  app.post("/api/users/register", UserController.registerUser); 
  app.post("/api/users/login", UserController.loginUser);
  app.post("/api/users/logout", UserController.logoutUser);

}