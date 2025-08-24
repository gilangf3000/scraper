const https = require('https');

function penghitam(imageData, filter = 'hitam') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ imageData, filter });

    const options = {
      hostname: 'wpw.my.id',
      path: '/api/process-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

module.exports = { penghitam };