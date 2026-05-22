import type { TFunction } from "i18next";
import type { ApiErrorResponse } from "../types/api-error";

export const getApiErrorMessage = (
  t: TFunction,
  serverError?: ApiErrorResponse,
) => {
  if (serverError?.code) {
    return t(`server_errors.${serverError.code}`, {
      defaultValue: t("errors.general"),
    });
  }

  return t("errors.general");
};
