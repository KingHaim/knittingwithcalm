import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, Image as ImageIcon, GripVertical } from 'lucide-react';

export default function FileUploadManager({
  onImagesChange,
  onMainImageChange,
  onPdfsChange,
  initialImages = [],
  initialMainImage = '',
  initialPdfs = [],
  selectedLanguages = []
}) {
  const [images, setImages] = useState(initialImages);
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [pdfs, setPdfs] = useState(initialPdfs); // Each item: { file, url, language }
  const [error, setError] = useState('');

  // IMAGE HANDLING
  const onDropImages = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    const updated = [...images, ...newImages];
    setImages(updated);
    onImagesChange(updated);
    // If no main image yet, set the first one as main
    if (!mainImage && updated.length > 0) {
      const first = updated[0].preview || updated[0];
      setMainImage(first);
      onMainImageChange(first);
    }
  }, [images, mainImage, onImagesChange, onMainImageChange]);

  const removeImage = (index) => {
    const fileToRemove = images[index];
    const isMain = (fileToRemove.preview || fileToRemove) === mainImage;
    const newImages = images.filter((_, i) => i !== index);

    setImages(newImages);
    onImagesChange(newImages);

    if (isMain && newImages.length > 0) {
      const nextMain = newImages[0].preview || newImages[0];
      setMainImage(nextMain);
      onMainImageChange(nextMain);
    } else if (isMain) {
      setMainImage('');
      onMainImageChange('');
    }
  };

  const setAsMain = (index) => {
    const newMain = images[index].preview || images[index];
    setMainImage(newMain);
    onMainImageChange(newMain);
  };

  // PDF HANDLING
  const onDropPdf = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      // Add as "Unassigned" or pick first missing language
      const missingLang = selectedLanguages.find(lang => !pdfs.find(p => p.language === lang)) || '';

      const newPdf = {
        file,
        preview: URL.createObjectURL(file),
        language: missingLang,
        name: file.name
      };

      const updated = [...pdfs, newPdf];
      setPdfs(updated);
      onPdfsChange(updated);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  }, [pdfs, selectedLanguages, onPdfsChange]);

  const updatePdfLanguage = (index, lang) => {
    const updated = [...pdfs];
    updated[index].language = lang;
    setPdfs(updated);
    onPdfsChange(updated);
  };

  const removePdf = (index) => {
    const updated = pdfs.filter((_, i) => i !== index);
    setPdfs(updated);
    onPdfsChange(updated);
  };

  const { getRootProps: getImageProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onDropImages,
    accept: { 'image/*': [] }
  });

  const { getRootProps: getPdfProps, getInputProps: getPdfInputProps } = useDropzone({
    onDrop: onDropPdf,
    accept: { 'application/pdf': [] },
    multiple: false
  });

  return (
    <div className="space-y-8">
      {/* PDF Upload Section */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Pattern PDF Files</label>

        <div
          {...getPdfProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors bg-gray-50/50"
        >
          <input {...getPdfInputProps()} />
          <div className="flex flex-col items-center">
            <Upload className="text-primary mb-2" size={24} />
            <p className="text-sm text-gray-600">Upload PDFs here (one per language)</p>
          </div>
        </div>

        {/* List of uploaded PDFs */}
        <div className="space-y-2">
          {pdfs.map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-lg">
              <FileText className="text-red-500" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name || 'Archivo PDF'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Language:</span>
                  <select
                    value={item.language}
                    onChange={(e) => updatePdfLanguage(index, e.target.value)}
                    className="text-xs border-none bg-gray-100 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select language...</option>
                    {selectedLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removePdf(index)}
                className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Warnings for missing PDFs */}
        {selectedLanguages.filter(lang => !pdfs.find(p => p.language === lang)).map(lang => (
          <div key={lang} className="text-[10px] text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
            Missing PDF for: <strong>{lang}</strong>
          </div>
        ))}
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Product Images</label>
        <div
          {...getImageProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors bg-gray-50/50"
        >
          <input {...getImageInputProps()} />
          <Upload className="text-primary mx-auto mb-2" size={24} />
          <p className="text-sm text-gray-600">Upload photos here</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((file, index) => {
            const url = file.preview || file;
            const isMain = url === mainImage;
            return (
              <div key={index} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${isMain ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'}`}>
                <img
                  src={url}
                  className="w-full h-full object-cover"
                  alt={`Preview ${index}`}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => setAsMain(index)}
                    className="w-full py-1.5 bg-white text-xs font-semibold text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    {isMain ? 'Selected Cover' : 'Set as Cover'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                {isMain && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                    COVER
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
