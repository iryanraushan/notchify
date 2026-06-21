# notchify

A classic, toast notification library for React and Next.js.  
Dark & light mode ready. Fully themeable. Zero config to get started.

<table>
  <tr>
    <th>Dark Mode</th>
    <th>Light Mode</th>
  </tr>
  <tr>
    <td>
      <img width="963" height="569" alt="dark_mode_preview" src="https://github.com/user-attachments/assets/d6626738-2828-4a40-874c-7ae86b61fee1"/>
    </td>
    <td>
       <img width="943" height="529" alt="light_mode_preview" src="https://github.com/user-attachments/assets/e8477cd6-a800-4f79-9b5f-ad270985a6d9" />    
    </td>
  </tr>
</table>

## Features

- 4 variants — `default`, `success`, `destructive`, `loading`
- `toast.promise()` — auto loading → success/error lifecycle
- `toast.custom()` — render any React node as a toast
- `toast.update()` — mutate an existing toast in place
- `toast.dismiss()` — programmatically remove a toast
- Pause on hover — timer pauses when mouse is over the toast
- Swipe to dismiss — horizontal swipe on touch devices
- Action button — inline CTA with async support
- Custom icon — replace the dot/spinner with any React node
- `maxToasts` — cap the number of visible toasts
- `toastClassName` / `containerClassName` — BYO CSS classes
- `className` per toast — fine-grained styling
- Dark & light mode out of the box
- Responsive — auto centers on mobile (≤768px)
- Smooth per-position enter + fade-out exit animations
- Respects `prefers-reduced-motion`
- Fully customizable colors, background, border, shadow, and duration
- Lightweight — no extra dependencies beyond React
- Works with React 17+ and Next.js (App & Pages Router)
- TypeScript first — all types exported

---

## Installation

```bash
npm i @iryanraushan/notchify
```

> Peer dependencies:
> ```bash
> npm install react react-dom
> ```

---

## Quick Start

**1. Wrap your app with `ToastProvider`**

```tsx
// App.tsx or layout.tsx (Next.js)
import { ToastProvider } from '@iryanraushan/notchify';

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
```

**2. Trigger toasts from anywhere**

```tsx
import { useToast } from '@iryanraushan/notchify';

export default function MyComponent() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast({ message: 'Saved!', variant: 'success' })}>
      Save
    </button>
  );
}
```

---

## Variants

| Variant | Dot Color | Usage |
|---|---|---|
| `default` | Blue `#3b82f6` | General info |
| `success` | Green `#22c55e` | Operation succeeded |
| `destructive` | Red `#ef4444` | Error / failure |
| `loading` | Purple `#a855f7` | In-progress, persists until updated |

```tsx
const { toast } = useToast();

toast({ message: 'Profile updated.' });
toast({ message: 'Payment successful!', variant: 'success' });
toast({ message: 'Failed to delete file.', variant: 'destructive' });
toast.loading('Uploading…');
```

Shorthand methods:

```tsx
toast.success('Done!');
toast.error('Something went wrong.');
const id = toast.loading('Please wait…');
```

---

## Promise Toast

Automatically shows a loading toast, then transitions to success or error.

`toast.promise` accepts either a `Promise` directly or a **factory function** `() => Promise<T>`.

```tsx
await toast.promise(fetch('/api/save'), {
  loading: 'Saving…',
  success: 'Saved!',
  error: 'Failed to save.',
});

// factory function form
await toast.promise(() => fetchUser(), {
  loading: 'Loading user…',
  success: 'Loaded!',
  error: 'Failed.',
});

// Dynamic messages based on result / error
await toast.promise(fetchUser(), {
  loading: 'Loading user…',
  success: (user) => `Welcome, ${user.name}!`,
  error: (err) => `Error: ${err.message}`,
  duration: 4000, // duration for the success/error state
});
```

---

## Update a Toast

Mutate any field of an existing toast by its `id`.

```tsx
const id = toast.loading('Uploading…');

// later…
toast.update(id, { variant: 'success', message: 'Upload complete!' });
```

---

## Dismiss a Toast

```tsx
const { toast, dismiss } = useToast();

// via the API object
const id = toast.loading('Working…');
toast.dismiss(id);

// via the context shorthand
dismiss(id);
```

---

## Custom Duration

```tsx
// per toast (ms)
toast({ message: 'Stays 6 s.', duration: 6000 });

// globally via theme
<ToastProvider theme={{ defaultDuration: 5000 }}>
```

