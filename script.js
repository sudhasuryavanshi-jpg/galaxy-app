const planetsData = [
  {name:'Mercury',color:'#a7a7a7',radius:6,distance:0.39,period:4.8,desc:'Smallest planet, closest to the Sun.'},
  {name:'Venus',color:'#eec6a7',radius:9,distance:0.72,period:12.2,desc:'Dense atmosphere and very hot surface.'},
  {name:'Earth',color:'#6fb9ff',radius:10,distance:1.00,period:16.0,desc:'Our home — abundant water and life.'},
  {name:'Mars',color:'#d46b4b',radius:8,distance:1.52,period:30.0,desc:'The red planet with dusty, rocky terrain.'},
  {name:'Jupiter',color:'#d9c09a',radius:20,distance:5.2,period:70.0,desc:'Gas giant, largest in the Solar System.'},
  {name:'Saturn',color:'#f3e0b5',radius:18,distance:9.5,period:120.0,desc:'Famous for its stunning ring system.'},
  {name:'Uranus',color:'#b7e0e6',radius:14,distance:19.2,period:240.0,desc:'Ice giant tipped on its side.'},
  {name:'Neptune',color:'#4a83d6',radius:14,distance:30.1,period:320.0,desc:'Windy ice giant, deep blue color.'}
];

const container = document.getElementById('planets');
const info = {
  name:document.getElementById('planetName'),
  desc:document.getElementById('planetDesc'),
  distance:document.getElementById('planetDistance'),
  radius:document.getElementById('planetRadius'),
  period:document.getElementById('planetPeriod')
};

function createPlanet(p, i){
  const orbitScale = 90 + i*60; // px radius from center
  const wrap = document.createElement('div');
  wrap.className = 'planet-wrap';
  wrap.style.width = wrap.style.height = `${orbitScale*2}px`;
  wrap.style.marginLeft = `-${orbitScale}px`;
  wrap.style.marginTop = `-${orbitScale}px`;
  // Orbit ring
  const orbit = document.createElement('div');
  orbit.className = 'orbit';
  orbit.style.width = orbit.style.height = `${orbitScale*2}px`;
  orbit.style.zIndex = 1;
  const ring = document.createElement('div');
  ring.className = 'orbit-ring';
  orbit.appendChild(ring);
  wrap.appendChild(orbit);

  // planet element positioned on orbit edge
  const planet = document.createElement('div');
  planet.className = 'planet';
  planet.style.width = `${Math.max(6, p.radius*2.8)}px`;
  planet.style.height = `${Math.max(6, p.radius*2.8)}px`;
  planet.style.background = p.color;
  planet.style.zIndex = 3;

  // position at rightmost point of orbit
  planet.style.left = `calc(50% + ${orbitScale}px)`;
  planet.style.top = '50%';

  // animation: orbit rotation
  const period = Math.max(6, p.period / 8); // speed factor for demo
  wrap.style.animation = `spin ${period}s linear infinite`;
  wrap.dataset.orbit = 'true';

  // click handler
  planet.addEventListener('click', ()=> showInfo(p));
  planet.addEventListener('mouseenter', ()=> showInfo(p));

  wrap.appendChild(planet);
  container.appendChild(wrap);
}

function showInfo(p){
  info.name.textContent = p.name;
  info.desc.textContent = p.desc;
  info.distance.textContent = `${p.distance} AU`;
  info.radius.textContent = `${p.radius} × 1000 km (visual)`;
  info.period.textContent = `${p.period} (demo scale)`;
}

// build planets
planetsData.forEach((p,i)=> createPlanet(p,i));

// toggle motion
const toggle = document.getElementById('toggleMotion');
toggle.addEventListener('click', ()=>{
  const root = document.querySelector('.solar-wrap');
  const paused = root.classList.toggle('paused');
  toggle.textContent = paused ? 'Play' : 'Pause';
  toggle.setAttribute('aria-pressed', String(paused));
});

// initial selection
showInfo(planetsData[2]);

// small accessibility: keyboard navigation
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
    // select next
    const cur = planetsData.findIndex(p => p.name === info.name.textContent);
    const next = planetsData[(cur+1) % planetsData.length];
    showInfo(next);
  }
  if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
    const cur = planetsData.findIndex(p => p.name === info.name.textContent);
    const prev = planetsData[(cur-1 + planetsData.length) % planetsData.length];
    showInfo(prev);
  }
});

// CSS animation keyframes injected programmatically for easier control
const style = document.createElement('style');
style.textContent = `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;
document.head.appendChild(style);
