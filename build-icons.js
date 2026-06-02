// Ghar Kharch app icon generator — pure Node, koi library nahi.
// Indigo gradient background + white house. Sizes: 512, 192, 180 (apple).
const fs = require("fs");
const zlib = require("zlib");

// CRC32
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const tb = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([tb, data])), 0);
  return Buffer.concat([len, tb, data, crc]);
}

function render(S) {
  // raw RGB scanlines with filter byte 0
  const row = S * 3 + 1;
  const raw = Buffer.alloc(row * S);
  const k = S / 512; // scale factor
  // house geometry (in 512 space)
  const apexX = 256, apexY = 150, baseL = 130, baseR = 382, baseY = 270;
  const bodyL = 168, bodyR = 344, bodyB = 384;
  const doorL = 236, doorR = 276, doorT = 312;
  for (let y = 0; y < S; y++) {
    raw[y * row] = 0; // filter
    const yy = y / k;
    // gradient indigo: top #6366f1 (99,102,241) -> bottom #4f46e5 (79,70,229)
    const t = y / (S - 1);
    const bgR = Math.round(99 + (79 - 99) * t);
    const bgG = Math.round(102 + (70 - 102) * t);
    const bgB = Math.round(241 + (229 - 241) * t);
    for (let x = 0; x < S; x++) {
      const xx = x / k;
      let white = false;
      // roof triangle
      if (yy >= apexY && yy <= baseY) {
        const f = (yy - apexY) / (baseY - apexY);
        const l = apexX - (apexX - baseL) * f;
        const r = apexX + (baseR - apexX) * f;
        if (xx >= l && xx <= r) white = true;
      }
      // body
      if (xx >= bodyL && xx <= bodyR && yy >= baseY && yy <= bodyB) white = true;
      // door cutout
      if (xx >= doorL && xx <= doorR && yy >= doorT && yy <= bodyB) white = false;
      const o = y * row + 1 + x * 3;
      if (white) { raw[o] = 255; raw[o + 1] = 255; raw[o + 2] = 255; }
      else { raw[o] = bgR; raw[o + 1] = bgG; raw[o + 2] = bgB; }
    }
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

fs.writeFileSync("icon-512.png", render(512));
fs.writeFileSync("icon-192.png", render(192));
fs.writeFileSync("apple-touch-icon.png", render(180));
console.log("Icons banaye: icon-512.png, icon-192.png, apple-touch-icon.png");
