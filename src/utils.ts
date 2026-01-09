export const pxToRem = (px: number, basefontSize: number = 16): string => {
    return `${px / basefontSize}rem`;
};

export const range = (length: number): number[] => {
    if (length <= 0) return [];
    return Array.from({ length }, (_, index) => index);
};

export const encodeCategorySlug = (value: string): string => {
    return encodeURIComponent(value.trim());
};

export const decodeCategorySlug = (value: string): string => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};
  
