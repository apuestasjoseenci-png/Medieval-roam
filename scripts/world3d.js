/* Medieval Roam GPS world: visual layer only; all positions come from real GPS. */
(()=>{'use strict';let T=window.THREE,host=document.getElementById('world3d');if(!T||!host)return;let scene=new T.Scene();scene.background=new T.Color(0xa8d3cf);scene.fog=new T.Fog(0xa8d3cf,150,360);let camera=new T.PerspectiveCamera(43,1,.1,700),renderer;try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'low-power'});}catch{return}renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));renderer.outputColorSpace=T.SRGBColorSpace;host.appendChild(renderer.domElement);scene.add(new T.HemisphereLight(0xf1fff1,0x526744,2.5));let sun=new T.DirectionalLight(0xffe1a7,2.2);sun.position.set(-70,130,90);scene.add(sun);const mat=c=>new T.MeshLambertMaterial({color:c});let ground=mat(0x79a95e),path=mat(0xbba17b),stonepath=mat(0xa8a39a),treeMat=[mat(0x3c7744),mat(0x4f884a),mat(0x66974f)],trunk=mat(0x735037),rock=mat(0x858f85),ore=mat(0x66737f),food=mat(0xc94335),avatarMat=mat(0x315b77),cape=mat(0x8c3b3c);let terrain=new T.Group(),roads=new T.Group(),props=new T.Group(),hero=new T.Group();scene.add(terrain,roads,props,hero);let base=new T.Mesh(new T.PlaneGeometry(760,760),ground);base.rotation.x=-Math.PI/2;base.position.y=-.12;terrain.add(base);const create=(parent,g,m,x,y,z)=>{let o=new T.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o};let cyl=(r1,r2,h,n=7)=>new T.CylinderGeometry(r1,r2,h,n);function tree(parent,x,z,k=1){create(parent,cyl(.22*k,.31*k,1.5*k),trunk,x,.7*k,z);create(parent,new T.ConeGeometry(1.2*k,2.8*k,7),treeMat[Math.abs(Math.floor(x*13+z*7))%3],x,2.5*k,z);create(parent,new T.ConeGeometry(.88*k,2.1*k,7),treeMat[1],x,3.7*k,z)}function boulder(parent,x,z,k=1,m=rock){let o=create(parent,new T.DodecahedronGeometry(k,0),m,x,k*.55,z);o.rotation.y=x*3;return o}function seeded(n){let x=Math.sin(n*127.1+78.23)*43758.5453;return x-Math.floor(x)}/* v0.0.12: procedural landscape: varied ground, grouped vegetation and roadside details.
   Stable for each GPS tile; all decoration is cosmetic, never changes resource nodes. */
