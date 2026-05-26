export const TRANSACTION_CHANGED_EVENT = "transaction-changed";
export const TRANSACTION_CHANGED_STORAGE_KEY = "transactionChangedAt";

export const notifyTransactionChanged = () => {
  window.dispatchEvent(new Event(TRANSACTION_CHANGED_EVENT));

  localStorage.setItem(TRANSACTION_CHANGED_STORAGE_KEY, Date.now().toString());
};
