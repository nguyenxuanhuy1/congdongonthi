import { CheckCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { useMemo } from "react";

const { Title, Text } = Typography;

const QUOTES: string[] = [
    "Kết quả không nói lên tất cả, điều đáng quý là bạn đã cố gắng hết mình",
    "Giá trị thật sự không nằm ở con số, mà nằm ở sự nỗ lực của bạn",
    "Quan trọng không phải bạn đạt bao nhiêu điểm, mà là bạn đã không bỏ cuộc",
];

export default function CongratulationsPage() {
    const quote = useMemo(() => {
        const index = Math.floor(Math.random() * QUOTES.length);
        return QUOTES[index];
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 16,
                padding:'20px'
            }}
        >
            <CheckCircleFilled
                style={{
                    fontSize: 100,
                    color: "#52c41a",
                }}
            />

            <Title level={3}>Chúc mừng bạn <br/> đã hoàn thành bài thi <br />🎉🎉🎉</Title>

            <Text style={{ fontSize: 16, maxWidth: 420 }}>
                {quote}
            </Text>
        </div>
    );
}
