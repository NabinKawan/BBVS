import { toast } from 'react-toastify';

export function copyToClipboard(text: string, message = '') {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  message = message ? message : `${text} copied successfully`;
  toast.success(message, { autoClose: 2000 });
}
export function generateDownloadLink(val: any) {
  const data = new Blob([JSON.stringify(val)], {
    type: 'text/plain',
  });
  return URL.createObjectURL(data);
}
