const fs = require('fs');
const report = JSON.parse(fs.readFileSync('g:/wedding-invitation/lighthouse-report.report.json', 'utf8'));

const lcpAudit = report.audits['largest-contentful-paint-element'];
console.log('--- LCP AUDIT ---');
console.log(JSON.stringify(lcpAudit, null, 2));

const lcpMetric = report.audits['largest-contentful-paint'];
console.log('\n--- LCP METRIC ---');
console.log(JSON.stringify(lcpMetric, null, 2));

const diagnosticNode = report.audits['largest-contentful-paint-element'].details.items[0].node;
console.log('\n--- LCP NODE ---');
console.log(JSON.stringify(diagnosticNode, null, 2));
