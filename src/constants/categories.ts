import type { TFunction } from "i18next";

export type AppCategoryType = "income" | "expense";

export interface CategoryOption {
  label: string;
  value: string;
  icon: string;
}

export const getIncomeCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    label: t("categories.salary"),
    value: "salary",
    icon: "💼",
  },
  {
    label: t("categories.freelance"),
    value: "freelance",
    icon: "🧑‍💻",
  },
  {
    label: t("categories.trade_profit"),
    value: "trade_profit",
    icon: "📈",
  },
  {
    label: t("categories.dividend"),
    value: "dividend",
    icon: "💹",
  },
  {
    label: t("categories.rental_income"),
    value: "rental_income",
    icon: "🏠",
  },
  {
    label: t("categories.gift"),
    value: "gift",
    icon: "🎁",
  },
  {
    label: t("categories.other"),
    value: "other",
    icon: "💰",
  },
];

export const getExpenseCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    label: t("categories.rent"),
    value: "rent",
    icon: "🏠",
  },
  {
    label: t("categories.market"),
    value: "market",
    icon: "🛒",
  },
  {
    label: t("categories.food"),
    value: "food",
    icon: "🍽️",
  },
  {
    label: t("categories.transport"),
    value: "transport",
    icon: "🚗",
  },
  {
    label: t("categories.bills"),
    value: "bills",
    icon: "🧾",
  },
  {
    label: t("categories.shopping"),
    value: "shopping",
    icon: "🛍️",
  },
  {
    label: t("categories.health"),
    value: "health",
    icon: "💊",
  },
  {
    label: t("categories.education"),
    value: "education",
    icon: "🎓",
  },
  {
    label: t("categories.entertainment"),
    value: "entertainment",
    icon: "🎮",
  },
  {
    label: t("categories.subscription"),
    value: "subscription",
    icon: "📱",
  },
  {
    label: t("categories.travel"),
    value: "travel",
    icon: "✈️",
  },
  {
    label: t("categories.family"),
    value: "family",
    icon: "👨‍👩‍👧",
  },
  {
    label: t("categories.personal_care"),
    value: "personal_care",
    icon: "🧴",
  },
  {
    label: t("categories.investment"),
    value: "investment",
    icon: "📊",
  },
  {
    label: t("categories.other"),
    value: "other",
    icon: "💰",
  },
];

export const getCategoryOptionsByType = (
  type: AppCategoryType,
  t: TFunction,
): CategoryOption[] => {
  if (type === "income") {
    return getIncomeCategoryOptions(t);
  }

  return getExpenseCategoryOptions(t);
};

export const getExpenseCategorySelectOptions = (t: TFunction) => {
  return getExpenseCategoryOptions(t).map((category) => ({
    label: `${category.icon} ${category.label}`,
    value: category.value,
  }));
};

export const getTransactionCategorySelectOptions = (
  type: AppCategoryType,
  t: TFunction,
) => {
  return getCategoryOptionsByType(type, t).map((category) => ({
    label: `${category.icon} ${category.label}`,
    value: category.value,
  }));
};

export const CATEGORY_ICON_MAP: Record<string, string> = {
  salary: "💼",
  freelance: "🧑‍💻",
  trade_profit: "📈",
  dividend: "💹",
  rental_income: "🏠",
  gift: "🎁",

  rent: "🏠",
  market: "🛒",
  food: "🍽️",
  transport: "🚗",
  bills: "🧾",
  shopping: "🛍️",
  health: "💊",
  education: "🎓",
  entertainment: "🎮",
  subscription: "📱",
  travel: "✈️",
  family: "👨‍👩‍👧",
  personal_care: "🧴",
  investment: "📊",
  other: "💰",
};

export const getCategoryIcon = (categoryValue: string): string => {
  return CATEGORY_ICON_MAP[categoryValue] || "💰";
};
