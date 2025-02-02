import { useEffect } from "react";

const FilePreview = ({ files }) => {
  // Create a Blob URL if not already created
  const createFilePreview = (file) => {
    if (!file.data) {
      const previewUrl = URL.createObjectURL(file);
      file.data = previewUrl; // Ensure the previewUrl is set if not already done
    }
    return file.data;
  };

  useEffect(() => {
    return () => {
      if (files.data) {
        // Revoke the URL when the component unmounts
        URL.revokeObjectURL(files.data);
      }
    };
  }, [files]); // Ensure cleanup is performed when files change

  const renderPreview = (file) => {
    const filePreviewUrl = createFilePreview(file); // Get the file URL
    if (file.type.startsWith("image/")) {
      return <img src={filePreviewUrl} alt="Preview" className="w-full" />;
    } else if (file.type.startsWith("video/")) {
      return (
        <video
          controls
          src={filePreviewUrl}
          muted
          className="h-32 object-cover"
        />
      );
    }
    return <p>Unsupported file type</p>;
  };

  return <div className="file-preview">{renderPreview(files)}</div>;
};

export default FilePreview;
