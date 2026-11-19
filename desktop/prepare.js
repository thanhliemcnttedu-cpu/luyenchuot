// Sao chép giao diện web (index.html, assets/) vào thư mục web/ để đóng gói vào phần mềm
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dest = path.join(__dirname, 'web');
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(dest, 'index.html'));
fs.cpSync(path.join(root, 'assets'), path.join(dest, 'assets'), { recursive: true });
console.log('Đã chuẩn bị giao diện web:', dest);
