import { Link, useLocation } from "react-router-dom";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    searchParams.set("page", pageNumber.toString());
    return `${pathname}?${searchParams.toString()}`;
  };

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      {totalPages > 1 && (
        <div aria-label="Page navigation" className="join pb-3">
          <Link
            preventScrollReset={true}
            className={`join-item btn btn-squarebtn btn-primary btn-sm text-secondary ${currentPage === 1 ? "btn-disabled" : ""
              }`}
            to={createPageURL(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
          {pagesArray.map((page) => (
            <Link
              preventScrollReset={true}
              className={`join-item btn btn-squarebtn  btn-primary btn-sm text-secondary ${currentPage === page ? "btn-active" : ""
                }`}
              key={page}
              to={createPageURL(page)}
            >
              {page}
            </Link>
          ))}
          <Link
            preventScrollReset={true}
            className={`join-item btn btn-squarebtn btn-primary btn-sm text-secondary ${currentPage === totalPages ? "btn-disabled" : ""
              }`}
            to={createPageURL(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Pagination;
