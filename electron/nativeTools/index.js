const crypto = require('crypto');
const Store = require('../configStorage');
/**
 * @return {string}
 */
function MD5(ori) {
  const md5 = crypto.createHash('md5');
  return (md5.update(ori).digest('hex')).substr(8, 16).toUpperCase();
}
function EnBase64(ori) {
  return new Buffer(ori).toString('base64');
}
function DeBase64(ori) {
  return new Buffer(ori, 'base64').toString();
}
function EnRc4 (ori, key) {
  let cip = crypto.createCipheriv('rc4', new Buffer(key), '');
  let outBuf = [];
  outBuf.push(cip.update(new Buffer(ori)));
  outBuf.push(cip.final());
  return Buffer.concat(outBuf, outBuf[0].length + outBuf[1].length);
}
function DeRc4(ori, key) {
  let cip = crypto.createDecipheriv('rc4', key, '');
  return cip.update(ori) + cip.final();
}
function GetCipherPwd (ori) {
  let d = new Date();
  let target = "client#" + parseInt(d.getTime()/1000) + "#" + ori;
  let rc4 = EnRc4(target, "octopuslink!");
  return EnBase64(rc4).replace(/\//g, '*').replace(/\+/g, '_');
}
function GetTextPwd(ori) {
  let target = ori.replace(/\*/g, '/').replace(/_/g, '+');
  return DeRc4(new Buffer(target, 'base64'), "octopuslink!").split('#')[2];
}
/**
 * @return {string}
 */
function GetClientID() {
  let time = parseInt((new Date()).getTime()/1000);
  let rand = Math.random();
  let ori = "" + time + rand + "octlink";
  return MD5(ori);
}

function InitConfig() {
  const storeHandler = new Store({});
  // init platform
  const platform = storeHandler.get('Platform');
  if(!platform || platform === "") {
    storeHandler.set('Platform', "PC");
  }
  // init skey
  const skey = storeHandler.get('SKEY');
  if(!skey || skey === "") {
    storeHandler.set("SKEY", "00000000000000000000000000000000");
  }
  // init rdp config
  const withRDP = storeHandler.get('WithRDP');
  if(!withRDP || withRDP === "") {
    storeHandler.set('WithRDP', 'ON');
  }
  const rdpText = storeHandler.get('RDPText');
  if(!rdpText || rdpText === "") {
    storeHandler.set('RDPText', 'RDP');
  }
  //init spice config
  const withSpice = storeHandler.get('WithSpice');
  if(!withSpice || withSpice === "") {
    storeHandler.set('WithSpice', 'ON');
  }
  const spiceText = storeHandler.get('SpiceText');
  if(!spiceText || spiceText === "") {
    storeHandler.set('SpiceText', 'Spice');
  }
  //init autoConnect
  const autoConnect = storeHandler.get('AutoConnect');
  if(!autoConnect || autoConnect === "") {
    storeHandler.set('AutoConnect', 'OFF');
  }
 //init clientID
  const clientID = storeHandler.get('ClientID');
  if(!clientID || clientID === "") {
    storeHandler.set('ClientID', GetClientID());
  }
}
function ReadConfig(key) {
  const storeHandler = new Store({});
  return storeHandler.get(key);
}
function WriteConfig(key, value) {
  const storeHandler = new Store({});
  storeHandler.set(key, value);
}

module.exports.ReadConfig = ReadConfig;
module.exports.WriteConfig = WriteConfig;
module.exports.MD5 = MD5;
module.exports.EnBase64 = EnBase64;
module.exports.DeBase64 = DeBase64;
module.exports.EnRc4 = EnRc4;
module.exports.GetCipherPwd = GetCipherPwd;
module.exports.GetTextPwd = GetTextPwd;
module.exports.GetClientID = GetClientID;
module.exports.InitConfig = InitConfig;
