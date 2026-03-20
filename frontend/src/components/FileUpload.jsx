import { useRef, useState } from 'react';

const ACCEPTED = '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export default function FileUpload({ onFileReady, disabled }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f) => { if (f) setFile(f); };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); };
  const handleChange = (e) => { handleFile(e.target.files[0]); };
  const handleSubmit = () => { if (file) onFileReady(file); };

  const zoneClass = dragging
    ? 'border-pes-orange bg-pes-orange-light'
    : file
    ? 'border-green-400 bg-green-50'
    : 'border-gray-300 bg-gray-50 hover:border-pes-orange hover:bg-pes-orange-light';

  return (
    <div className="space-y-4">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${zoneClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" accept={ACCEPTED} className="hidden" onChange={handleChange} disabled={disabled} />

        {file ? (
          <>
            <svg className="w-10 h-10 text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-green-700 px-4 truncate max-w-xs">{file.name}</p>
            <p className="text-xs text-green-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            <p className="text-xs text-gray-400 mt-3">Click to replace file</p>
          </>
        ) : (
          <>
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-base font-semibold text-gray-600">Upload Current Syllabus</p>
            <p className="text-sm text-gray-400 mt-1">Drag & drop or click to browse</p>
            <p className="text-xs text-gray-300 mt-2">PDF or DOCX · Max 20 MB</p>
          </>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file || disabled}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={file && !disabled ? { backgroundColor: '#ff6c00', color: '#fff' } : { backgroundColor: '#e5e7eb', color: '#9ca3af' }}
      >
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Updated Syllabus'
        )}
      </button>
    </div>
  );
}
