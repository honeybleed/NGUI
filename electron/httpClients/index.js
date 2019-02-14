const { ReadConfig } = require('../nativeTools');
const VERSION_3 = 0;
const VERSION_5 = 1;
const TIMEOUT = 5000;
function _createOptions( uri, query, version) {
  let ret = {
    host: ReadConfig('CenterIP'),
    port: ReadConfig('CenterPort'),
    path: null
  };
  switch (version) {
    case VERSION_3:
      ret.path = _getV3Path(uri, query);
      break;
    case VERSION_5:
      ret.path = _getV5Path();
      break;
    default:
      break;
  }
  return ret;
}
function _getV3Path(uri, query) {
  let path = '/center/3.0/' + uri + '/?';
  if (!query) {
    query = new Map();
  }
  query.set('skey', ReadConfig('SKEY'));
  for(let [key, value] of query) {
    path += key + "=" + value + "&";
  }
  return path;
}
function _getV5Path() {
  return '/api/';
}
function DoGet(uri, query) {
  let options = _createOptions(uri, query, VERSION_3);
  options.method = "GET";
  return new Promise((resolve, reject) => {
    let timeoutID;
    let req = require('http').request(options, (res) => {
      clearTimeout(timeoutID);
      if (res.statusCode !== 200) {
        reject({errorNo: res.statusCode, errorMsg:"HTTP 请求异常： " + res.statusCode});
        return;
      }
      res.setEncoding('utf-8');
      let resData = "";
      res.on('data', (chunk) => {
        resData += chunk;
      });
      res.on('end', () => {
        let apiResponse = JSON.parse(resData);
        if (apiResponse.errorObj.errorNo !== 0) {
          reject({errorNo: apiResponse.errorObj.errorNo, errorMsg: "API 请求异常： " + apiResponse.errorObj.errorMsgCN});
        } else {
          resolve(apiResponse.data);
        }
      });
    });
    req.on('error', (err) => {
      clearTimeout(timeoutID);
      reject({errorNo:500, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.on('timeout', (err) => {
      req.abort();
      reject({errorNo:408, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.end();
    timeoutID = setTimeout(() => {
      req.emit('timeout', {message: '请求超时'});
    }, TIMEOUT);
  });
}
function DoPostV3(uri, query, data) {
  let options = _createOptions(uri, query, VERSION_3);
  options.method = "POST";
  let postData = "argObj=" + JSON.stringify(data);
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length':Buffer.byteLength(postData)
  };
  console.log('-----------------------------request------------------------------');
  console.log('POST: ');
  console.log(options.host + ":" + options.port + "//" + options.path);
  console.log('Data: ');
  console.log(postData);

  return new Promise((resolve, reject) => {
    let timeoutID;
    let req = require('http').request(options, (res) => {
      clearTimeout(timeoutID);
      if (res.statusCode !== 200) {
        reject({errorNo: res.statusCode, errorMsg:"HTTP 请求异常： " + res.statusCode});
        return;
      }
      res.setEncoding('utf-8');
      let resData = "";
      res.on('data', (chunk) => {
        resData += chunk;
      });
      res.on('end', () => {
        console.log('-----------------------------response-------------------------------');
        console.log(resData);
        // console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        // console.log();
        // console.log('{}{}{}{}{}{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}');
        let apiResponse = JSON.parse(resData);
        if (apiResponse.errorObj.errorNo !== 0) {
          reject({errorNo: apiResponse.errorObj.errorNo, errorMsg: "API 请求异常： " + apiResponse.errorObj.errorMsgCN});
        } else {
          resolve(apiResponse.data);
        }
      });
    });
    req.on('error', (err) => {
      clearTimeout(timeoutID);
      reject({errorNo:500, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.on('timeout', (err) => {
      req.abort();
      reject({errorNo:408, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.write(postData);
    req.end();
    timeoutID = setTimeout(() => {
      req.emit('timeout', {message: '请求超时'});
    }, TIMEOUT);
  });
}
function DoPostV5(data) {
  let options = _createOptions("", null, VERSION_5);
  options.method = "POST";
  options.rejectUnauthorized = false;
  options.requestCert = false;
  let postData = JSON.stringify(data);
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length':Buffer.byteLength(postData)
  };
  return new Promise((resolve, reject) => {
    let timeoutID;
    let req = require('https').request(options, (res) => {
      clearTimeout(timeoutID);
      if (res.statusCode !== 200) {
        reject({errorNo: res.statusCode, errorMsg:"HTTP 请求异常： " + res.statusCode});
        return;
      }
      res.setEncoding('utf-8');
      let resData = "";
      res.on('data', (chunk) => {
        resData += chunk;
      });
      res.on('end', () => {
        let apiResponse = JSON.parse(resData);
        if (apiResponse.errorObj.errorNo !== 0) {
          reject({errorNo: apiResponse.errorObj.errorNo, errorMsg: "API 请求异常： " + apiResponse.errorObj.errorMsg});
        } else {
          if(!apiResponse.data){
            apiResponse.data = {};
          }
          if (apiResponse.session) {
            apiResponse.data.session_id = apiResponse.session.uuid;
          }
          resolve(apiResponse.data);
        }
      });
    });
    req.on('error', (err) => {
      clearTimeout(timeoutID);
      if(err.code === 'EPROTO') {
        err.message = "端口异常"
      }
      reject({errorNo:500, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.on('timeout', (err) => {
      req.abort();
      reject({errorNo:408, errorMsg: "HTTP 请求异常： " + err.message});
    });
    req.write(postData);
    req.end();
    timeoutID = setTimeout(() => {
      req.emit('timeout', {message: '请求超时'});
    }, TIMEOUT);
  });
}
module.exports.DoGet = DoGet;
module.exports.DoPostV3 = DoPostV3;
module.exports.DoPostV5 = DoPostV5;
module.exports.VERSION = {
  VERSION_3: VERSION_3,
  VERSION_5: VERSION_5
};
