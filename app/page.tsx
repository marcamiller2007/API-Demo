'use client';
import { useState } from 'react';
import ActionHeader from '@/components/ActionHeader';
import RequestPane from '@/components/RequestPane';
import ResponsePane from '@/components/ResponsePane';

export default function Dashboard() {
  const [requestBody, setRequestBody] = useState(`{\n  "cptCode": "74177",\n  "zipcode": "78258",\n  "planName": "UHC Choice Plus",\n  "mode": 0\n}`);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState<Record<string, string>>({});

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse(null);
    setStatus(null);
    setHeaders({});
    const startTime = performance.now();
    try {
      const res = await fetch('http://localhost:5190/api/Routing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });
      const endTime = performance.now();
      setTime(Math.round(endTime - startTime));
      setStatus(res.status);
      
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      setHeaders(responseHeaders);

      const text = await res.text();
      setSize(new Blob([text]).size);

      try {
        setResponse(JSON.parse(text));
      } catch {
        setResponse(text);
      }
    } catch (error: any) {
      const endTime = performance.now();
      setTime(Math.round(endTime - startTime));
      setResponse({ error: error.message || 'Network error / CORS issue' });
      setStatus(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-lg overflow-hidden">
      <main className="w-full max-w-7xl h-[85vh] flex flex-col">
        <div className="mb-md">
          <span className="text-h2 text-on-background">API Architect</span>
        </div>

        <div className="flex-1 flex flex-col border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl bg-surface">
          <ActionHeader onSend={handleSendRequest} isLoading={isLoading} />

          {/* Workspace Split Pane */}
          <div className="flex-1 flex overflow-hidden">
            <RequestPane requestBody={requestBody} setRequestBody={setRequestBody} />
            <ResponsePane 
              data={response} 
              status={status} 
              time={time} 
              size={size} 
              isLoading={isLoading} 
              headers={headers} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
