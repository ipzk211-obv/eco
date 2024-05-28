export const truncateText = (str: string) => {
    if (str.length <= 23) return str;
    return str.substring(0, 23) + '...';
}
