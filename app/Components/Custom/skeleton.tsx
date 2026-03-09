"use client";

import { Row, Col, Skeleton, Space } from "antd";

export default function ExamListSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Col
          key={index}
          xs={24}  
          sm={12}   
          lg={8}   
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              background: "#fff",
              height: "100%",
            }}
          >

            <Skeleton.Image
              active
              style={{
                width: 110,
                height: 150,
                borderRadius: 4,
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              <Space direction="vertical" size={10} style={{ width: "100%" }}>

                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 2, width: ["90%", "70%"] }}
                />

                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 1, width: "60%" }}
                />

                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 2, width: ["85%", "65%"] }}
                />
              </Space>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
