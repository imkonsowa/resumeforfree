export function useArrayCRUD<T>(
    storeGetter: () => T[],
    storeSetter: (items: T[]) => void,
    defaultItem: () => T,
) {
    return {
        add() {
            const items = [...storeGetter()];
            items.push(defaultItem());
            storeSetter(items);
        },

        update(index: number, field: keyof T, value: unknown) {
            const items = [...storeGetter()];
            if (items[index]) {
                items[index] = {
                    ...items[index],
                    [field]: value,
                };
                storeSetter(items);
            }
        },

        remove(index: number) {
            const items = [...storeGetter()];
            items.splice(index, 1);
            storeSetter(items);
        },

        move(fromIndex: number, toIndex: number) {
            const items = [...storeGetter()];
            const [item] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, item);
            storeSetter(items);
        },
    };
}

export function useNestedAchievementsCRUD<T extends { achievements: Array<{ text: string }> }>(
    storeGetter: () => T[],
    storeSetter: (items: T[]) => void,
) {
    return {
        addAchievement(itemIndex: number, text = '') {
            const items = [...storeGetter()];
            if (items[itemIndex]) {
                items[itemIndex] = {
                    ...items[itemIndex],
                    achievements: [...items[itemIndex].achievements, { text }],
                };
                storeSetter(items);
            }
        },

        updateAchievement(itemIndex: number, achievementIndex: number, text: string) {
            const items = [...storeGetter()];
            if (items[itemIndex]?.achievements[achievementIndex]) {
                const achievements = [...items[itemIndex].achievements];
                achievements[achievementIndex] = { text };
                items[itemIndex] = {
                    ...items[itemIndex],
                    achievements,
                };
                storeSetter(items);
            }
        },

        removeAchievement(itemIndex: number, achievementIndex: number) {
            const items = [...storeGetter()];
            if (items[itemIndex]) {
                const achievements = [...items[itemIndex].achievements];
                achievements.splice(achievementIndex, 1);
                items[itemIndex] = {
                    ...items[itemIndex],
                    achievements,
                };
                storeSetter(items);
            }
        },

        moveAchievement(itemIndex: number, fromIndex: number, toIndex: number) {
            const items = [...storeGetter()];
            if (items[itemIndex]) {
                const achievements = [...items[itemIndex].achievements];
                const [item] = achievements.splice(fromIndex, 1);
                achievements.splice(toIndex, 0, item);
                items[itemIndex] = {
                    ...items[itemIndex],
                    achievements,
                };
                storeSetter(items);
            }
        },
    };
}
