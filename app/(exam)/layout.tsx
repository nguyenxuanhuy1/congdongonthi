"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, EditFilled, ReloadOutlined } from "@ant-design/icons";
import { Select } from "antd";
import ButtonCustom from "../Components/Custom/button";
import TrangThi from "./trang-thi/page";
import { submitExam } from "../lib/auth";

type ExamState = {
  mode: "off" | "on" | "success";
  startTime: number | null;
  duration: number;
  answers: Record<number, string>;
};

const timeOptions = [
  { value: 60, label: "60 phút" },
  { value: 90, label: "90 phút" },
  { value: 120, label: "120 phút" },
];

const EXAM_KEY = "exam_state";

export default function ExamLayout() {
  const router = useRouter();

  const [mode, setMode] = useState<"off" | "on" | "success">("off");
  const [duration, setDuration] = useState(90);
  const [timeLeft, setTimeLeft] = useState(0);

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (mode === "on" && timeLeft === 0) {
      handleEndExam();
    }
  }, [timeLeft, mode]);

  useEffect(() => {
    const raw = sessionStorage.getItem(EXAM_KEY);
    if (!raw) return;

    const state: ExamState = JSON.parse(raw);

    setMode(state.mode);
    setDuration(state.duration);

    if (state.mode === "on" && state.startTime) {
      const remain =
        state.duration * 60 * 1000 - (Date.now() - state.startTime);
      setTimeLeft(Math.max(remain, 0));
    }
  }, []);


  useEffect(() => {
    if (mode !== "on" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1000, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, timeLeft]);


  const handleStartExam = () => {
    const state: ExamState = {
      mode: "on",
      startTime: Date.now(),
      duration,
      answers: {},
    };

    sessionStorage.setItem(EXAM_KEY, JSON.stringify(state));
    sessionStorage.removeItem("examImages")
    setMode("on");
    setTimeLeft(duration * 60 * 1000);
  };


  const handleEndExam = () => {
    const raw = sessionStorage.getItem(EXAM_KEY);
    if (!raw) return;

    const state: ExamState = JSON.parse(raw);
    state.mode = "success";
    sessionStorage.setItem(EXAM_KEY, JSON.stringify(state));
    setMode("success");
  };

  const handSubmit = () => {
    const examAgain = sessionStorage.getItem("examAgain");

    if (examAgain) {
      return;
    }
    const raw = sessionStorage.getItem("examResult");
    if (!raw) return;

    const questions = JSON.parse(raw);

    const body = {
      subject: questions.subject,
      exam_name: "Đề thi chưa có tên",
      is_public: 1,
      questions: questions.questions,
    };

    submitExam(body);
    sessionStorage.setItem("examAgain", JSON.stringify("examAgain"));
  };


  const handleRestart = () => {
    sessionStorage.removeItem(EXAM_KEY);
    setMode("off");
    setTimeLeft(0);
  };


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

        <div className="setTimeAndStart">
          {mode === "off" && (
            <>
              <Select
                options={timeOptions}
                value={duration}
                onChange={setDuration}
                suffixIcon={<EditFilled style={{ color: 'black' }} />}
              />
              <ButtonCustom className="btn-exam-start" onClick={handleStartExam}>
                Bắt đầu thi
              </ButtonCustom>
            </>
          )}

          {mode === "on" && (
            <div className="exam-timer-ctn">
              <div className="exam-timer-layout">
                🕒 {formatTime(timeLeft)}
              </div>
              <ButtonCustom
                className="btn-exam-start"
                onClick={() => {
                  handleEndExam();
                  handSubmit();
                }}
              >
                Nộp bài
              </ButtonCustom>

            </div>
          )}

          {mode === "success" && (
            <ButtonCustom className="btn-exam-start" onClick={handleRestart}>
              <ReloadOutlined /> Thi lại
            </ButtonCustom>
          )}
        </div>
      </div>

      <TrangThi mode={mode} />
    </>
  );
}
