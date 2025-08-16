// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA3N7t1YmEuOg7AmNF6iTjHjVyJ1bf0v0k",
  authDomain: "aravinth-crackers-f878f.firebaseapp.com",
  projectId: "aravinth-crackers-f878f",
  storageBucket: "aravinth-crackers-f878f.appspot.com", // ✅ fixed
  messagingSenderId: "558392452429",
  appId: "1:558392452429:web:88aa5e283da1435ece0304",
});

// Use compat for service worker
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
