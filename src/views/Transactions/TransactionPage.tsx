import React from "react";
import Header from "../../components/Layout/Header/Header";
import Container from "../../components/ui/Container/PageContainer";
import TransactionList from "../../components/Transactions/TransactionList/TransactionList";

function TransactionPage() {
  return (
    <div>
      <Container size="large">
        <Header />
        <h1>Transactions</h1>
        <TransactionList />
      </Container>
    </div>
  );
}

export default TransactionPage;
