// src/components/SafeQuillEditor.jsx
import { useEffect, useState, useCallback } from "react";

const SafeQuillEditor = ({ value, onChange }) => {
  const [Editor, setEditor] = useState(null);

  useEffect(() => {
    // Dynamically import react-quilljs only on the client side
    import("react-quilljs").then(({ useQuill }) => {
      setEditor(() => {
        return function EditorWrapper() {
          const { quill, quillRef } = useQuill({
            modules: {
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["blockquote", "code-block"],
                  ["link", "image"],
                  ["clean"],
                ],
              },
            },
            placeholder: "Write your amazing content here...",
            theme: "snow",
          });

          const imageHandler = useCallback(() => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("image", file);

              try {
                const token = localStorage.getItem("token");
                const res = await fetch(
                  `${
                    import.meta.env.VITE_API_URL
                  }/api/blogs/upload/wysiwyg-image`,
                  {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  }
                );

                const data = await res.json();
                if (res.ok) {
                  const range = quill.getSelection(true);
                  const index = range?.index ?? quill.getLength();
                  quill.insertEmbed(index, "image", data.imageUrl);
                  quill.setSelection(index + 1);
                } else {
                  alert(data.msg || "Image upload failed");
                }
              } catch (err) {
                console.error(err);
                alert("Server error during image upload");
              }
            };
          }, [quill]);

          useEffect(() => {
            if (!quill) return;
            quill.on("text-change", () => {
              onChange(quill.root.innerHTML);
            });

            const toolbar = quill.getModule("toolbar");
            if (toolbar) toolbar.addHandler("image", imageHandler);
          }, [quill, imageHandler]);

          return <div ref={quillRef} style={{ minHeight: "400px" }} />;
        };
      });
    });
  }, []);

  if (!Editor) return <div>Loading editor...</div>;
  return <Editor />;
};

export default SafeQuillEditor;
