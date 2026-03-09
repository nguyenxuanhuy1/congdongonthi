import { getPublicExams } from "@/app/lib/seo";
import { notFound } from "next/navigation";
import Pagination from "../PaginationSeo";
import ExamCardItem from "../helper/cardSeo";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ page: string }>;
};

/* ===========================
   SEO Metadata
=========================== */
export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (isNaN(pageNumber) || pageNumber < 2) {
    return {};
  }

  return {
    title: `Tổng hợp đề thi - Trang ${pageNumber}`,
    description: `Danh sách đề thi mới nhất - Trang ${pageNumber}.`,
    alternates: {
      canonical: `/tong-hop-de-thi/${pageNumber}`,
    },
  };
}

/* ===========================
   Page Component
=========================== */
export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const limit = 12;

  // Validate page
  if (isNaN(pageNumber) || pageNumber < 2) {
    return notFound();
  }

  const res = await getPublicExams(pageNumber, limit);

  const data = res?.data ?? [];
  const total = res?.total ?? 0;

  const totalPages = Math.ceil(total / limit);

  if (totalPages > 0 && pageNumber > totalPages) {
    return notFound();
  }

  return (
    <div className="container-de-thi-chia-se-tf">
      <div className="card-grid">
        {data.map((item) => (
          <ExamCardItem key={item.id} item={item} />
        ))}
      </div>

      <div className="pagination">
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          basePath="/tong-hop-de-thi"
        />
      </div>
    </div>
  );
}