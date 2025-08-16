// functions/index.js
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// Trigger when a new order is created
exports.notifyAdminOnNewOrder = onDocumentCreated("orders/{orderId}", async (event) => {
  const order = event.data.data();

  const tokensSnap = await db.collection("adminTokens").get();
  const tokens = tokensSnap.docs.map((doc) => doc.data().token);

  if (tokens.length > 0) {
    await getMessaging().sendEachForMulticast({
      tokens,
      notification: {
        title: "🛒 New Order",
        body: `Order from ${order.name} - ₹${order.totalAmount}`,
      },
      data: {
        click_action: "https://aravinth-crackers-f878f.web.app/admin/orders", // ✅ opens admin on tap
      },
    });
    console.log("Notification sent to admins");
  } else {
    console.log("No admin tokens found");
  }
});

