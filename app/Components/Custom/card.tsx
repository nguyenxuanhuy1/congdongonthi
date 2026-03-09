import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import DeThi from '../../Assets/dethi.jpg';
interface CardCustomProps {
  image: string;
  title: string;
  time?: string;
  author?: string;
  nameshare?: string;
  onClick?: () => void;

}

export default function CardCustom({
  image,
  title,
  time,
  author,
  nameshare,
  onClick,
}: CardCustomProps) {
  return (
    <div className="custom-card-horizontal" onClick={onClick}>
      <div className="image-wrapper-card">
        <Image
          src={DeThi}
          alt={title}
          width={120}
          height={160}
          className="custom-image"
          unoptimized
        />
      </div>

      <div className="content">
        <h1 className="custom-title">{title}</h1>

        {author && <h1 className="custom-author">{author}</h1>}

        {nameshare && (
          <div className="custom-nameshare">
            <span className="label">Chia sẻ bởi: </span>
            <span className="name">{nameshare}</span>
          </div>
        )}

        {time && (
          <div className="custom-time">
            <span className="icon"><ClockCircleOutlined /></span>
            <span>{time}</span>
          </div>
        )}
      </div>
    </div>
  );
}
