import NoteItem from "./components/NoteItem";
import { useState, ChangeEventHandler, useEffect } from "react";
import axios from "axios";

type noteType = {
  id: string;
  title: string;
  description?: string;
};

const App = () => {
  const [noteToView, setNoteToView] = useState<noteType | null>(null);
  const [notes, setNotes] = useState<noteType[]>([]);
  const [values, setValue] = useState({
    title: "",
    description: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValue({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios("http://localhost:8000");
      setNotes(data.notes);
    };

    fetchNotes();
  }, []);

  return (
    <div className='max-w-3xl mx-auto shadow-md rounded space-y-4'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedNoteId) {
            const { data } = await axios.patch(
              "http://localhost:8000/" + selectedNoteId,
              {
                title: values.title,
                description: values.description,
              }
            );

            const updatedNotes = notes.map((n) => {
              if (n.id === selectedNoteId) {
                n.title = data.note.title;
                n.description = data.note.description;
              }
              return n;
            });
            setNotes([...updatedNotes]);
            setValue({ title: "", description: "" });
            return;
          }
          const { data } = await axios.post("http://localhost:8000/create", {
            title: values.title,
            description: values.description,
          });
          setNotes([data.note, ...notes]);
        }}
        className='space-y-4 p-5 shadow-md bg-white'>
        <h1 className='font-semibold text-2xl text-center'>Note Application</h1>
        <div className=''>
          <input
            className='w-full border-b-2 border-gray-700 outline-none'
            placeholder='Title'
            type='text'
            onChange={handleChange}
            value={values.title}
            name='title'
          />
        </div>
        <div className=''>
          <textarea
            placeholder='Description'
            className='w-full border-b-2 border-gray-700 outline-none resize-none h-36'
            onChange={handleChange}
            value={values.description}
            name='description'
          />
        </div>

        <div className='text-right'>
          <button className='bg-blue-500 text-white px-5 py-2 rounded'>
            Submit
          </button>
        </div>
      </form>

      {notes.map((n) => (
        <NoteItem
          onEditClick={() => {
            setValue({ title: n.title, description: n.description || "" });
            setSelectedNoteId(n.id);
          }}
          onDeleteClick={async () => {
            const result = confirm(
              "Are you sure you want to remove this note?"
            );
            if (result) {
              await axios.delete("http://localhost:8000/" + n.id);
              const updatedNotes = notes.filter(({ id }) => id !== n.id);
              setNotes([...updatedNotes]);
            }
          }}
          onDescriptionClick={() => {
            setNoteToView(noteToView?.id === n.id ? null : n);
          }}
          title={n.title}
          description={noteToView?.id === n.id ? n.description : ""}
          key={n.id}
        />
      ))}
    </div>
  );
};

export default App;
