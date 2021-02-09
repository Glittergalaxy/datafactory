/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const getData = (req, res) => {
  const url = req.url.split('?')[0];
  const jsonPath = path.join(
    './mock',
    `/${req.method.toLowerCase()}/${url}.json`,
  );

  if (fs.existsSync(jsonPath)) {
    const data = fs.readFileSync(jsonPath);
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(data.toString());
  } else {
    const responseTemplate = JSON.stringify({
      errorNo: 0,
      message: 'success',
      result: {},
    });
    const dir = jsonPath
      .split('/')
      .slice(0, -1)
      .join('/');
    fs.mkdir(dir, { recursive: true }, () => {
      fs.writeFile(jsonPath, responseTemplate, (error) => {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end(responseTemplate);
      });
    });
  }
};

const map = {
  '/system/*': '',
};

const feMock = (app) => {
  Object.keys(map).forEach((route) => {
    app.get(route, (req, res) => {
      getData(req, res);
    });

    app.post(route, (req, res) => {
      getData(req, res);
    });
  });
};

module.exports = feMock;
