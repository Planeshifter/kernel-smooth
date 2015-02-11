var phi = require('gaussian')(0, 1).pdf;
var _   = require('lodash');

var ns = {};
ns.fun = {
  gaussian: function(x){
    return phi(x);
  },
  boxcar: function(x){
    return (Math.abs(x) <= 1) ? 0.5 : 0;
  },
  epanechnikov: function(x){
    return (Math.abs(x) <= 1) ? 0.75 * ( 1 - x*x) : 0;
  },
  tricube: function(x){
    function tricubed(x){
      var x_abs = 1 - Math.pow(Math.abs(x), 3);
      return Math.pow(x_abs, 3);
    }
    return (Math.abs(x) <= 1) ? (70/81) * tricubed(x) : 0 ;
  }
};

weight = function(kernel, bandwidth, x_0, x_i){
  var arg = (x_i - x_0) / bandwidth;
  return kernel(arg);
};

sum = function(arr){
  var ret = 0;
  for(var i = 0; i < arr.length; i++){
    ret += arr[i];
  }
  return ret;
};

vectorize = function(fun){
  return function(x){
    if(_.isArray(x) === false){
      return fun(x);
    } else {
      return x.map(function(x){
        return fun(x);
      });
    }
  };
};

ns.density = function(xs, kernel, bandwidth){
  bandwidth = bandwidth || 0.5;
  var _xs = xs;
  var n = xs.length;
  var weight_fun = weight.bind(null, kernel, bandwidth);

  var kernel_smoother = function(x){
    var weights = _xs.map(function(x_i){
      return weight_fun(x, x_i);
    });
    var num = sum(weights);
    var denom = n*bandwidth;
    return num / denom;
  };

  return vectorize(kernel_smoother);
};

ns.regression =  function(xs, ys, kernel, bandwidth){
  bandwidth = bandwidth || 0.5;
  var _xs = xs;
  var _ys = ys;
  var weight_fun = weight.bind(null, kernel, bandwidth);

  var kernel_smoother = function(x){
    var weights = _xs.map(function(x_i){
      return weight_fun(x, x_i);
    });
    var num = sum( weights.map(function(w, i){
      return w * _ys[i];
    }) );
    var denom = sum(weights);
    return num / denom;
  };

  return vectorize(kernel_smoother);
};

module.exports = exports = ns;
