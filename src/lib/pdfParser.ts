// PDF text extraction using pdf.js (browser, no backend needed)

import * as pdfjsLib from 'pdfjs-dist';
// @ts-expect-error - vite worker import
import PdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker();

export async function extractPdfText(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str).filter(Boolean);
    pageTexts.push(strings.join(' '));
    onProgress?.(i / totalPages);
  }

  return pageTexts.join('\n\n').trim();
}
