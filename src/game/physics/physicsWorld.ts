import * as CANNON from 'cannon-es';

export class PhysicsWorld {
  world: CANNON.World;
  
  constructor() {
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0)
    });
    
    // Ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    this.world.addBody(groundBody);
  }
  
  update(deltaTime: number) {
    this.world.step(deltaTime);
  }
  
  addBody(body: CANNON.Body) {
    this.world.addBody(body);
  }
  
  removeBody(body: CANNON.Body) {
    this.world.removeBody(body);
  }
}