---

## Action Button

An inline CTA rendered inside the toast. `onClick` can be async — the button shows a loading state while the promise resolves.

```tsx
toast({
  message: 'File deleted.',
  action: {
    label: 'Undo',
    onClick: async () => {
      await restoreFile();
    },
  },
});
```

---

## Custom Icon

Replace the colored dot with any React node.

```tsx
toast({
  message: 'New message.',
  icon: <MailIcon size={16} />,
});
```

---

## Custom Toast

Render a fully custom React component. All standard toast behaviour (auto-dismiss, hover-pause, swipe) still applies.

```tsx
toast.custom(
  <div style={{ padding: 12, background: '#1e1e2e', borderRadius: 12, color: '#fff' }}>
    <strong>Custom UI</strong>
    <p>Anything goes here.</p>
  </div>
);

// with extra options
toast.custom(<MyCard />, { duration: 5000, id: 'my-card' });
```

---

## Pause on Hover

The auto-dismiss timer automatically pauses when the mouse is over a toast and resumes when it leaves. No configuration needed.

---

## Swipe to Dismiss

On touch devices, swiping a toast horizontally by more than 80 px dismisses it. Built-in, no configuration needed.

---

## Dark & Light Mode

```tsx
<ToastProvider mode="dark">  {/* default */}
<ToastProvider mode="light">
```

Default values per mode:

| Token | Dark | Light |
|---|---|---|
| `background` | `#0c0b0b` | `#ffffff` |
| `border` | `#1a1a1a` | `#e5e5e5` |
| `textColor` | `#f5f5f5` | `#111111` |
| `boxShadow` | subtle dark shadow | subtle light shadow |

---

## Positioning

```tsx
<ToastProvider position="top-right">
```

| Value | Description |
|---|---|
| `top-left` | Top-left corner |
| `top-center` | Top center |
| `top-right` | Top-right corner |
| `bottom-left` | Bottom-left corner |
| `bottom-center` | Bottom center |
| `bottom-right` *(default)* | Bottom-right corner |

### Responsive behavior (mobile ≤ 768px)

Any `top-*` position → `top-center`, any `bottom-*` → `bottom-center`. Toasts are horizontally centered and never pinned to the edge.

---

## Limit Visible Toasts

Cap how many toasts are shown at once. Oldest toasts are dropped when the limit is exceeded.

```tsx
<ToastProvider maxToasts={3}>
```

---

## Custom Theme

Override any visual token. Unset values fall back to the mode defaults.

```tsx
<ToastProvider
  mode="dark"
  theme={{
    background: '#1a1a2e',
    border: '#2a2a4a',
    textColor: '#e0e0ff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    defaultDuration: 5000,
    dotColors: {
      default: '#6366f1',
      success: '#00ff88',
      destructive: '#ff4466',
      loading: '#facc15',
    },
  }}
>
```

---

## Custom CSS Classes

Apply Tailwind (or any CSS) classes globally or per toast.

```tsx
// global — applied to every toast
<ToastProvider toastClassName="my-toast" containerClassName="my-container">

// per toast
toast({ message: 'Hi', className: 'border-blue-500' });
```

---

## Animations

Toasts animate in based on their position and fade + scale out on dismiss.

| Position | Enter animation |
|---|---|
| `top-left` / `bottom-left` | Slide in from left |
| `top-right` / `bottom-right` | Slide in from right |
| `top-center` | Slide in from top |
| `bottom-center` | Slide in from bottom |
| Exit (all) | Fade out + scale down |

Animations are automatically disabled when `prefers-reduced-motion: reduce` is set.

---

## Accessibility

- Toast container has `role="region"` and `aria-label="Notifications"`
- Each toast has `role="status"` and `aria-live="polite"` / `aria-atomic="true"`
- The dot/dismiss button has `aria-label="Dismiss"`
- Action button carries `aria-label` from the label text

---

## Next.js App Router

```tsx
// components/providers.tsx
'use client';
import { ToastProvider } from '@iryanraushan/notchify';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider mode="dark" position="bottom-right">{children}</ToastProvider>;
}
```