const roadEdge=mat(0x758a55);const grassColors=[0x85ae64,0x77a359,0x90b46b,0x6c9757,0xa0b97a];
const grassMaterials=grassColors.map(mat),flowerMaterials=[mat(0xf0d7a0),mat(0xe7b7b2),mat(0xf4e9b9)];
const geoGrass=new T.ConeGeometry(.18,.55,3),geoBush=new T.IcosahedronGeometry(.7,0);
const geoFlower=new T.SphereGeometry(.13,5,4),geoPatch=new T.CircleGeometry(1,12);
const patchMaterials=[0x6b9a54,0x93b374,0x668e52,0xa3b77d].map(c=>new T.MeshLambertMaterial({color:c,transparent:true,opacity:.45,depthWrite:false}));
function scenery(lat,lon){while(terrain.children.length>1){let x=terrain.children[terrain.children.length-1];terrain.remove(x)}
 let cellX=Math.floor(lon*10000),cellY=Math.floor(lat*10000),seed=cellX*17.13+cellY*29.41;
 // Ground color variation: overlapping translucent irregular grassy patches.
 for(let i=0;i<110;i++){let x=(seeded(seed+i*13)-.5)*690,z=(seeded(seed+i*17+900)-.5)*690;
 let patch=create(terrain,geoPatch,patchMaterials[i%patchMaterials.length],x,-.105+i%3*.001,z);patch.rotation.x=-Math.PI/2;
 patch.scale.set(7+seeded(i*3+seed)*27,7+seeded(i*5+seed)*22,1);}
 // Trees in copses; scattered boulders and bushes, not a uniform grid.
 for(let i=0;i<110;i++){let a=seeded(i*5+seed),b=seeded(i*7+seed*2),x=(a-.5)*640,z=(b-.5)*640;
 if(Math.hypot(x,z)<13)continue;
 if(i%7===0){boulder(terrain,x,z,.65+seeded(i+9)*1.15);continue}
 tree(terrain,x,z,.65+seeded(i+1)*.7);
 if(i%3===0){let bx=x+3+seeded(i+17)*4,bz=z-2+seeded(i+19)*5;
 let bush=create(terrain,geoBush,treeMat[i%3],bx,.47,bz);bush.scale.set(1.3,.8,1.15)} }
 // Instanced tufts and flowers keep draw calls low on mobile.
 const dummy=new T.Object3D();
 for(let kind=0;kind<5;kind++){let mesh=new T.InstancedMesh(geoGrass,grassMaterials[kind],190);mesh.frustumCulled=false;
 for(let i=0;i<190;i++){let k=kind*190+i,x=(seeded(seed+k*31)-.5)*670,z=(seeded(seed+k*47+15)-.5)*670;
 dummy.position.set(x,.18,z);dummy.rotation.set(0,seeded(k+seed)*6.28,0);let scale=.65+seeded(k*3+seed)*1.4;dummy.scale.set(scale,scale,scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)}mesh.instanceMatrix.needsUpdate=true;terrain.add(mesh)}
 for(let kind=0;kind<3;kind++){let mesh=new T.InstancedMesh(geoFlower,flowerMaterials[kind],75);mesh.frustumCulled=false;
 for(let i=0;i<75;i++){let k=kind*75+i,x=(seeded(seed+k*71)-.5)*640,z=(seeded(seed+k*89+44)-.5)*640;
 dummy.position.set(x,.26,z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)}mesh.instanceMatrix.needsUpdate=true;terrain.add(mesh)}
}
function clear(group){while(group.children.length){let o=group.children[0];group.remove(o);o.traverse(x=>{x.geometry?.dispose()})}}let center=null,roadCenter=null,roadStatus=document.getElementById('roadStatus'),fetchAbort=null,roadGeneration=0;function xyz(lat,lon){return[(lon-center.lon)*111320*Math.cos(center.lat*Math.PI/180),-(lat-center.lat)*111320]}function roadStrip(points,width,material,height=.035){if(points.length<2)return;let vertices=[],indices=[];for(let i=0;i<points.length;i++){let p=points[i],before=points[Math.max(0,i-1)],after=points[Math.min(points.length-1,i+1)],dx=after[0]-before[0],dz=after[1]-before[1],d=Math.hypot(dx,dz)||1,nx=-dz/d*width/2,nz=dx/d*width/2;vertices.push(p[0]+nx,height,p[1]+nz,p[0]-nx,height,p[1]-nz);if(i){let a=i*2;indices.push(a-2,a-1,a,a-1,a+1,a)}}let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();create(roads,g,material,0,0,0)}function setRoads(elements){clear(roads);let ways=0;for(let w of elements){if(w.type!=='way'||!w.geometry||!w.tags?.highway)continue;let type=w.tags.highway,points=w.geometry.map(p=>xyz(p.lat,p.lon));let narrow=['footway','path','track','pedestrian','steps'].includes(type),w=narrow?2.5:5.8;
 roadStrip(points,w+1.5,roadEdge,.018);roadStrip(points,w,['residential','living_street','service','unclassified'].includes(type)?stonepath:path);ways++}roadStatus.textContent=ways?`Caminos medievales: ${ways} tramos · © OpenStreetMap`:'OpenStreetMap no devolvió calles en este sector'}// Fetch real OSM geometry using several independent public Overpass endpoints.
