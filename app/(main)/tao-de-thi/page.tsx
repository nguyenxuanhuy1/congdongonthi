"use client";

import { useEffect, useRef, useState } from "react";
import ButtonCustom from "../../Components/Custom/button";
import { ArrowRightOutlined, DiffOutlined } from "@ant-design/icons";
import Image from "next/image";
import ImgFile from "../../Assets/imgfile.png";
import Howtogetkey from "./howtogetkey";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../../Components/Custom/loading";;
import { analyzeExam } from "@/app/lib/auth";

export default function TaoDeThi() {
    const [images, setImages] = useState<string[]>([]);

    const [files, setFiles] = useState<File[]>([]);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startFakeProgress = () => {
        setPercent(0);
        timerRef.current = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 5;
            });
        }, 300);
    };

    const stopProgress = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPercent(100);
    };

    useEffect(() => {
        const stored = sessionStorage.getItem("examImages");
        if (stored) {
            setImages(JSON.parse(stored));
        }
    }, []);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleAddFile = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files).slice(
            0,
            4 - files.length
        );

        const base64Images = await Promise.all(
            selectedFiles.map((file) => fileToBase64(file))
        );

        setImages((prev) => {
            const updated = [...prev, ...base64Images].slice(0, 4);
            sessionStorage.setItem("examImages", JSON.stringify(updated));
            return updated;
        });

        setFiles((prev) => [...prev, ...selectedFiles].slice(0, 4));

        e.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            sessionStorage.setItem("examImages", JSON.stringify(updated));
            return updated;
        });

        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const base64ToFile = async (
        base64: string,
        filename: string
    ): Promise<File> => {
        const res = await fetch(base64);
        const blob = await res.blob();
        return new File([blob], filename, { type: blob.type });
    };

    const handleConvert = async () => {
        const stored = sessionStorage.getItem("examImages");

        if (!stored) {
            notification.warning({
                message: "Không có ảnh trong session",
            });
            return;
        }

        const base64Images: string[] = JSON.parse(stored);

        if (base64Images.length === 0) {
            notification.warning({
                message: "Vui lòng chọn ít nhất 1 ảnh",
            });
            return;
        }

        setLoading(true);
        startFakeProgress();

        try {
            const fileList: File[] = await Promise.all(
                base64Images.map((img, index) =>
                    base64ToFile(img, `exam-${index + 1}.png`)
                )
            );

            const chunkSize = 2;
            const chunks: File[][] = [];

            for (let i = 0; i < fileList.length; i += chunkSize) {
                chunks.push(fileList.slice(i, i + chunkSize));
            }

            let mergedQuestions: any[] = [];

            for (let i = 0; i < chunks.length; i++) {
                const res = await analyzeExam(chunks[i], "exam");

                if (res?.questions && Array.isArray(res.questions)) {
                    mergedQuestions = [
                        ...mergedQuestions,
                        ...res.questions,
                    ];
                }
            }

            const formattedQuestions = mergedQuestions.map((q, index) => ({
                content: q.content,
                level: q.level,
                options: q.options || [],
                order: index + 1,
                parent_order: q.parent_order || null,
                type: q.type,
            }));

            const finalResult = {
                questions: formattedQuestions,
            };

            sessionStorage.setItem("examResult", JSON.stringify(finalResult));
            sessionStorage.removeItem("exam_state");
            sessionStorage.removeItem("exam_hints");
            sessionStorage.removeItem("examAgain");

            stopProgress();
            setLoading(false);

            notification.success({
                message: "Tạo đề thi thành công",
            });

            setTimeout(() => {
                router.push("/trang-thi");
            }, 500);

        } catch (error: any) {
            if (timerRef.current) clearInterval(timerRef.current);
            setLoading(false);

            notification.error({
                message: "Có lỗi xảy ra",
                description: error?.message || "Không thể tạo đề thi",
            });
        }
    };

    return (
        <div className="tao-de-thi-container">
            <h1>Chuyển ảnh thành đề thi trực tuyến</h1>

            <div className="tao-de-thi">
                {images.map((img, index) => (
                    <div className="image-wrapper" key={index}>
                        <img src={img} alt={`exam-${index}`} />
                        <div
                            className="remove-btn"
                            onClick={() => handleRemoveImage(index)}
                        >
                            ×
                        </div>
                    </div>
                ))}

                {images.length < 4 && (
                    <label
                        className={`inpaddfile ${images.length === 0 ? "full" : "compact"
                            }`}
                    >
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            multiple
                            onChange={handleAddFile}
                        />

                        <div className="content">
                            <div>
                                <Image
                                    src={ImgFile}
                                    alt="upload"
                                    width={80}
                                    height={80}
                                    className="imgUploadImg"
                                />

                                <div className="btn">
                                    <div>
                                        <DiffOutlined style={{ fontSize: 20 }} />
                                    </div>
                                    <span>CHỌN ẢNH</span>
                                </div>
                            </div>
                        </div>
                    </label>
                )}
            </div>

            {images.length !== 0 && (
                <div className="taodethibtn">
                    <ButtonCustom onClick={handleConvert}>
                        Tạo đề thi <ArrowRightOutlined />
                    </ButtonCustom>
                </div>
            )}

            <LoadingOverlay
                percent={Math.round(percent)}
                visible={loading}
            />

            <Howtogetkey />
        </div>
    );
}
