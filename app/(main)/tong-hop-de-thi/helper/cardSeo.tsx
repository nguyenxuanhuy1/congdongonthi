"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startExam } from "@/app/utils/startExam";
import { getExam } from "@/app/lib/auth";
import CardCustom from "@/app/Components/Custom/card";
import { formatDate } from "./formatDate";

type Props = {
  item: any;
};

export default function ExamCardItem({ item }: Props) {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    await startExam(item.id, getExam);

    router.push("/trang-thi");
  };

  return (
    <Link
      href="/trang-thi"
      className="linkThi"
      onClick={handleClick}
      style={{textDecoration:'none'}}
    >
      <CardCustom
        image=""
        title={item.name || "Chưa có"}
        author={item.school_name || "Chưa có"}
        time={formatDate(item.created_at)}
        nameshare={item.extend || "Chưa có"}
      />
    </Link>
  );
}
