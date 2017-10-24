var express = require('express');
var config = require('./config/index');
// 设置端口
var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();
// 获取数据
router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
})
// 定义mock数据接口
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 定义路由
var apiRoutes = express.Router();
// 读取数据
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
// 定义数据输出接口
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

var url = 'http://localhost:' + port;
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at ' + url + '\n');
});
