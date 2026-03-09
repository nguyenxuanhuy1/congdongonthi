import { Empty } from "antd";

interface EmptyStateProps {
    description?: string;
}

export default function EmptyState({ description }: EmptyStateProps) {
    return (
        <div
            style={{
                minHeight: "calc(100vh - 56px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Empty description={description || "Chưa có dữ liệu"} />
        </div>
    );
}
