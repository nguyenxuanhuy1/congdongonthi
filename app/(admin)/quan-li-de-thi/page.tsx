"use client";

import React, { useEffect, useState } from "react";
import { Modal, message, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { adminGetList, adminUpdate } from "../../lib/auth";
import { formatDate } from "@/app/(main)/tong-hop-de-thi/helper/formatDate";

interface NhanVien {
  id: number;
  name: string;
  school_name: string;
  extend: string;
  is_public: number;
  created_at: string;
}

const COLUMNS = [
  { key: "id", label: "ID", width: 60 },
  { key: "name", label: "Tên đề thi" },
  { key: "school_name", label: "Trường" },
  { key: "extend", label: "Cre", width: 100 },
  { key: "is_public", label: "Công khai", width: 100 },
  { key: "created_at", label: "Ngày tạo", width: 120 },
  { key: "actions", label: "Hành động", width: 90 },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const QuanLiDeThiPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [data, setData] = useState<NhanVien[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<NhanVien | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (record: NhanVien) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedRecord(null);
    setModalOpen(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await adminUpdate(selectedRecord?.id, values);
      message.success("Cập nhật thành công");
      handleClose();
      fetchData();
    } catch {
      message.error("Có lỗi xảy ra");
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className="pageAdminDethi">
      {/* Header */}
      <div className="pageAdminDethi-header">
        <div className="pageAdminDethi-headerLeft">
          <h2 className="pageAdminDethi-title">Quản lý đề thi</h2>
          {!loading && (
            <span className="pageAdminDethi-totalBadge">
              {total} đề thi
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="pageAdminDethi-tableCard">
        <div className="pageAdminDethi-tableWrapper">
          <table className="pageAdminDethi-table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="pageAdminDethi-th"
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="pageAdminDethi-loadingCell">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="pageAdminDethi-emptyCell">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                data.map((record) => (
                  <tr key={record.id} className="pageAdminDethi-tr">
                    <td className="pageAdminDethi-td">#{record.id}</td>
                    <td className="pageAdminDethi-td">{record.name}</td>
                    <td className="pageAdminDethi-td">{record.school_name}</td>
                    <td className="pageAdminDethi-td">{record.extend}</td>
                    <td className="pageAdminDethi-td">
                      <span
                        className={
                          record.is_public === 2
                            ? "pageAdminDethi-pill pageAdminDethi-pillPublic"
                            : "pageAdminDethi-pill pageAdminDethi-pillPrivate"
                        }
                      >
                        {record.is_public === 2 ? "Công khai" : "Riêng tư"}
                      </span>
                    </td>
                    <td className="pageAdminDethi-td">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="pageAdminDethi-td">
                      <button
                        className="pageAdminDethi-actionBtn"
                        onClick={() => handleOpenEdit(record)}
                      >
                        <EditOutlined />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && total > 0 && (
          <div className="pageAdminDethi-pagination">
            <span>
              {startItem}–{endItem} / {total}
            </span>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s} / trang
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal open={modalOpen} footer={null} onCancel={handleClose} className="pageAdminDethi-modal">
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên đề thi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="school_name" label="Trường">
            <Input />
          </Form.Item>

          <Form.Item name="extend" label="Cre">
            <Input />
          </Form.Item>

          <Form.Item name="is_public" label="Trạng thái">
            <Select
              options={[
                { label: "Công khai", value: 2 },
                { label: "Riêng tư", value: 1 },
              ]}
            />
          </Form.Item>

          <button onClick={handleSave}>Lưu</button>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLiDeThiPage;