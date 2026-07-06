'use client';

import { useState } from 'react';
import { Clock, Database, Copy, Download, MapPin, Phone, Building2, AlertCircle, DollarSign, CircleCheckBig } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

interface ResponsePaneProps {
  data: any;
  status: number | null;
  time: number;
  size: number;
  isLoading: boolean;
  headers: Record<string, string>;
}

export default function ResponsePane({ data, status, time, size, isLoading, headers }: ResponsePaneProps) {
  const [responseTab, setResponseTab] = useState<'preview' | 'raw' | 'headers'>('preview');

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const cleanPhone = (phone: string) => {
    let cleaned : string= "(";

    cleaned += phone.substring(2, 5) + ") ";
    cleaned += phone.substring(5, 8) + "-";
    cleaned += phone.substring(8);

    return cleaned;
  }

  const cleanDate = (date: string) => {
    let cleaned : string = date.substring(5, 7);
    cleaned += "/" + date.substring(8, 10);
    cleaned += "/" + date.substring(0, 4);

    return cleaned;
  }

  const isSuccess = status !== null && status >= 200 && status < 300;

  return (
    <div className="w-1/2 flex flex-col bg-surface-container">
      {/* Response Header */}
      <div className="px-md py-sm border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center min-h-[57px]">
        {status !== null ? (
          <div className="flex items-center gap-md">
            <div className={`flex items-center gap-sm ${isSuccess ? 'bg-secondary/10 border-secondary/20' : 'bg-error/10 border-error/20'} border px-sm py-xs rounded`}>
              <div className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-secondary shadow-[0_0_8px_rgba(107,216,203,0.8)]' : 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.8)]'}`}></div>
              <span className={`text-label-caps ${isSuccess ? 'text-secondary' : 'text-error'} uppercase`}>
                {status === 0 ? 'ERROR' : `${status} ${isSuccess ? 'OK' : ''}`}
              </span>
            </div>
            <span className="text-body-sm text-on-surface-variant flex items-center gap-xs">
              <Clock size={14} /> {time} ms
            </span>
            <span className="text-body-sm text-on-surface-variant flex items-center gap-xs">
              <Database size={14} /> {formatSize(size)}
            </span>
          </div>
        ) : (
          <div className="text-body-sm text-on-surface-variant flex items-center gap-2">
             {isLoading ? 'Sending request...' : 'Waiting for request...'}
          </div>
        )}
        <div className="flex items-center gap-sm">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs" aria-label="Copy">
            <Copy size={16} />
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs" aria-label="Download">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Response Tabs */}
      <div className="flex items-center px-sm border-b border-outline-variant/20">
        <button onClick={() => setResponseTab('preview')} className={`px-md py-xs text-body-sm transition-colors border-b-2 ${responseTab === 'preview' ? 'text-on-surface border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>Preview</button>
        <button onClick={() => setResponseTab('raw')} className={`px-md py-xs text-body-sm transition-colors border-b-2 ${responseTab === 'raw' ? 'text-on-surface border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>Raw</button>
        <button onClick={() => setResponseTab('headers')} className={`px-md py-xs text-body-sm transition-colors border-b-2 ${responseTab === 'headers' ? 'text-on-surface border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>Headers</button>
      </div>

      {/* Response Content */}
      <div className="flex-1 bg-surface-container-lowest p-md overflow-y-auto relative">
        {isLoading ? (
           <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
             Loading...
           </div>
        ) : !data && status === null ? (
           <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
             Hit send to get a response
           </div>
        ) : (
           <>
        {responseTab === 'preview' && (
          <div className="flex flex-col gap-md font-sans">
            {status === 0 ? (
                <div className="bg-error/10 border border-error/30 rounded-lg p-md text-error flex items-start gap-sm">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-h3 mb-sm">Request Failed</h3>
                        <p className="text-body-base opacity-90">{data?.error || "Unknown error"}</p>
                        <p className="text-body-sm opacity-75 mt-md">Note: Fetching <code>api.transparent-health.net</code> from a cloud preview URL may be blocked by your browser due to Mixed Content restrictions or lack of network connectivity to your local machine.</p>
                    </div>
                </div>
            ) : typeof data === 'object' && data !== null ? (
              Object.entries(data)
                .map(([index, item] : [string, any]) => (
                <div key={index} className="bg-surface border border-outline-variant/30 rounded-lg p-md shadow-sm hover:border-primary/50 transition-colors">
                  <div className="border-b border-outline-variant/20 pb-sm mb-sm flex justify-between items-center">
                    <h3 className="text-h3 text-primary font-mono font-bold tracking-tight">Rank: {Number(index) + 1}</h3>
                    {/* <span className="text-label-caps text-on-surface-variant bg-surface-variant px-2 py-1 rounded">Location Data</span> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-body-base font-semibold text-on-surface flex items-center gap-2">
                      <Building2 size={16} className="text-secondary" />
                      {item?.clinic?.name || 'N/A'}
                    </div>
                    <div className="text-body-sm text-on-surface-variant flex items-center gap-2">
                      <MapPin size={16} className="text-on-surface-variant/70" />
                      {item?.clinic?.city || 'N/A'}, {item?.clinic?.state || 'N/A'}
                    </div>
                    <div className="text-body-sm text-on-surface-variant flex items-center gap-2">
                      <Phone size={16} className="text-on-surface-variant/70" />
                      Phone: {cleanPhone(item?.clinic?.phoneNumber) || 'N/A'}
                    </div>
                    <div className="text-body-sm text-on-surface-variant flex items-center gap-2">
                      <CircleCheckBig size={16} className="text-on-surface-variant/70" />
                      Last Confirmed: {cleanDate(item?.recordedAt) || 'N/A'}
                    </div>
                    <div className="text-body-sm text-on-surface flex items-center gap-2 font-medium">
                      <DollarSign size={16} className="text-primary" />
                      Bundled Rate: ${item?.price !== undefined ? item.price : 'N/A'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-on-surface-variant text-body-base">
                 Preview not available for this data format.
              </div>
            )}
          </div>
        )}
        
        {responseTab === 'raw' && (
          <div className="text-code-base font-mono">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-surface-container-low border-r border-outline-variant/20 text-outline-variant text-right pr-2 pt-md opacity-50 select-none">
              {typeof data === 'string' ? data.split('\n').map((_, i) => (
                 <div key={i}>{i + 1}</div>
              )) : JSON.stringify(data, null, 2).split('\n').map((_, i) => (
                 <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="pl-10 text-on-surface-variant whitespace-pre pr-8 pb-8 inline-block min-w-full">
              {typeof data === 'string' ? (
                 <div className="overflow-visible break-all whitespace-pre-wrap">{data}</div>
              ) : (
                 <div dangerouslySetInnerHTML={{ __html: Prism.highlight(JSON.stringify(data, null, 2), Prism.languages.json, 'json') }} />
              )}
            </div>
          </div>
        )}

        {responseTab === 'headers' && (
          <div className="flex flex-col gap-2 font-sans">
            {Object.entries(headers).length > 0 ? Object.entries(headers).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-body-sm font-semibold text-on-surface">{key}</span>
                <span className="text-body-sm text-on-surface-variant font-mono text-right max-w-xs break-all">{value}</span>
              </div>
            )) : (
              <div className="text-body-sm text-on-surface-variant italic">No headers present.</div>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
