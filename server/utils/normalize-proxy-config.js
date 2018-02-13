//
// proxy breakdown
// see: https://github.com/chimurai/http-proxy-middleware
// see: https://webpack.js.org/configuration/dev-server/#devserver-proxy
//
// proxy: {
//   "/api": "http://localhost:3000"
// }
//
// transforms to:
//
// proxy: {
//   context: "/api",
//   options: {
//     target: "http://localhost:3000",
//   }
// }
//
//
// proxy: {
//   "/api": {
//     target: "http://localhost:3000"
//     ...rest
//   }
// }
//
// transforms to:
//
// proxy: {
//   context: "/api",
//   options: {
//     target: "http://localhost:3000",
//     ...rest
//   }
// }
//
//
// proxy: [
//   {
//     context: ["/auth", "/api"],
//     options: {
//       target: "http://localhost:3000"
//       ...rest
//     }
//   }
// ]
//
// transforms to:
//
//
// proxy: [
//   {
//     context: ["/auth", "/api"],
//     options: {
//       target: "http://localhost:3000"
//       ...rest
//     }
//   }
// ]
//

const normalizeProxyConfig = proxyConfig => {
  let context = Object.keys(proxyConfig)[0];            // -> "/api" or 'context'
  const val = proxyConfig[Object.keys(proxyConfig)[0]]; // -> "http://localhost:3000"  or ["/auth", "/api"] or an object
  let options = {};

  if (context === 'context') {
    context = val;
    Object.keys(proxyConfig.options).forEach((key) => {
      options[key] = proxyConfig.options[key];
    });
  }
  else {
    options = (typeof val === 'string' || val instanceof String)
      ? { target: val }
      : val;
  }

  return {
    context: context,
    options: options
  };
};

export default normalizeProxyConfig;
