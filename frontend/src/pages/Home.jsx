import { useState } from 'react';
import ProgramSelector from '../components/ProgramSelector';
import FileUpload from '../components/FileUpload';
import OutputViewer from '../components/OutputViewer';
import ActionBar from '../components/ActionBar';
import { uploadFile, generateSyllabus } from '../services/api';

const PROGRAM_LABELS = {
  MBA:            'MBA',
  BCOM:           'BCom',
  BCOM_ACCA:      'BCom ACCA',
  BCOM_CMA:       'BCom CMA',
  BBA:            'BBA',
  BBA_ANALYTICS:  'BBA Analytics',
  BA_LLB:         'BA LLB',
  BBA_LLB:        'BBA LLB',
  BSC_PSYCHOLOGY: 'BSc Psychology',
  BSC_ECONOMICS:  'BSc Economics',
  BHEM:           'BHEM',
};

const BENCHMARKS = {
  MBA:            'Harvard, Wharton, MIT Sloan, INSEAD, IIMs, ISB',
  BCOM:           'SRCC, Christ University, Symbiosis, UGC guidelines',
  BCOM_ACCA:      'ACCA qualification standards & top commerce institutions',
  BCOM_CMA:       'ICMAI CMA standards & top commerce institutions',
  BBA:            'Christ University, Symbiosis, IIM Indore IPM, UGC guidelines',
  BBA_ANALYTICS:  'NMIMS, Christ University, Symbiosis, Great Lakes',
  BA_LLB:         'NLSIU, NLU Delhi, NALSAR, BCI curriculum',
  BBA_LLB:        'Symbiosis Law School, NMIMS School of Law, BCI curriculum',
  BSC_PSYCHOLOGY: 'Delhi University, Christ University, APA guidelines',
  BSC_ECONOMICS:  'Delhi School of Economics, St. Xavier\'s, Ashoka University',
  BHEM:           'IHM Mumbai, IHM Delhi, WGSHA Manipal, NCHMCT standards',
};

export default function Home() {
  const [step, setStep]               = useState('select');
  const [programId, setProgramId]     = useState('');
  const [status, setStatus]           = useState('idle');
  const [output, setOutput]           = useState('');
  const [docxFilename, setDocxFilename] = useState(null);
  const [errorMsg, setErrorMsg]       = useState('');

  const handleFileReady = async (syllabusFile) => {
    setStatus('uploading');
    setOutput('');
    setErrorMsg('');
    setDocxFilename(null);

    try {
      const uploadData = await uploadFile(syllabusFile);
      setStatus('generating');
      const result = await generateSyllabus(
        uploadData.syllabus.filename,
        uploadData.syllabus.mimetype,
        programId,
      );
      setOutput(result.output);
      if (result.docxFilename) setDocxFilename(result.docxFilename);
      setStatus('done');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'An unexpected error occurred.';
      setErrorMsg(msg);
      setStatus('error');
    }
  };

  const isLoading = status === 'uploading' || status === 'generating';
  const programLabel = PROGRAM_LABELS[programId] || programId;
  const benchmark    = BENCHMARKS[programId] || '';

  if (step === 'select') {
    return (
      <ProgramSelector
        selected={programId}
        onSelect={setProgramId}
        onContinue={() => setStep('upload')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7]">

      {/* Header */}
      <header className="bg-white border-b-4 border-pes-orange shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <img src="/pes-logo.png" alt="PES University" className="h-12 object-contain" />
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-pes-orange uppercase tracking-widest">Curriculum AI</p>
            <h1 className="text-lg font-bold text-pes-navy leading-tight">Syllabus Enhancement Tool</h1>
          </div>
          {/* Programme badge + change */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-pes-orange text-white shadow-sm">
              {programLabel}
            </span>
            <button
              onClick={() => { setStep('select'); setStatus('idle'); setOutput(''); setErrorMsg(''); }}
              className="text-xs text-gray-400 hover:text-pes-orange underline transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Step bar */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-400 font-medium">Select Programme</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-pes-orange text-white flex items-center justify-center text-xs font-bold shadow">2</div>
            <span className="font-semibold text-pes-navy">Upload & Generate</span>
          </div>
        </div>

        {/* Upload card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Navy card header */}
          <div className="bg-pes-navy px-6 py-4">
            <h2 className="text-white font-semibold text-base">Upload Your {programLabel} Syllabus</h2>
            <p className="text-blue-200 text-sm mt-0.5">
              Benchmarked against: {benchmark}
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Info strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: '🔍', label: 'Evaluates',  desc: 'Coverage, rigor & AI integration' },
                { icon: '✏️', label: 'Refines',    desc: 'Improves topics selectively' },
                { icon: '📋', label: 'Formats',    desc: `Standard 12-section ${programLabel} format` },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3 bg-[#f4f5f7] rounded-xl p-3 border border-gray-100">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-xs font-bold text-pes-navy">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <FileUpload onFileReady={handleFileReady} disabled={isLoading} />
          </div>
        </div>

        {/* Status banner */}
        {isLoading && (
          <div className="bg-pes-navy-light border border-pes-navy rounded-xl px-5 py-4 flex items-center gap-4">
            <svg className="animate-spin w-5 h-5 flex-shrink-0" style={{ color: '#1b3a6b' }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-pes-navy">
                {status === 'uploading' ? 'Uploading syllabus...' : `Analysing and enhancing your ${programLabel} syllabus...`}
              </p>
              {status === 'generating' && (
                <p className="text-xs text-gray-500 mt-0.5">Benchmarking against global standards · This may take 60–90 seconds</p>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-red-800">Generation Failed</p>
              <p className="text-xs text-red-600 mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Output */}
        {status === 'done' && output && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-pes-navy px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-white font-semibold text-base">Enhanced Syllabus</h2>
                <p className="text-blue-200 text-sm mt-0.5">Review highlights, then copy or download as .docx</p>
              </div>
              <ActionBar output={output} docxFilename={docxFilename} />
            </div>
            <div className="p-6">
              <OutputViewer output={output} />
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
