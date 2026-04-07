import React, { useState } from "react";
import "./TransactionList.scss";
import { type Transaction } from "../../../types/transaction";
import TransactionItem from "../TransactionItem/TransactionItem";
import Button from "../../ui/Button/Button";
import TransactionForm from "../TransactionForm/TransactionForm";
import Pagination from "../../ui/Pagination/Pagination";
import { useTransactions } from "../../../hooks/useTransactions";

function TransactionList() {
  const { transactions, pagination, setPagination, refresh } =
    useTransactions(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
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
        <h3 className="transaction-list__title">Son İşlemler</h3>
        <Button
          variant="primary"
          onClick={() => {
            setIsFormOpen(true);
            setSelectedTransaction(null);
          }}
        >
          {" "}
          New Transaction
        </Button>
      </div>
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TransactionForm
              key={selectedTransaction?._id || "new-transaction"}
              initialData={selectedTransaction}
              onSuccess={() => {
                setTimeout(() => {
                  refresh(pagination.currentPage);
                  handleCloseForm();
                }, 500);
              }}
            />
            <Button variant="link" onClick={handleCloseForm}>
              İptal
            </Button>
          </div>
        </div>
      )}
      <div className="transaction-list__items">
        {transactions.length === 0 ? (
          <p>Henüz bir işlem bulunamadı.</p>
        ) : (
          transactions.map((item) => (
            <TransactionItem
              key={item._id}
              data={item}
              onDelete={() => refresh(pagination.currentPage)}
              onEdit={() => handleEdit(item)}
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
    </div>
  );
}

export default TransactionList;
