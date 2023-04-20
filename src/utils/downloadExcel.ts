import { AxiosResponseHeaders } from 'axios';
import { parse, URIComponents } from 'uri-js';

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

export const createDownloadLink = (url: string, fileName: string) => {
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

function getFilenameFromContentDisposition(
  contentDisposition: string
): string | null {
  const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
    contentDisposition
  );
  if (matches != null && matches[1]) {
    const filename = matches[1].replace(/['"]/g, '');
    const parsedUri: URIComponents | undefined = parse(
      `http://example.com/${filename}`
    );
    const decodedFilename = parsedUri?.path?.replace(/^.*\//, '');
    return decodedFilename ?? null;
  }
  return null;
}

export const downloadFileFromBlob = (
  data: Blob,
  headers: AxiosResponseHeaders
) => {
  const disposition = headers['content-disposition'];
  const type = headers['content-type'];
  // const matches = RegExps.disposition.exec(disposition);
  const fileName = getFilenameFromContentDisposition(disposition);
  if (!fileName) {
    return;
  }
  console.log('pass');
  const fileNameFormatted = fileName.replace(/['"]/g, '').trim();

  const blob = new Blob([data], { type });

  const url = window.URL.createObjectURL(blob);

  createDownloadLink(url, fileNameFormatted);
};
