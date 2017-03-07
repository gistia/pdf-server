const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const request = require('request');
const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :req[content-length] :res[content-length] :response-time ms'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(compression());
app.use(cors());

app.get('/', (req, res) => {
  const target = req.query.target;
  console.log('target', target);
  request(target).pipe(res);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
});
