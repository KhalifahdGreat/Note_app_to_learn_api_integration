import { FC } from "react";

interface Button {
  title?: string;
  type?: "danger" | "normal" | "regular";
  onClick?(): void;
}

const NoteButton: FC<Button> = ({ title, type, onClick }) => {
  let color;
  switch (type) {
    case "danger":
      color = "bg-red-500";
      break;
    case "normal":
      color = "bg-gray-500";
      break;
    case "regular":
      color = "bg-blue-500";
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-2 py-2 rounded`}>
      {title}
    </button>
  );
};

export default NoteButton;
