
// Cached core static resources 
//calling install event
self.addEventListener("install",(e)=>{
    e.waitUntil(
      caches.open("static").then(cache=>{
        return cache.addAll(["./",'./logo192.png','./style.css','./script.js','./assets/load.png','./assets/pin.png','./service_worker.js','./manifest.json']);
      })
    );
  });

//call activate event
self.addEventListener("activate",(e)=>{
    console.log("activated")
})
  
  // call fetch event
  self.addEventListener("fetch",(e )=>{
      console.log("Service Worker : Fetching")
    e.respondWith(
        fetch(e.request).catch(()=>{caches.match(e.request)})
    );
  });