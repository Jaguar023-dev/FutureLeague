#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directory structure
const directories = [
  'public/assets/models/players',
  'public/assets/models/stadiums',
  'public/assets/models/balls',
  'public/assets/models/trophies',
  'public/assets/textures/kits',
  'public/assets/textures/faces',
  'public/assets/textures/stadiums',
  'public/assets/textures/ui',
  'public/assets/sounds/effects',
  'public/assets/sounds/music',
  'public/assets/sounds/commentary',
  'public/assets/animations'
];

console.log('📁 Creating Future League directory structure...');

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

// Create placeholder files
const placeholderFiles = [
  // Models
  'public/assets/models/players/base_player.glb',
  'public/assets/models/players/goalkeeper.glb',
  'public/assets/models/players/referee.glb',
  'public/assets/models/stadiums/stadium_01.glb',
  'public/assets/models/stadiums/stadium_02.glb',
  'public/assets/models/stadiums/worldcup_stadium.glb',
  'public/assets/models/balls/ball_classic.glb',
  'public/assets/models/balls/ball_worldcup.glb',
  'public/assets/models/balls/ball_premier.glb',
  'public/assets/models/trophies/premier_league.glb',
  'public/assets/models/trophies/world_cup.glb',
  'public/assets/models/trophies/champions_league.glb',
  
  // Textures
  'public/assets/textures/kits/mancity_home.png',
  'public/assets/textures/kits/mancity_away.png',
  'public/assets/textures/kits/manutd_home.png',
  'public/assets/textures/kits/manutd_away.png',
  'public/assets/textures/kits/liverpool_home.png',
  'public/assets/textures/kits/liverpool_away.png',
  'public/assets/textures/kits/nigeria_home.png',
  'public/assets/textures/kits/nigeria_away.png',
  'public/assets/textures/faces/generic_01.png',
  'public/assets/textures/faces/generic_02.png',
  'public/assets/textures/stadiums/grass_01.png',
  'public/assets/textures/stadiums/crowd.png',
  'public/assets/textures/ui/button_normal.png',
  'public/assets/textures/ui/button_pressed.png',
  'public/assets/textures/ui/background.png',
  
  // Animations
  'public/assets/animations/player_animations.glb',
  'public/assets/animations/goal_celebration.glb'
];

console.log('\n📄 Creating placeholder files...');

placeholderFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(fullPath)) {
    // Create parent directory if it doesn't exist
    const parentDir = path.dirname(fullPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    
    // Create placeholder content based on file type
    if (file.endsWith('.glb')) {
      // Minimal GLB file (just a header)
      const glbHeader = Buffer.from([
        0x67, 0x6C, 0x54, 0x46,  // "glTF"
        0x02, 0x00, 0x00, 0x00,  // Version 2
        0x0C, 0x00, 0x00, 0x00   // Length
      ]);
      fs.writeFileSync(fullPath, glbHeader);
    } else if (file.endsWith('.png')) {
      // Create a simple text file that can be replaced with actual PNG
      fs.writeFileSync(fullPath, `Placeholder for ${path.basename(file)}`);
    } else {
      // Create empty file
      fs.writeFileSync(fullPath, '');
    }
    
    console.log(`✅ Created: ${file}`);
  }
});

// Create README for assets
const readmePath = path.join(__dirname, '..', 'public/assets/README.md');
const readmeContent = `# Future League Assets

This directory contains all game assets for Future League.

## Directory Structure

\`\`\`
assets/
├── models/          # 3D models (.glb format)
│   ├── players/    # Player models
│   ├── stadiums/   # Stadium models
│   ├── balls/      # Ball models
│   └── trophies/   # Trophy models
├── textures/       # 2D textures
│   ├── kits/      # Team kits
│   ├── faces/     # Player faces
│   ├── stadiums/  # Stadium textures
│   └── ui/        # UI elements
├── sounds/         # Audio files
│   ├── effects/   # Sound effects
│   ├── music/     # Background music
│   └── commentary/# Commentary
└── animations/     # Animation files
\`\`\`

## Asset Sources

Replace placeholder files with actual assets from:

### Free Resources:
- **Sketchfab** (https://sketchfab.com) - Search for "soccer", "stadium", "trophy"
- **Mixamo** (https://mixamo.com) - Character models with animations
- **Kenney.nl** (https://kenney.nl) - Free game assets
- **OpenGameArt** (https://opengameart.org)

### Paid Resources (Recommended):
- **TurboSquid** (https://turbosquid.com) - Professional 3D models
- **CGTrader** (https://cgtrader.com) - High-quality models
- **Unity Asset Store** (can export for Three.js)

## File Formats
- **Models**: GLB/GLTF format (Three.js compatible)
- **Textures**: PNG format (with transparency if needed)
- **Sounds**: OGG/MP3 format

## Important Notes
1. Keep file sizes optimized for mobile
2. Use texture compression where possible
3. Test on mobile devices regularly
4. Update this README when adding new assets
`;

if (!fs.existsSync(readmePath)) {
  fs.writeFileSync(readmePath, readmeContent);
  console.log('\n📝 Created: public/assets/README.md');
}

console.log('\n🎉 Future League asset structure created successfully!');
console.log('\nNext steps:');
console.log('1. Replace placeholder files with actual assets');
console.log('2. Run \`npm run dev\` to start development server');
console.log('3. Open http://localhost:5173 in your browser');