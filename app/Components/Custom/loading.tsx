"use client";


interface Props {
  percent: number;
  visible: boolean;
  text?: string;
}

export default function LoadingOverlay({
  percent,
  visible,
  text = "Đang xử lí...",
}: Props) {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-text">{text}</div>

        <div className="overlay-bar">
          <div
            className="overlay-bar__progress"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
