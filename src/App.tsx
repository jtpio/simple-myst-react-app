import React from "react";
import { useState } from "react";
import "./styles/base.css";
import { defaultOptions, mystParse } from "myst-parser";
import { ThemeProvider } from "@myst-theme/providers";
import { MyST, DEFAULT_RENDERERS } from "myst-to-react";
import { GenericNode } from "myst-common";

function DefaultComponent({ node }: { node: GenericNode }) {
  if (!node.children) return <span>{node.value}</span>;
  return (
    <ThemeProvider renderers={DEFAULT_RENDERERS}>
      <MyST ast={node.children} />
    </ThemeProvider>
  );
}

export default function MarkdownEditor() {
  const initial = "_Hello,_ **Markdown**!";
  const [postContent, setPostContent] = useState(initial);
  const tree = mystParse(postContent, defaultOptions);

  return (
    <>
      <label>
        <h1 className="app-title"> Myst react app</h1>
        <p className="text-instruction-class">Enter some markdown:</p>
        <textarea
          className="textarea-class"
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
      </label>
      <label>
        <p className="text-instruction-class">
          After parsing, rendered content looks like:
        </p>
        <div className="markdown-preview-class">
          <ul>
            {tree.children.map((node) => (
              <li key={node.id}>
                {<DefaultComponent node={node}></DefaultComponent>}
              </li>
            ))}
          </ul>
        </div>
      </label>
      ;
    </>
  );
}
