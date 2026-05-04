import TransactionList from "../../components/Transactions/TransactionList/TransactionList";
import "./TransactionPage.scss";
import { useTranslation } from "react-i18next";

function TransactionPage() {
  const { t } = useTranslation();
  return (
    <div className="transaction-page-wrapper">
      <main className="transaction-content">
        <h1 className="page-title">{t("transactions")}</h1>
        <div className="content-card">
          <TransactionList />
        </div>
      </main>
    </div>
  );
}

export default TransactionPage;
