import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// A rigid card suspended from two segmented straps. All measurements are in scene units.
const WIDTH = 2.72;
const HEIGHT = 4.36;
const STEP = 1 / 120;
const STRAP_SEGMENTS = 12;

function roundedRect(width, height, radius, x = 0, y = 0) {
  const shape = new THREE.Shape();
  const l = x - width / 2, r = x + width / 2, b = y - height / 2, t = y + height / 2;
  shape.moveTo(l + radius, b);
  shape.lineTo(r - radius, b);
  shape.quadraticCurveTo(r, b, r, b + radius);
  shape.lineTo(r, t - radius);
  shape.quadraticCurveTo(r, t, r - radius, t);
  shape.lineTo(l + radius, t);
  shape.quadraticCurveTo(l, t, l, t - radius);
  shape.lineTo(l, b + radius);
  shape.quadraticCurveTo(l, b, l + radius, b);
  return shape;
}

function extrude(shape, depth, bevel = 0.012) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, steps: 1, curveSegments: 12,
    bevelEnabled: bevel > 0, bevelSegments: 3, bevelSize: bevel, bevelThickness: bevel,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

async function artworkTexture(renderer) {
  const [portrait] = await Promise.all([
    loadImage('/assets/atutun-avatar.jpg'),
    document.fonts.load('96px Kyoto'),
    document.fonts.load('italic 32px Kyoto'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1320;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f5f3ed';
  ctx.fillRect(0, 0, 900, 1320);
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#080808';
  ctx.font = '154px Kyoto, Georgia, serif';
  ctx.fillText('Atun', 62, 72);
  ctx.fillStyle = '#1400ff';
  ctx.fillText('tun', 62, 184);
  ctx.drawImage(portrait, 564, 92, 274, 411);
  ctx.fillStyle = '#080808';
  ctx.font = 'italic 34px Kyoto, Georgia, serif';
  ctx.fillText('Atuntun', 62, 1110);
  ctx.font = '27px Kyoto, Georgia, serif';
  ctx.fillText('Commercial Product Manager', 62, 1164);
  ctx.beginPath();
  ctx.roundRect(62, 1210, 332, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '22px Kyoto, Georgia, serif';
  ctx.fillText('Security · Risk · Growth', 81, 1223);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

function makeBadge(texture) {
  const group = new THREE.Group();
  // Thin PVC reflects at grazing angles without the fog introduced by volume transmission.
  function clearFilm(color, minimumAlpha, roughness, highlightAlpha=0.34) {
    const material=new THREE.MeshPhysicalMaterial({color,metalness:1,roughness,transparent:true,depthWrite:false,envMapIntensity:0.9});
    material.onBeforeCompile=shader=> {
      shader.uniforms.filmMinimumAlpha={value:minimumAlpha};
      shader.uniforms.filmHighlightAlpha={value:highlightAlpha};
      shader.fragmentShader='uniform float filmMinimumAlpha;\nuniform float filmHighlightAlpha;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`
        float viewFacing = abs(dot(normalize(normal), normalize(vViewPosition)));
        float filmAlpha = filmMinimumAlpha + (1.0 - filmMinimumAlpha) * pow(1.0 - viewFacing, 5.0);
        float peakLight = max(max(outgoingLight.r, outgoingLight.g), outgoingLight.b);
        filmAlpha = max(filmAlpha, smoothstep(0.9, 4.0, peakLight) * filmHighlightAlpha);
        gl_FragColor = vec4(outgoingLight, clamp(filmAlpha, 0.0, 1.0));
      `);
    };
    material.customProgramCacheKey=()=>`thin-film-${minimumAlpha}`;
    return material;
  }
  const plastic=clearFilm('#ffffff',0.0356,0.012);
  const edge=clearFilm('#858c88',0.18,0.018,0.65);
  const shellShape = roundedRect(WIDTH, HEIGHT, 0.19);
  shellShape.holes.push(roundedRect(0.66, 0.13, 0.06, 0, 1.88));
  for (const x of [-0.88, 0.88]) {
    const hole = new THREE.Path();
    hole.absarc(x, 1.89, 0.104, 0, Math.PI * 2, true);
    shellShape.holes.push(hole);
  }
  const shell = new THREE.Mesh(extrude(shellShape, 0.008, 0.004), plastic);
  shell.position.z = 0.05;
  shell.renderOrder=3;
  group.add(shell);
  const backShell=new THREE.Mesh(shell.geometry,plastic);
  backShell.position.z=0.005;
  backShell.rotation.y=Math.PI;
  backShell.renderOrder=2;
  group.add(backShell);
  const rimShape = roundedRect(WIDTH, HEIGHT, 0.19);
  rimShape.holes.push(roundedRect(WIDTH - 0.08, HEIGHT - 0.08, 0.15));
  group.add(new THREE.Mesh(extrude(rimShape, 0.065, 0.007), edge));
  const innerRim = roundedRect(WIDTH - 0.14, HEIGHT - 0.14, 0.13);
  innerRim.holes.push(roundedRect(WIDTH - 0.17, HEIGHT - 0.17, 0.115));
  group.add(new THREE.Mesh(extrude(innerRim, 0.045, 0.003), edge));

  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 3.52, 0.025),
    [new THREE.MeshStandardMaterial({color:'#e6e3d9'}), new THREE.MeshStandardMaterial({color:'#e6e3d9'}),
      new THREE.MeshStandardMaterial({color:'#e6e3d9'}), new THREE.MeshStandardMaterial({color:'#e6e3d9'}),
      new THREE.MeshBasicMaterial({map:texture,toneMapped:false}), new THREE.MeshBasicMaterial({color:'#f5f3ed',toneMapped:false})],
  );
  paper.name = 'badge-paper';
  paper.position.set(0, -0.3, 0.025);
  paper.castShadow = true;
  group.add(paper);
  for (const y of [HEIGHT / 2 - 0.43, HEIGHT / 2 - 0.47, HEIGHT / 2 - 0.51]) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(WIDTH - 0.15, 0.014, 0.017), edge);
    seam.position.set(0, y, 0.045);
    group.add(seam);
  }

  return group;
}

function makeHardware() {
  const metal = new THREE.MeshStandardMaterial({color: '#d8dfde', metalness: 1, roughness: 0.2});
  const dark = new THREE.MeshStandardMaterial({color: '#30382d', roughness: 0.92, side: THREE.DoubleSide});
  const clasp = new THREE.Group();
  const eye = new THREE.Group();
  const yoke = new THREE.Group();
  const hookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.175, 0.1),
    new THREE.Vector3(0, 0.18, 0.1),
    new THREE.Vector3(0, 0.26, 0),
    new THREE.Vector3(0, -0.13, -0.07),
  ]);
  clasp.add(new THREE.Mesh(new THREE.TubeGeometry(hookPath, 24, 0.023, 8, false), metal));
  const swivel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.03, 0.14, 16), metal);
  swivel.position.y = 0.26;
  clasp.add(swivel);
  const loopShape = roundedRect(0.35, 0.37, 0.09);
  loopShape.holes.push(roundedRect(0.25, 0.27, 0.065));
  eye.add(new THREE.Mesh(extrude(loopShape, 0.04, 0.008), metal));
  const strapTab = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.36, 0.045), dark);
  yoke.add(strapTab);
  return {clasp,eye,yoke};
}

function makeRibbon(material) {
  const steps = 80, sides = 12;
  const positions = new Float32Array((steps + 1) * sides * 3);
  const normals = new Float32Array(positions.length);
  const indices = [];
  for (let i = 0; i < steps; i++) for(let j = 0; j < sides; j++) {
    const a = i * sides + j, b = i * sides + (j + 1) % sides;
    indices.push(a, a + sides, b, b, a + sides, b + sides);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setIndex(indices);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.castShadow = true;
  const curve = new THREE.CatmullRomCurve3();
  const point = new THREE.Vector3(), tangent = new THREE.Vector3(), normal = new THREE.Vector3(), width = new THREE.Vector3(), surfaceNormal = new THREE.Vector3();
  const orientation = new THREE.Quaternion(), identity = new THREE.Quaternion(), inverseBadge = new THREE.Quaternion();
  const localPoint = new THREE.Vector3(), previousWidth = new THREE.Vector3(1,0,0);
  return {mesh, update(points, rotation, badge) {
    curve.points = points;
    inverseBadge.copy(badge.quaternion).invert();
    previousWidth.set(1,0,0);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      curve.getPoint(t, point);
      curve.getTangent(t, tangent);
      // Keep the visible strap outside the card holder when it folds back on itself.
      localPoint.copy(point).sub(badge.position).applyQuaternion(inverseBadge);
      if(Math.abs(localPoint.x)<1.47 && Math.abs(localPoint.y)<2.3 && Math.abs(localPoint.z)<0.18) {
        const distances=[1.47-Math.abs(localPoint.x),2.3-Math.abs(localPoint.y),0.18-Math.abs(localPoint.z)];
        const axis=distances.indexOf(Math.min(...distances));
        const coordinate=['x','y','z'][axis];
        localPoint[coordinate]=(localPoint[coordinate]<0?-1:1)*[1.47,2.3,0.18][axis];
        point.copy(localPoint).applyQuaternion(badge.quaternion).add(badge.position);
      }
      point.z=Math.max(point.z,-0.88);
      orientation.slerpQuaternions(identity, rotation, t * t);
      normal.set(0, 0, 1).applyQuaternion(orientation);
      width.crossVectors(tangent, normal);
      if(width.lengthSq()<1e-8) width.copy(previousWidth).addScaledVector(tangent,-previousWidth.dot(tangent));
      width.normalize();
      previousWidth.copy(width);
      normal.crossVectors(width, tangent).normalize();
      for(let j = 0; j < sides; j++) {
        const angle = j / sides * Math.PI * 2;
        const across = Math.cos(angle) * 0.085, depth = Math.sin(angle) * 0.012;
        const offset = (i * sides + j) * 3;
        positions.set([point.x + width.x * across + normal.x * depth, point.y + width.y * across + normal.y * depth, point.z + width.z * across + normal.z * depth], offset);
        surfaceNormal.copy(width).multiplyScalar(Math.cos(angle) / 0.085).addScaledVector(normal, Math.sin(angle) / 0.012).normalize();
        normals.set([surfaceNormal.x, surfaceNormal.y, surfaceNormal.z], offset);
      }
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.normal.needsUpdate = true;
  }};
}

export async function createBadgeScene(stage, {reducedMotion, mobileQuery}) {
  await RAPIER.init();
  const canvas = document.createElement('canvas');
  canvas.className = 'badge-canvas';
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Atuntun’s 3D badge. Drag the card and release to swing it, or use the arrow keys.');
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(0, 0.8, 13.8);
  camera.lookAt(0,0.8,0);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.65;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const fillLight=new THREE.DirectionalLight('#e8f0ff',0.7);
  fillLight.position.set(5,2,4);
  scene.add(fillLight);
  const light = new THREE.DirectionalLight('#fff7e6', 2.5);
  light.position.set(-3, 6, 7);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, {left:-7, right:7, top:7, bottom:-7, near:0.1, far:30});
  light.shadow.bias = -0.0002;
  light.shadow.normalBias = 0.025;
  light.shadow.radius = 5;
  scene.add(light);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(60,60), new THREE.ShadowMaterial({opacity:0.13,depthWrite:false}));
  shadow.position.z = -1;
  shadow.receiveShadow = true;
  scene.add(shadow);
  let texture;
  try {
    texture = await artworkTexture(renderer);
  } catch(error) {
    shadow.geometry.dispose();
    shadow.material.dispose();
    light.shadow.dispose();
    environment.dispose();
    renderer.dispose();
    throw error;
  }
  const badge = makeBadge(texture);
  scene.add(badge);
  const hardware = makeHardware();
  scene.add(hardware.clasp,hardware.eye,hardware.yoke);

  const world = new RAPIER.World({x:0,y:-9.81,z:0});
  world.timestep = STEP;
  world.numSolverIterations = 32;
  const restingY = 0.15;
  const zero = {x:0,y:0,z:0};
  function rigid(y,z,mass,halfExtents) {
    const result=world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0,y,z).setLinearDamping(0.45).setAngularDamping(0.65).setCcdEnabled(true).setCanSleep(false));
    world.createCollider(RAPIER.ColliderDesc.cuboid(...halfExtents).setMass(mass).setCollisionGroups(0),result);
    return result;
  }
  const body=rigid(restingY,0,0.72,[1.4,2.22,0.105]);
  const claspBody=rigid(2.35,0.03,0.09,[0.21,0.33,0.13]);
  const eyeBody=rigid(2.79,0.03,0.055,[0.22,0.21,0.09]);
  const yokeBody=rigid(3.08,0.03,0.045,[0.1,0.22,0.08]);
  world.createImpulseJoint(RAPIER.JointData.spherical({x:0,y:2.025,z:0.03},{x:0,y:-0.175,z:0}),body,claspBody,true);
  world.createImpulseJoint(RAPIER.JointData.revolute({x:0,y:0.26,z:0},{x:0,y:-0.18,z:0},{x:0,y:1,z:0}),claspBody,eyeBody,true);
  const yokeJoint=world.createImpulseJoint(RAPIER.JointData.revolute({x:0,y:0.13,z:0},{x:0,y:-0.16,z:0},{x:1,y:0,z:0}),eyeBody,yokeBody,true);
  yokeJoint.setLimits(-1.15,1.15);
  const strapMaterial = new THREE.MeshStandardMaterial({color:'#30382d',roughness:0.94,side:THREE.DoubleSide});
  const chains = [-1,1].map((side) => {
    const anchor = new THREE.Vector3(side*2.6,9.5,-0.25);
    const end = new THREE.Vector3(side*0.015,3.12,0.03);
    const length = anchor.distanceTo(end) / STRAP_SEGMENTS;
    const root = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(anchor.x,anchor.y,anchor.z));
    const bodies = [root];
    for(let i=1;i<=STRAP_SEGMENTS;i++) {
      const p = anchor.clone().lerp(end,i/STRAP_SEGMENTS);
      bodies.push(world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(p.x,p.y,p.z).setAdditionalMass(0.0125).setLinearDamping(1.6).setCanSleep(false).lockRotations()));
    }
    for(let i=0;i<bodies.length-1;i++) world.createImpulseJoint(RAPIER.JointData.rope(length,zero,zero),bodies[i],bodies[i+1],true);
    for(let span=1;span<=3;span++) {
      const stiffness=90*[0,0.6,1,0.45][span];
      const damping=1.4*Math.sqrt(stiffness*0.0125);
      for(let i=0;i+span<bodies.length;i++) world.createImpulseJoint(RAPIER.JointData.spring(length*span,stiffness,damping,zero,zero),bodies[i],bodies[i+span],true);
    }
    world.createImpulseJoint(RAPIER.JointData.spherical(zero,{x:side*0.015,y:0.04,z:0}),bodies.at(-1),yokeBody,true);
    const ribbon = makeRibbon(strapMaterial);
    scene.add(ribbon.mesh);
    return {anchor,length:length*STRAP_SEGMENTS,bodies,ribbon,points:bodies.map(()=>new THREE.Vector3())};
  });
  // Start with a real, small impulse; idle motion then decays under the physical constraints.
  if (!reducedMotion.matches) {
    body.applyImpulseAtPoint({x:0.4,y:0,z:0.04},{x:0,y:restingY-0.7,z:0},true);
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0,0,1),0);
  const hitPoint = new THREE.Vector3();
  const offset = new THREE.Vector3();
  const target = new THREE.Vector3();
  const current = new THREE.Vector3();
  const velocity = new THREE.Vector3();
  const angularVelocity = new THREE.Vector3();
  const worldOffset = new THREE.Vector3();
  const force = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  let dragging = false, pointerId = null, previousPointer = null;
  let frame = 0, lastTime = 0, accumulator = 0, visible = true, disposed = false;
  const listeners = [];
  function listen(target,event,handler,options) {target.addEventListener(event,handler,options);listeners.push(()=>target.removeEventListener(event,handler,options));}

  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
  }
  function endDrag(event) {
    if (!dragging || (event?.pointerId !== undefined && event.pointerId !== pointerId)) return;
    dragging = false;
    if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
    pointerId = null;
    canvas.style.cursor = 'grab';
    canvas.dataset.interaction = 'released';
  }
  listen(canvas,'pointerdown',event=> {
    if (event.button!==0) return;
    setPointer(event);
    const hit = raycaster.intersectObject(badge.getObjectByName('badge-paper'),false)[0];
    if (!hit) return;
    event.preventDefault();
    dragging = true;
    pointerId = event.pointerId;
    dragPlane.constant = -hit.point.z;
    rotation.copy(body.rotation()).invert();
    offset.copy(hit.point).sub(current.copy(body.translation())).applyQuaternion(rotation);
    target.copy(hit.point);
    for (const chain of chains) chain.bodies.forEach(b=>b.wakeUp());
    canvas.setPointerCapture(pointerId);
    canvas.style.cursor = 'grabbing';
    canvas.dataset.interaction = 'dragging';
    resume();
  });
  listen(canvas,'pointermove',event=> {
    setPointer(event);
    if (dragging && pointerId===event.pointerId) {
      if (!raycaster.ray.intersectPlane(dragPlane,hitPoint)) return;
      target.copy(hitPoint);
      target.x=THREE.MathUtils.clamp(target.x,-4.5,4.5);
      target.y=THREE.MathUtils.clamp(target.y,-3.5,5);
    } else {
      const hit=raycaster.intersectObject(badge.getObjectByName('badge-paper'),false)[0];
      canvas.style.cursor = hit ? 'grab' : 'default';
      if(raycaster.ray.intersectPlane(dragPlane,hitPoint)) {
        if(hit && previousPointer && event.pointerType!=='touch' && !reducedMotion.matches) {
          const dt=Math.max((event.timeStamp-previousPointer.time)/1000,0.016);
          body.applyImpulseAtPoint({x:THREE.MathUtils.clamp((hitPoint.x-previousPointer.x)/dt,-12,12)*0.008,y:THREE.MathUtils.clamp((hitPoint.y-previousPointer.y)/dt,-8,8)*0.004,z:0},hit.point,true);
          resume();
        }
        previousPointer={x:hitPoint.x,y:hitPoint.y,time:event.timeStamp};
      }
    }
  });
  listen(canvas,'pointerup',endDrag);
  listen(canvas,'pointercancel',endDrag);
  listen(canvas,'lostpointercapture',endDrag);
  listen(window,'blur',()=>endDrag());
  listen(canvas,'keydown',event=> {
    const impulse = {ArrowLeft:{x:-0.9,y:0,z:0},ArrowRight:{x:0.9,y:0,z:0},ArrowUp:{x:0,y:1.4,z:0},ArrowDown:{x:0,y:0,z:0.4}}[event.key];
    if (!impulse) return;
    event.preventDefault();
    body.applyImpulse(impulse,true);
    canvas.dataset.interaction = 'released';
    resume();
  });
  listen(canvas,'dblclick',event=> {
    setPointer(event);
    if (!raycaster.intersectObject(badge,true).length) return;
    body.applyImpulse({x:0.5,y:0.7,z:0.1},true);
    body.applyTorqueImpulse({x:0,y:0.4,z:0.08},true);
    resume();
  });

  function updateMeshes() {
    badge.position.copy(body.translation());
    badge.quaternion.copy(body.rotation());
    for(const [name,physics] of [['clasp',claspBody],['eye',eyeBody],['yoke',yokeBody]]) {
      hardware[name].position.copy(physics.translation());
      hardware[name].quaternion.copy(physics.rotation());
    }
    for(const chain of chains) {
      chain.bodies.forEach((b,i)=>chain.points[i].copy(b.translation()));
      chain.ribbon.update(chain.points,hardware.yoke.quaternion,badge);
    }
    // Projected bounds make pointer and keyboard hit targets inspectable in DOM-based checks.
    const bounds = new THREE.Box3().setFromObject(badge);
    const center = bounds.getCenter(new THREE.Vector3()).project(camera);
    canvas.dataset.badgeCenter = `${((center.x+1)*canvas.clientWidth/2).toFixed(1)},${((1-center.y)*canvas.clientHeight/2).toFixed(1)}`;
  }
  function draw() {updateMeshes();renderer.render(scene,camera);}
  function animate(now) {
    frame = 0;
    if(disposed || !visible || document.hidden || mobileQuery.matches) return;
    const elapsed = lastTime ? Math.min((now-lastTime)/1000,0.05) : STEP;
    lastTime = now;
    if(!reducedMotion.matches || dragging) {
      accumulator += elapsed;
      while(accumulator>=STEP) {
        if(dragging) {
          rotation.copy(body.rotation());
          worldOffset.copy(offset).applyQuaternion(rotation);
          current.copy(body.translation()).add(worldOffset);
          angularVelocity.copy(body.angvel());
          velocity.crossVectors(angularVelocity,worldOffset).add(body.linvel());
          const effectiveMass=0.72/(1+offset.lengthSq()/0.65);
          const stiffness=100*effectiveMass;
          const damping=20*effectiveMass;
          force.copy(target).sub(current).multiplyScalar(stiffness).addScaledVector(velocity,-damping);
          force.divideScalar(1+(damping*STEP+stiffness*STEP*STEP)/effectiveMass).clampLength(0,110*0.72).multiplyScalar(STEP);
          body.applyImpulseAtPoint(force,current,true);
        }
        // Swivel torque progressively resists accumulated twist, without locking 3D rotation.
        const q=body.rotation();
        const yaw=Math.atan2(2*(q.w*q.y+q.x*q.z),1-2*(q.y*q.y+q.x*q.x));
        const torque=-2.2*yaw*(1+3*(Math.abs(yaw)/Math.PI)**2)-0.65*Math.sqrt(2.2)*body.angvel().y;
        body.applyTorqueImpulse({x:0,y:THREE.MathUtils.clamp(torque,-18,18)*STEP,z:0},true);
        world.step();
        accumulator -= STEP;
      }
    }
    draw();
    if(!reducedMotion.matches || dragging) frame = requestAnimationFrame(animate);
  }
  function resume() {
    if(disposed || frame || !visible || document.hidden || mobileQuery.matches) return;
    lastTime = 0;
    accumulator = 0;
    frame = requestAnimationFrame(animate);
  }
  function resize() {
    const {width,height} = stage.getBoundingClientRect();
    if(!width || !height) return;
    camera.aspect=width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height,false);
    draw();
    resume();
  }
  const observer = new IntersectionObserver(([entry])=> {visible=entry.isIntersecting;resume();},{threshold:0.01});
  observer.observe(stage);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  listen(document,'visibilitychange',()=> {if(document.hidden) endDrag(); else resume();});
  listen(mobileQuery,'change',()=> {endDrag();resize();});
  listen(reducedMotion,'change',resume);
  listen(canvas,'webglcontextlost',event=> {
    event.preventDefault();
    stage.dataset.renderer='fallback';
    if(frame) cancelAnimationFrame(frame);
    frame=0;
  });
  listen(canvas,'webglcontextrestored',()=> {stage.dataset.renderer='webgl';resume();});
  stage.append(canvas);
  resize();
  stage.dataset.renderer='webgl';
  const fallback=stage.querySelector('.badge-rig');
  fallback.tabIndex=-1;
  fallback.setAttribute('aria-hidden','true');
  resume();

  return {dispose() {
    disposed=true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    listeners.forEach(remove=>remove());
    const geometries=new Set(),materials=new Set();
    scene.traverse(obj=> {if(obj.geometry)geometries.add(obj.geometry);if(obj.material)(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>materials.add(m));});
    geometries.forEach(g=>g.dispose());
    materials.forEach(m=>m.dispose());
    texture.dispose();
    environment.dispose();
    light.shadow.dispose();
    world.free();
    renderer.dispose();
    canvas.remove();
  }};
}
