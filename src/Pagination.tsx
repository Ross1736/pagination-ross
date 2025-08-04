import LeftIcon from "./icons/LeftIcon";
import RightIcon from "./icons/RightIcon";
import { CSSProperties } from "react";

interface PaginationProps {
  /**
   * Current page being displayed.
   */
  readonly currentPage: number;

  /**
   * Total number of available pages.
   */
  readonly totalPages: number;

  /**
   * Callback fired when the page changes. Receives the new page as an argument.
   */
  readonly onPageChange?: (page: number) => void;

  /**
   * Additional CSS class applied to the main container.
   */
  readonly className?: string;

  /**
   * Inline style applied to the main container.
   */
  readonly style?: CSSProperties;

  /**
   * Color applied to navigation icons (left and right).
   * Default: "#18181b"
   */
  readonly colorIcon?: string;

  /**
   * CSS class for navigation buttons (previous and next).
   * If not provided, default module styles are used.
   */
  readonly buttonClassName?: string;

  /**
   * CSS class for the `<ul>` element that contains the page buttons.
   */
  readonly listClassName?: string;

  /**
   * CSS class for each pagination item (`<li>` elements).
   */
  readonly itemClassName?: string;

  /**
   * CSS class for the active item (current page).
   * If not provided, default module styles are used.
   */
  readonly activeItemClassName?: string;

  /**
   * CSS class for ellipsis items ("...").
   */
  readonly ellipsisClassName?: string;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  style,
  colorIcon = "#18181b",
  activeItemClassName,
  buttonClassName,
  listClassName,
  itemClassName,
  ellipsisClassName,
}: PaginationProps) {
  return (
    <div className={[className].filter(Boolean).join(" ")} style={style}>
      {currentPage > 1 && (
        <button
          className={buttonClassName}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <LeftIcon color={colorIcon} />
        </button>
      )}

      <ul className={listClassName}>
        {currentPage > 2 && (
          <li
            className={itemClassName}
            onClick={() => onPageChange?.(1)}
            role="button"
          >
            {1}
          </li>
        )}

        {currentPage > 3 && <li className={ellipsisClassName}>...</li>}

        {[currentPage - 1, currentPage, currentPage + 1].map(
          (page) =>
            page > 0 &&
            page <= totalPages && (
              <li
                key={page}
                className={[
                  itemClassName,
                  currentPage === page ? activeItemClassName : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onPageChange?.(page)}
                role="button"
              >
                {page}
              </li>
            )
        )}

        {currentPage < totalPages - 2 && (
          <li className={ellipsisClassName}>...</li>
        )}

        {currentPage < totalPages - 1 && (
          <li
            className={itemClassName}
            onClick={() => onPageChange?.(totalPages)}
            role="button"
          >
            {totalPages}
          </li>
        )}
      </ul>

      {currentPage < totalPages && (
        <button
          className={buttonClassName}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <RightIcon color={colorIcon} />
        </button>
      )}
    </div>
  );
}

export default Pagination;
