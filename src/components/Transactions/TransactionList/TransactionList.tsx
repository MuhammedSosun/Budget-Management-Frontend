import React, { useState } from "react";
import "./TransactionList.scss";
import { type Transaction } from "../../../types/transaction";
import TransactionItem from "../TransactionItem/TransactionItem";
import Button from "../../ui/Button/Button";
import TransactionForm from "../TransactionForm/TransactionForm";
import Pagination from "../../ui/Pagination/Pagination";
import { useTransactions } from "../../../hooks/useTransactions";
import Select from "../../ui/Select/Select";
import { transactionService } from "../../../services/transaction.service";
import { Modal } from "../../ui/Modal/Modal";
import { useTranslation } from "react-i18next";

function TransactionList() {
  const { t } = useTranslation();
  const {
    transactions,
    pagination,
    setPagination,
    refresh,
    filters,
    setFilters,
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
        <Select
          label={t("transaction_type")}
          value={filters.type}
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
          <label>{t("start_date")}</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => {
              setFilters({ ...filters, startDate: e.target.value });
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
          />
        </div>

        <div className="filter-group">
          <label>{t("end_date")}</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => {
              setFilters({ ...filters, endDate: e.target.value });
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
          />
        </div>

        <Button
          variant="danger"
          onClick={() => setFilters({ type: "", startDate: "", endDate: "" })}
        >
          {t("reset")}
        </Button>
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
            refresh(pagination.currentPage);
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
                if (idToDelete) {
                  await transactionService.delete(idToDelete);
                  setIsDeleteModalOpen(false);
                  refresh(pagination.currentPage);
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
