import Link from "next/link";

type PaginationProps = {
  totalPages: number;
  currentPage?: number;
  basePath: string;
  siblingCount?: number;
};

export default function Pagination({
  totalPages,
  currentPage = 1,
  basePath,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const pages: (number | string)[] = [];

  const firstPages = range(1, Math.min(3, totalPages));
  const lastPages = range(
    Math.max(totalPages - 2, 1),
    totalPages
  );

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const middlePages = range(leftSibling, rightSibling);

  // 1️⃣ First pages
  pages.push(...firstPages);

  // 2️⃣ Dots trước middle
  if (leftSibling > 4) {
    pages.push("...");
  }

  // 3️⃣ Middle pages (loại bỏ trùng first/last)
  middlePages.forEach((p) => {
    if (
      p > firstPages[firstPages.length - 1] &&
      p < lastPages[0]
    ) {
      pages.push(p);
    }
  });

  // 4️⃣ Dots sau middle
  if (rightSibling < totalPages - 3) {
    pages.push("...");
  }

  // 5️⃣ Last pages
  pages.push(...lastPages);

  // Loại duplicate lần cuối (an toàn tuyệt đối)
  const uniquePages = pages.filter(
    (item, index) => pages.indexOf(item) === index
  );

  return (
    <div className="pagination-custom">
      {uniquePages.map((item, index) =>
        item === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <Link
            key={item}
            href={
              item === 1
                ? basePath
                : `${basePath}/${item}`
            }
            className={`page-item ${
              currentPage === item ? "active" : ""
            }`}
          >
            {item}
          </Link>
        )
      )}
    </div>
  );
}
