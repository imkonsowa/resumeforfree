import { Network } from '@capacitor/network';
import { ref, onMounted, onUnmounted } from 'vue';
import type { PluginListenerHandle } from '@capacitor/core';

export const useNetworkStatus = () => {
    const isOnline = ref(true);
    const connectionType = ref<string>('unknown');

    let listener: PluginListenerHandle | null = null;

    const checkStatus = async () => {
        const status = await Network.getStatus();
        isOnline.value = status.connected;
        connectionType.value = status.connectionType;
    };

    onMounted(async () => {
        await checkStatus();
        listener = await Network.addListener('networkStatusChange', (status) => {
            isOnline.value = status.connected;
            connectionType.value = status.connectionType;
        });
    });

    onUnmounted(() => {
        if (listener) {
            listener.remove();
        }
    });

    return {
        isOnline,
        connectionType,
        checkStatus,
    };
};
