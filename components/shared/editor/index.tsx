"use client";

import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";

let isRendered = false;
export default function Editor() {
  const [editorContent, setEditorContent] = useState<string>(""); // State to hold the content of the editor

  useEffect(() => {
    if (isRendered) {
      return;
    }
    const initializeEditor = async () => {
      const { default: Quill } = await import("quill");
      const editorContainer = document.getElementById("editor");
      if (editorContainer) {
        const editor = new Quill(editorContainer, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
          placeholder: "Write something...",
        });
      }
    };
    if (typeof window !== "undefined") {
      initializeEditor();
      isRendered = true;
    }
  }, []);

  return (
    <div
      style={{
        background: "var(--gray-100)",
        marginBottom: 80,
      }}
    >
      <div id="editor"></div>
    </div>
  );
}