```tsx
// app/layout.tsx
import { Providers } from '@/components/providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Standalone Components

`Toast` and `ToastViewport` are exported as low-level components for advanced / headless use cases where you want to render toasts outside of `ToastProvider`.

```tsx
import { Toast, ToastViewport } from '@iryanraushan/notchify';
```

| Component | Description |
|---|---|
| `Toast` | Single toast item — accepts all `ToastProps` including `theme`, `mode`, `style` |
| `ToastViewport` | The fixed positioned container that wraps toasts |

Both components read from `ToastContext` when available, and fall back to their own props otherwise.

---

## API Reference

### `<ToastProvider />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"dark" \| "light"` | `"dark"` | Color mode |
| `position` | `ToastPosition` | `"bottom-right"` | Toast position on desktop |
| `theme` | `ToastTheme` | `{}` | Visual overrides |
| `maxToasts` | `number` | — | Max toasts visible at once |
| `toastClassName` | `string` | — | Class applied to every toast |
| `containerClassName` | `string` | — | Class applied to the viewport container |
| `children` | `ReactNode` | — | Your app |

---

### `ToastTheme`

| Key | Type | Description |
|---|---|---|
| `background` | `string` | Toast background color |
| `border` | `string` | Toast border color |
| `textColor` | `string` | Message text color |
| `boxShadow` | `string` | Toast shadow |
| `defaultDuration` | `number` | Default auto-dismiss duration in ms |
| `dotColors` | `{ default?, success?, destructive?, loading? }` | Dot color per variant |

---

### `useToast()`

```tsx
const { toast, dismiss, theme, mode, position } = useToast();
```

| Key | Type | Description |
|---|---|---|
| `toast` | `ToastAPI` | Full toast API (see below) |
| `dismiss(id)` | `function` | Remove a toast by id |
| `theme` | `ToastTheme` | Resolved theme object |
| `mode` | `ToastMode` | Current mode |
| `position` | `ToastPosition` | Current position |

---

### `ToastAPI`

| Method | Signature | Description |
|---|---|---|
| `toast(options)` | `(options) => string` | Show a toast, returns `id` |
> **Note:** `toast.promise` accepts `Promise<T>` **or** `() => Promise<T>` as its first argument.
| `toast.success(msg, opts?)` | `(string, opts?) => string` | Success variant shorthand |
| `toast.error(msg, opts?)` | `(string, opts?) => string` | Destructive variant shorthand |
| `toast.loading(msg, opts?)` | `(string, opts?) => string` | Loading variant, persists |
| `toast.custom(node, opts?)` | `(ReactNode, opts?) => string` | Fully custom UI |
| `toast.promise(p, msgs)` | `(Promise, msgs) => Promise` | Loading → success/error lifecycle |
| `toast.update(id, opts)` | `(string, Partial<ToastItem>) => void` | Mutate an existing toast |
| `toast.dismiss(id)` | `(string) => void` | Remove a toast by id |

---

### `toast(options)` — `ToastOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | Notification text **(required for standard toasts)** |
| `variant` | `"default" \| "success" \| "destructive" \| "loading"` | `"default"` | Visual style |
| `type` | `ToastVariant` | — | **Deprecated** — use `variant` instead |
| `duration` | `number` | `3000` | Auto-dismiss time in ms |
| `id` | `string` | auto | Custom id (useful for `update`) |
| `icon` | `ReactNode` | — | Custom icon replaces the dot |
| `action` | `ToastAction` | — | Inline action button |
| `className` | `string` | — | Extra CSS class for this toast |
| `custom` | `ReactNode` | — | Fully custom component |

---

### `ToastAction`

| Key | Type | Description |
|---|---|---|
| `label` | `ReactNode` | Button label |
| `onClick` | `() => void \| Promise<void>` | Click handler (async supported) |

---

### `toast.promise` messages — `ToastPromiseMessages<T>`

| Key | Type | Description |
|---|---|---|
| `loading` | `string` | Message shown while pending |
| `success` | `string \| (data: T) => string` | Message (or factory) on resolve |
| `error` | `string \| (err: unknown) => string` | Message (or factory) on reject |
| `duration` | `number` | Duration for the resolved/rejected state |

---

### Exported Types

```ts
import type {
  ToastOptions,
  ToastItem,
  ToastVariant,
  ToastMode,
  ToastPosition,
  ToastTheme,
  ToastAction,
  ToastAPI,
  ToastPromiseMessages,
  ToastContextValue,
  ToastProviderProps,
} from '@iryanraushan/notchify';
```

---

## License

MIT © [Raushan Kumar](https://github.com/iryanraushan)
