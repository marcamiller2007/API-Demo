'use client';

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

interface RequestPaneProps {
  requestBody: string;
  setRequestBody: (val: string) => void;
}

export default function RequestPane({ requestBody, setRequestBody }: RequestPaneProps) {
  return (
    <div className="w-1/2 flex flex-col border-r border-outline-variant/30 bg-surface-container">
      {/* Request Tabs */}
      <div className="flex items-center px-sm pt-sm border-b border-outline-variant/30 bg-surface-container-low">
        <button className="px-md py-sm text-body-sm text-primary border-b-2 border-primary font-medium">Body</button>
      </div>

      {/* Editor Toolbar */}
      <div className="px-md py-sm flex justify-between items-center border-b border-outline-variant/20">
        <div className="flex items-center gap-sm">
          <span className="text-body-sm text-on-surface-variant">JSON</span>
        </div>
      </div>

      {/* JSON Editor Area */}
      <div className="flex-1 bg-surface-container-lowest overflow-y-auto relative flex text-code-base">
        {/* Line Numbers */}
        <div className="w-10 bg-surface-container-low border-r border-outline-variant/20 text-outline-variant text-right pr-2 pt-md opacity-50 select-none shrink-0">
          {requestBody.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code Content */}
        <Editor
          value={requestBody}
          onValueChange={code => setRequestBody(code)}
          highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
          padding={16}
          className="flex-1 bg-transparent text-on-surface-variant outline-none font-mono"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: 14,
          }}
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
}
