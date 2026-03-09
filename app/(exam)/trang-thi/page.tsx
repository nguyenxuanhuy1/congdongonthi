"use client";

import { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Modal, Divider, Typography, Skeleton, notification } from "antd";
import EmptyState from "@/app/Components/Custom/emty";
import CongratulationsPage from "@/app/Components/Custom/chucmung";
import { ShareAltOutlined } from "@ant-design/icons";
import { ideaQuestion } from "../../lib/auth";

const { Text } = Typography;
const EXAM_KEY = "exam_state";
const HINT_KEY = "exam_hints";

type QuestionType =
  | "single"
  | "multiple"
  | "true_false"
  | "fill"
  | "essay";

type Option = {
  label: string;
  value: string;
};

type Question = {
  content: string;
  options?: Option[];
  type: QuestionType;
};

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

function renderMathContent(raw?: string) {
  if (!raw) return null;

  const normalized = raw
    .replace(/\\\\+/g, "\\")
    .replace(/\\n/g, "\n")
    .trim();

  return normalized.split("\n").map((line, i) => (
    <span key={i} style={{ display: "block" }}>
      <MathJax dynamic>{line}</MathJax>
    </span>
  ));
}

function buildIdeaQuestionBody(question: Question) {
  return {
    mode: "exam",
    content: {
      context:
        question.options && question.options.length > 0
          ? {
            content: question.options
              .map((opt) => `${opt.label}. ${opt.value}`)
              .join("\n"),
          }
          : null,
      question: {
        content: question.content,
        type: question.type,
      },
    },
  };
}

