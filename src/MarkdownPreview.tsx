import { mystToHtml } from "myst-to-html";
import { mystParse } from "myst-parser";

interface IProps {
  markdown: string;
}

function renderMarkdownToHTML(markdown: string) {
  const tree = mystParse(markdown);
  const renderedHTML = mystToHtml(tree);
  return { __html: renderedHTML };
}

export default function MarkdownPreview(props: IProps) {
  const markup = renderMarkdownToHTML(props.markdown);
  return (
    <div className="markdown-preview-class" dangerouslySetInnerHTML={markup} />
  );
}