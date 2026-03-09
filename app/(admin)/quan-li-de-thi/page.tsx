"use client";

import React, { useEffect, useState } from "react";
import { Table, Modal, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { adminGetList, adminUpdate } from "../../lib/auth";
import { formatDate } from "@/app/(main)/tong-hop-de-thi/helper/formatDate";
import { Form, Input, Select, message } from "antd";

interface NhanVien {
  id: number;
  name: string;
  school_name: string;
  extend: string;
  is_public: number;
  created_at: string;
}

const QuanLiDeThiPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [data, setData] = useState<NhanVien[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedRecord, setSelectedRecord] =
    useState<NhanVien | null>(null);

  const [modalType, setModalType] = useState<
    "view" | "edit" | "delete" | null
  >(null);

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const fetchData = async () => {

    try {
      setLoading(true);
      const res = await adminGetList({
        page,
        page_size: pageSize,
        search: "",
        is_public: null,
      });

      setData(res.data || []);
      setTotal(res.total || 0);

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEditTitle = async () => {
    try {
      const values = await form.validateFields();

      await adminUpdate(selectedRecord?.id, values);

      message.success("Cập nhật thành công");

      handleClose();
      fetchData();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };


  const handleOpenModal = (
    type: "view" | "edit" | "delete",
    record: NhanVien
  ) => {
    setSelectedRecord(record);
    setModalType(type);
  };

  const handleClose = () => {
    setSelectedRecord(null);
    setModalType(null);
  };

  const columns: ColumnsType<NhanVien> = [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Tên", dataIndex: "name" },
    { title: "Trường", dataIndex: "school_name" },
    { title: "Cre", dataIndex: "extend" },
    {
      title: "Công khai",
      dataIndex: "is_public",
      render: (value) => (value === 2 ? "Có" : "Không"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (value: string) => formatDate(value),
    },
    {
      title: "Hành động",
      width: 150,
      render: (_, record) => (
        <Space>
          {/* <Tooltip title="Xem">
            <EyeOutlined
              style={{ color: "#1677ff", cursor: "pointer" }}
              onClick={() => handleOpenModal("view", record)}
            />
          </Tooltip> */}

          <Tooltip title="Sửa tiêu đề" >
            <EditOutlined
              style={{ color: "#52c41a", cursor: "pointer" }}
              onClick={() => handleOpenModal("edit", record)}
            />
          </Tooltip>

          {/* <Tooltip title="Sửa đề thi">
            <EditOutlined
              style={{ color: "#000", cursor: "pointer" }}
              onClick={() => handleOpenModal("edit", record)}
            />
          </Tooltip>

          <Tooltip title="Xoá">
            <DeleteOutlined
              style={{ color: "#ff4d4f", cursor: "pointer" }}
              onClick={() => handleOpenModal("delete", record)}
            />
          </Tooltip> */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Quản lý đề thi</h2>

      <Table<NhanVien>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (newPage, newSize) => {
            setPage(newPage);
            setPageSize(newSize || 10);
          },
        }}
      />

      <Modal
        open={!!modalType}
        onCancel={handleClose}
        onOk={modalType === "edit" ? handleEditTitle : handleClose}
        title={
          modalType === "view"
            ? "Xem chi tiết"
            : modalType === "edit"
              ? "Chỉnh sửa tiêu đề"
              : "Xác nhận xoá"
        }
        okText={
          modalType === "delete"
            ? "Xoá"
            : modalType === "edit"
              ? "Lưu"
              : "Đóng"
        }
        cancelText="Huỷ"
      >
        {modalType === "delete" && (
          <p>Bạn có chắc muốn xoá ID: {selectedRecord?.id} ?</p>
        )}

        {modalType === "edit" && (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên đề thi"
              name="name"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Trường" name="school_name">
              <Input />
            </Form.Item>

            <Form.Item label="Cre" name="extend">
              <Input />
            </Form.Item>

            <Form.Item label="Công khai" name="is_public">
              <Select
                options={[
                  { label: "Có", value: 2 },
                  { label: "Không", value: 1 },
                ]}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

    </div>
  );
};

export default QuanLiDeThiPage;
