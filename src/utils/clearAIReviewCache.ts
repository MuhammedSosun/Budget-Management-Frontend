export function clearAIReviewCache() {
  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith("aiReviewCache:")) {
      sessionStorage.removeItem(key);
    }
  });
}
