importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },  
    { url: '/index.html', revision: '1' }, 
    { url: '/nav.html', revision: '1' }, 
	{ url: '/manifest.json', revision: '1' }, 
	
    { url: '/css/materialize.min.css', revision: '1' }, 
	{ url: '/js/lib/materialize.min.js', revision: '1' }, 
	

	{ url: '/js/lib/idb.js', revision: '1' }, 
	{ url: '/js/script.js', revision: '1' },
	{ url: '/js/setting.js', revision: '1' },

	{ url: '/images/loader.gif', revision: '1' }, 
	{ url: '/images/icons/icon-72x72.png', revision: '1' }, 
	{ url: '/images/icons/icon-192x192.png', revision: '1' }, 
	{ url: '/images/icons/icon-512x512.png', revision: '1' },

	// { url: '/js/pages/favorite.js', revision: '1' }, 
	// { url: '/js/pages/matches.js', revision: '1' }, 
	// { url: '/js/pages/teams.js', revision: '1' }, 

	// { url: '/pages/favorite.html', revision: '1' }, 
	// { url: '/pages/matches.html', revision: '1' }, 
	// { url: '/pages/teams.html', revision: '1' }

]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'pagesCache'
	})
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'image/icons/icon-128x128.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
