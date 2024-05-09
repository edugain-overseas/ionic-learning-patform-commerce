export const base64ToFile = (
  base64String: string,
  fileName: string,
  mimeType: string
): File => {
  // Convert the base64 string to a byte array
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob from the byte array
  const blob = new Blob([byteArray], { type: mimeType });

  // Create a File from the Blob
  return new File([blob], fileName, { type: mimeType });
};
