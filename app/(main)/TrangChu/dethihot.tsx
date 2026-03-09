import Link from "next/link";
import { getPublicExams } from "@/app/lib/seo";
import ExamCardItem from "../tong-hop-de-thi/helper/cardSeo";
import { ArrowRightOutlined } from "@ant-design/icons";

export const revalidate = 300;

export default async function DeThiHot() {
  const pageNumber = 1;
  const limit = 6;

  const res = await getPublicExams(pageNumber, limit);
  const data = res?.data ?? [];

  return (
    <div className="de-thi-hot">
      <h2>Đề thi nổi bật</h2>

      <div className="card-grid">
        {data.map((item: any) => (
          <ExamCardItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="xemThem">
        <Link href="/tong-hop-de-thi">
          Xem thêm <ArrowRightOutlined style={{ fontSize: "16px" }} />
        </Link>
      </div>
    </div>
  );
}
