import { FC } from "react";
import NoteButton from "./NoteButton";

interface Props {
  title?: string;
  description?: string;
  onDescriptionClick?(): void;
  onEditClick?(): void;
  onDeleteClick?(): void;
}

const NoteItem: FC<Props> = ({
  title,
  description,
  onEditClick,
  onDeleteClick,
  onDescriptionClick,
}) => {
  return (
    <div className='p-5'>
      <p className='font-semibold text-gray-700 text-lg mb-4'>{title}</p>
      {description ? <p className='ml-2 py-2 text-lg'>{description}</p> : null}
      <div className='space-x-4'>
        <NoteButton
          title={description ? "Hide" : "View"}
          type='regular'
          onClick={onDescriptionClick}
        />
        <NoteButton title='Edit' type='normal' onClick={onEditClick} />
        <NoteButton title='Delete' type='danger' onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;
