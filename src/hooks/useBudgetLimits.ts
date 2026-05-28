import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { budgetLimitService } from "../services/budget-limit.service";
import { useWorkspace } from "./useWorkspace";
import type {
  BudgetLimit,
  BudgetSummary,
  BudgetUsage,
  CreateBudgetLimitPayload,
  CurrencyCode,
  UpdateBudgetLimitPayload,
} from "../types/budget-limit";

const getCurrentMonth = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${now.getFullYear()}-${month}`;
};

export const useBudgetLimits = () => {
  const { activeWorkspaceId, activeRole } = useWorkspace();

  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
  const [budgetUsage, setBudgetUsage] = useState<BudgetUsage[]>([]);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(
    null,
  );

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [currency, setCurrency] = useState<CurrencyCode>("TRY");

  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const canViewBudgets =
    activeRole === "OWNER" ||
    activeRole === "EDITOR" ||
    activeRole === "VIEWER";

  const canManageBudgets = activeRole === "OWNER" || activeRole === "EDITOR";

  const fetchBudgetData = useCallback(async () => {
    if (!activeWorkspaceId || !canViewBudgets) {
      setBudgetLimits([]);
      setBudgetUsage([]);
      setBudgetSummary(null);
      return;
    }

    setIsLoading(true);

    try {
      const [limitsResponse, usageResponse, summaryResponse] =
        await Promise.all([
          budgetLimitService.getBudgetLimits(activeWorkspaceId),
          budgetLimitService.getBudgetUsage({
            workspaceId: activeWorkspaceId,
            month: selectedMonth,
            currency,
          }),
          budgetLimitService.getBudgetSummary({
            workspaceId: activeWorkspaceId,
            month: selectedMonth,
            currency,
          }),
        ]);

      setBudgetLimits(limitsResponse);
      setBudgetUsage(usageResponse);
      setBudgetSummary(summaryResponse);
    } catch (error) {
      console.error(error);
      toast.error("Bütçe verileri yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, [activeWorkspaceId, canViewBudgets, selectedMonth, currency]);

  useEffect(() => {
    fetchBudgetData();
  }, [fetchBudgetData]);

  const createBudgetLimit = async (data: CreateBudgetLimitPayload) => {
    if (!activeWorkspaceId) return;

    setIsActionLoading(true);

    try {
      await budgetLimitService.createBudgetLimit(activeWorkspaceId, {
        ...data,
        period: data.period || "monthly",
      });

      toast.success("Bütçe limiti başarıyla oluşturuldu.");
      await fetchBudgetData();
    } catch (error) {
      console.error(error);
      toast.error("Bütçe limiti oluşturulurken bir hata oluştu.");
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const updateBudgetLimit = async (
    budgetLimitId: string,
    data: UpdateBudgetLimitPayload,
  ) => {
    if (!activeWorkspaceId) return;

    setIsActionLoading(true);

    try {
      await budgetLimitService.updateBudgetLimit(
        activeWorkspaceId,
        budgetLimitId,
        data,
      );

      toast.success("Bütçe limiti başarıyla güncellendi.");
      await fetchBudgetData();
    } catch (error) {
      console.error(error);
      toast.error("Bütçe limiti güncellenirken bir hata oluştu.");
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const deleteBudgetLimit = async (budgetLimitId: string) => {
    if (!activeWorkspaceId) return;

    setIsActionLoading(true);

    try {
      await budgetLimitService.deleteBudgetLimit(
        activeWorkspaceId,
        budgetLimitId,
      );

      toast.success("Bütçe limiti başarıyla silindi.");
      await fetchBudgetData();
    } catch (error) {
      console.error(error);
      toast.error("Bütçe limiti silinirken bir hata oluştu.");
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const usageByLimitId = useMemo(() => {
    return budgetUsage.reduce<Record<string, BudgetUsage>>((acc, item) => {
      acc[item.budgetLimitId] = item;
      return acc;
    }, {});
  }, [budgetUsage]);

  return {
    budgetLimits,
    budgetUsage,
    budgetSummary,
    usageByLimitId,

    selectedMonth,
    setSelectedMonth,

    currency,
    setCurrency,

    isLoading,
    isActionLoading,

    canViewBudgets,
    canManageBudgets,

    fetchBudgetData,
    createBudgetLimit,
    updateBudgetLimit,
    deleteBudgetLimit,
  };
};
