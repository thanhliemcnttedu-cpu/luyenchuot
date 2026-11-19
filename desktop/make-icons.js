// Tạo ảnh PNG từ logo SVG của dự án (dùng để đóng gói file .ico và ảnh giao diện cài đặt)
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const svg = fs.readFileSync(path.join(__dirname, '..', 'assets', 'icon.svg'), 'utf8');
const svgLogo = fs.readFileSync(path.join(__dirname, '..', 'assets', 'logo.svg'), 'utf8');
const out = path.join(__dirname, 'build');
fs.mkdirSync(out, { recursive: true });

for (const size of [16, 24, 32, 48, 64, 128, 256, 512]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png);
}
// Logo ngang (có chữ) để ghép vào ảnh giao diện cài đặt
const logo = new Resvg(svgLogo, { fitTo: { mode: 'width', value: 900 } }).render().asPng();
fs.writeFileSync(path.join(out, 'logo-wide.png'), logo);
console.log('PNG icons written');
