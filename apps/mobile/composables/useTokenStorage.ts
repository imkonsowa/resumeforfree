import { Preferences } from '@capacitor/preferences';

export const useTokenStorage = () => {
    const getToken = async (): Promise<string | null> => {
        const { value } = await Preferences.get({ key: 'auth_token' });
        return value;
    };

    const setToken = async (token: string): Promise<void> => {
        await Preferences.set({ key: 'auth_token', value: token });
    };

    const removeToken = async (): Promise<void> => {
        await Preferences.remove({ key: 'auth_token' });
    };

    const getUserEmail = async (): Promise<string | null> => {
        const { value } = await Preferences.get({ key: 'user_email' });
        return value;
    };

    const setUserEmail = async (email: string): Promise<void> => {
        await Preferences.set({ key: 'user_email', value: email });
    };

    const removeUserEmail = async (): Promise<void> => {
        await Preferences.remove({ key: 'user_email' });
    };

    const clearAll = async (): Promise<void> => {
        await Preferences.clear();
    };

    return {
        getToken,
        setToken,
        removeToken,
        getUserEmail,
        setUserEmail,
        removeUserEmail,
        clearAll,
    };
};
