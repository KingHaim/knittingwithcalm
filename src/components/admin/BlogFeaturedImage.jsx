import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Crop, Image as ImageIcon, Upload, X } from 'lucide-react';
import BlogImageCropper from './BlogImageCropper';

export default function BlogFeaturedImage({ value, previewUrl, onChange, onClear }) {
  const [error, setError] = useState('');
  const [cropSource, setCropSource] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [originalSource, setOriginalSource] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  useEffect(() => {
    return () => {
      if (originalSource?.startsWith('blob:')) {
        URL.revokeObjectURL(originalSource);
      }
    };
  }, [originalSource]);

  const openCropper = useCallback((source, file = null, keepOriginal = true) => {
    setCropSource(source);
    setCropFile(file);
    if (keepOriginal) {
      setOriginalSource((prev) => {
        if (prev?.startsWith('blob:') && prev !== source) {
          URL.revokeObjectURL(prev);
        }
        return source;
      });
      setOriginalFile(file);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError('');
    const source = URL.createObjectURL(file);
    openCropper(source, file);
  }, [openCropper]);

  const handleCropComplete = ({ file, preview }) => {
    onChange({ file, preview });
    setCropSource(null);
    setCropFile(null);
  };

  const handleCropClose = () => {
    setCropSource(null);
    setCropFile(null);
    if (originalSource?.startsWith('blob:') && !previewUrl && !value) {
      URL.revokeObjectURL(originalSource);
      setOriginalSource(null);
      setOriginalFile(null);
    }
  };

  const handleAdjustCrop = () => {
    const source = originalSource || previewUrl || value;
    const file = originalFile || null;
    if (source) openCropper(source, file, !originalSource);
  };

  const handleClear = () => {
    if (originalSource?.startsWith('blob:')) {
      URL.revokeObjectURL(originalSource);
    }
    setOriginalSource(null);
    setOriginalFile(null);
    onClear();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () => setError('Please upload an image under 5 MB.'),
    noClick: Boolean(cropSource),
    noKeyboard: Boolean(cropSource),
  });

  const displayUrl = previewUrl || value;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Featured image</label>

      {displayUrl ? (
        <div className="space-y-3">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <img src={displayUrl} alt="Featured preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-3 right-3 p-2 bg-white/90 text-gray-700 rounded-full shadow hover:bg-white hover:text-red-600 transition-colors"
              title="Remove image"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAdjustCrop}
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Crop size={16} />
              Adjust crop
            </button>
            <div
              {...getRootProps()}
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              <input {...getInputProps()} />
              <ImageIcon size={16} />
              Replace image
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-indigo-400 bg-indigo-50/50'
              : 'border-gray-300 hover:border-indigo-400 bg-gray-50/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="text-indigo-500 mx-auto mb-2" size={28} />
          <p className="text-sm text-gray-600">
            Drag & drop a featured image, or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5 MB · 16:9 crop</p>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {cropSource && (
        <BlogImageCropper
          imageSrc={cropSource}
          imageFile={cropFile}
          onClose={handleCropClose}
          onComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
