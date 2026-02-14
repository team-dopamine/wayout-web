import { useMemo } from 'react';

export function usePagination<T>(items: T[], currentPage: number, itemsPerPage: number) {
  return useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);

    const indexOfLastItem = safePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return {
      totalPages,
      currentPage: safePage,
      indexOfFirstItem,
      indexOfLastItem,
      currentItems,
      totalItems: items.length,
    };
  }, [items, currentPage, itemsPerPage]);
}
