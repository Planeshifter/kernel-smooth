# kernelSmoother.js
nonparametric kernel smoothing

## Installation

Via npm:
```
npm install kernel
```

Require as follows:
```
var kernel = require('kernel');
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
this function returns the Nadaraya & Watson kernel  regression estimator:
a function of one variable, `x`, which when invoked returns the
estimate for `y`. The returned function can also be called with a
vector supplied as an argument for `x`. In this case, predictions are generated
for each element of the vector and the vector of predictions
is returned.

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
