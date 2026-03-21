import { useState } from 'react';
import { downloadDocx } from '../services/api';

export default function ActionBar({ output, docxFilename, downloadName }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    try {
      const clean = output
        .replace(/\[(YELLOW|GREEN|RED)\]/g, '')
        .replace(/\[\/(YELLOW|GREEN|RED)\]/g, '');
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy failed. Please select and copy the text manually.');
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadDocx(docxFilename, downloadName);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Copy */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Text
          </>
        )}
      </button>

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={!docxFilename || downloading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={docxFilename && !downloading ? { backgroundColor: '#ff6c00', color: '#fff' } : { backgroundColor: '#e5e7eb', color: '#9ca3af' }}
      >
        {downloading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Preparing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .docx
          </>
        )}
      </button>
    </div>
  );
}
