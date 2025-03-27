
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center px-2 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 mr-1" />
          <span>Copié</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3 mr-1" />
          <span>Copier</span>
        </>
      )}
    </button>
  );
}