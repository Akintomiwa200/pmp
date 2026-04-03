// tests/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatDate, formatDateShort, timeAgo, getLevelColor, truncate, generateId } from "@/lib/utils";

describe("formatDate", () => {
  it("formats a date string correctly", () => {
    const result = formatDate("2025-03-28T10:00:00Z");
    expect(result).toMatch(/Mar 28, 2025/);
  });
});

describe("formatDateShort", () => {
  it("formats short date correctly", () => {
    const result = formatDateShort("2025-03-28T10:00:00Z");
    expect(result).toMatch(/Mar 28/);
  });
});

describe("timeAgo", () => {
  it("shows minutes for recent times", () => {
    const recent = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(recent)).toMatch(/5m ago/);
  });

  it("shows hours for older times", () => {
    const older = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(older)).toMatch(/3h ago/);
  });

  it("shows days for very old times", () => {
    const old = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(old)).toMatch(/2d ago/);
  });
});

describe("getLevelColor", () => {
  it("returns green for beginner", () => {
    const color = getLevelColor("beginner");
    expect(color.text).toContain("beginner");
  });

  it("returns blue for intermediate", () => {
    const color = getLevelColor("intermediate");
    expect(color.text).toContain("intermediate");
  });

  it("returns purple for advanced", () => {
    const color = getLevelColor("advanced");
    expect(color.text).toContain("advanced");
  });

  it("returns default for unknown level", () => {
    const color = getLevelColor("unknown");
    expect(color.bg).toBe("bg-surface-2");
  });
});

describe("truncate", () => {
  it("truncates long text", () => {
    const text = "a".repeat(200);
    const result = truncate(text, 50);
    expect(result.length).toBeLessThanOrEqual(53);
    expect(result).toMatch(/\.\.\.$/);
  });

  it("does not truncate short text", () => {
    const text = "short text";
    expect(truncate(text, 50)).toBe("short text");
  });
});

describe("generateId", () => {
  it("generates id with prefix", () => {
    const id = generateId("usr");
    expect(id).toMatch(/^usr_/);
  });

  it("generates unique ids", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId("test")));
    expect(ids.size).toBe(100);
  });
});
