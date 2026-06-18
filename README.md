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

- Dark & light mode out of the box
- Responsive — automatically adapts to mobile (≤768px) like Android native toasts
- Smooth enter/exit animations per position
- Fully customizable colors, background, border, shadow, and duration
- Lightweight — no extra dependencies beyond Radix UI
- Works with React 17+ and Next.js (App & Pages router)
- TypeScript first

---

## Installation

```bash
npm i @iryanraushan/notchify
```

> Peer dependencies — make sure these are installed in your project:
> ```bash
> npm install react react-dom
> ```

---

## Preview


**Variants**

| Variant | Dot Color 
|---|---|
| `default` | Blue `#3b82f6` 
| `success` | Green `#22c55e` 
| `destructive` | Red `#ef4444`

---

## Quick Start

**1. Wrap your app with `ToastProvider`**

```tsx
// App.tsx or layout.tsx (Next.js)
import { ToastProvider } from 'notchify';

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
import { useToast } from 'notchify';

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

## Usage

### Variants

```tsx
const { toast } = useToast();

// default (blue dot)
toast({ message: 'Profile updated.' });

// success (green dot)
toast({ message: 'Payment successful!', variant: 'success' });

// destructive (red dot)
toast({ message: 'Failed to delete file.', variant: 'destructive' });
```

### Custom Duration (per toast)

```tsx
// show for 6 seconds
toast({ message: 'This will stay longer.', duration: 6000 });
```

---

## Dark & Light Mode

Pass `mode` to `ToastProvider`. Defaults to `dark`.

```tsx
<ToastProvider mode="light">
  {children}
</ToastProvider>

<ToastProvider mode="dark">
  {children}
</ToastProvider>
```

---

## Positioning

Set the `position` prop on `ToastProvider` to control where toasts appear. All toasts use the same position.

```tsx
<ToastProvider position="top-right">
  {children}
</ToastProvider>
```

**Supported positions:**

| Value | Description |
|---|---|
| `top-left` | Top-left corner |
| `top-center` | Top center |
| `top-right` | Top-right corner |
| `bottom-left` | Bottom-left corner |
| `bottom-center` | Bottom center |
| `bottom-right` | Bottom-right corner |

### Default behavior

| Screen | Default position |
|---|---|
| Desktop (>768px) | `bottom-right` |
| Mobile (≤768px) | `bottom-center` |

### Responsive behavior (mobile ≤768px)

On small screens, the `position` prop is automatically simplified for a native-app feel:

- Any `top-*` position → `top-center` (offset from top edge)
- Any `bottom-*` position → `bottom-center` (offset from bottom edge)

Toasts are horizontally centered and never pinned to the absolute edge.

---

## Custom Theme

Override any visual token globally via the `theme` prop on `ToastProvider`.  
Any value you skip falls back to the default for the current mode.

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
    },
  }}
>
  {children}
</ToastProvider>
```

---

## API Reference

### `<ToastProvider />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"dark" \| "light"` | `"dark"` | Color mode |
| `position` | `ToastPosition` | `"bottom-right"` | Toast position (desktop). See responsive behavior for mobile. |
| `theme` | `ToastTheme` | `{}` | Theme overrides |
| `children` | `ReactNode` | — | Your app |

**`ToastPosition`** — `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`

### `ToastTheme`

| Key | Type | Description |
|---|---|---|
| `background` | `string` | Toast background color |
| `border` | `string` | Toast border color |
| `textColor` | `string` | Message text color |
| `boxShadow` | `string` | Toast shadow |
| `defaultDuration` | `number` | Default duration in ms (fallback: `3000`) |
| `dotColors` | `{ default?, success?, destructive? }` | Dot colors per variant |

### `useToast()`

Returns:

| Key | Type | Description |
|---|---|---|
| `toast(options)` | `function` | Trigger a toast |
| `dismiss(id)` | `function` | Programmatically dismiss a toast by id |

### `toast(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | The notification text **(required)** |
| `variant` | `"default" \| "success" \| "destructive"` | `"default"` | Visual style |
| `duration` | `number` | `3000` | Time in ms before auto-dismiss |

---

## Next.js App Router

If you're using the App Router, mark your layout as a client component or extract the provider:

```tsx
// components/providers.tsx
'use client';
import { ToastProvider } from 'notchify';

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

## License

MIT © [Raushan Kumar](https://github.com/iryanraushan)