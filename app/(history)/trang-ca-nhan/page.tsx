"use client";

import { getUserInfo } from "@/app/lib/auth";
import { useEffect, useState } from "react";
import { Avatar, Typography, Tabs } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import HistoryExam from "./examHistory";

const { Text } = Typography;

type UserUI = {
    username: string;
    avatar: string;
};

export default function TrangCaNhan() {
    const [user, setUser] = useState<UserUI | null>(null);
    const [totalExam, setTotalExam] = useState(0);

    useEffect(() => {
        getUserInfo()
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    if (!user) return null;

    return (
        <div>
            <div className="user-ctn">
                <Avatar className="avatarUserTCN" size={100} src={user.avatar} />
                <div className="inforUser">
                    <div className="userNameTCN">
                        <Text strong>
                            {user.username}
                        </Text>
                    </div>
                    <div className="dalamTCN">
                        <Text>Đã làm: {totalExam}</Text>

                    </div>
                </div>
            </div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            key: "1",
                            label: "Lịch sử",
                            icon: <HistoryOutlined />,
                        }
                    ]}
                />
                <div >
                    <HistoryExam onTotalChange={setTotalExam} />
                </div>
            </div>
        </div>
    );
}
