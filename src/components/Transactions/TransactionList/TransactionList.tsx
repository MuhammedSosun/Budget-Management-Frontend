import React, { useState } from "react";
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

function TransactionList() {
  const { t } = useTranslation();
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
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

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

  return (
    <div className="transaction-list">
      <div className="transaction-list__header">
        <h3 className="transaction-list__title">
          {t("transaction_list__title")}
        </h3>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedTransaction(null);
            setIsFormOpen(true);
          }}
        >
          {t("new_transaction")}
        </Button>
      </div>

      <div className="transaction-filters">
        <div className="search-group">
          <Input
            label={t("search")}
            value={searchValue}
            placeholder="Search..."
            onChange={(value) => {
              setSearchValue(value);
            }}
          />
        </div>
        <Select
          label={t("transaction_type")}
          value={filters.type ?? ""}
          options={[
            { label: t("all"), value: "" },
            { label: t("income"), value: "income" },
            { label: t("expense"), value: "expense" },
          ]}
          onChange={(val) => {
            setFilters({ ...filters, type: val });
            setPagination((prev) => ({ ...prev, currentPage: 1 }));
          }}
        />

        <div className="filter-group">
          <Input
            label={t("start_date")}
            type="date"
            value={filters.startDate || ""}
            onChange={(value) => {
              setFilters({ ...filters, startDate: value });
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
          />
        </div>

        <div className="filter-group">
          <Input
            label={t("end_date")}
            type="date"
            value={filters.endDate || ""}
            onChange={(value) => {
              setFilters({ ...filters, endDate: value });
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
          />
        </div>
        <div className="filter-group">
          <div className="filter-group__select">
            <Select
              label={t("filters")}
              value={filters.filter ?? ""}
              options={[
                { label: t("newest_to_oldest"), value: "newest" },
                { label: t("oldest_to_newest"), value: "oldest" },
                { label: t("last_7_days"), value: "7days" },
                { label: t("last_30_days"), value: "30days" },
              ]}
              onChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  filter: value as TransactionFilters["filter"],
                }));

                setPagination((prev) => ({
                  ...prev,
                  currentPage: 1,
                }));
              }}
            />
          </div>
        </div>

        <div className="transaction-filters__reset">
          <Button
            variant="danger"
            onClick={() => setFilters({ type: "", startDate: "", endDate: "" })}
          >
            {t("reset")}
          </Button>
        </div>
      </div>

      <div className="transaction-list__items">
        {transactions.length === 0 ? (
          <p>{t("no_transactions")}</p>
        ) : (
          transactions.map((item) => (
            <TransactionItem
              key={item._id}
              data={item}
              onDelete={() => openDeleteModal(item._id as string)}
              onEdit={handleEdit}
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
            refresh();
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

                try {
                  await transactionService.delete(idToDelete);

                  toast.success(t("toast.transaction_deleted"), {
                    description: t("toast.transaction_deleted_desc"),
                  });

                  setIsDeleteModalOpen(false);
                  setIdToDelete(null);
                  refresh();
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
