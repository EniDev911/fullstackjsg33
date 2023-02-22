export const getBaseUrl = () => {
    const endPos = import.meta.url.lastIndexOf("src/");
    const baseURL = import.meta.url.substring(0, endPos);
    return baseURL
}