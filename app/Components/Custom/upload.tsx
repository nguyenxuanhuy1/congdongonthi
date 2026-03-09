"use client";

import { Upload } from "antd";
import type { UploadProps } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import Image from "next/image";
import imgFile from "../../Assets/imgfile.png";

type UploadBoxProps = {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
};

export default function UploadBox({
  onFilesChange,
  maxFiles = 5,
}: UploadBoxProps) {
  const uploadProps: UploadProps = {
    multiple: true,
    accept: "image/png,image/jpeg",
    showUploadList: false,
    beforeUpload: () => false,

    onChange(info) {
      const files = info.fileList
        .map((f) => f.originFileObj)
        .filter(Boolean) as File[];

      onFilesChange?.(files.slice(0, maxFiles));
    },
  };

  return (
    <Upload.Dragger {...uploadProps} className="upload-red">
      <div className="upload-content">
        <div className="upload-icon">
          <Image src={imgFile} alt="upload" width={80} height={80} />
        </div>

        <button
          type="button"
          className="upload-btn"
          onClick={(e) => e.preventDefault()}
        >
          <DiffOutlined style={{ fontSize: 20 }} />
          CHỌN ẢNH
        </button>

        <p className="upload-text">
          hoặc thả tệp ở đây
        </p>
      </div>
    </Upload.Dragger>
  );
}
