import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';

type ToastVariant = "default" | "destructive" | "success";
type ToastMode = "dark" | "light";
interface ToastTheme {
    background?: string;
    border?: string;
    textColor?: string;
    dotColors?: Partial<Record<ToastVariant, string>>;
    boxShadow?: string;
    defaultDuration?: number;
}
interface ToastOptions {
    message: string;
    variant?: ToastVariant;
    duration?: number;
}
interface ToastItem extends ToastOptions {
    id: string;
}
interface ToastContextValue {
    toast: (options: ToastOptions) => void;
    dismiss: (id: string) => void;
    theme: ToastTheme;
    mode: ToastMode;
}

declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
interface ToastRootProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
    variant?: ToastVariant;
    message: string;
    onDismiss?: () => void;
    theme?: ToastTheme;
    mode?: ToastMode;
}
declare const Toast: React.ForwardRefExoticComponent<ToastRootProps & React.RefAttributes<HTMLLIElement>>;

interface ToastProviderProps {
    children: React.ReactNode;
    theme?: ToastTheme;
    mode?: ToastMode;
}
declare function ToastProvider({ children, theme, mode }: ToastProviderProps): React.JSX.Element;

declare function useToast(): ToastContextValue;

export { Toast, type ToastContextValue, type ToastItem, type ToastMode, type ToastOptions, ToastProvider, type ToastTheme, type ToastVariant, ToastViewport, useToast };
