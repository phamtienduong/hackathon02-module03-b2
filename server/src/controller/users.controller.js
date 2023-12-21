const { getUserByEmail } = require("../repository/users.repository");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Xu li Logic va gui  response ve client
async function login(req, res) {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);
  if (!result) {
    return res.status(404).json({
      message: "Email chưa được đăng ký",
    });
  }
  if (result.password != password) {
    return res.status(400).json({
      message: "Sai mật khẩu",
    });
  }
  const token = jwt.sign(
    { id: result.id, role: result.role },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    message: "Đăng nhập thành công",
    token,
  });
}

module.exports = {
  login,
};
