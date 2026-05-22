import TransactionList from "../../components/Transactions/TransactionList/TransactionList";
import "./TransactionPage.scss";
import { useTranslation } from "react-i18next";

function TransactionPage() {
  const { t } = useTranslation();

  return (
    <section className="transaction-page">
      <div className="transaction-page__header">
        <div>
          <h2 className="transaction-page__title">{t("transactions")}</h2>
          <p className="transaction-page__subtitle">
            {t("transactions_subtitle")}
          </p>
        </div>
      </div>

      <div className="transaction-page__panel">
        <TransactionList />
      </div>
    </section>
  );
}

export default TransactionPage;
