import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import TransactionItem from "../TransactionItem/TransactionItem";
import { useTransactions } from "../../../hooks/useTransactions";
import { useTranslation } from "react-i18next";
import "./RecentTransactions.scss";

function RecentTransactions() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { transactions } = useTransactions(5);

  return (
    <section className="recent-transactions">
      <div className="recent-transactions__header">
        <div>
          <h3>{t("last_transactions")}</h3>
          <p>{t("last_transactions_description")}</p>
        </div>

        <Button variant="link" onClick={() => navigate("/transactions")}>
          {t("view_all")}
        </Button>
      </div>

      <div className="recent-transactions__list">
        {transactions.length === 0 ? (
          <p className="recent-transactions__empty">{t("no_transactions")}</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction._id}
              data={transaction}
              canManage={false}
              onDelete={() => {}}
              onEdit={() => {}}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RecentTransactions;