// Overpass GET is compatible with restrictive mobile proxies and makes failures diagnosable.
const ROAD_SERVERS=['https://overpass.kumi.systems/api/interpreter','https://overpass.nchc.org.tw/api/interpreter','https://overpass-api.de/api/interpreter'];
const roadCache=new Map();
async function loadRoads(lat,lon){
 const generation=++roadGeneration;
 if(fetchAbort)fetchAbort.abort();
 fetchAbort=new AbortController();
 const signal=fetchAbort.signal;
 const cacheKey=`${Math.round(lat*1000)},${Math.round(lon*1000)}`;
 roadStatus.textContent='Buscando calles y senderos reales…';
 if(roadCache.has(cacheKey)){setRoads(roadCache.get(cacheKey));return;}
 // Bounding box avoids 'around' scans and returns every public highway class in the area.
 const latD=360/111320,lonD=360/(111320*Math.max(.2,Math.cos(lat*Math.PI/180)));
 const bbox=[lat-latD,lon-lonD,lat+latD,lon+lonD].map(n=>n.toFixed(6)).join(',');
 const query=`[out:json][timeout:20];way["highway"](${bbox});out geom;`;
 let lastError='';
 for(const endpoint of ROAD_SERVERS){
  if(signal.aborted||generation!==roadGeneration)return;
  try{
   const timeout=new AbortController();const timeoutId=setTimeout(()=>timeout.abort(),13000);
   const abort=()=>timeout.abort();signal.addEventListener('abort',abort,{once:true});
   let response;
   try{response=await fetch(endpoint+'?data='+encodeURIComponent(query),{method:'GET',mode:'cors',signal:timeout.signal,cache:'no-store'});}finally{clearTimeout(timeoutId);signal.removeEventListener('abort',abort)}
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(!Array.isArray(data.elements))throw Error('Respuesta inválida');
   if(signal.aborted||generation!==roadGeneration)return;
   roadCache.set(cacheKey,data.elements);
   if(roadCache.size>8)roadCache.delete(roadCache.keys().next().value);
   setRoads(data.elements);return;
  }catch(err){lastError=err.name==='AbortError'?'Tiempo de espera agotado':err.message||'Error de red';}
 }
 if(generation===roadGeneration&&!signal.aborted){clear(roads);roadStatus.textContent='Sin caminos: error de conexión OSM ('+lastError+'). Toca GPS para reintentar';}
}
let lastNodesSignature='',lastNodesAt=null;function updateNodes(nodes){let signature=nodes.map(n=>n.key).join('|');if(signature===lastNodesSignature&&lastNodesAt&&Math.hypot(hero.position.x-lastNodesAt[0],hero.position.z-lastNodesAt[1])<12)return;lastNodesSignature=signature;lastNodesAt=[hero.position.x,hero.position.z];clear(props);if(!center)return;for(let n of nodes){let [x,z]=xyz(n.lat,n.lon);if(Math.abs(x)>360||Math.abs(z)>360)continue;if(n.type==='wood')tree(props,x,z,1.3);else if(n.type==='stone')for(let i=0;i<3;i++)boulder(props,x+(i-1)*.8,z+(i%2)*.7,.85);else if(n.type==='ore'){boulder(props,x,z,1.35,ore);create(props,new T.OctahedronGeometry(.48),mat(0x79d4c5),x,1.3,z)}else{create(props,cyl(.12,.16,1.2),trunk,x,.6,z);create(props,new T.SphereGeometry(1,7,6),treeMat[1],x,1.6,z);for(let i=0;i<5;i++)create(props,new T.SphereGeometry(.22,6,5),food,x+Math.sin(i*2.5)*.72,1.6+Math.cos(i*3)*.4,z+Math.cos(i*2.5)*.65)}let ring=create(props,new T.RingGeometry(1.5,1.7,20),mat(n.dist<=30?0xffdc6e:0xece7c0),x,.07,z);ring.rotation.x=-Math.PI/2}}create(hero,cyl(.5,.65,1.6),avatarMat,0,1.05,0);create(hero,new T.SphereGeometry(.43,12,9),mat(0xf0cba2),0,2.13,0);let hat=create(hero,new T.ConeGeometry(.63,.95,7),cape,0,2.75,0);hat.rotation.z=.12;let cloak=create(hero,new T.ConeGeometry(.87,1.8,7),cape,0,.9,.35);cloak.rotation.x=.13;let halo=create(hero,new T.RingGeometry(3.8,4.1,48),mat(0xf9e8a7),0,.05,0);halo.rotation.x=-Math.PI/2;let zoom=1,angle=0,drag=null,gestureDistance=null,gestureZoom=1;const pointers=new Map();host.style.touchAction='none';host.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});host.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,angle};if(pointers.size===2){const a=[...pointers.values()];gestureDistance=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);gestureZoom=zoom;drag=null}});host.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2&&gestureDistance){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);zoom=Math.max(.45,Math.min(2.2,gestureZoom*gestureDistance/Math.max(20,d)))}else if(drag)angle=drag.angle+(e.clientX-drag.x)*.006});const pointerEnd=e=>{pointers.delete(e.pointerId);drag=null;if(pointers.size<2)gestureDistance=null};host.addEventListener('pointerup',pointerEnd);host.addEventListener('pointercancel',pointerEnd);host.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.6,Math.min(2,zoom+Math.sign(e.deltaY)*.1))},{passive:false});window.MRWorld3D={update(p,nodes){if(!p)return;let newCenter=!center||Math.hypot((p.lat-center.lat)*111320,(p.lng-center.lon)*111320*Math.cos(p.lat*Math.PI/180))>180;if(newCenter){center={lat:p.lat,lon:p.lng};lastNodesSignature='';scenery(p.lat,p.lng);roadCenter=center;loadRoads(p.lat,p.lng)}let [x,z]=xyz(p.lat,p.lng);hero.position.set(x,0,z);updateNodes(nodes||[])},zoom(delta){zoom=Math.max(.6,Math.min(2,zoom+delta))},reset(){angle=0;zoom=1}};let ro=new ResizeObserver(()=>{let w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)});ro.observe(host);let last=0,camReady=false;const camTarget=new T.Vector3();function draw(t){requestAnimationFrame(draw);if(t-last<32)return;last=t;if(!host.offsetParent)return;let h=hero.position;const desired=new T.Vector3(h.x+Math.sin(angle)*105*zoom,100*zoom,h.z+Math.cos(angle)*105*zoom);if(!camReady){camera.position.copy(desired);camTarget.set(h.x,0,h.z);camReady=true}else{camera.position.lerp(desired,.16);camTarget.lerp(new T.Vector3(h.x,0,h.z),.2)}camera.lookAt(camTarget);renderer.render(scene,camera)}requestAnimationFrame(draw);})();
