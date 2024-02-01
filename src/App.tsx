import { useState } from 'react';
import MarkdownPreview from './MarkdownPreview';
import "./App.css";


export default function MarkdownEditor() {
  const [postContent, setPostContent] = useState('_Hello,_ **Markdown**!');
  return (
    <>
      <label>
        <h1 className='app-title'> Myst react app</h1>
        <p className='text-instruction-class'>Enter some markdown:</p>
        <textarea className='textarea-class'
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
      </label>
      <label>
      <p className='text-instruction-class'>After parsing, rendered content looks like:</p>
      <MarkdownPreview markdown={postContent} />
      </label>
    </>
  );
}

