import type { InputHTMLAttributes } from 'react';

const UploadInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input hidden type="file" {...props} />;
};

export default UploadInput;
