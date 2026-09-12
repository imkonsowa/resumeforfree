import type { ToastProps } from '@nuxt/ui';

interface NotifyOptions {
    description?: string;
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
