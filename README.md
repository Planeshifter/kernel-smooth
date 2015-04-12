[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]

# kernelSmooth

> nonparametric kernel smoothing for JavaScript

## Installation

Via npm:
```
npm install kernel-smooth
```

Require as follows:
```
var kernel = require('kernel-smooth');
```

## API

### .density(xs, kernel, [bandwidth])

Given input data `xs`, a kernel function and a bandwidth (if not supplied,
a default value of 0.5 is used), this function returns a basic kernel density
estimator: a function of one variable, `x`, which when invoked returns the
kernel density estimate for `x`. The returned function can also be called with a
vector supplied as an argument for `x`. In this case, the density is evaluated
is for each element of the vector and the vector of density estimates
is returned.

### .regression(xs, ys, kernel, [bandwidth])

Given input predictors `xs` and observed responses `ys`, a kernel function
and a bandwidth (if not supplied, a default value of 0.5 is used),
this function returns the Nadaraya & Watson kernel regression estimator:
a function of one variable, `x`, which when invoked returns the
estimate for `y`. The returned function can also be called with a
vector supplied as an argument for `x`. In this case, predictions are generated
for each element of the vector and the vector of predictions
is returned.

### .mutipleRegression(Xs, ys, kernel, [bandwidth])

Similar to .regression(), except that Xs should be a 2d array containing multiple predictors. Each element of `Xs` should has to be an array of length `p`, with `p` denoting the number of predictors. The returned estimator generates a prediction for a new data point x = (x_1, ..., x_p). If a 2d array is supplied instead, predictions are generated for multiple data points at once, where each row (= element of the outer array) is assumed to be a datum x = (x_1, ..., x_p).

### Choice of Kernel function

For the `kernel` parameter in above functions, you should supply a univariate function `K(x)` which satisfies K(x) >= 0, integrates to one, has zero mean and unit variance.
See the functions in the exported `.fun` object for a list of already implemented kernel functions.

### .fun
This object of the module holds the following kernel functions to be used for
kernel smoothing:

#### .gaussian(x)
Gaussian kernel, pdf of standard normal distribution.

#### .boxcar(x)
Boxcar kernel, defined as 0.5 if |x| <= 1 and 0 otherwise.

#### .epanechnikov(x)
Epanechnikov kernel. Equal to zero if |x| > 1. Otherwise defined as
0.75 * (1 - x^2).

#### .tricube(x)
Tricube kernel function. Equal to zero if |x| > 1 and otherwise equal to
(70/81) * (1-|x|^3)^3.

### .silverman(x)
For input vector x, calculate the optimal bandwidthe using Silverman's rule of thumb. This utility function can be used to calculate an appropriate bandwidth for the case in which a Gaussian kernel is used and one has reason to believe that the data points x_i are drawn from a normal distribution.


## License

MIT © [Philipp Burckhardt](http://www.philipp-burckhardt.com)

[npm-url]: https://npmjs.org/package/kernel-smooth
[npm-image]: https://badge.fury.io/js/kernel-smooth.svg

[travis-url]: https://travis-ci.org/Planeshifter/kernel-smooth
[travis-image]: https://travis-ci.org/Planeshifter/kernel-smooth.svg?branch=master

[coveralls-image]: https://img.shields.io/coveralls/Planeshifter/kernel-smooth/master.svg
[coveralls-url]: https://coveralls.io/r/Planeshifter/kernel-smooth?branch=master

[dependencies-url]: https://david-dm.org/Planeshifter/kernel-smooth.svg?theme=shields.io
[dependencies-image]: https://david-dm.org/Planeshifter/kernel-smooth
