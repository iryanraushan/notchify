import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@iryanraushan/notchify";
import {
  Bell,
  Heart,
  Loader2,
  Mail,
  Star,
  Trash2,
  Upload,
  Zap,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

const PANEL =
  "glass-card soft-reflection rounded-xl";

const BUTTON =
  "h-11 rounded-md px-4 inline-flex items-center justify-center gap-2 text-sm md:text-base font-semibold transition-all duration-200";

const PRIMARY = `${BUTTON} primary-gradient text-black`;
const SECONDARY = `${BUTTON} glass-control text-[#FAFAFA]`;
const GHOST = `${BUTTON} glass-control text-[#B5B5B5] hover:text-[#FAFAFA]`;

function DemoCard({ children, className = "", testId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`${PANEL} p-6 md:p-10 min-h-[320px] ${className}`}
      data-testid={testId}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] uppercase text-[#F59E0B] mb-5">
        {eyebrow}
      </div>

      <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#FAFAFA]">
        {title}
      </h3>

      {desc && (
        <p className="mt-4 text-base text-[#A3A3A3] leading-relaxed max-w-2xl">
          {desc}
        </p>
      )}
    </div>
  );
}

function VariantsShowcase() {
  const { toast } = useToast();

  return (
    <DemoCard
      className="col-span-12 lg:col-span-7"
      testId="showcase-variants"
    >
      <SectionTitle
        eyebrow="01 - Variants"
        title="Four ways to communicate."
        desc="Default, success, error and loading variants built-in. One API, zero ceremony."
      />

      <div className="grid gap-8 md:grid-cols-[0.95fr_1.25fr] items-start">
        <div className="flex flex-wrap gap-3">
          <button
            className={SECONDARY}
            onClick={() => toast({ message: "Profile updated." })}
            data-testid="variant-default"
          >
            <Bell className="w-4 h-4" />
            Default
          </button>

          <button
            className={SECONDARY}
            onClick={() => toast.success("Payment successful!")}
            data-testid="variant-success"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            Success
          </button>

          <button
            className={SECONDARY}
            onClick={() => toast.error("Failed to delete file.")}
            data-testid="variant-error"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            Error
          </button>

          <button
            className={SECONDARY}
            onClick={() => {
              const id = toast.loading("Uploading...");
              setTimeout(() => {
                toast.update(id, {
                  variant: "success",
                  message: "Done.",
                });
              }, 2200);
            }}
            data-testid="variant-loading"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading
          </button>
        </div>

        <CodeBlock
          testId="code-variants"
          className="min-w-0"
          code={`toast({ message: 'Profile updated.' });
toast.success('Payment successful!');
toast.error('Failed to delete file.');
toast.loading('Uploading...');`}
        />
      </div>
    </DemoCard>
  );
}

function PromiseShowcase() {
  const { toast } = useToast();

  const run = (shouldResolve) => {
    const request = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ name: "Raushan" });
        } else {
          reject(new Error("Network timeout"));
        }
      }, 1200);
    });

    toast
      .promise(request, {
        loading: "Saving changes...",
        success: (data) => `Welcome, ${data.name}!`,
        error: (err) => `Failed: ${err.message}`,
      })
      .catch(() => {});
  };

  return (
    <DemoCard
      className="col-span-12 lg:col-span-5"
      testId="showcase-promise"
    >
      <SectionTitle
        eyebrow="02 - Promise"
        title="Async, handled."
        desc="Loading -> success or error. Automatically."
      />

      <div className="flex flex-wrap gap-3 mb-8">
        <button className={PRIMARY} onClick={() => run(true)}>
          Resolve
        </button>

        <button className={GHOST} onClick={() => run(false)}>
          Reject
        </button>
      </div>

      <CodeBlock
        testId="code-promise"
        code={`await toast.promise(fetchUser(), {
  loading: 'Saving changes...',
  success: (d) => \`Welcome, \${d.name}!\`,
  error:   (e) => \`Failed: \${e.message}\`,
});`}
      />
    </DemoCard>
  );
}

function UpdateShowcase() {
  const { toast } = useToast();

  const startUpload = () => {
    const id = toast.loading("Uploading...");

    setTimeout(() => {
      toast.update(id, { message: "Uploading... 47%" });
    }, 900);

    setTimeout(() => {
      toast.update(id, { message: "Uploading... 92%" });
    }, 1700);

    setTimeout(() => {
      toast.update(id, {
        variant: "success",
        message: "Done!",
      });
    }, 2500);
  };

  return (
    <DemoCard
      className="col-span-12 lg:col-span-6"
      testId="showcase-update"
    >
      <SectionTitle
        eyebrow="03 - Update"
        title="Mutate any toast in place."
        desc="Track progress with a single id."
      />

      <button className={`${PRIMARY} mb-8`} onClick={startUpload}>
        <Upload className="w-4 h-4" />
        Start upload
      </button>

      <CodeBlock
        testId="code-update"
        code={`const id = toast.loading('Uploading...');

toast.update(id, {
  variant: 'success',
  message: 'Done!',
});`}
      />
    </DemoCard>
  );
}

