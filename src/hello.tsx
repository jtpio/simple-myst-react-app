import { NodeRenderer } from "@myst-theme/providers";

const helloRenderer: NodeRenderer = ({ node }) => {
  console.log('node:', node.value)
  if (node.type === "hello") {
    return (
      <span
        className="hello-world-class"> {node.value}</span>
      
    );
  }
};

export const HELLO_RENDERERS = {
  hello: helloRenderer,
};

