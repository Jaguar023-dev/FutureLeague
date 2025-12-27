// scripts/generate-textures.js
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const texturesDir = path.join(__dirname, '../public/assets/textures');
['kits', 'faces', 'stadiums', 'ui'].forEach(dir => {
  const fullPath = path.join(texturesDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function createKitTexture(team, type) {
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');
  
  // Background color based on team
  const colors = {
    mancity: { home: [108, 171, 221], away: [255, 255, 255] },
    manutd: { home: [218, 41, 28], away: [0, 0, 0] },
    liverpool: { home: [200, 16, 46], away: [0, 0, 0] },
    nigeria: { home: [0, 135, 81], away: [255, 255, 255] }
  };
  
  const color = colors[team]?.[type] || [0, 0, 255];
  ctx.fillStyle = `rgb(${color.join(',')})`;
  ctx.fillRect(0, 0, 256, 256);
  
  // Add kit pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  
  // Vertical stripes for home kits
  if (type === 'home') {
    for (let x = 0; x < 256; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
  }
  
  // Horizontal stripes for away kits
  if (type === 'away') {
    for (let y = 0; y < 256; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
  }
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(
    path.join(texturesDir, `kits/${team}_${type}.png`),
    buffer
  );
  console.log(`Generated: ${team}_${type}.png`);
}

function createFaceTexture(name) {
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');
  
  // Skin tone
  const skinTones = [
    [255, 219, 172], // Light
    [210, 180, 140], // Medium
    [139, 90, 43]    // Dark
  ];
  
  const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
  ctx.fillStyle = `rgb(${skinTone.join(',')})`;
  ctx.fillRect(0, 0, 256, 256);
  
  // Eyes
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(80, 100, 30, 15); // Left eye
  ctx.fillRect(150, 100, 30, 15); // Right eye
  
  // Mouth
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(100, 180, 60, 20);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(
    path.join(texturesDir, `faces/${name}.png`),
    buffer
  );
  console.log(`Generated: ${name}.png`);
}

function createGrassTexture() {
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Base green
  ctx.fillStyle = '#228B22';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Grass pattern
  ctx.strokeStyle = '#1a6d1a';
  ctx.lineWidth = 2;
  
  for (let y = 0; y < 1024; y += 40) {
    for (let x = 0; x < 1024; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20, y + 40);
      ctx.stroke();
    }
  }
  
  // Pitch markings
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  
  // Center circle
  ctx.beginPath();
  ctx.arc(512, 512, 100, 0, Math.PI * 2);
  ctx.stroke();
  
  // Center line
  ctx.beginPath();
  ctx.moveTo(512, 0);
  ctx.lineTo(512, 1024);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(
    path.join(texturesDir, 'stadiums/grass_01.png'),
    buffer
  );
  console.log('Generated: grass_01.png');
}

// Generate textures
console.log('Generating sample textures...');

// Generate kit textures
createKitTexture('mancity', 'home');
createKitTexture('mancity', 'away');
createKitTexture('manutd', 'home');
createKitTexture('manutd', 'away');
createKitTexture('liverpool', 'home');
createKitTexture('liverpool', 'away');
createKitTexture('nigeria', 'home');
createKitTexture('nigeria', 'away');

// Generate face textures
createFaceTexture('generic_01');
createFaceTexture('generic_02');
createFaceTexture('generic_03');

// Generate stadium textures
createGrassTexture();

console.log('All sample textures generated!');