/* Prime Shield Chemical service worker: pages are always fetched fresh when online; images are served instantly from cache; the site still opens offline. */
const V='ps-v1',CORE=['./','index.html','logo.png','favicon.png','icon-192.png','icon-512.png','pest-control.webp','cockroach.webp','termite.webp','bedbug.webp','ant-lizard.webp','mosquito.webp','roach-cartoon.webp','story-plate.webp','story-cloche.webp','story-window.webp','story-sash.webp','story-curtain.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
  if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.host))return;
  e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(res=>{if(res&&res.status===200){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>m);return m||f}))});
