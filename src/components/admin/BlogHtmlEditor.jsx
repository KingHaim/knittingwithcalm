import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  Type,
  Upload,
} from 'lucide-react';
import { blogService } from '../../services/blogService';
import BlogPostContent from '../blog/BlogPostContent';
import {
  buildImageHtml,
  getRangeFromPoint,
  insertHtmlAtCursor,
  insertHtmlAtTextareaCursor,
} from '../../utils/editorInsert';

function normalizeEditorImages(container) {
  if (!container) return;
  container.querySelectorAll('img').forEach((img) => {
    img.classList.add('blog-inline-image');
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.style.width = '100%';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.float = 'none';
    img.style.clear = 'both';
  });
}

const TABS = [
  { id: 'visual', label: 'Visual', icon: Type },
  { id: 'html', label: 'HTML', icon: Code },
  { id: 'preview', label: 'Preview', icon: Eye },
];

function ToolbarButton({ onClick, onMouseDown, active, title, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      title={title}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors disabled:opacity-40 ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}

export default function BlogHtmlEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [activeTab, setActiveTab] = useState('visual');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadNotice, setUploadNotice] = useState('');
  const [showMediaPanel, setShowMediaPanel] = useState(false);

  useEffect(() => {
    if (activeTab === 'visual' && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
      normalizeEditorImages(editorRef.current);
    }
  }, [activeTab, value]);

  const syncFromEditor = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const cacheSelection = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
  }, []);

  const cacheTextareaSelection = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    savedRangeRef.current = {
      kind: 'textarea',
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };
  }, []);

  const exec = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    syncFromEditor();
  };

  const handleLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  const insertImage = useCallback(async (file) => {
    if (!file?.type?.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadNotice('');

    try {
      const alt = window.prompt('Image description (optional, for accessibility):', '') || '';
      const url = await blogService.uploadImage(file);
      if (url.startsWith('data:')) {
        setUploadNotice(
          'Image added inline because storage is not set up yet. ' +
            'Add SUPABASE_SERVICE_ROLE_KEY to .env and run: npm run setup:storage'
        );
      }
      const html = buildImageHtml(url, alt);

      if (activeTab === 'visual') {
        insertHtmlAtCursor(html, editorRef.current, savedRangeRef.current);
        normalizeEditorImages(editorRef.current);
        syncFromEditor();
      } else if (activeTab === 'html') {
        const textarea = textareaRef.current;
        if (savedRangeRef.current?.kind === 'textarea' && textarea) {
          const { start, end } = savedRangeRef.current;
          const before = value.slice(0, start);
          const after = value.slice(end);
          const spacer = before && !before.endsWith('\n') ? '\n' : '';
          onChange(`${before}${spacer}${html}${after ? `\n${after}` : ''}`);
        } else {
          onChange(insertHtmlAtTextareaCursor(html, textarea) || `${value}\n${html}`);
        }
      }
    } catch (err) {
      setUploadError(err?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }, [activeTab, onChange, syncFromEditor, value]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) await insertImage(file);
  };

  const onEditorDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const range = getRangeFromPoint(e.clientX, e.clientY, editorRef.current);
    if (range) savedRangeRef.current = range;

    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith('image/'));
    if (file) await insertImage(file);
  }, [insertImage]);

  const onEditorPaste = useCallback(async (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find((item) => item.type.startsWith('image/'));
    if (!imageItem) return;

    e.preventDefault();
    const file = imageItem.getAsFile();
    if (file) await insertImage(file);
  }, [insertImage]);

  const onMediaDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) await insertImage(file);
  }, [insertImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onMediaDrop,
    accept: { 'image/*': [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
    onDropRejected: () => setUploadError('Image must be under 5 MB.'),
    noClick: uploading,
    noKeyboard: uploading,
  });

  const switchTab = (tab) => {
    if (activeTab === 'visual') syncFromEditor();
    setActiveTab(tab);
  };

  const openImagePicker = () => {
    if (activeTab === 'html') {
      cacheTextareaSelection();
    } else {
      cacheSelection();
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full min-w-0 space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            cacheSelection();
          }}
          onClick={() => setShowMediaPanel((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <ImageIcon size={16} />
          {showMediaPanel ? 'Hide media' : 'Add image to post'}
        </button>
      </div>

      {showMediaPanel && (
        <div
          {...getRootProps()}
          className={`rounded-xl border-2 border-dashed p-5 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-indigo-400 bg-indigo-50/60'
              : 'border-gray-300 bg-gray-50/50 hover:border-indigo-300'
          } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="text-indigo-500 mx-auto mb-2" size={24} />
          <p className="text-sm text-gray-700 font-medium">
            {uploading ? 'Uploading image…' : 'Drop an image here or click to upload'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Inserts into your post at the cursor · PNG, JPG, WebP up to 5 MB
          </p>
        </div>
      )}

      <div className="w-full border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-1 p-2 border-b border-gray-100">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => switchTab(id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-white text-indigo-700 shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
            {activeTab === 'visual' && (
              <>
                <ToolbarButton onClick={() => exec('bold')} title="Bold">
                  <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('italic')} title="Italic">
                  <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('underline')} title="Underline">
                  <Underline size={16} />
                </ToolbarButton>
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <ToolbarButton onClick={() => exec('formatBlock', 'h2')} title="Heading 2">
                  <Heading2 size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('formatBlock', 'h3')} title="Heading 3">
                  <Heading3 size={16} />
                </ToolbarButton>
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet list">
                  <List size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered list">
                  <ListOrdered size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => exec('formatBlock', 'blockquote')} title="Quote">
                  <Quote size={16} />
                </ToolbarButton>
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <ToolbarButton onClick={handleLink} title="Insert link">
                  <LinkIcon size={16} />
                </ToolbarButton>
              </>
            )}

            <ToolbarButton
              onMouseDown={(e) => {
                e.preventDefault();
                if (activeTab === 'html') cacheTextareaSelection();
                else cacheSelection();
              }}
              onClick={openImagePicker}
              title="Insert image into post"
              disabled={uploading}
            >
              <ImageIcon size={16} />
            </ToolbarButton>
          </div>
        </div>

        {activeTab === 'visual' && (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncFromEditor}
            onBlur={syncFromEditor}
            onMouseUp={cacheSelection}
            onKeyUp={cacheSelection}
            onDrop={onEditorDrop}
            onDragOver={(e) => e.preventDefault()}
            onPaste={onEditorPaste}
            className="blog-editor-area w-full min-h-[480px] max-h-[70vh] overflow-x-hidden overflow-y-auto p-6 focus:outline-none"
            data-placeholder="Write your post here… Drag, paste, or use Add image to insert photos."
          />
        )}

        {activeTab === 'html' && (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={cacheTextareaSelection}
            onClick={cacheTextareaSelection}
            onKeyUp={cacheTextareaSelection}
            rows={16}
            className="w-full p-6 font-mono text-sm text-gray-800 focus:outline-none resize-y min-h-[480px]"
            placeholder="<p>Your HTML content here…</p>"
            spellCheck={false}
          />
        )}

        {activeTab === 'preview' && (
          <div className="p-6 min-h-[480px] bg-white w-full">
            {value ? (
              <BlogPostContent html={value} />
            ) : (
              <p className="text-gray-400 text-sm">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {uploadNotice && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          {uploadNotice}
        </p>
      )}
      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      <p className="text-xs text-gray-400">
        Click where you want the image in the post, then upload. Drag-and-drop onto the editor inserts at the drop position.
      </p>
    </div>
  );
}
