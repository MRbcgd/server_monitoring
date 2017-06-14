var ip = require('ip');
var JsonSocket = require('json-socket');
var os = require('os');
var fs = require('fs');

const local_ip = '192.168.20.128';

module.exports.ip_chk = function (ip_addr) {//check local ip
  console.log(ip_addr);

  if ( ip_addr === local_ip ) return true;
  else return false;
};
module.exports.cpu_info = function () {//system info
  var cpuinfo = require('proc-cpuinfo')();
  var result = {};
  
  result.model_name = cpuinfo.model_name.join(' ');
  result.cpu_MHz = cpuinfo.cpu_MHz[0];
  result.cache_size = cpuinfo.cache_size.join(' ');
  result.stepping = cpuinfo.stepping[0];
  result.vendor_id = cpuinfo.vendor_id[0];
  result.bogomips = cpuinfo.bogomips[0];

  return result;
};
module.exports.mem_info = function () {
  var info = {};
  var result = {};
  var data = fs.readFileSync('/proc/meminfo').toString();
  data.split(/\n/g).forEach(function(line){
      line = line.split(':');

      // Ignore invalid lines, if any
      if (line.length < 2) {
          return;
      }

      // Remove parseInt call to make all values strings
      info[line[0]] = parseInt(line[1].trim(), 10);
  });

  result.MemTotal = info.MemTotal;
  result.MemFree = info.MemFree;
  result.MemSwap = info.SwapTotal - info.SwapFree;

  return result;
};
module.exports.stat_info = function (data1,data2) {
  var result = {};

  for(var key in data1) result[key] = data1[key];
  for(var key in data2) result[key] = data2[key];

  result.platform = os.platform();
  result.kernel = 'i dnt knw.';
  result.hostname = os.hostname();
  result.ip = ip.address();

  return result;
};
