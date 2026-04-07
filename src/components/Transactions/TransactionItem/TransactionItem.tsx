import React from "react";
import { type Transaction } from "../../../types/transaction";
import "./TransactionItem.scss";
import Button from "../../ui/Button/Button";
import { transactionService } from "../../../services/transaction.service";

interface Props {
  data: Transaction;
  onDelete: () => void;
  onEdit: (data: Transaction) => void;
}
function TransactionItem({ data, onDelete, onEdit }: Props) {
  const isExpense = data.type === "expense";

  const formattedDate = new Date(data.date).toLocaleDateString("tr-TR");
  const handleDelete = async (id: string) => {
    if (window.confirm("Bu harcamayı silmek istediğine emin misin?")) {
      try {
        await transactionService.delete(id);
        onDelete();
      } catch (err) {
        console.error("Silme hatası:", err);
      }
    }
  };
  const handleEdit = async (id: string) => {
    try {
      await transactionService.update(id, data);
      if (onEdit) {
        onEdit(data);
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div className="transaction-item">
      <div className="transaction-item__left">
        <div
          className={`transaction-item__icon transaction-item__icon--${data.type}`}
        >
          <span>🛒</span>
        </div>
        <div className="transaction-item__info">
          <span className="transaction-item__title">{data.title}</span>
          <span className="transaction-item__category">{data.category}</span>
        </div>
      </div>

      <div className="transaction-item__right">
        <div className="transaction-item__details">
          <span
            className={`transaction-item__amount ${isExpense ? "transaction-item__amount--expense" : "transaction-item__amount--income"}`}
          >
            {isExpense ? "-" : "+"} {data.amount.toLocaleString("tr-TR")} ₺
          </span>
          <span className="transaction-item__date">{formattedDate}</span>
        </div>

        <div className="transaction-item__actions">
          <Button variant="danger" onClick={() => handleDelete(data._id!)}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => handleEdit(data._id!)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
