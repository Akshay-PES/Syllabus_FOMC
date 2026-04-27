const LAW_IDS = new Set(['BA_LLB', 'BBA_LLB', 'LLB', 'LLM']);

const PROGRAM_GROUPS = [
  {
    group: 'Postgraduate',
    programs: [
      { id: 'MBA',             label: 'MBA',             sub: 'Master of Business Administration' },
      { id: 'MSC_PSYCHOLOGY',  label: 'MSc Psychology',   sub: 'Master of Science (M.Sc) in Psychology' },
      { id: 'LLM',             label: 'LL.M.',            sub: 'Master of Laws' },
    ],
  },
  {
    group: 'UG Commerce & Management',
    programs: [
      { id: 'BCOM',          label: 'BCom',              sub: 'Bachelor of Commerce (General / Hons.)' },
      { id: 'BCOM_ACCA',     label: 'BCom ACCA',        sub: 'Bachelor of Commerce (Hons) with ACCA' },
      { id: 'BCOM_CMA',      label: 'BCom CMA',         sub: 'Bachelor of Commerce (Hons) with CMA' },
      { id: 'BCOM_CFA',      label: 'BCom CFA',         sub: 'Bachelor of Commerce (Hons) with CFA' },
      { id: 'BCOM_CA',       label: 'BCom CA',           sub: 'Bachelor of Commerce (Hons.) with CA' },
      { id: 'BBA',           label: 'BBA',               sub: 'BBA (General / Honors)' },
      { id: 'BBA_ANALYTICS', label: 'BBA Analytics',     sub: 'BBA (Hons) in Business Analytics' },
      { id: 'BBA_SPORTS',    label: 'BBA Sports Mgmt',   sub: 'BBA in Sports Management' },
    ],
  },
  {
    group: 'UG Law',
    programs: [
      { id: 'BA_LLB',  label: 'BA-LLB (Hons)',  sub: 'Bachelor of Arts & Bachelor of Laws (Honors)' },
      { id: 'BBA_LLB', label: 'BBA-LLB (Hons)', sub: 'BBA & Bachelor of Laws (Honors)' },
      { id: 'LLB',     label: 'LLB (Hons)',      sub: 'Bachelor of Laws (Honors)' },
    ],
  },
  {
    group: 'UG Science / Social Science',
    programs: [
      { id: 'BSC_PSYCHOLOGY', label: 'BSc Psychology', sub: 'Bachelor of Science (B.Sc) in Psychology – General / Honors' },
      { id: 'BSC_ECONOMICS',  label: 'BSc Economics',  sub: 'Bachelor of Science in Economics' },
      { id: 'BSC_JMC',        label: 'BSc JMC',        sub: 'Bachelor of Science (B.Sc.) in Journalism & Mass Communication – Honors' },
    ],
  },
  {
    group: 'UG Hospitality',
    programs: [
      { id: 'BHEM', label: 'BBA-HEM', sub: 'BBA in Hospitality & Event Management' },
    ],
  },
];

export default function ProgramSelector({ selected, onSelect, onContinue, lawBenchmarkType, onLawBenchmarkChange }) {
  const isLawSelected = LAW_IDS.has(selected);
  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center gap-5">
          <img src="/pes-logo.png" alt="PES University" className="h-14 object-contain" />
          <div className="w-px h-12 bg-gray-200" />
          <div>
            <p className="text-xs font-bold text-pes-orange uppercase tracking-[0.2em]">Curriculum AI</p>
            <h1 className="text-xl font-bold text-pes-navy leading-tight mt-0.5">Syllabus Enhancement Tool</h1>
          </div>
        </div>
        {/* Orange accent line */}
        <div className="h-1 bg-gradient-to-r from-pes-orange via-pes-orange to-pes-navy" />
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">

        {/* Step bar */}
        <div className="flex items-center gap-3 text-sm mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pes-orange text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-200">1</div>
            <span className="font-bold text-pes-navy text-base">Select Programme</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-gray-400 text-base">Upload & Generate</span>
          </div>
        </div>

        {/* Hero section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-pes-navy leading-snug">
            Which programme is this syllabus for?
          </h2>
          <p className="text-gray-500 text-base mt-3 max-w-2xl leading-relaxed">
            Select your academic programme below. The AI will benchmark against global standards,
            calibrate difficulty, and format the output specifically for your programme.
          </p>
        </div>

        {/* Programme groups */}
        <div className="space-y-10">
          {PROGRAM_GROUPS.map(({ group, programs }) => (
            <div key={group}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 rounded-full bg-pes-orange" />
                <h3 className="text-sm font-bold text-pes-navy uppercase tracking-[0.15em]">
                  {group}
                </h3>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map(({ id, label, sub }) => {
                  const isSelected = selected === id;
                  return (
                    <button
                      key={id}
                      onClick={() => onSelect(id)}
                      className={`group text-left px-6 py-5 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-pes-orange bg-pes-orange-light shadow-md shadow-orange-100'
                          : 'border-gray-200 bg-white hover:border-pes-navy/30 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-base font-bold ${isSelected ? 'text-pes-orange' : 'text-pes-navy group-hover:text-pes-navy'}`}>
                            {label}
                          </p>
                          <p className="text-sm text-gray-400 mt-1.5 leading-snug">{sub}</p>
                        </div>
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-pes-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0 mt-0.5 group-hover:border-gray-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Law benchmark toggle — only visible when a law programme is selected */}
        {isLawSelected && (
          <div className="mt-10 bg-white border-2 border-pes-navy/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full bg-pes-navy" />
              <h3 className="text-sm font-bold text-pes-navy uppercase tracking-[0.15em]">
                Subject Type
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Select whether this subject is governed primarily by Indian statute, or has comparative / international dimensions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  value: 'indian',
                  label: 'Indian Law Subject',
                  desc: 'e.g. BNSS, BNS, BSA, CPC, Evidence Act, Transfer of Property Act, GST, Companies Act',
                },
                {
                  value: 'international',
                  label: 'Comparative / International Law',
                  desc: 'e.g. Human Rights Law, International Arbitration, Cyber Law, IPR, WTO, Environmental Law',
                },
              ].map(({ value, label, desc }) => {
                const active = lawBenchmarkType === value;
                return (
                  <button
                    key={value}
                    onClick={() => onLawBenchmarkChange(value)}
                    className={`text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                      active
                        ? 'border-pes-navy bg-pes-navy/5 shadow-md'
                        : 'border-gray-200 bg-white hover:border-pes-navy/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${active ? 'border-pes-navy bg-pes-navy' : 'border-gray-300'}`}>
                        {active && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${active ? 'text-pes-navy' : 'text-gray-600'}`}>{label}</p>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onContinue}
            disabled={!selected}
            className="px-10 py-4 rounded-xl text-base font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
            style={selected ? { backgroundColor: '#ff6c00', color: '#fff', boxShadow: '0 8px 24px rgba(255, 108, 0, 0.3)' } : {}}
          >
            {selected ? 'Continue to Upload \u2192' : 'Select a programme to continue'}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">PES University Syllabus Enhancement Tool</p>
        </div>
      </footer>
    </div>
  );
}
