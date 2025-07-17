// seed.js
require("dotenv").config();
const mongoose = require("mongoose");

const seedUsers = require("./seed/seedUsers");
const seedCourses = require("./seed/seedCourses");

async function run() {
  await mongoose.connect(process.env.APP_MONGO_FULL_URL, {
    dbName: process.env.APP_MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("🌱 Seeding başladı...");

  const admin = await seedUsers();
  await seedCourses(admin);

  console.log("✅ Tüm seed işlemleri tamamlandı.");
  mongoose.disconnect();
}

run();
