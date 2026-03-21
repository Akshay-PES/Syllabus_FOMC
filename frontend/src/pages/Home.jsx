import { useState, useEffect } from 'react';
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
  BCOM_CFA:       'BCom CFA',
  BCOM_CA:        'BCom CA',
  BBA:            'BBA',
  BBA_ANALYTICS:  'BBA Analytics',
  BBA_SPORTS:     'BBA Sports Mgmt',
  BA_LLB:         'BA LLB',
  BBA_LLB:        'BBA LLB',
  BSC_PSYCHOLOGY: 'BSc Psychology',
  BSC_JMC:        'BSc JMC',
  BSC_ECONOMICS:  'BSc Economics',
  BHEM:           'BBA-HEM',
  MSC_PSYCHOLOGY: 'MSc Psychology',
  LLM:            'LLM',
};

const BENCHMARKS = {
  MBA:            'Harvard, Wharton, MIT Sloan, INSEAD, IIMs, ISB',
  BCOM:           'SRCC, Christ University, Symbiosis, UGC guidelines',
  BCOM_ACCA:      'ACCA qualification standards & top commerce institutions',
  BCOM_CMA:       'ICMAI CMA standards & top commerce institutions',
  BCOM_CFA:       'CFA Institute curriculum & top commerce institutions',
  BCOM_CA:        'ICAI CA standards & top commerce institutions',
  BBA:            'Christ University, Symbiosis, IIM Indore IPM, UGC guidelines',
  BBA_ANALYTICS:  'NMIMS, Christ University, Symbiosis, Great Lakes',
  BBA_SPORTS:     'NASM, FIFA/IOC standards, IIHMR, Symbiosis, Loughborough University',
  BA_LLB:         'NLSIU, NLU Delhi, NALSAR, BCI curriculum',
  BBA_LLB:        'Symbiosis Law School, NMIMS School of Law, BCI curriculum',
  BSC_PSYCHOLOGY: 'Delhi University, Christ University, APA guidelines',
  BSC_ECONOMICS:  'Delhi School of Economics, St. Xavier\'s, Ashoka University',
  BSC_JMC:        'IIMC Delhi, Symbiosis, AJK MCRC Jamia, Xavier Institute of Communications',
  BHEM:           'IHM Mumbai, IHM Delhi, WGSHA Manipal, NCHMCT standards',
  MSC_PSYCHOLOGY: 'Delhi University, Christ University, NIMHANS, TISS, APA guidelines',
  LLM:            'NLSIU, NLU Delhi, NALSAR, Harvard Law School, Oxford, BCI standards',
};

