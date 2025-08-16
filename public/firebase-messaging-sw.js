// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyA3N7t1YmEuOg7AmNF6iTjHjVyJ1bf0v0k",
  authDomain: "aravinth-crackers-f878f.firebaseapp.com",
  projectId: "aravinth-crackers-f878f",
  storageBucket: "aravinth-crackers-f878f.firebasestorage.app",
  messagingSenderId: "558392452429",
  appId: "1:558392452429:web:88aa5e283da1435ece0304",
});

const messaging = firebase.messaging();

// Listen for background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
