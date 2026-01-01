import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, Image as ImageIcon, GripVertical } from 'lucide-react';

export default function FileUploadManager({ 
  onImagesChange, 
  onPdfChange, 
  initialImages = [], 
  initialPdf = null 
}) {
  const [images, setImages] = useState(initialImages);
  const [pdf, setPdf] = useState(initialPdf);
  const [error, setError] = useState('');

  const onDropImages = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
    onImagesChange([...images, ...newImages]);
  }, [images, onImagesChange]);

  const onDropPdf = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setPdf(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      onPdfChange(file);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  }, [onPdfChange]);

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const removePdf = () => {
    setPdf(null);
    onPdfChange(null);
  };

  const { getRootProps: getImageProps, getInputProps: getImageInputProps, isDragActive: imageActive } = useDropzone({
    onDrop: onDropImages,
    accept: { 'image/*': [] }
  });

  const { getRootProps: getPdfProps, getInputProps: getPdfInputProps, isDragActive: pdfActive } = useDropzone({
    onDrop: onDropPdf,
    accept: { 'application/pdf': [] },
    multiple: false
  });

  // Basic image reordering logic (placeholder for actual DnD reordering)
  const moveImage = (from, to) => {
    const newImages = [...images];
    const [moved] = newImages.splice(from, 1);
    newImages.splice(to, 0, moved);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      {/* PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pattern PDF (Required)</label>
        <div 
          {...getPdfProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            pdfActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getPdfInputProps()} />
          {pdf ? (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div className="flex items-center space-x-3">
                <FileText className="text-primary" />
                <span className="text-sm font-medium truncate max-w-[200px]">{pdf.name || 'Pattern.pdf'}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removePdf(); }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Drag & drop pattern PDF here, or click to select</p>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Batch Upload & Reorder)</label>
        <div 
          {...getImageProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            imageActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getImageInputProps()} />
          <div className="flex flex-col items-center">
            <Upload className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Drag & drop images here, or click to select</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((file, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={file.preview || file} 
                className="w-full h-full object-cover" 
                alt={`Preview ${index}`} 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  onClick={() => removeImage(index)}
                  className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </button>
                <div className="cursor-move p-1.5 bg-white rounded-full text-gray-600">
                  <GripVertical size={16} />
                </div>
              </div>
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
