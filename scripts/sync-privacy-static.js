const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../public/apps/privacy/index.html');
const dest = path.join(__dirname, '../public/apps/privacy/document.txt');

fs.copyFileSync(src, dest);
