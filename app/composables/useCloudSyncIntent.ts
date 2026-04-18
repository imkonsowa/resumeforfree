const STORAGE_KEY = 'pendingCloudSyncIntent';

export const useCloudSyncIntent = () => {
    const markIntent = (): void => {
        if (import.meta.client) {
            try {
                localStorage.setItem(STORAGE_KEY, '1');
            }
            catch (error) {
                console.warn('Failed to persist cloud-sync intent:', error);
            }
        }
    };

    const consumeIntent = (): boolean => {
        if (!import.meta.client) return false;
        try {
            const flag = localStorage.getItem(STORAGE_KEY);
            if (flag) {
                localStorage.removeItem(STORAGE_KEY);
                return true;
            }
        }
        catch (error) {
            console.warn('Failed to read cloud-sync intent:', error);
        }
        return false;
    };

    const clearIntent = (): void => {
        if (!import.meta.client) return;
        try {
            localStorage.removeItem(STORAGE_KEY);
        }
        catch (error) {
            console.warn('Failed to clear cloud-sync intent:', error);
        }
    };

    return { markIntent, consumeIntent, clearIntent };
};
