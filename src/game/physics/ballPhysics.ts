import * as CANNON from 'cannon-es';
import { Vector3 } from 'three';

export class BallPhysics {
  body: CANNON.Body;
  radius: number = 0.11; // Standard football radius
  
  constructor(position: Vector3) {
    const sphereShape = new CANNON.Sphere(this.radius);
    
    this.body = new CANNON.Body({
      mass: 0.43, // FIFA standard football mass
      position: new CANNON.Vec3(position.x, position.y, position.z),
      shape: sphereShape,
      material: new CANNON.Material('ball')
    });
    
    // Bouncy material
    this.body.material.restitution = 0.8;
    this.body.linearDamping = 0.1;
    this.body.angularDamping = 0.1;
  }
  
  kick(power: number, direction: Vector3) {
    const impulse = new CANNON.Vec3(
      direction.x * power,
      direction.y * power,
      direction.z * power
    );
    this.body.applyImpulse(impulse, this.body.position);
  }
  
  getPosition(): Vector3 {
    return new Vector3(
      this.body.position.x,
      this.body.position.y,
      this.body.position.z
    );
  }
  
  reset(position: Vector3) {
    this.body.position.set(position.x, position.y, position.z);
    this.body.velocity.set(0, 0, 0);
    this.body.angularVelocity.set(0, 0, 0);
  }
}