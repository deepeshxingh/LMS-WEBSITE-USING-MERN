import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleSave = () => {
    console.log(editorContent); // You can replace this with your backend save logic
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        theme="snow"
        modules={modules}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MyEditor;
