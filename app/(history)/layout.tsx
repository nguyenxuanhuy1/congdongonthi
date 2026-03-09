"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TrangCaNhan from "./trang-ca-nhan/page";

export default function HistoryLayout() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <div className="exam-layout">
                <div className="exam-layout__back" onClick={handleBack}>
                    <ArrowLeftOutlined />
                    <span>Quay lại</span>
                </div>
            </div>
            <div className="trangcanhan">
                <TrangCaNhan />
            </div>
        </>
    );
}
