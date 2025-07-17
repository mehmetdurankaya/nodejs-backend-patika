// seed/seedUsers.js
const User = require("../models/User");

async function seedUsers() {
  const existing = await User.findOne({ email: "admin@example.com" });

  if (!existing) {
    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123", // hash'lenir
      userType: "admin",
    });
    console.log("✅ Admin kullanıcı oluşturuldu.");
    return admin;
  } else {
    console.log("ℹ️ Admin kullanıcı zaten mevcut.");
    return existing;
  }
}

module.exports = seedUsers;