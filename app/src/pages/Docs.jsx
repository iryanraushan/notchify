import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";
import PlaygroundCore from "@/components/PlaygroundCore";

const SECTIONS = [
  { id: "installation", title: "Installation" },
  { id: "quick-start", title: "Quick Start" },
  { id: "variants", title: "Variants" },
  { id: "promise", title: "Promise Toasts" },
  { id: "update", title: "Update Toasts" },
  { id: "dismiss", title: "Dismiss Toasts" },
  { id: "action", title: "Action Buttons" },
  { id: "icons", title: "Custom Icons" },
  { id: "custom", title: "Custom Toasts" },
  { id: "position", title: "Positioning" },
  { id: "themes", title: "Themes" },
  { id: "styling", title: "Styling" },
  { id: "tailwind", title: "Tailwind" },
  { id: "a11y", title: "Accessibility" },
  { id: "api", title: "API Reference" },
];

function H2({ id, children }) {
  return (
    <h2
      id={id}
      className="font-display text-2xl md:text-3xl font-semibold tracking-tight mt-16 mb-4 scroll-mt-24"
      data-testid={`docs-h-${id}`}
    >
      {children}
    </h2>
  );
}

function P({ children }) {
  return <p className="text-[#B5B5B5] leading-relaxed my-3">{children}</p>;
}

function InlineCode({ children }) {
  return <code className="font-mono text-[#F59E0B] text-sm">{children}</code>;
}

