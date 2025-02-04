export const getBaseUrl = () => {
  // TODO: add production URL
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
};
