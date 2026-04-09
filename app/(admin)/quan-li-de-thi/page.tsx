"use client";

import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { adminGetList, adminUpdate } from "../../lib/auth";
import { formatDate } from "@/app/(main)/tong-hop-de-thi/helper/formatDate";
import { Form, Input, Select } from "antd";
import styles from "./QuanLiDeThiPage.module.scss";

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
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (record: NhanVien) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      name: record.name,
      school_name: record.school_name,
      extend: record.extend,
      is_public: record.is_public,
    });
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
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Quản lý đề thi</h2>
          {!loading && (
            <span className={styles.totalBadge}>{total} đề thi</span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={styles.th}
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
                  <td colSpan={COLUMNS.length} className={styles.loadingCell}>
                    <div className={styles.loadingDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className={styles.emptyCell}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                data.map((record) => (
                  <tr key={record.id} className={styles.tr}>
                    <td className={`${styles.td} ${styles.tdId}`}>
                      #{record.id}
                    </td>
                    <td className={`${styles.td} ${styles.tdName}`}>
                      {record.name}
                    </td>
                    <td className={`${styles.td} ${styles.tdSecondary}`}>
                      {record.school_name}
                    </td>
                    <td className={`${styles.td} ${styles.tdSecondary}`}>
                      {record.extend}
                    </td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.pill} ${
                          record.is_public === 2
                            ? styles.pillPublic
                            : styles.pillPrivate
                        }`}
                      >
                        {record.is_public === 2 ? "Công khai" : "Riêng tư"}
                      </span>
                    </td>
                    <td className={`${styles.td} ${styles.tdSecondary}`}>
                      {formatDate(record.created_at)}
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleOpenEdit(record)}
                          title="Sửa tiêu đề"
                        >
                          <EditOutlined />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && total > 0 && (
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              {startItem}–{endItem} / {total} kết quả
            </span>

            <div className={styles.paginationControls}>
              <select
                className={styles.pageSizeSelect}
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

              <div className={styles.pageButtons}>
                <button
                  className={styles.pageBtn}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      className={`${styles.pageBtn} ${
                        p === page ? styles.pageBtnActive : ""
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className={styles.pageEllipsis}>…</span>}
                <button
                  className={styles.pageBtn}
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        open={modalOpen}
        onCancel={handleClose}
        onOk={handleSave}
        title={null}
        footer={null}
        width={480}
        className={styles.modal}
        closable={false}
        centered
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Chỉnh sửa đề thi</h3>
          <button className={styles.modalClose} onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <Form form={form} layout="vertical" className={styles.form}>
            <Form.Item
              label="Tên đề thi"
              name="name"
              rules={[{ required: true, message: "Không được để trống" }]}
              className={styles.formItem}
            >
              <Input className={styles.input} placeholder="Nhập tên đề thi" />
            </Form.Item>

            <Form.Item
              label="Trường"
              name="school_name"
              className={styles.formItem}
            >
              <Input className={styles.input} placeholder="Nhập tên trường" />
            </Form.Item>

            <Form.Item label="Cre" name="extend" className={styles.formItem}>
              <Input className={styles.input} placeholder="Người tạo" />
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="is_public"
              className={styles.formItem}
            >
              <Select
                className={styles.select}
                options={[
                  { label: "Công khai", value: 2 },
                  { label: "Riêng tư", value: 1 },
                ]}
              />
            </Form.Item>
          </Form>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={handleClose}>
            Huỷ
          </button>
          <button className={styles.btnSave} onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QuanLiDeThiPage;