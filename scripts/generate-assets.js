// scripts/generate-assets.js
const fs = require('fs');
const path = require('path');
const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter');
const { Scene, Mesh, BoxGeometry, SphereGeometry, CylinderGeometry, MeshBasicMaterial, Group } = require('three');

// Ensure directory exists
const modelsDir = path.join(__dirname, '../public/assets/models');
['players', 'stadiums', 'balls', 'trophies'].forEach(dir => {
  const fullPath = path.join(modelsDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function exportGLB(object, filename) {
  const exporter = new GLTFExporter();
  exporter.parse(
    object,
    (glb) => {
      fs.writeFileSync(filename, Buffer.from(glb));
      console.log(`Generated: ${filename}`);
    },
    { binary: true }
  );
}

// 1. Create Base Player Model
const createBasePlayer = () => {
  const group = new Group();
  
  // Body
  const body = new Mesh(
    new BoxGeometry(0.4, 1.2, 0.2),
    new MeshBasicMaterial({ color: 0x0000ff })
  );
  body.position.y = 0.6;
  group.add(body);
  
  // Head
  const head = new Mesh(
    new SphereGeometry(0.15, 16, 16),
    new MeshBasicMaterial({ color: 0xffcc99 })
  );
  head.position.y = 1.5;
  group.add(head);
  
  // Arms
  const leftArm = new Mesh(
    new CylinderGeometry(0.05, 0.05, 0.8),
    new MeshBasicMaterial({ color: 0xffcc99 })
  );
  leftArm.position.set(-0.3, 0.8, 0);
  leftArm.rotation.z = Math.PI / 4;
  group.add(leftArm);
  
  const rightArm = new Mesh(
    new CylinderGeometry(0.05, 0.05, 0.8),
    new MeshBasicMaterial({ color: 0xffcc99 })
  );
  rightArm.position.set(0.3, 0.8, 0);
  rightArm.rotation.z = -Math.PI / 4;
  group.add(rightArm);
  
  // Legs
  const leftLeg = new Mesh(
    new CylinderGeometry(0.07, 0.07, 0.9),
    new MeshBasicMaterial({ color: 0x000000 })
  );
  leftLeg.position.set(-0.1, 0.2, 0);
  group.add(leftLeg);
  
  const rightLeg = new Mesh(
    new CylinderGeometry(0.07, 0.07, 0.9),
    new MeshBasicMaterial({ color: 0x000000 })
  );
  rightLeg.position.set(0.1, 0.2, 0);
  group.add(rightLeg);
  
  return group;
};

// 2. Create Goalkeeper Model (different colors)
const createGoalkeeper = () => {
  const player = createBasePlayer();
  player.children.forEach(child => {
    if (child.material.color.getHex() === 0x0000ff) {
      child.material.color.setHex(0x00ff00); // Green jersey for GK
    }
  });
  return player;
};

// 3. Create Referee Model
const createReferee = () => {
  const player = createBasePlayer();
  player.children.forEach(child => {
    if (child.material.color.getHex() === 0x0000ff) {
      child.material.color.setHex(0x000000); // Black jersey for referee
    }
  });
  return player;
};

// 4. Create Stadium Model
const createStadium = (type = 'basic') => {
  const group = new Group();
  
  // Pitch
  const pitch = new Mesh(
    new BoxGeometry(40, 0.1, 20),
    new MeshBasicMaterial({ color: 0x228B22 }) // Green
  );
  group.add(pitch);
  
  // Stands
  const stand1 = new Mesh(
    new BoxGeometry(45, 5, 3),
    new MeshBasicMaterial({ color: 0x666666 })
  );
  stand1.position.set(0, 2.5, -12);
  group.add(stand1);
  
  const stand2 = new Mesh(
    new BoxGeometry(45, 5, 3),
    new MeshBasicMaterial({ color: 0x666666 })
  );
  stand2.position.set(0, 2.5, 12);
  group.add(stand2);
  
  const stand3 = new Mesh(
    new BoxGeometry(3, 5, 20),
    new MeshBasicMaterial({ color: 0x666666 })
  );
  stand3.position.set(-22, 2.5, 0);
  group.add(stand3);
  
  const stand4 = new Mesh(
    new BoxGeometry(3, 5, 20),
    new MeshBasicMaterial({ color: 0x666666 })
  );
  stand4.position.set(22, 2.5, 0);
  group.add(stand4);
  
  // Goals
  const goal1 = createGoal();
  goal1.position.set(0, 1, -9);
  group.add(goal1);
  
  const goal2 = createGoal();
  goal2.position.set(0, 1, 9);
  goal2.rotation.y = Math.PI;
  group.add(goal2);
  
  return group;
};

const createGoal = () => {
  const group = new Group();
  
  // Posts
  const leftPost = new Mesh(
    new CylinderGeometry(0.1, 0.1, 2.5),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  leftPost.position.set(-3.66, 1.25, 0);
  group.add(leftPost);
  
  const rightPost = new Mesh(
    new CylinderGeometry(0.1, 0.1, 2.5),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  rightPost.position.set(3.66, 1.25, 0);
  group.add(rightPost);
  
  // Crossbar
  const crossbar = new Mesh(
    new BoxGeometry(7.32, 0.1, 0.1),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  crossbar.position.set(0, 2.5, 0);
  group.add(crossbar);
  
  return group;
};

// 5. Create World Cup Stadium
const createWorldCupStadium = () => {
  const stadium = createStadium();
  
  // Add extra details for World Cup stadium
  const roof = new Mesh(
    new BoxGeometry(50, 0.5, 25),
    new MeshBasicMaterial({ color: 0x1a53ff })
  );
  roof.position.set(0, 10, 0);
  stadium.add(roof);
  
  const flags = new Group();
  for (let i = 0; i < 8; i++) {
    const flag = new Mesh(
      new BoxGeometry(0.5, 2, 0.05),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    const angle = (i / 8) * Math.PI * 2;
    flag.position.set(
      Math.cos(angle) * 25,
      3,
      Math.sin(angle) * 12
    );
    flags.add(flag);
  }
  stadium.add(flags);
  
  return stadium;
};

// Generate all models
console.log('Generating sample 3D models...');

// Generate player models
exportGLB(
  createBasePlayer(),
  path.join(modelsDir, 'players/base_player.glb')
);

exportGLB(
  createGoalkeeper(),
  path.join(modelsDir, 'players/goalkeeper.glb')
);

exportGLB(
  createReferee(),
  path.join(modelsDir, 'players/referee.glb')
);

// Generate stadium models
exportGLB(
  createStadium(),
  path.join(modelsDir, 'stadiums/stadium_01.glb')
);

exportGLB(
  createStadium('alternative'),
  path.join(modelsDir, 'stadiums/stadium_02.glb')
);

exportGLB(
  createWorldCupStadium(),
  path.join(modelsDir, 'stadiums/worldcup_stadium.glb')
);

console.log('All sample models generated successfully!');
console.log('Place them in: public/assets/models/');