export const ProductsAction = (
  category,
  countPage,
  currentPage,
  countProducts,
  products,
  limit
) => ({
  type: category,
  category,
  countPage,
  currentPage,
  countProducts,
  payload: products,
  limit,
});