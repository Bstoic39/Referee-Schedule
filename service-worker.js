// Minimal service worker: notifications only, NO caching.
// This avoids the common "stale app shell / blank screen" problems.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Optional: handle notification click (focus app)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of allClients) {
        if ("focus" in client) return client.focus();
      }
      // If no window exists, open the site
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })()
  );
});
