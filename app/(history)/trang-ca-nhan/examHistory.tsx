"use client";

import { useEffect, useState } from "react";
import { getExam, getHistory } from "@/app/lib/auth";
import CardCustom from "@/app/Components/Custom/card";
import ExamListSkeleton from "@/app/Components/Custom/skeleton";
import EmptyState from "@/app/Components/Custom/emty";
import { useRouter } from "next/navigation";
import { startExam } from "@/app/utils/startExam";
type HistoryExamItem = {
    id: number;
    name: string;
    school_name: string;
    extend: string;
    is_public: boolean;
    created_at: string;
};

export default function HistoryExam({
    onTotalChange,
}: {
    onTotalChange?: (total: number) => void;
}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<HistoryExamItem[]>([]);
    const router = useRouter();
    useEffect(() => {
        getHistory()
            .then((res) => {
                const list = res.data || [];
                setData(list);
                onTotalChange?.(list.length);
            })
            .finally(() => setLoading(false));
    }, []);


    const setExamUser = async (id: any) => {
        await startExam(id, getExam, router);
    };

    if (loading) {
        return <ExamListSkeleton />;
    }

    if (!data.length) {
        return <EmptyState description="Chưa có lịch sử đề thi" />;
    }

    return (
        <div className="history-exam">
            <div className="card-grid">
                {data.map((item) => (
                    <CardCustom
                        key={item.id}
                        image=""
                        title={item.name || "Chưa có tên đề thi"}
                        author={item.school_name || "Chưa có tên trường"}
                        time={formatTime(item.created_at)}
                        nameshare="Tôi"
                        onClick={() => setExamUser(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}


function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
