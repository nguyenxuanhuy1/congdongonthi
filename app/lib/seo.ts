const BASE_URL = process.env.NEXT_PUBLIC_DB_URL!;

export type PublicExamItem = {
  id: number;
  name: string;
  school_name: string;
  extend: string;
  is_public: number;
  created_at: string;
};

export type PublicExamResponse = {
  data: PublicExamItem[];
  total: number;
};

export async function getPublicExams(
  page: number = 1,
  pageSize: number = 9
): Promise<PublicExamResponse> {
  const res = await fetch(`${BASE_URL}/api/exams/public`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      page_size: pageSize,
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách đề thi");
  }

  return res.json();
}
