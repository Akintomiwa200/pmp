// lib/dataStore.ts
// Lightweight JSON-based data store that mirrors MongoDB collections.
// Used as fallback when MongoDB is unavailable, and as seed source.

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

function readJson<T>(filePath: string): T[] {
  try {
    const fullPath = path.join(DATA_DIR, filePath);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    console.warn(`[DataStore] Could not read ${filePath}`);
    return [];
  }
}

function writeJson<T>(filePath: string, data: T[]): void {
  const fullPath = path.join(DATA_DIR, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
}

// Generic CRUD for JSON collections
export function createStore<T extends { _id: string }>(filePath: string) {
  return {
    findAll: (): T[] => readJson<T>(filePath),

    findById: (id: string): T | undefined =>
      readJson<T>(filePath).find((item) => item._id === id),

    findBy: (predicate: (item: T) => boolean): T[] =>
      readJson<T>(filePath).filter(predicate),

    findOne: (predicate: (item: T) => boolean): T | undefined =>
      readJson<T>(filePath).find(predicate),

    create: (item: T): T => {
      const all = readJson<T>(filePath);
      all.push(item);
      writeJson(filePath, all);
      return item;
    },

    update: (id: string, updates: Partial<T>): T | null => {
      const all = readJson<T>(filePath);
      const idx = all.findIndex((item) => item._id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeJson(filePath, all);
      return all[idx];
    },

    delete: (id: string): boolean => {
      const all = readJson<T>(filePath);
      const next = all.filter((item) => item._id !== id);
      if (next.length === all.length) return false;
      writeJson(filePath, next);
      return true;
    },

    count: (): number => readJson<T>(filePath).length,
  };
}

// Pre-built stores matching MongoDB collections
import type {
  User, Course, Module, Quiz, PMEvent, Post, Job, Mentor, Progress,
} from "@/types";

export const UsersStore = createStore<User>("users/users.json");
export const CoursesStore = createStore<Course>("courses/courses.json");
export const ModulesStore = createStore<Module>("courses/modules.json");
export const QuizzesStore = createStore<Quiz>("quizzes/quizzes.json");
export const EventsStore = createStore<PMEvent>("events/events.json");
export const PostsStore = createStore<Post>("community/posts.json");
export const JobsStore = createStore<Job>("jobs/jobs.json");
export const MentorsStore = createStore<Mentor>("mentorship/mentors.json");
export const ProgressStore = createStore<Progress>("progress/progress.json");