export default function TrangThi({
  mode,
}: {
  mode: "off" | "on" | "success";
}) {
  // ✅ FIX SSR
  const [questions] = useState<Question[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = sessionStorage.getItem("examResult");
    return raw ? JSON.parse(raw).questions || [] : [];
  });

  const [answers, setAnswers] = useState<Record<number, any>>(() => {
    if (typeof window === "undefined") return {};
    const raw = sessionStorage.getItem(EXAM_KEY);
    return raw ? JSON.parse(raw).answers || {} : {};
  });

  const [hintQuestionIndex, setHintQuestionIndex] =
    useState<number | null>(null);
  const [ideaResult, setIdeaResult] = useState<string>("");
  const [loadingIdea, setLoadingIdea] = useState(false);

  const currentQuestion =
    hintQuestionIndex !== null ? questions[hintQuestionIndex] : null;

  const saveAnswerToStorage = (newAnswers: any) => {
    if (typeof window === "undefined") return;

    const raw = sessionStorage.getItem(EXAM_KEY);
    if (raw) {
      const state = JSON.parse(raw);
      state.answers = newAnswers;
      sessionStorage.setItem(EXAM_KEY, JSON.stringify(state));
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mode === "off") {
      setAnswers({});
      const raw = sessionStorage.getItem(EXAM_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        state.answers = {};
        sessionStorage.setItem(EXAM_KEY, JSON.stringify(state));
      }
    }
  }, [mode]);

  const handleSingleAnswer = (qIndex: number, label: string) => {
    if (mode !== "on") return;

    setAnswers((prev: any) => {
      const newAnswers = { ...prev, [qIndex]: label };
      saveAnswerToStorage(newAnswers);
      return newAnswers;
    });
  };

  const handleMultipleAnswer = (qIndex: number, label: string) => {
    if (mode !== "on") return;

    setAnswers((prev: any) => {
      const current = prev[qIndex] || [];
      const updated = current.includes(label)
        ? current.filter((l: string) => l !== label)
        : [...current, label];

      const newAnswers = { ...prev, [qIndex]: updated };
      saveAnswerToStorage(newAnswers);
      return newAnswers;
    });
  };

  const handleTrueFalseAnswer = (
    qIndex: number,
    optionLabel: string,
    value: "true" | "false"
  ) => {
    if (mode !== "on") return;

    setAnswers((prev: any) => {
      const current = prev[qIndex] || {};
      const updated = { ...current, [optionLabel]: value };
      const newAnswers = { ...prev, [qIndex]: updated };
      saveAnswerToStorage(newAnswers);
      return newAnswers;
    });
  };

  const handleTextAnswer = (qIndex: number, value: string) => {
    if (mode !== "on") return;

    setAnswers((prev: any) => {
      const newAnswers = { ...prev, [qIndex]: value };
      saveAnswerToStorage(newAnswers);
      return newAnswers;
    });
  };

  const handleIdeaQuestion = async (qIndex: number) => {
    if (typeof window === "undefined") return;

    const q = questions[qIndex];
    if (!q) return;

    setHintQuestionIndex(qIndex);
    setLoadingIdea(true);

    const rawHints = sessionStorage.getItem(HINT_KEY);
    const savedHints = rawHints ? JSON.parse(rawHints) : {};

    if (savedHints[qIndex]) {
      setIdeaResult(savedHints[qIndex]);
      setLoadingIdea(false);
      return;
    }

    try {
      const body = buildIdeaQuestionBody(q);
      const res = await ideaQuestion(body);
      const answer = res?.answer || "Không có gợi ý phù hợp";

      setIdeaResult(answer);

      const newHints = {
        ...savedHints,
        [qIndex]: answer,
      };

      sessionStorage.setItem(HINT_KEY, JSON.stringify(newHints));
    } catch {
      setIdeaResult("Có lỗi xảy ra khi phân tích câu hỏi");
    } finally {
      setLoadingIdea(false);
    }
  };

  const handleShareExam = () => {
    notification.success({
      message: "Chia sẻ thành công 🎉",
      description:
        "Bài thi đã được gửi lên hệ thống. Vui lòng đợi admin duyệt.",
      placement: "topRight",
      duration: 4,
    });
  };

  if (!questions.length) {
    return <EmptyState description="Bạn chưa tạo đề thi nào!" />;
  }

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div style={{ marginTop: "56px" }}>
        {mode === "success" && (
          <>
            <CongratulationsPage />
            <p className="chiaSeThi" onClick={handleShareExam}>
              <ShareAltOutlined style={{ transform: "rotate(180deg)" }} />{" "}
              Chia sẻ bài thi để mọi người cùng làm?
            </p>
            <Divider style={{ marginBottom: 0 }} />
          </>
        )}
      </div>

      <div className="exam-page">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="exam-question">
            <h3>{renderMathContent(q.content)}</h3>

            {/* SINGLE */}
            {q.type === "single" && q.options && (
              <ul>
                {q.options.map((opt) => {
                  const checked = answers[qIndex] === opt.label;
                  const disabled = mode !== "on";

                  return (
                    <li
                      key={opt.label}
                      className={`option ${disabled ? "readonly" : ""}`}
                      onClick={() =>
                        !disabled &&
                        handleSingleAnswer(qIndex, opt.label)
                      }
                    >
                      <input
                        type="radio"
                        checked={checked}
                        readOnly
                        disabled={disabled}
                      />
                      <strong>{opt.label}.</strong>{" "}
                      {renderMathContent(opt.value)}
                    </li>
                  );
                })}
              </ul>
            )}

            {/* MULTIPLE */}
            {q.type === "multiple" && q.options && (
              <ul>
                {q.options.map((opt) => {
                  const selected =
                    answers[qIndex]?.includes?.(opt.label);
                  const disabled = mode !== "on";

                  return (
                    <li
                      key={opt.label}
                      className={`option ${disabled ? "readonly" : ""}`}
                      onClick={() =>
                        !disabled &&
                        handleMultipleAnswer(qIndex, opt.label)
                      }
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        readOnly
                        disabled={disabled}
                      />
                      <strong>{opt.label}.</strong>{" "}
                      {renderMathContent(opt.value)}
                    </li>
                  );
                })}
              </ul>
            )}

            {/* TRUE FALSE (mỗi option chọn True/False) */}
            {q.type === "true_false" && q.options && (
              <ul>
                {q.options.map((opt) => {
                  const selectedValue =
                    answers[qIndex]?.[opt.label];
                  const disabled = mode !== "on";

                  return (
                    <li
                      key={opt.label}
                      className={`option tf-option-row ${disabled ? "disabled-tf" : ""}`}
                    >
                      <div className="tf-question">
                        <strong>{opt.label}.</strong>{" "}
                        {renderMathContent(opt.value)}
                      </div>

                      <div
                        className={`tf-choice 
                        ${selectedValue === "true" ? "active" : ""} 
                        ${disabled ? "disabled" : ""}
                      `}
                        onClick={() =>
                          !disabled &&
                          handleTrueFalseAnswer(qIndex, opt.label, "true")
                        }
                      >
                        <input
                          type="radio"
                          name={`tf-${qIndex}-${opt.label}`}
                          checked={selectedValue === "true"}
                          readOnly
                          disabled={disabled}
                        />
                        Đúng
                      </div>

                      <div
                        className={`tf-choice 
                      ${selectedValue === "false" ? "active" : ""} 
                      ${disabled ? "disabled" : ""}
                    `}
                        onClick={
                          disabled
                            ? undefined
                            : () =>
                              handleTrueFalseAnswer(
                                qIndex,
                                opt.label,
                                "false"
                              )
                        }
                      >

                        <input
                          type="radio"
                          name={`tf-${qIndex}-${opt.label}`}
                          checked={selectedValue === "false"}
                          readOnly
                          disabled={disabled}
                        />
                        Sai
                      </div>
                    </li>


                  );
                })}
              </ul>
            )}

            {/* FILL */}
            {q.type === "fill" && (
              <input
                type="text"
                value={answers[qIndex] || ""}
                onChange={(e) =>
                  handleTextAnswer(qIndex, e.target.value)
                }
                disabled={mode !== "on"}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "8px",
                }}
              />
            )}

            {/* ESSAY */}
            {q.type === "essay" && (
              <textarea
                value={answers[qIndex] || ""}
                onChange={(e) =>
                  handleTextAnswer(qIndex, e.target.value)
                }
                disabled={mode !== "on"}
                rows={4}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "8px",
                }}
              />
            )}

            {mode === "success" && (
              <Text
                style={{
                  cursor: "pointer",
                  color: "#1677ff",
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "12px",
                }}
                onClick={() => handleIdeaQuestion(qIndex)}
              >
                Đáp án gợi ý
              </Text>
            )}
          </div>
        ))}
      </div>

      <Modal
        open={hintQuestionIndex !== null}
        title="Đáp án gợi ý :"
        footer={null}
        onCancel={() => setHintQuestionIndex(null)}
      >
        {currentQuestion && (
          <>
            <div style={{ fontWeight: 600 }}>
              {renderMathContent(currentQuestion.content)}
            </div>

            {loadingIdea ? (
              <div style={{ marginTop: "8px" }}>
                <Skeleton
                  active
                  paragraph={{ rows: 2, width: ["80%", "100%"] }}
                  title={false}
                />
              </div>
            ) : (
              <div style={{ marginTop: "8px" }}>
                {renderMathContent(ideaResult)}
              </div>
            )}
          </>
        )}
      </Modal>
    </MathJaxContext>
  );
}
