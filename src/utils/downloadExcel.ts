export const downloadBase64File = (
  base64: string,
  fileName: string,
  fileType: string
) => {
  const linkSource = `data:application/${fileType};base64,${base64}`;
  const downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);
  downloadLink.href = linkSource;
  downloadLink.target = '_self';
  downloadLink.download = fileName;
  downloadLink.click();
};
