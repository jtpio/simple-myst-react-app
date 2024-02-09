import { useState } from "react";
import MarkdownPreview from "./MarkdownPreview";
import "./styles/App.css";
import { defaultOptions } from "myst-parser";


export default function MarkdownEditor() {
  const initial = '_Hello,_ **Markdown**!'
  const [postContent, setPostContent] = useState(initial);

  return (
    <>
      <label>
        <h1 className="app-title"> Myst react app</h1>
        <p className="text-instruction-class">Enter some markdown:</p>
        <textarea
          className="textarea-class"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </label>
      <label>
        <p className="text-instruction-class">
          After parsing, rendered content looks like:
        </p>
        <MarkdownPreview markdown={postContent} options={defaultOptions} onChange={()=>setPostContent}/>
      </label>
    </>
  );
}
