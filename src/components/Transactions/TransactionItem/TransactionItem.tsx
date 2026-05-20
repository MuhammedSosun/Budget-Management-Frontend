import { type Transaction } from "../../../types/transaction";
import "./TransactionItem.scss";
import Button from "../../ui/Button/Button";
import { useTranslation } from "react-i18next";

interface Props {
  data: Transaction;
  onDelete: () => void;
  onEdit: (data: Transaction) => void;
  canManage?: boolean;
}

function TransactionItem({ data, onDelete, onEdit, canManage = true }: Props) {
  const { t } = useTranslation();

  const isExpense = data.type === "expense";
  const formattedDate = new Date(data.date).toLocaleDateString("tr-TR");

  const createdBy =
    typeof data.createdBy === "object" && data.createdBy !== null
      ? data.createdBy
      : null;

  const createdByFullName = createdBy
    ? `${createdBy.firstName || ""} ${createdBy.lastName || ""}`.trim()
    : "";

  const createdByInitials = createdByFullName
    ? createdByFullName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const amountText = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(data.input_details.amount);

  return (
    <div className="transaction-item">
      <div className="transaction-item__main">
        <div
          className={`transaction-item__icon transaction-item__icon--${data.type}`}
        >
          <span>{isExpense ? "🦋" : "💰"}</span>
        </div>

        <div className="transaction-item__summary">
          <div className="transaction-item__title-row">
            <h4 className="transaction-item__title">{data.title}</h4>

            <span
              className={`transaction-item__type transaction-item__type--${data.type}`}
            >
              {isExpense ? "Expense" : "Income"}
            </span>
          </div>

          <div className="transaction-item__meta">
            <span className="transaction-item__category">{data.category}</span>
            <span className="transaction-item__date">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="transaction-item__creator">
        {createdBy?.avatarUrl ? (
          <img
            className="transaction-item__creator-avatar"
            src={createdBy.avatarUrl}
            alt={createdByFullName || "Created by"}
          />
        ) : (
          <div className="transaction-item__creator-avatar transaction-item__creator-avatar--fallback">
            {createdByInitials}
          </div>
        )}

        <div className="transaction-item__creator-info">
          <span>{t("created_by") || "Created by:"}</span>
          <strong>{createdByFullName || "Unknown user"}</strong>
        </div>
      </div>

      <div className="transaction-item__description-area">
        {data.description ? (
          <p className="transaction-item__description">{data.description}</p>
        ) : (
          <p className="transaction-item__description transaction-item__description--empty">
            Açıklama yok
          </p>
        )}
      </div>

      <div className="transaction-item__right">
        <span
          className={`transaction-item__amount ${
            isExpense
              ? "transaction-item__amount--expense"
              : "transaction-item__amount--income"
          }`}
        >
          {isExpense ? "-" : "+"} {amountText} {data.input_details.currency}
        </span>

        {canManage && (
          <div className="transaction-item__actions">
            <Button variant="danger" onClick={onDelete}>
              {t("delete")}
            </Button>

            <Button variant="primary" onClick={() => onEdit(data)}>
              {t("edit")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionItem;
