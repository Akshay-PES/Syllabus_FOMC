import { useState } from 'react';
import { downloadDocx, emailDocx } from '../services/api';

export default function ActionBar({ output, docxFilename }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle'); // idle | sending | sent | error
  const [emailError, setEmailError] = useState('');

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
      await downloadDocx(docxFilename);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setEmailStatus('sending');
    setEmailError('');
    try {
      await emailDocx(email, docxFilename);
      setEmailStatus('sent');
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailStatus('idle');
        setEmail('');
      }, 2000);
    } catch (err) {
      setEmailError(err.response?.data?.error || err.message || 'Failed to send email.');
      setEmailStatus('error');
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* Copy — navy outline */}
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

        {/* Download — orange primary */}
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

        {/* Email button */}
        <button
          onClick={() => setShowEmailModal(true)}
          disabled={!docxFilename}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setShowEmailModal(false); setEmailStatus('idle'); setEmailError(''); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4" style={{ backgroundColor: '#1b3a6b' }}>
              <h3 className="text-white font-semibold text-base">Email Enhanced Syllabus</h3>
              <p className="text-blue-200 text-sm mt-0.5">Send the .docx file as an attachment</p>
            </div>

            <form onSubmit={handleEmail} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faculty@pes.edu"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3a6b] focus:border-transparent"
                  disabled={emailStatus === 'sending' || emailStatus === 'sent'}
                />
              </div>

              {emailStatus === 'error' && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}

              {emailStatus === 'sent' && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent successfully!
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowEmailModal(false); setEmailStatus('idle'); setEmailError(''); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailStatus === 'sending' || emailStatus === 'sent'}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-60"
                  style={{ backgroundColor: '#ff6c00' }}
                >
                  {emailStatus === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Email'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
