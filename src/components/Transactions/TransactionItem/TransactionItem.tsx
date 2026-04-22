import React from "react";
import { type Transaction } from "../../../types/transaction";
import "./TransactionItem.scss";
import Button from "../../ui/Button/Button";
import { useTranslation } from "react-i18next";

interface Props {
  data: Transaction;
  onDelete: () => void;
  onEdit: (data: Transaction) => void;
}
function TransactionItem({ data, onDelete, onEdit }: Props) {
  const { t } = useTranslation();
  const isExpense = data.type === "expense";

  const formattedDate = new Date(data.date).toLocaleDateString("tr-TR");

  return (
    <div className="transaction-item">
      <div className="transaction-item__left">
        <div
          className={`transaction-item__icon transaction-item__icon--${data.type}`}
        >
          <span>{isExpense ? "💸" : "💰"}</span>
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
          <Button variant="danger" onClick={onDelete}>
            {t("delete")}
          </Button>
          <Button variant="primary" onClick={() => onEdit(data)}>
            {t("edit")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
