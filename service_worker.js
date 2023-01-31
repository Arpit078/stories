
// Cached core static resources 


//calling install event
self.addEventListener("install",(e)=>{
    e.waitUntil(
      caches.open("static").then(cache=>{
        return cache.addAll(["./cache/index.html","./cache/offline.gif"]);
      })
    );
  });

//call activate event
self.addEventListener("activate",(e)=>{
    console.log("activated")
})
  
  // call fetch event
  // self.addEventListener("fetch",(e )=>{
  //   e.respondWith(
  //       // fetch(e.request).catch(()=>{caches.match(e.request)})
  //       // new Response('./cache/index.html')
  //       caches.match(e.request)
  //       .then(response => response ||fetch(e.request))
  //       .catch(()=>{
  //           if(e.request.mode === 'navigate'){
  //               return caches.match('./cache/index.html')
  //           }
  //       })
  //   );
  // });