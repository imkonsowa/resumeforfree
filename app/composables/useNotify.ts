import type { ToastProps } from '@nuxt/ui';

interface NotifyOptions {
    description?: string;
    /** Milliseconds. `Infinity` (or 0) keeps the toast until dismissed. */
    duration?: number;
    action?: { label: string; onClick: () => void };
}

export interface Notifier {
    success: (title: string, options?: NotifyOptions) => void;
    error: (title: string, options?: NotifyOptions) => void;
    info: (title: string, options?: NotifyOptions) => void;
    warning: (title: string, options?: NotifyOptions) => void;
}

const ICONS = {
    success: 'i-lucide-circle-check',
    error: 'i-lucide-circle-x',
    info: 'i-lucide-info',
    warning: 'i-lucide-triangle-alert',
} as const;

/**
 * Thin adapter over Nuxt UI's `useToast`, keeping the
 * `notify.success(message)` shape the app already reads well with.
 *
 * Nuxt UI treats `duration: 0` as "never auto-dismiss", so `Infinity` is
 * translated rather than passed through — it would otherwise be dropped as an
 * invalid number.
 */
export function useNotify(): Notifier {
    const toast = useToast();

    const push = (color: ToastProps['color'], kind: keyof typeof ICONS) =>
        (title: string, options: NotifyOptions = {}) => {
            const { description, duration, action } = options;

            toast.add({
                title,
                description,
                color,
                icon: ICONS[kind],
                duration: duration === Infinity ? 0 : duration,
                actions: action
                    ? [{ label: action.label, onClick: action.onClick }]
                    : undefined,
            });
        };

    return {
        success: push('success', 'success'),
        error: push('error', 'error'),
        info: push('info', 'info'),
        warning: push('warning', 'warning'),
    };
}
