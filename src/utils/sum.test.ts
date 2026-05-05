import { describe, it, expect } from "vitest";
import { sum } from "./sum";

describe("sum", () => {
  it("iki sayıyı toplar", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
