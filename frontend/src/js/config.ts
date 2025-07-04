export const API_BASE_URL = (() => {
  const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:80";
  if (window.location.protocol === 'https:' && apiUrl.startsWith('http:')) {
    return apiUrl.replace('http:', 'https:');
  }
  return apiUrl;
})();
