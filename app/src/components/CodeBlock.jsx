import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Lightweight syntax highlighter for our limited token set
function highlight(code) {
  const escape = (s) =>
    s.replace(/[&<>]/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
    }[c]));

  let html = escape(code);

  // strings
  html = html.replace(
    /(&#39;|')([^']*)(&#39;|')/g,
    '<span style="color:#F59E0B">$1$2$3</span>'
  );

  html = html.replace(
    /(`[^`]*`)/g,
    '<span style="color:#F59E0B">$1</span>'
  );

  html = html.replace(
    /(&quot;[^&]*&quot;)/g,
    '<span style="color:#F59E0B">$1</span>'
  );

  // comments
  html = html.replace(
    /(\/\/[^\n]*)/g,
    '<span style="color:#737373">$1</span>'
  );

  // keywords
  html = html.replace(
    /\b(import|from|const|let|var|return|async|await|function|export|default|if|else|new)\b/g,
    '<span style="color:#FB923C">$1</span>'
  );

  // booleans / numbers
  html = html.replace(
    /\b(true|false|null|undefined|\d+)\b/g,
    '<span style="color:#22C55E">$1</span>'
  );

  // function calls
  html = html.replace(
    /(\w+)(\()/g,
    '<span style="color:#FAFAFA">$1</span>$2'
  );

  return html;
}

export default function CodeBlock({
  code,
  language = "tsx",
  testId = "code-block",
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { }
  };

  return (
    <div
      className={`code-window relative rounded-lg overflow-hidden ${className}`}
      data-testid={testId}
    >
      <div className="code-titlebar flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_12px_rgba(255,95,87,0.35)]" /> {/* Close */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shadow-[0_0_12px_rgba(254,188,46,0.32)]" /> {/* Minimize */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-[0_0_12px_rgba(40,200,64,0.32)]" /> {/* Maximize */}
          <span className="ml-2 text-[11px] font-mono text-[#737373]">
            {language}
          </span>
        </div>

        <button
          onClick={onCopy}
          data-testid={`${testId}-copy`}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#B5B5B5] hover:text-[#F59E0B] transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}

          {copied ? "Copied" : ""}
        </button>
      </div>

      <pre className="text-[13px] font-mono leading-relaxed p-4 overflow-x-auto code-scroll text-[#FAFAFA]">
        <code
          dangerouslySetInnerHTML={{
            __html: highlight(code),
          }}
        />
      </pre>
    </div>
  );
}
