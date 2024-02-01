import { Remarkable } from 'remarkable';

interface IProps {
  markdown: string;
}

const md = new Remarkable();

function renderMarkdownToHTML(markdown: string) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return {__html: renderedHTML};
}

export default function MarkdownPreview(props: IProps) {
  const markup = renderMarkdownToHTML(props.markdown);
  return <div dangerouslySetInnerHTML={markup} />;
}