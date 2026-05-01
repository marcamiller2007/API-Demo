import { Play, Loader2 } from 'lucide-react';

interface ActionHeaderProps {
  onSend: () => void;
  isLoading: boolean;
}

export default function ActionHeader({ onSend, isLoading }: ActionHeaderProps) {
  return (
    <div className="border-b border-outline-variant/30 bg-surface-container-low px-lg py-md flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-md">
        <span className="bg-primary/10 text-primary border border-primary/30 px-sm py-[2px] rounded font-mono text-[12px] font-bold uppercase tracking-wider">
          POST
        </span>
        <div className="flex items-center gap-sm text-on-surface text-body-base bg-surface-container-lowest border border-outline-variant/50 rounded px-sm py-[6px] w-[400px]">
          <span className="text-outline">http://</span>
          <span className="text-on-surface-variant flex-1 truncate">localhost:5190</span>
          <span className="text-primary font-medium">/api/routing</span>
        </div>
      </div>
      <button 
        onClick={onSend}
        disabled={isLoading}
        className="bg-secondary-container text-on-secondary-container hover:bg-secondary transition-colors text-body-base font-semibold px-lg py-sm rounded flex items-center gap-sm shadow-[0_0_15px_-3px_rgba(41,161,149,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
        Send Request
      </button>
    </div>
  );
}
