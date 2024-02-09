import { mystToHtml } from "myst-to-html";
import { AllOptions, mystParse} from "myst-parser";
import './styles/myst.css';
import type { Handlers } from 'mdast-util-to-hast';




type Options = Partial<AllOptions>;
type mystToHtmlOpts = {
  formatHtml?: boolean;
  hast?: {
    clobberPrefix?: 'm-';
    allowDangerousHtml?: boolean;
    handlers?: Handlers;
  };
  stringifyHtml?: {
    closeSelfClosing?: boolean;
    allowDangerousHtml?: boolean;
  };
}
const defaultMystToHtmlOpts: mystToHtmlOpts = {
    formatHtml: true,
    hast: {
      clobberPrefix: 'm-',
      allowDangerousHtml: true,
    },
    stringifyHtml: {
      closeSelfClosing: true,
      allowDangerousHtml: true
    }
  }

interface IProps {
  markdown: string
  options: Options
  onChange: React.Dispatch<HTMLElement>
}

function renderMarkdownToHTML(markdown: string, treeOptions: Options) {
  const tree = mystParse(markdown, treeOptions);
 const renderedHTML = mystToHtml(tree, defaultMystToHtmlOpts);
 console.log('tree:', JSON.stringify(tree, null, 2));
  return { __html: renderedHTML };

}

export default function MarkdownPreview(props: IProps) {
  const markup = renderMarkdownToHTML(props.markdown, props.options);
  return (
    <div className="markdown-preview-class" dangerouslySetInnerHTML={markup} onChange={()=>markup}/>
  );
}