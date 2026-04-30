import React from "react";
import Container from "../../components/ui/Container/PageContainer";
import TransactionList from "../../components/Transactions/TransactionList/TransactionList";
import "./TransactionPage.scss";
import { useTranslation } from "react-i18next";

function TransactionPage() {
  const { t } = useTranslation();
  return (
    <div className="transaction-page-wrapper">
      <Container size="large">
        <main className="transaction-content">
          <h1 className="page-title">{t("transactions")}</h1>
          <div className="content-card">
            <TransactionList />
          </div>
        </main>
      </Container>
    </div>
  );
}

export default TransactionPage;
