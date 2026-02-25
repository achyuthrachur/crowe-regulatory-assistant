const MAX_CHARS = 80_000;

export interface ParseResult {
  content: string;
  filename: string;
  pageCount: number | null;
}

export async function parseDocument(file: File): Promise<ParseResult> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File exceeds 10MB limit. Please upload a smaller document.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'pdf') {
    return parsePdf(file);
  } else if (ext === 'txt' || ext === 'md') {
    return parsePlainText(file);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF, TXT, or MD file.');
  }
}

async function parsePlainText(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let content = (e.target?.result as string) ?? '';
      if (content.length > MAX_CHARS) {
        content = content.slice(0, MAX_CHARS) + '\n\n[Document truncated at 80,000 characters for processing]';
      }
      resolve({ content, filename: file.name, pageCount: null });
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}

async function parsePdf(file: File): Promise<ParseResult> {
  const arrayBuffer = await file.arrayBuffer();

  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pageCount = pdf.numPages;
  const pageParts: string[] = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    pageParts.push(pageText);
  }

  let content = pageParts.join('\n\n---\n\n');
  if (content.length > MAX_CHARS) {
    content = content.slice(0, MAX_CHARS) + '\n\n[Document truncated at 80,000 characters for processing]';
  }

  return { content, filename: file.name, pageCount };
}
