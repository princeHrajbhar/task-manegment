export const buildProjectQuery = (
  query: any
) => {
  const filter: any = {
    isDeleted: false,
  };

  if (query.search) {
    filter.$text = {
      $search: query.search,
    };
  }

  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};