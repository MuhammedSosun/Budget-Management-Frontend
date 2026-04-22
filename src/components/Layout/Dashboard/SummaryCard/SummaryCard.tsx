import React from "react";
import "./SummaryCard.scss";

interface SummaryCardProps {
  title: string;
  amount: number | string;
  type: "balance" | "income" | "expense";
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  return (
    <div className={`summary-card summary-card--${type}`}>
      <div className="summary-card__header">
        <span className="summary-card__title">{title}</span>
      </div>
      <div className="summary-card__body">
        <h2 className="summary-card__amount">{amount} ₺</h2>
      </div>
    </div>
  );
};

export default SummaryCard;