export default function Home() {
  const [step, setStep]               = useState('select');
  const [programId, setProgramId]     = useState('');
  const [status, setStatus]           = useState('idle');
  const [output, setOutput]           = useState('');
  const [docxFilename, setDocxFilename] = useState(null);
  const [downloadName, setDownloadName] = useState(null);
  const [errorMsg, setErrorMsg]       = useState('');
  const [progressStep, setProgressStep] = useState(0);

  const programLabel = PROGRAM_LABELS[programId] || programId;
  const benchmark    = BENCHMARKS[programId] || '';

  const PROGRESS_STEPS = [
    { label: 'Uploading syllabus',              desc: 'Sending your file to the server' },
    { label: 'Extracting text',                 desc: 'Parsing content from your document' },
    { label: 'Building programme-specific prompt', desc: `Applying ${programLabel} benchmarks & standards` },
    { label: 'AI analysing & enhancing',        desc: 'Claude is evaluating and restructuring your syllabus' },
    { label: 'Generating DOCX',                 desc: 'Creating your formatted Word document' },
  ];

  useEffect(() => {
    if (status !== 'generating') return;
    const timers = [
      setTimeout(() => setProgressStep(2), 3000),
      setTimeout(() => setProgressStep(3), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [status]);

  const handleFileReady = async (syllabusFile) => {
    setStatus('uploading');
    setOutput('');
    setErrorMsg('');
    setDocxFilename(null);
    setDownloadName(null);
    setProgressStep(0);

    try {
      const uploadData = await uploadFile(syllabusFile);
      setProgressStep(1);
      setStatus('generating');
      const result = await generateSyllabus(
        uploadData.syllabus.filename,
        uploadData.syllabus.mimetype,
        programId,
      );
      setProgressStep(4);
      setOutput(result.output);
      if (result.docxFilename) setDocxFilename(result.docxFilename);
      if (result.downloadName) setDownloadName(result.downloadName);
      setStatus('done');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'An unexpected error occurred.';
      setErrorMsg(msg);
      setStatus('error');
    }
  };

  const isLoading = status === 'uploading' || status === 'generating';

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
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center gap-5">
          <img src="/pes-logo.png" alt="PES University" className="h-14 object-contain" />
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex-1">
            <p className="text-xs font-bold text-pes-orange uppercase tracking-[0.2em]">Curriculum AI</p>
            <h1 className="text-xl font-bold text-pes-navy leading-tight mt-0.5">Syllabus Enhancement Tool</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold px-4 py-2 rounded-full bg-pes-orange text-white shadow-lg shadow-orange-200">
              {programLabel}
            </span>
            <button
              onClick={() => { setStep('select'); setStatus('idle'); setOutput(''); setErrorMsg(''); }}
              className="text-sm text-gray-400 hover:text-pes-orange font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-pes-orange via-pes-orange to-pes-navy" />
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12 space-y-8">

        {/* Step bar */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-400 font-medium text-base">Select Programme</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pes-orange text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-200">2</div>
            <span className="font-bold text-pes-navy text-base">Upload & Generate</span>
          </div>
        </div>

        {/* Upload card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          {/* Card header */}
          <div className="bg-gradient-to-r from-pes-navy to-pes-navy-dark px-8 py-6">
            <h2 className="text-white font-bold text-xl">Upload Your {programLabel} Syllabus</h2>
            <p className="text-blue-200 text-sm mt-2 leading-relaxed">
              Benchmarked against: {benchmark}
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Info strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '\uD83D\uDD0D', label: 'Evaluates',  desc: 'Coverage, rigor & AI integration' },
                { icon: '\u270F\uFE0F', label: 'Refines',    desc: 'Improves topics selectively' },
                { icon: '\uD83D\uDCCB', label: 'Formats',    desc: `Standard 12-section ${programLabel} format` },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 bg-[#f7f8fa] rounded-xl p-5 border border-gray-100">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-bold text-pes-navy">{label}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <FileUpload onFileReady={handleFileReady} disabled={isLoading} />
          </div>
        </div>

        {/* Progress indicator */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pes-navy to-pes-navy-dark px-8 py-6">
              <h2 className="text-white font-bold text-xl">Processing Your Syllabus</h2>
              <p className="text-blue-200 text-sm mt-2">This may take 60\u201390 seconds</p>
            </div>
            <div className="p-8">
              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden">
                <div
                  className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    backgroundColor: '#ff6c00',
                    width: `${((progressStep + 1) / PROGRESS_STEPS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {PROGRESS_STEPS.map((s, i) => {
                  const isDone = i < progressStep;
                  const isCurrent = i === progressStep;
                  return (
                    <div key={i} className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${isCurrent ? 'bg-pes-orange-light border border-pes-orange/20' : ''}`}>
                      {isDone ? (
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : isCurrent ? (
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                          <svg className="animate-spin w-6 h-6" style={{ color: '#ff6c00' }} fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-gray-200 flex-shrink-0" />
                      )}
                      <div>
                        <p className={`text-sm font-semibold ${isDone ? 'text-green-700' : isCurrent ? 'text-pes-navy' : 'text-gray-300'}`}>
                          {s.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-6 flex items-start gap-4">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-base font-bold text-red-800">Generation Failed</p>
              <p className="text-sm text-red-600 mt-2 leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Output */}
        {status === 'done' && output && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pes-navy to-pes-navy-dark px-8 py-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-white font-bold text-xl">Enhanced Syllabus</h2>
                <p className="text-blue-200 text-sm mt-2">Review highlights, then copy, download, or email</p>
              </div>
              <ActionBar output={output} docxFilename={docxFilename} downloadName={downloadName} />
            </div>
            <div className="p-8">
              <OutputViewer output={output} />
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">PES University Syllabus Enhancement Tool</p>
          <p className="text-xs text-gray-400">Powered by Claude AI</p>
        </div>
      </footer>
    </div>
  );
}
