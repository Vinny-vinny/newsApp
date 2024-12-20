import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../reducers/newsReducer";
import twFocusClass from "utils/twFocusClass";
import {AppDispatch} from "../../store";
import Link from "components/Link";

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pagination } = useSelector((state: any) => state.news);

  const handlePageClick = (page: number) => {
    dispatch(fetchNews(page));
  };

  const renderPageLinks = () => {
    const { current_page, last_page } = pagination;

    const pages = [];
    for (let i = 1; i <= last_page; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
        <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
                page === current_page
                    ? "bg-primary-6000 text-white"
                    : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            } ${twFocusClass()}`}
        >
          {page}
        </button>
    ));
  };

  return (
      <nav
          className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
      >
        {pagination.prev_page_url && (
            <button
                onClick={() => handlePageClick(pagination.current_page - 1)}
                className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            >
              Prev
            </button>
        )}
        {renderPageLinks()}
        {pagination.next_page_url && (
            <button
                onClick={() => handlePageClick(pagination.current_page + 1)}
                className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            >
              Next
            </button>
        )}
      </nav>
  );
};

export default Pagination;
