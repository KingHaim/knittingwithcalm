import React, { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn } from 'lucide-react';
import { getCroppedImg, loadImageBlob } from '../../utils/cropImage';

const ASPECT = 16 / 9;

export default function BlogImageCropper({ imageSrc, imageFile, onClose, onComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const [loadedBlob, setLoadedBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let objectUrl = null;
    let cancelled = false;

    async function prepareImage() {
      setIsLoading(true);
      setError('');
      try {
        const blob = await loadImageBlob(imageSrc, imageFile);
        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        setLoadedBlob(blob);
        setResolvedSrc(objectUrl);
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              'Could not load the image. Try replacing it and cropping again.'
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    prepareImage();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageSrc, imageFile]);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels || !loadedBlob) return;

    setIsSaving(true);
    setError('');
    try {
      const blob = await getCroppedImg(null, croppedAreaPixels, loadedBlob);
      const file = new File([blob], `blog-featured-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      });
      const preview = URL.createObjectURL(file);
      onComplete({ file, preview });
    } catch (err) {
      setError(err?.message || 'Could not crop image. Try uploading again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Adjust featured image</h2>
            <p className="text-sm text-gray-500">Drag to reposition · Pinch or slide to zoom</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative h-[360px] bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
              Loading image…
            </div>
          )}

          {!isLoading && resolvedSrc && (
            <Cropper
              image={resolvedSrc}
              crop={crop}
              zoom={zoom}
              aspect={ASPECT}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="horizontal-cover"
            />
          )}

          {!isLoading && !resolvedSrc && (
            <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm px-6 text-center">
              Image could not be loaded.
            </div>
          )}
        </div>

        <div className="px-5 py-4 space-y-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <ZoomIn size={18} className="text-gray-400 shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              disabled={isLoading || !resolvedSrc}
              className="w-full accent-indigo-600 disabled:opacity-40"
            />
            <span className="text-sm text-gray-500 w-10 text-right">{zoom.toFixed(1)}×</span>
          </div>

          <p className="text-xs text-gray-400">
            Crop is locked to 16:9 — the same ratio used on the blog listing and post header.
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={isSaving || isLoading || !croppedAreaPixels || !loadedBlob}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSaving ? 'Applying…' : 'Apply crop'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
