import { useEffect, useState } from "react";
import "./TransactionList.scss";
import {
  type Transaction,
  type TransactionFilters,
} from "../../../types/transaction";
import TransactionItem from "../TransactionItem/TransactionItem";
import Button from "../../ui/Button/Button";
import TransactionForm from "../TransactionForm/TransactionForm";
import Pagination from "../../ui/Pagination/Pagination";
import { useTransactions } from "../../../hooks/useTransactions";
import Select from "../../ui/Select/Select";
import { transactionService } from "../../../services/transaction.service";
import { Modal } from "../../ui/Modal/Modal";
import { useTranslation } from "react-i18next";
import Input from "../../ui/Input/Input";
import { toast } from "sonner";
import { useWorkspace } from "../../../hooks/useWorkspace";

function TransactionList() {
  const { t } = useTranslation();
  const { activeWorkspaceId, activeWorkspace } = useWorkspace();

  const canManageTransactions =
    activeWorkspace?.role === "OWNER" || activeWorkspace?.role === "EDITOR";

  const {
    transactions,
    pagination,
    setPagination,
    refresh,
    filters,
    setFilters,
    searchValue,
    setSearchValue,
  } = useTransactions(10);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [localFilters, setLocalFilters] = useState<TransactionFilters>({
    type: "",
    startDate: "",
    endDate: "",
    category: "",
    search: "",
    filter: "",
  });

  useEffect(() => {
    if (isFiltersOpen) {
      setLocalFilters(filters);
    }
  }, [isFiltersOpen, filters]);

  useEffect(() => {
    if (!isFiltersOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isFiltersOpen]);

  const activeFilterCount = [
    filters.type,
    filters.startDate,
    filters.endDate,
    filters.filter,
  ].filter(Boolean).length;

  const refreshAfterTransactionChange = () => {
    refresh();
    window.dispatchEvent(new Event("refresh-dashboard"));
  };

  const openDeleteModal = (id: string) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleApplyFiltersMobile = () => {
    setFilters(localFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters: TransactionFilters = {
      type: "",
      startDate: "",
      endDate: "",
      category: "",
      search: "",
      filter: "",
    };

    setFilters(emptyFilters);
    setLocalFilters(emptyFilters);
    setSearchValue("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
  };

  return (
    <div className="transaction-list">
      <div className="transaction-list__header">
        <h3 className="transaction-list__title">
          {t("transaction_list__title")}
        </h3>

        {canManageTransactions && (
          <Button
            variant="primary"
            onClick={() => {
              setSelectedTransaction(null);
              setIsFormOpen(true);
            }}
          >
            {t("new_transaction")}
          </Button>
        )}
      </div>

      <div className="transaction-list__mobile-controls">
        <div className="transaction-list__mobile-search-wrapper">
          <Input
            label=""
            value={searchValue}
            placeholder="Search transactions..."
            onChange={handleSearchChange}
          />
        </div>

        <button
          type="button"
          className="transaction-list__filter-button"
          onClick={() => setIsFiltersOpen(true)}
        >
          <span>{t("filters")}</span>
          {activeFilterCount > 0 && <strong>{activeFilterCount}</strong>}
        </button>
      </div>

      {isFiltersOpen && (
        <button
          type="button"
          className="transaction-list__filters-backdrop"
          aria-label="Close filters"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      <div
        className={`transaction-filters ${
          isFiltersOpen ? "transaction-filters--open" : ""
        }`}
        role="dialog"
        aria-modal={isFiltersOpen}
        aria-label="Transaction filters"
      >
        <div className="transaction-filters__mobile-header">
          <div>
            <span className="transaction-filters__eyebrow">{t("filters")}</span>
            <h4>{t("filters")}</h4>
          </div>

          <button
            type="button"
            className="transaction-filters__close"
            onClick={() => setIsFiltersOpen(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="transaction-filters__desktop-search">
          <Input
            label={t("search")}
            value={searchValue}
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>

        <div className="transaction-filters__form-content">
          <div className="filter-group">
            <Select
              label={t("transaction_type")}
              value={
                isFiltersOpen ? (localFilters.type ?? "") : (filters.type ?? "")
              }
              options={[
                { label: t("all"), value: "" },
                { label: t("income"), value: "income" },
                { label: t("expense"), value: "expense" },
              ]}
              onChange={(val) => {
                if (isFiltersOpen) {
                  setLocalFilters({ ...localFilters, type: val });
                } else {
                  setFilters({ ...filters, type: val });
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }
              }}
            />
          </div>

          <div className="filter-group">
            <Select
              label={t("filters")}
              value={
                isFiltersOpen
                  ? (localFilters.filter ?? "")
                  : (filters.filter ?? "")
              }
              options={[
                { label: t("newest_to_oldest"), value: "newest" },
                { label: t("oldest_to_newest"), value: "oldest" },
                { label: t("last_7_days"), value: "7days" },
                { label: t("last_30_days"), value: "30days" },
              ]}
              onChange={(value) => {
                if (isFiltersOpen) {
                  setLocalFilters({
                    ...localFilters,
                    filter: value as TransactionFilters["filter"],
                  });
                } else {
                  setFilters((prev) => ({
                    ...prev,
                    filter: value as TransactionFilters["filter"],
                  }));
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }
              }}
            />
          </div>

          <div className="filter-group">
            <Input
              label={t("start_date")}
              type="date"
              value={
                isFiltersOpen
                  ? localFilters.startDate || ""
                  : filters.startDate || ""
              }
              onChange={(value) => {
                if (isFiltersOpen) {
                  setLocalFilters({ ...localFilters, startDate: value });
                } else {
                  setFilters({ ...filters, startDate: value });
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }
              }}
            />
          </div>

          <div className="filter-group">
            <Input
              label={t("end_date")}
              type="date"
              value={
                isFiltersOpen
                  ? localFilters.endDate || ""
                  : filters.endDate || ""
              }
              onChange={(value) => {
                if (isFiltersOpen) {
                  setLocalFilters({ ...localFilters, endDate: value });
                } else {
                  setFilters({ ...filters, endDate: value });
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }
              }}
            />
          </div>
        </div>

        <div className="transaction-filters__reset">
          <Button variant="danger" onClick={resetFilters}>
            {t("reset")}
          </Button>
        </div>

        <div className="transaction-filters__mobile-actions">
          <Button variant="danger" onClick={resetFilters}>
            {t("reset")}
          </Button>

          <Button variant="primary" onClick={handleApplyFiltersMobile}>
            {t("apply")}
          </Button>
        </div>
      </div>

      <div className="transaction-list__items">
        {transactions.length === 0 ? (
          <p className="transaction-list__empty">{t("no_transactions")}</p>
        ) : (
          transactions.map((item) => (
            <TransactionItem
              key={item._id}
              data={item}
              onDelete={() => openDeleteModal(item._id as string)}
              onEdit={handleEdit}
              canManage={canManageTransactions}
            />
          ))
        )}
      </div>

      <div className="transaction-list__pagination">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={
          selectedTransaction ? t("edit_transaction") : t("new_transaction")
        }
      >
        <TransactionForm
          key={selectedTransaction?._id || "new-transaction"}
          initialData={selectedTransaction}
          onCancel={handleCloseForm}
          onSuccess={() => {
            refreshAfterTransactionChange();
            handleCloseForm();
          }}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t("confirm_delete")}
        width="400px"
      >
        <div className="delete-confirm">
          <p className="delete-confirm__text">{t("delete_confirm")}</p>

          <div className="delete-confirm__actions">
            <Button
              variant="danger"
              onClick={async () => {
                if (!idToDelete) return;

                if (!activeWorkspaceId) {
                  toast.error(t("toast.active_workspace_not_found"), {
                    description: t("toast.active_workspace_not_found_desc"),
                  });
                  return;
                }

                try {
                  await transactionService.delete(
                    activeWorkspaceId,
                    idToDelete,
                  );

                  toast.success(t("toast.transaction_deleted"), {
                    description: t("toast.transaction_deleted_desc"),
                  });

                  setIsDeleteModalOpen(false);
                  setIdToDelete(null);
                  refreshAfterTransactionChange();
                } catch {
                  toast.error(t("toast.transaction_delete_failed"), {
                    description: t("toast.transaction_delete_failed_desc"),
                  });
                }
              }}
            >
              {t("yes_delete")}
            </Button>

            <Button
              variant="primary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              {t("no_delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TransactionList;
