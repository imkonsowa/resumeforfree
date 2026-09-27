export const addAndFocusLastInput = async (event: Event, add: () => void) => {
    const container = (event.currentTarget as HTMLElement | null)?.closest('[data-focus-group]');
    add();
    await nextTick();
    const inputs = container?.querySelectorAll<HTMLInputElement>('input');
    inputs?.[inputs.length - 1]?.focus();
};
