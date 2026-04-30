import { z } from "zod";
import type { TFunction } from "i18next";
export const getTransactionSchema = (t: TFunction) =>
  z.object({
    title: z
      .string()
      .min(3, t("validation.transaction_title_min_length"))
      .max(50, t("validation.transaction_title_max_length")),

    input_details: z.object({
      amount: z
        .union([z.number(), z.string()])
        .transform((val) => Number(val))
        .pipe(
          z
            .number("Lütfen geçerli bir rakam giriniz")
            .positive("Miktar 0'dan büyük olmalıdır")
            .max(10000000, "Limit aşıldı")
            .refine(
              (val) => {
                const decimals = val.toString().split(".")[1];
                return !decimals || decimals.length <= 2;
              },
              { message: "En fazla 2 ondalık basamak girebilirsiniz" },
            ),
        ),
      currency: z.enum(["TRY", "USD", "EUR"]),
    }),

    type: z.enum(["income", "expense"]),

    category: z
      .string()
      .min(3, t("validation.transaction_category_min_length")),

    date: z
      .string()
      .min(1, t("validation.transaction_date_required"))
      .transform((val) => new Date(val)),

    description: z
      .string()
      .max(200, t("validation.transaction_description_max_length"))
      .optional(),

    userId: z.string().optional(),
  });
