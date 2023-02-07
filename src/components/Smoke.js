import * as THREE from 'three';

export function Smoke() {

var smokeTexture = new THREE.TextureLoader().load('./smoke.png');
var smokeGeometry = new THREE.PlaneGeometry(300,300);
var smokeMaterial = new THREE.MeshLambertMaterial({ map: smokeTexture, opacity: 0.7, transparent: true})
const scene = new THREE.Scene();
const clock = new THREE.Clock();

var smokeParticles;

smokeParticles = [];

for (var i = 0; i < 90; i++)
{    
    var smoke_element = new THREE.Mesh(smokeGeometry,smokeMaterial);
    smoke_element.scale.set(2, 2, 2);
    smoke_element.position.set( Math.random()*1000-500, Math.random()*1000-500, Math.random()*1000-100);
    smoke_element.rotation.z = Math.random() * 360;
            
    scene.add(smoke_element);
    smokeParticles.push(smoke_element);
}

var delta = clock.getDelta();
for(var i = 0; i < smokeParticles.length ; i++)
{
    smokeParticles[i].rotation.z += (delta * 0.2);
}
}
