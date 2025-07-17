// seed/seedCourses.js
const Course = require("../models/Course");

async function seedCourses(instructor) {
  const existing = await Course.findOne({ name: "Node.js Eğitimi" });

  if (!existing) {
    await Course.create({
      name: "Node.js Eğitimi",
      description: "Sıfırdan ileri seviye Node.js kursu",
      photo: "node-course.jpg",
      price: 299,
      instructor: instructor._id,
    });
    console.log("✅ Kurs eklendi.");
  } else {
    console.log("ℹ️ Kurs zaten mevcut.");
  }
}

module.exports = seedCourses;
