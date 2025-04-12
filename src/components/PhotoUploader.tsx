import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; // Icon for removing image

interface PhotoUploaderProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

interface FilePreview extends FileWithPath {
  preview: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onFilesChange, maxFiles = 5 }) => {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      // TODO: Add user feedback (toast?) that max files limit reached
      console.warn(`Cannot add more than ${maxFiles} files.`);
      return;
    }

    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, [files, maxFiles]);

  useEffect(() => {
    // Report file changes to parent
    onFilesChange(files);

    // Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]); // onFilesChange excluded intentionally to avoid re-triggering on parent state change

  const removeFile = (fileToRemove: FilePreview) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': []
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit per file
    maxFiles: maxFiles,
  });

  const thumbs = files.map(file => (
    <div key={file.path} className="relative inline-flex border border-muted rounded-md p-1 m-1 w-24 h-24">
      <img
        src={file.preview}
        alt={file.path}
        className="block w-full h-full object-cover"
        onLoad={() => { URL.revokeObjectURL(file.preview) }} // Revoke object URL after image load
      />
      <Button 
        variant="destructive" 
        size="icon" 
        className="absolute top-0 right-0 h-5 w-5 rounded-full p-0 m-[-4px] bg-red-500 hover:bg-red-700"
        onClick={(e) => { e.stopPropagation(); removeFile(file); }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  ));

  return (
    <section className="container border-2 border-dashed border-muted rounded-md p-4 text-center">
      <div {...getRootProps({ className: `dropzone ${isDragActive ? 'border-primary' : ''}` })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>Drag 'n' drop some images here, or click to select files (Max {maxFiles}, 5MB each)</p>
        }
      </div>
      <aside className="flex flex-wrap mt-4">
        {thumbs}
      </aside>
    </section>
  );
};

export default PhotoUploader; 