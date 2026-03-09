import { getPublicExams } from "@/app/lib/seo";
import Pagination from "./PaginationSeo";
import ExamCardItem from "./helper/cardSeo";

export const revalidate = 300;

export const metadata = {
  title: "Tổng hợp đề thi mới nhất",
  description: "Danh sách đề thi mới nhất được cập nhật liên tục.",
  alternates: {
    canonical: "/tong-hop-de-thi",
  },
};

export default async function Page() {
  const pageNumber = 1;
  const limit = 12;

  const res = await getPublicExams(pageNumber, limit);

  const data = res?.data ?? [];
  const total = res?.total ?? 0;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container-de-thi-chia-se-tf">
      <div className="card-grid">
        {data.map((item) => (
          <ExamCardItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={pageNumber}
        basePath="/tong-hop-de-thi"
      />
    </div>
  );
}
