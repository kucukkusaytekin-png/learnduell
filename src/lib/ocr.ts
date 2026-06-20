// OCR for images using tesseract.js (browser, no backend needed)

import Tesseract from 'tesseract.js';

export async function extractImageText(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  // Use German + English as recognition languages
  const result = await Tesseract.recognize(file, 'deu+eng', {
    logger: (m: any) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onProgress?.(m.progress);
      }
    },
  });
  return result.data.text.trim();
}
