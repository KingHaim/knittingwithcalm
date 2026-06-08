export function buildImageHtml(url, alt = '') {
  const safeAlt = alt.replace(/"/g, '&quot;');
  return `<figure class="blog-figure"><img src="${url}" alt="${safeAlt}" class="blog-inline-image" />${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`;
}

export function isRangeInsideEditor(range, editorEl) {
  if (!range || !editorEl) return false;
  return editorEl.contains(range.commonAncestorContainer);
}

export function getRangeFromPoint(x, y, editorEl) {
  let range = null;

  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(x, y);
  } else if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(x, y);
    if (position) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      range.collapse(true);
    }
  }

  return isRangeInsideEditor(range, editorEl) ? range : null;
}

export function insertHtmlAtCursor(html, editorEl, savedRange = null) {
  if (!editorEl) return false;

  editorEl.focus();
  const selection = window.getSelection();
  if (!selection) return false;

  let range = null;

  if (savedRange && isRangeInsideEditor(savedRange, editorEl)) {
    range = savedRange.cloneRange();
  } else if (selection.rangeCount > 0) {
    const current = selection.getRangeAt(0);
    if (isRangeInsideEditor(current, editorEl)) {
      range = current.cloneRange();
    }
  }

  if (!range) {
    editorEl.insertAdjacentHTML('beforeend', html);
    return true;
  }

  selection.removeAllRanges();
  selection.addRange(range);

  range.deleteContents();
  const fragment = range.createContextualFragment(html);
  const lastNode = fragment.lastChild;
  range.insertNode(fragment);

  if (lastNode) {
    range.setStartAfter(lastNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return true;
}

export function insertHtmlAtTextareaCursor(html, textarea) {
  if (!textarea) return '';

  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  const spacer = before && !before.endsWith('\n') ? '\n' : '';
  return `${before}${spacer}${html}${after ? `\n${after}` : ''}`;
}

export function insertHtmlAtEnd(html, currentValue) {
  const trimmed = currentValue?.trim();
  if (!trimmed) return html;
  return `${trimmed}\n${html}`;
}
