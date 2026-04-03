// scripts/seed.ts
// Run: npx tsx scripts/seed.ts
// Seeds MongoDB with all JSON data files

import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/pmpath";
const DATA_DIR = path.join(process.cwd(), ".data");

function readJson<T>(relativePath: string): T[] {
  const full = path.join(DATA_DIR, relativePath);
  return JSON.parse(fs.readFileSync(full, "utf-8"));
}

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("pmpath");
    console.log("🌱 Connected to MongoDB. Seeding...");

    const collections = [
      { name: "users", file: "users/users.json" },
      { name: "courses", file: "courses/courses.json" },
      { name: "modules", file: "courses/modules.json" },
      { name: "quizzes", file: "quizzes/quizzes.json" },
      { name: "events", file: "events/events.json" },
      { name: "community", file: "community/posts.json" },
      { name: "jobs", file: "jobs/jobs.json" },
      { name: "mentors", file: "mentorship/mentors.json" },
      { name: "progress", file: "progress/progress.json" },
    ];

    for (const { name, file } of collections) {
      const data = readJson(file);
      const col = db.collection(name);
      await col.deleteMany({});
      if (data.length > 0) {
        await col.insertMany(data as never[]);
      }
      console.log(`  ✅ ${name}: ${data.length} documents`);
    }

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("courses").createIndex({ slug: 1 }, { unique: true });
    await db.collection("courses").createIndex({ level: 1 });
    await db.collection("events").createIndex({ startDate: 1 });
    await db.collection("events").createIndex({ level: 1, format: 1 });
    await db.collection("community").createIndex({ level: 1, isPinned: -1, createdAt: -1 });
    await db.collection("jobs").createIndex({ level: 1, isRemote: 1 });
    await db.collection("progress").createIndex({ userId: 1, courseId: 1 });

    console.log("\n✨ Seed complete! Indexes created.");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
