const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // 设置后可以用 req.body 获取 POST 传入 data

app.use(cors());

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options")
    res.send(200); //让options尝试请求快速结束
  else next();
});

// 连接数据库
require("./db/db")(app);

require("./routes/user")(app);
require("./routes/data")(app);

app.listen(3222, () => {
  console.log("监听成功");
});
