import React from "react";
import Header from "../../components/Layout/Header/Header";
import Container from "../../components/ui/Container/PageContainer";
import TransactionList from "../../components/Transactions/TransactionList/TransactionList";
import "./TransactionPage.scss";

function TransactionPage() {
  return (
    <div className="transaction-page-wrapper">
      <Header />
      <Container size="large">
        <h1 className="page-title">Transactions</h1>

        <div className="content-card">
          <TransactionList />
        </div>
      </Container>
    </div>
  );
}

export default TransactionPage;
