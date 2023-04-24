export const AdminAction = (category, countPage, currentPage, limit, data) => ({
  type: category,
  countPage,
  currentPage,
  limit,
  payload: data,
});
