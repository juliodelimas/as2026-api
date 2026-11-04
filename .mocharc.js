module.exports = {
  spec: 'test/**/*.test.js',
  timeout: 10000,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    reportFilename: 'checkout-discount-ep',
    quiet: true,
    overwrite: true,
    html: true,
    json: true,
    charts: true,
    code: true,
    reportTitle: 'AS2026 API — Checkout Discount EP',
    reportPageTitle: 'Checkout Discount Equivalence Partitioning',
  },
};
