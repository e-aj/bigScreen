module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");

  // 引入jwt
  const jwt = require("jsonwebtoken");
  // 解析token的用的秘钥
  const SECRET = "token_secret";

  // 引入md5
  const md5 = require("js-md5");

  const User = mongoose.model("User");

  app.use("/user", router);

  // 注册接口
  router.post("/register", async (req, res) => {
    const username = await User.findOne({
      username: req.body.username,
    });
    if (username) {
      return res.send({
        status: "000001",
        message: "用户名已存在",
      });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send({
      status: "000000",
      message: "注册成功",
    });
  });

  // 登录接口
  router.post("/login", async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.send({
        status: "000001",
        message: "用户名不存在",
      });
    }
    // bcrypt.compareSync 解密匹配，返回 boolean 值
    const isPasswordValid = require("bcrypt").compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.send({
        status:'000002',
        message: "密码错误！",
      });
    }
    /* 
        生成 token
        jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
        */
    const token = jwt.sign({ id: String(user._id) }, SECRET);
    res.send({ user, token, status: "000000", message: "登录成功" });
  });

  // 根据用户名修改密码
  router.post("/updatepwd", async (req, res) => {
      const user = await User.updateOne({
        username: req.body.username,
        password: req.body.password,
      })
      res.send('ok')
      
  });

  // 根据token  获取用户信息
router.get('/profile', async (req, res) => {
  const raw = String(req.headers.authorization.split(' ').pop())
  // 解密 token 获取对应的id
  const { id } = jwt.verify(raw, SECRET)
  req.user = await User.findById(id)
  res.send(req.user)
})

}