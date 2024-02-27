import { useState } from "react";
import "./styles/index.css";
import { defaultOptions, mystParse } from "myst-parser";
import { NodeRenderer, ThemeProvider } from "@myst-theme/providers";
import { MyST, DEFAULT_RENDERERS } from "myst-to-react";
import { GenericNode, GenericParent } from "myst-common";
import { mystToHtml } from "myst-to-html";
import { VFile } from "vfile";
import { defaultDirectives } from "myst-directives";
import { helloDirective } from "./helloDirective";
import { HELLO_RENDERERS } from "./hello";

import {
  captionParagraphTransform,
  imageAltTextTransform,
  liftMystDirectivesAndRolesTransform,
  mathTransform,
  mystTargetsTransform,
} from "myst-transforms";

//import { liftMystDirectivesAndRolesTransform } from "./liftMystDirectivesAndRoles";
//import { mystTargetsTransform } from "./targets";

const allDirectives = defaultDirectives.concat(helloDirective);

const customOptions = {
  ...defaultOptions,
  directives: allDirectives,
};
let CUSTOM_RENDERERS: Record<string, NodeRenderer> = Object.assign(
  DEFAULT_RENDERERS,
  HELLO_RENDERERS
);

function transformTree(tree: GenericParent) {
  const vfile = new VFile(); // used for logging error messages

  /* Case of figure's directive */
  if (
    tree.children[0].name === "figure" ||
    tree.children[0].name === "code" ||
    tree.children[0].name === "image"
  ) {
    liftMystDirectivesAndRolesTransform(tree);
    mystTargetsTransform(tree);
  }
  /* Case of math's directive */
  if (tree.children[0].name === "math") {
    mathTransform(tree, vfile, { macros: {} });
  }
  /* Case of image's directive */
  if (tree.children[0].name === "image") {
    imageAltTextTransform(tree);
    captionParagraphTransform(tree);
  }
  if (tree.children[0].name === "code") {
    captionParagraphTransform(tree);
  }
}

function DefaultComponent({ node }: { node: GenericNode }) {
  if (!node.children) return <span>{node.value}</span>;
  return (
    <ThemeProvider renderers={{ ...CUSTOM_RENDERERS }}>
      <MyST ast={node.children} />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <>
      <MarkdownEditor></MarkdownEditor>
    </>
  );
}

export function MarkdownEditor() {
  const initial = "### Heading Level 3";
  const [postContent, setPostContent] = useState(initial);
  const tree = mystParse(postContent, customOptions);
  transformTree(tree);

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
      <MarkdownRenderer tree={tree}></MarkdownRenderer>
    </>
  );
}

interface IProps {
  tree: GenericParent;
}

export function MarkdownRenderer(props: IProps) {
  /* Case of headings or lists */
  if (
    props.tree.children[0].type === "heading" ||
    props.tree.children[0].type === "list"
  ) {
    return (
      <>
        <label>
          <p className="text-instruction-class">
            After parsing, rendered content looks like:
          </p>
          <div className="markdown-preview-class">
            <div dangerouslySetInnerHTML={{ __html: mystToHtml(props.tree) }} />
          </div>
        </label>
      </>
    );
  } else {
    return (
      <>
        <label>
          <p className="text-instruction-class">
            After parsing, rendered content looks like:
          </p>
          <div className="markdown-preview-class">
            {props.tree.children.map((node, index) => (
              <li className="node-list-class" key={index}>
                {<DefaultComponent node={node}></DefaultComponent>}
              </li>
            ))}
          </div>
        </label>
        ;
      </>
    );
  }
}
