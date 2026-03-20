const PROGRAM_GROUPS = [
  {
    group: 'Postgraduate',
    programs: [
      { id: 'MBA', label: 'MBA', sub: 'Master of Business Administration' },
    ],
  },
  {
    group: 'UG Commerce & Management',
    programs: [
      { id: 'BCOM',          label: 'BCom',          sub: 'Bachelor of Commerce' },
      { id: 'BCOM_ACCA',     label: 'BCom ACCA',     sub: 'Bachelor of Commerce with ACCA' },
      { id: 'BCOM_CMA',      label: 'BCom CMA',      sub: 'Bachelor of Commerce with CMA' },
      { id: 'BBA',           label: 'BBA',            sub: 'Bachelor of Business Administration' },
      { id: 'BBA_ANALYTICS', label: 'BBA Analytics',  sub: 'BBA with Business Analytics' },
    ],
  },
  {
    group: 'UG Law',
    programs: [
      { id: 'BA_LLB',  label: 'BA LLB',  sub: 'Bachelor of Arts & Bachelor of Laws' },
      { id: 'BBA_LLB', label: 'BBA LLB', sub: 'BBA & Bachelor of Laws' },
    ],
  },
  {
    group: 'UG Science / Social Science',
    programs: [
      { id: 'BSC_PSYCHOLOGY', label: 'BSc Psychology', sub: 'Bachelor of Science in Psychology' },
      { id: 'BSC_ECONOMICS',  label: 'BSc Economics',  sub: 'Bachelor of Science in Economics' },
    ],
  },
  {
    group: 'UG Hospitality',
    programs: [
      { id: 'BHEM', label: 'BHEM', sub: 'Bachelor of Hotel and Event Management' },
    ],
  },
];

export default function ProgramSelector({ selected, onSelect, onContinue }) {
  return (
    <div className="min-h-screen bg-[#f4f5f7]">

      {/* Header */}
      <header className="bg-white border-b-4 border-pes-orange shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <img src="/pes-logo.png" alt="PES University" className="h-12 object-contain" />
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p className="text-xs font-semibold text-pes-orange uppercase tracking-widest">Curriculum AI</p>
            <h1 className="text-lg font-bold text-pes-navy leading-tight">Syllabus Enhancement Tool</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Step bar */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-pes-orange text-white flex items-center justify-center text-xs font-bold shadow">1</div>
            <span className="font-semibold text-pes-navy">Select Programme</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-bold">2</div>
            <span className="text-gray-400">Upload & Generate</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Card header strip */}
          <div className="bg-pes-navy px-6 py-4">
            <h2 className="text-white font-semibold text-base">Which programme is this syllabus for?</h2>
            <p className="text-blue-200 text-sm mt-0.5">
              The AI will benchmark, calibrate difficulty, and format the output for the selected programme.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {PROGRAM_GROUPS.map(({ group, programs }) => (
              <div key={group}>
                <p className="text-xs font-bold text-pes-navy uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="inline-block w-4 h-0.5 bg-pes-orange" />
                  {group}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {programs.map(({ id, label, sub }) => {
                    const isSelected = selected === id;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={`text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 ${
                          isSelected
                            ? 'border-pes-orange bg-pes-orange-light'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-bold ${isSelected ? 'text-pes-orange' : 'text-pes-navy'}`}>
                              {label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-pes-orange flex items-center justify-center flex-shrink-0 ml-2">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={onContinue}
              disabled={!selected}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: selected ? '#ff6c00' : undefined, color: selected ? '#fff' : undefined }}
            >
              {selected ? 'Continue to Upload →' : 'Select a programme to continue'}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
