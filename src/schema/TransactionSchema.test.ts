import { describe, expect, it } from "vitest";
import type { TFunction } from "i18next";
import { getTransactionSchema } from "./TransactionSchema";

const t = ((key: string) => key) as TFunction;

const validTransaction = {
  title: "Market alışverişi",
  input_details: {
    amount: 250,
    currency: "TRY",
  },
  type: "expense",
  category: "market",
  date: "2026-05-05",
  description: "Haftalık alışveriş",
};

describe("getTransactionSchema", () => {
  it("valid transaction data should pass validation", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse(validTransaction);

    expect(result.success).toBe(true);
  });

  it("should transform amount string to number", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      input_details: {
        amount: "125.50",
        currency: "USD",
      },
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.input_details.amount).toBe(125.5);
    }
  });

  it("should transform date string to Date", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse(validTransaction);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.date).toBeInstanceOf(Date);
    }
  });

  it("should fail when title is shorter than 3 characters", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      title: "ab",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when amount is zero", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      input_details: {
        amount: 0,
        currency: "TRY",
      },
    });

    expect(result.success).toBe(false);
  });

  it("should fail when amount has more than 2 decimals", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      input_details: {
        amount: 10.999,
        currency: "TRY",
      },
    });

    expect(result.success).toBe(false);
  });

  it("should fail when amount exceeds max limit", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      input_details: {
        amount: 10000001,
        currency: "TRY",
      },
    });

    expect(result.success).toBe(false);
  });

  it("should fail when currency is invalid", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      input_details: {
        amount: 100,
        currency: "GBP",
      },
    });

    expect(result.success).toBe(false);
  });

  it("should fail when category is shorter than 3 characters", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      category: "ab",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when description is longer than 200 characters", () => {
    const schema = getTransactionSchema(t);

    const result = schema.safeParse({
      ...validTransaction,
      description: "a".repeat(201),
    });

    expect(result.success).toBe(false);
  });
});