function DismissShowcase() {
  const { toast } = useToast();
  const [toastId, setToastId] = useState(null);

  const create = () => {
    const id = toast.loading("Working...");
    setToastId(id);
  };

  const dismiss = () => {
    if (!toastId) return;
    toast.dismiss(toastId);
    setToastId(null);
  };

  return (
    <DemoCard
      className="col-span-12 lg:col-span-6"
      testId="showcase-dismiss"
    >
      <SectionTitle
        eyebrow="04 - Dismiss"
        title="Full programmatic control."
      />

      <div className="flex flex-wrap gap-3 mb-8">
        <button className={SECONDARY} onClick={create}>
          Create
        </button>

        <button
          className={`${GHOST} disabled:opacity-45 disabled:cursor-not-allowed`}
          onClick={dismiss}
          disabled={!toastId}
        >
          <Trash2 className="w-4 h-4" />
          Dismiss
        </button>
      </div>

      <CodeBlock
        testId="code-dismiss"
        code={`const id = toast.loading('Working...');
toast.dismiss(id);`}
      />
    </DemoCard>
  );
}

function ActionShowcase() {
  const { toast } = useToast();

  return (
    <DemoCard
      className="col-span-12 lg:col-span-6"
      testId="showcase-action"
    >
      <SectionTitle
        eyebrow="05 - Action Button"
        title="Async CTAs inside a toast."
      />

      <button
        className={`${PRIMARY} mb-8`}
        onClick={() =>
          toast({
            message: "File deleted.",
            variant: "destructive",
            duration: 6000,
            action: {
              label: "Undo",
              onClick: async () => {
                await new Promise((resolve) => setTimeout(resolve, 800));
                toast.success("File restored.");
              },
            },
          })
        }
      >
        <Trash2 className="w-4 h-4" />
        Delete file
      </button>

      <CodeBlock
        testId="code-action"
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
    </DemoCard>
  );
}

function IconsShowcase() {
  const { toast } = useToast();

  const items = [
    {
      label: "Lucide",
      icon: <Heart className="w-4 h-4 text-[#FAFAFA]" />,
      toastIcon: <Heart className="w-4 h-4 text-[#F59E0B]" />,
    },
    {
      label: "Emoji",
      icon: <span>🎉</span>,
      toastIcon: <span>🎉</span>,
    },
    {
      label: "SVG",
      icon: <Star className="w-4 h-4" />,
      toastIcon: <Star className="w-4 h-4 text-[#22C55E]" />,
    },
    {
      label: "React Icons",
      icon: <Mail className="w-4 h-4" />,
      toastIcon: <Mail className="w-4 h-4 text-[#60A5FA]" />,
    },
  ];

  return (
    <DemoCard
      className="col-span-12 lg:col-span-6"
      testId="showcase-icons"
    >
      <SectionTitle
        eyebrow="06 - Custom Icons"
        title="Bring your own icon."
        desc="Pass any React node as icon."
      />

      <div className="flex flex-wrap gap-3 mb-8">
        {items.map((item) => (
          <button
            key={item.label}
            className={SECONDARY}
            onClick={() =>
              toast({
                message: "New message.",
                icon: item.toastIcon,
              })
            }
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <CodeBlock
        testId="code-icons"
        code={`toast({
  message: 'New message',
  icon: <Mail size={16} />,
});`}
      />
    </DemoCard>
  );
}

function CustomToastShowcase() {
  const { toast } = useToast();

  const showCustom = () => {
    toast.custom(
      <div className="glass-panel min-w-[280px] rounded-xl px-4 py-3 text-[#FAFAFA] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="primary-gradient h-9 w-9 rounded-md text-black flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>

          <div>
            <div className="text-sm font-semibold">Release shipped</div>
            <div className="text-xs text-[#A3A3A3]">v2.2 is live now.</div>
          </div>
        </div>
      </div>,
      { duration: 5000 }
    );
  };

  return (
    <DemoCard
      className="col-span-12"
      testId="showcase-custom-toast"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] items-end">
        <div>
          <SectionTitle
            eyebrow="07 - Custom Toast"
            title="Render anything."
            desc="toast.custom() accepts any React node. Behavior (auto-dismiss, hover-pause, swipe) is preserved."
          />

          <button className={`${PRIMARY} w-full`} onClick={showCustom}>
            <Zap className="w-4 h-4" />
            Show custom toast
          </button>
        </div>

        <CodeBlock
          testId="code-custom-toast"
          code={`toast.custom(
  <ReleaseCard version="2.2" />,
  { duration: 5000 }
);`}
        />
      </div>
    </DemoCard>
  );
}

export default function ShowcaseGrid() {
  return (
    <section
      className="relative mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      data-testid="showcase-grid"
    >
      <div className="mb-20 text-center">
        <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tighter">
          Every feature.{" "}
          <span className="text-[#737373]">Live.</span>
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <VariantsShowcase />
        <PromiseShowcase />
        <UpdateShowcase />
        <DismissShowcase />
        <ActionShowcase />
        <IconsShowcase />
        <CustomToastShowcase />
      </div>
    </section>
  );
}