export default function Docs() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("installation");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const scrolled = total > 0 ? (h.scrollTop / total) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrolled)));

      const current = SECTIONS.map((section) => {
        const el = document.getElementById(section.id);

        return {
          id: section.id,
          top: el ? el.getBoundingClientRect().top : Infinity,
        };
      })
        .filter((section) => section.top < 120)
        .pop();

      if (current) {
        setActive(current.id);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-shell min-h-screen" data-testid="page-docs">
      <Navbar />

      <div
        className="fixed top-16 inset-x-0 h-0.5 z-40"
        data-testid="reading-progress"
      >
        <div
          className="h-full docs-progress transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <aside
            className="glass-sidebar hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 rounded-xl"
            data-testid="docs-sidebar"
          >
            <ul className="space-y-1">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    data-testid={`docs-link-${section.id}`}
                    className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                      active === section.id
                        ? "text-[#F59E0B] bg-[#F59E0B]/10 border-l-2 border-[#F59E0B] pl-3 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                        : "text-[#B5B5B5] hover:text-[#FAFAFA] hover:bg-white/[0.035] border-l-2 border-transparent pl-3"
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#F59E0B] mb-2">
              Documentation
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tighter">
              Notchify Docs
            </h1>

            <P>
              A premium toast library for React and Next.js. Lightweight,
              accessible, and fully typed.
            </P>

            <H2 id="installation">Installation</H2>
            <P>Install via your favorite package manager:</P>
            <CodeBlock
              language="bash"
              testId="docs-code-install"
              code={`npm i @iryanraushan/notchify`}
            />

            <H2 id="quick-start">Quick Start</H2>
            <P>
              Wrap your app with <InlineCode>ToastProvider</InlineCode>, then
              call <InlineCode>useToast()</InlineCode> anywhere below it.
            </P>
            <CodeBlock
              testId="docs-code-quickstart"
              code={`import {
  ToastProvider,
  useToast,
} from '@iryanraushan/notchify';

function App() {
  return (
    <ToastProvider mode="dark" position="bottom-right">
      <Page />
    </ToastProvider>
  );
}

function Page() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast.success('Hello!')}>
      Click
    </button>
  );
}`}
            />

            <H2 id="variants">Variants</H2>
            <P>
              Four built-in variants: <InlineCode>default</InlineCode>,{" "}
              <InlineCode>success</InlineCode>,{" "}
              <InlineCode>destructive</InlineCode>, and{" "}
              <InlineCode>loading</InlineCode>.
            </P>
            <CodeBlock
              testId="docs-code-variants"
code={`toast({ message: 'Hello' });
toast.success('Done!');
toast.error('Something failed');
toast.loading('Please wait...');`}
            />

            <H2 id="promise">Promise Toasts</H2>
            <P>
              <InlineCode>toast.promise()</InlineCode> shows a loading toast
              first, then updates it to success or error.
            </P>
            <CodeBlock
              testId="docs-code-promise"
              code={`await toast.promise(fetchUser(), {
  loading: 'Loading...',
  success: (user) => 'Welcome ' + user.name + '!',
  error: (error) => 'Error: ' + error.message,
});`}
            />

            <H2 id="update">Update Toasts</H2>
            <P>Mutate any field of an existing toast by id.</P>
            <CodeBlock
              testId="docs-code-update"
              code={`const id = toast.loading('Uploading...');
toast.update(id, {
  variant: 'success',
  message: 'Upload complete!',
});`}
            />

            <H2 id="dismiss">Dismiss Toasts</H2>
            <P>Remove a toast programmatically by id.</P>
            <CodeBlock
              testId="docs-code-dismiss"
              code={`const id = toast.loading('Working...');
toast.dismiss(id);`}
            />

            <H2 id="action">Action Buttons</H2>
            <P>
              Inline CTAs are rendered inside the toast.{" "}
              <InlineCode>onClick</InlineCode> can be async.
            </P>
            <CodeBlock
              testId="docs-code-action"
              code={`toast({
  message: 'File deleted.',
  action: {
    label: 'Undo',
    onClick: async () => {
      await restoreFile();
    },
  },
});`}
            />

            <H2 id="icons">Custom Icons</H2>
            <P>Replace the default dot with any React node.</P>
            <CodeBlock
              testId="docs-code-icons"
              code={`toast({
  message: 'New mail',
  icon: <Mail size={16} />,
});`}
            />

            <H2 id="custom">Custom Toasts</H2>
            <P>
              Render a fully custom React node while keeping auto-dismiss, hover
              pause, and swipe behavior.
            </P>
            <CodeBlock
              testId="docs-code-custom"
              code={`toast.custom(
  <div className="rounded-xl bg-black p-4">
    Custom UI
  </div>,
  { duration: 5000 }
);`}
            />

            <H2 id="position">Positioning</H2>
            <P>
              Use one of six positions. On screens up to 768px wide, top
              positions center at the top and bottom positions center at the
              bottom.
            </P>
            <CodeBlock
              testId="docs-code-position"
              code={`<ToastProvider position="top-right">
  <App />
</ToastProvider>`}
            />

            <H2 id="themes">Themes</H2>
            <P>
              Use <InlineCode>mode</InlineCode> for the built-in light/dark
              defaults, or pass a <InlineCode>theme</InlineCode> object.
            </P>
            <CodeBlock
              testId="docs-code-themes"
              code={`<ToastProvider
  mode="dark"
  theme={{
    background: '#1a1a2e',
    border: '#2a2a4a',
    textColor: '#e0e0ff',
    dotColors: {
      success: '#00ff88',
    },
    defaultDuration: 5000,
  }}
>
  <App />
</ToastProvider>`}
            />

            <H2 id="styling">Styling</H2>
            <P>
              Use <InlineCode>className</InlineCode> for one toast,{" "}
              <InlineCode>toastClassName</InlineCode> for every toast, or{" "}
              <InlineCode>containerClassName</InlineCode> for the viewport.
            </P>
            <CodeBlock
              testId="docs-code-styling"
              code={`<ToastProvider
  toastClassName="rounded-2xl shadow-2xl"
  containerClassName="my-toast-container"
>
  <App />
</ToastProvider>

toast({
  message: 'Styled toast',
  className: 'border-amber-500',
});`}
            />

            <H2 id="a11y">Accessibility</H2>
            <P>
              The viewport uses <InlineCode>role="region"</InlineCode> and{" "}
              <InlineCode>aria-label="Notifications"</InlineCode>. Toasts use{" "}
              <InlineCode>role="status"</InlineCode>,{" "}
              <InlineCode>aria-live="polite"</InlineCode>, and reduced-motion
              preferences are respected.
            </P>

            <H2 id="api">API Reference</H2>
            <P>Core API shape:</P>
            <CodeBlock
              testId="docs-code-api"
              code={`type ToastAPI = {
  (options: ToastOptions & { message: string }): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  custom: (content: ReactNode, options?: ToastOptions) => string;
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>
  ) => Promise<T>;
  update: (id: string, options: Partial<ToastItem>) => void;
  dismiss: (id: string) => void;
};`}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
