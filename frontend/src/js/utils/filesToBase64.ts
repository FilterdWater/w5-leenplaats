export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // base64 with data URI
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function filesToBase64Array(files: File[]): Promise<string[]> {
  const promises = files.map((file) => fileToBase64(file));
  return Promise.all(promises);
}
