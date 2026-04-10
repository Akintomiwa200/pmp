// lib/db.ts
// Unified DB service: tries MongoDB first, falls back to JSON store.

import type {
  Course,
  Job,
  Level,
  Mentor,
  PMEvent,
  Post,
  Progress,
  Quiz,
  User,
} from "@/types";

async function withMongo<T>(
  mongoFn: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  if (!process.env.MONGODB_URI) return fallback();
  try {
    return await mongoFn();
  } catch (err) {
    console.warn("[DB] MongoDB unavailable, using JSON store:", err);
    return fallback();
  }
}

// ─── Users ─────────────────────────────────────────────────────────────────
export async function getUsers(): Promise<User[]> {
  const { UsersStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<User>("users");
      return col.find({}).toArray() as Promise<User[]>;
    },
    () => UsersStore.findAll()
  );
}

export async function getUserById(id: string): Promise<User | null> {
  const { UsersStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<User>("users");
      return (await col.findOne({ _id: id as unknown as never })) as User | null;
    },
    () => UsersStore.findById(id) ?? null
  );
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { UsersStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<User>("users");
      return (await col.findOne({ email })) as User | null;
    },
    () => UsersStore.findOne((u) => u.email === email) ?? null
  );
}

export async function createUser(user: User): Promise<User> {
  const { UsersStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<User>("users");
      await col.insertOne(user);
      return user;
    },
    () => UsersStore.create(user)
  );
}

// ─── Courses ────────────────────────────────────────────────────────────────
export async function getCourses(level?: Level): Promise<Course[]> {
  const { CoursesStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Course>("courses");
      const filter = level && level !== "all" ? { level } : {};
      return col.find(filter).toArray() as Promise<Course[]>;
    },
    () =>
      level && level !== "all"
        ? CoursesStore.findBy((c) => c.level === level)
        : CoursesStore.findAll()
  );
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const { CoursesStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Course>("courses");
      return (await col.findOne({ slug })) as Course | null;
    },
    () => CoursesStore.findOne((c) => c.slug === slug) ?? null
  );
}

// ─── Events ─────────────────────────────────────────────────────────────────
export async function getEvents(filters?: {
  format?: string;
  level?: string;
  type?: string;
}): Promise<PMEvent[]> {
  const { EventsStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<PMEvent>("events");
      const filter: Record<string, string> = {};
      if (filters?.format && filters.format !== "all") filter.format = filters.format;
      if (filters?.level && filters.level !== "all") filter.level = filters.level;
      if (filters?.type && filters.type !== "all") filter.type = filters.type;
      return col.find(filter).toArray() as Promise<PMEvent[]>;
    },
    () => {
      let all = EventsStore.findAll();
      if (filters?.format && filters.format !== "all")
        all = all.filter((e) => e.format === filters.format);
      if (filters?.level && filters.level !== "all")
        all = all.filter((e) => e.level === filters.level || e.level === "all");
      if (filters?.type && filters.type !== "all")
        all = all.filter((e) => e.type === filters.type);
      return all;
    }
  );
}

// ─── Community Posts ─────────────────────────────────────────────────────────
export async function getPosts(level?: Level): Promise<Post[]> {
  const { PostsStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Post>("community");
      const filter = level && level !== "all" ? { level } : {};
      return col.find(filter).sort({ isPinned: -1, createdAt: -1 }).toArray() as Promise<Post[]>;
    },
    () => {
      let posts = PostsStore.findAll();
      if (level && level !== "all") posts = posts.filter((p) => p.level === level);
      return posts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    }
  );
}

// ─── Jobs ────────────────────────────────────────────────────────────────────
export async function getJobs(filters?: {
  level?: string;
  isRemote?: boolean;
  type?: string;
}): Promise<Job[]> {
  const { JobsStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Job>("jobs");
      const filter: Record<string, unknown> = {};
      if (filters?.level) filter.level = filters.level;
      if (filters?.isRemote !== undefined) filter.isRemote = filters.isRemote;
      if (filters?.type) filter.type = filters.type;
      return col.find(filter).toArray() as Promise<Job[]>;
    },
    () => {
      let jobs = JobsStore.findAll();
      if (filters?.level) jobs = jobs.filter((j) => j.level === filters.level);
      if (filters?.isRemote !== undefined)
        jobs = jobs.filter((j) => j.isRemote === filters.isRemote);
      if (filters?.type) jobs = jobs.filter((j) => j.type === filters.type);
      return jobs;
    }
  );
}

// ─── Mentors ─────────────────────────────────────────────────────────────────
export async function getMentors(): Promise<Mentor[]> {
  const { MentorsStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Mentor>("mentors");
      return col.find({ isAccepting: true }).toArray() as Promise<Mentor[]>;
    },
    () => MentorsStore.findBy((m) => m.isAccepting)
  );
}

// ─── Progress ────────────────────────────────────────────────────────────────
export async function getUserProgress(userId: string): Promise<Progress[]> {
  const { ProgressStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Progress>("progress");
      return col.find({ userId }).toArray() as Promise<Progress[]>;
    },
    () => ProgressStore.findBy((p) => p.userId === userId)
  );
}

// ─── Quizzes ────────────────────────────────────────────────────────────────
export async function getQuizById(id: string): Promise<Quiz | null> {
  const { QuizzesStore } = await import("@/lib/dataStore");
  return withMongo(
    async () => {
      const { getCollection } = await import("@/lib/mongodb");
      const col = await getCollection<Quiz>("quizzes");
      return (await col.findOne({ _id: id as unknown as never })) as Quiz | null;
    },
    () => QuizzesStore.findById(id) ?? null
  );
}
