var chai = require( 'chai' );
var expect = chai.expect;
var kernel = require( './../lib/' );

describe(".fun", function(){
  it("is an object of kernel functions", function(){
    expect(kernel.fun).to.be.an("object");
    expect(kernel.fun).to.include.keys(["gaussian", "boxcar", "epanechnikov", "tricube"]);
  });
});

describe(".density()", function(){
  it("throws when negative bandwidth is provided", function(){
    expect(function(){
      kernel.density([-2,  0, 1], kernel.fun.gaussian, -2);
    }).to.throw(Error);
  });

  it("throws when no kernel function is provided", function(){
    expect(function(){
      kernel.density([-2,  0, 1], null, 0.3);
    }).to.throw(Error);
  });

  it("returns a function", function(){
    var f = kernel.density([-2,  0, 1], kernel.fun.gaussian, 0.3);
    expect(f).to.be.a("function");
  });
});

describe(".regression()", function(){
  it("throws when negative bandwidth is provided", function(){
    expect(function(){
      kernel.regression([-2,  0, 1], [2,3,5], kernel.fun.gaussian, -2);
    }).to.throw(Error);
  });

  it("throws when no kernel function is provided", function(){
    expect(function(){
      kernel.regression([-2,  0, 1], [2,3,5], null, 0.3);
    }).to.throw(Error);
  });

  it("throws when no ys are supplied", function(){
    expect(function(){
      kernel.regression([-2,  0, 1], null,  kernel.fun.gaussian, 0.3);
    }).to.throw(Error);
  });

  it("returns a function", function(){
    var f = kernel.regression([-2,  0, 1], [2,3,5], kernel.fun.gaussian, 0.3);
    expect(f).to.be.a("function");
  });
});

describe(".multipleRegression()", function(){
  it("throws when negative bandwidth is provided", function(){
    expect(function(){
      kernel.multipleRegression([[-2,  0],[3, 5],[8, 8]], [2,3,5], kernel.fun.gaussian, -2);
    }).to.throw(Error);
  });

  it("throws when no kernel function is provided", function(){
    expect(function(){
      kernel.multipleRegression([[-2,  0],[3, 5],[8, 8]], [2,3,5], null, 0.3);
    }).to.throw(Error);
  });

  it("throws when no ys are supplied", function(){
    expect(function(){
      kernel.multipleRegression([[-2,  0],[3, 5],[8, 8]], null,  kernel.fun.gaussian, 0.3);
    }).to.throw(Error);
  });

  it("returns a function", function(){
    var f = kernel.multipleRegression([[-2,  0],[3, 5],[8, 8]], [2,3,5], kernel.fun.gaussian, 0.3);
    expect(f).to.be.a("function");
  });
  it("the returned function expects array of length p as input", function(){
    var f = kernel.multipleRegression([[2, 0],[3, 5],[8, 8]], [2,3,5], kernel.fun.gaussian, 0.3);
    var x_p = [1,3];
    var res = f(x_p);
    expect(res).to.be.a("number");
    expect(function(){
      f([2,3,4]);
    }).to.throw(Error);
  });
});

describe(".silverman()", function(){
  it("returns an optimal bandwith", function(){
    var x = [0,0,1,1,1,2,2];
    var h = kernel.silverman(x);
    expect(h).to.be.above(0);
  });
});
