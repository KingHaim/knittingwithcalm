import { supabase } from '../config/supabase';

function parseSupabaseStorageUrl(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!match) return null;
    return { bucket: match[1], path: decodeURIComponent(match[2]) };
  } catch {
    return null;
  }
}

export async function loadImageBlob(source, file = null) {
  if (file instanceof File || file instanceof Blob) {
    return file;
  }

  if (source instanceof File || source instanceof Blob) {
    return source;
  }

  if (typeof source !== 'string' || !source) {
    throw new Error('No image source provided.');
  }

  if (source.startsWith('data:') || source.startsWith('blob:')) {
    const response = await fetch(source);
    if (!response.ok) throw new Error('Could not load image.');
    return response.blob();
  }

  const storage = parseSupabaseStorageUrl(source);
  if (storage) {
    const { data, error } = await supabase.storage
      .from(storage.bucket)
      .download(storage.path);

    if (error) throw new Error('Could not load image from storage.');
    return data;
  }

  const response = await fetch(source, { mode: 'cors' });
  if (!response.ok) throw new Error('Could not load image.');
  return response.blob();
}

export async function getCroppedImg(source, pixelCrop, file = null, mimeType = 'image/jpeg') {
  const blob = await loadImageBlob(source, file);
  const bitmap = await createImageBitmap(blob);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = Math.round(pixelCrop.width);
  canvas.height = Math.round(pixelCrop.height);

  ctx.drawImage(
    bitmap,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) reject(new Error('Failed to generate cropped image.'));
      else resolve(result);
    }, mimeType, 0.92);
  });
}
