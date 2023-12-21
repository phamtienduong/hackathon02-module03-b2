const { login } = require("../controller/users.controller");

const usersRouter = (app) => {
  app.post("/api/v1/login", login);
};

module.exports = { usersRouter };
