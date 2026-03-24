function parseHighlights(text) {
  const parts = [];
  // Match innermost tags first (no nested tags inside the content)
  const regex = /\[(YELLOW|GREEN|RED)\]((?:(?!\[(?:YELLOW|GREEN|RED)\])[\s\S])*?)\[\/\1\]/g;
  let remaining = text;

  // Iteratively resolve nested tags from inside out
  let prev = '';
  while (prev !== remaining) {
    prev = remaining;
    remaining = remaining.replace(regex, (_, tag, content) => `\x01${tag}\x02${content}\x01/${tag}\x02`);
  }

  // Now parse the flattened markers
  const markerRegex = /\x01(YELLOW|GREEN|RED)\x02([\s\S]*?)\x01\/\1\x02/g;
  let lastIndex = 0;
  let match;

  while ((match = markerRegex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'plain', text: remaining.slice(lastIndex, match.index) });
    }
    parts.push({ type: match[1], text: match[2] });
    lastIndex = markerRegex.lastIndex;
  }

  if (lastIndex < remaining.length) {
    parts.push({ type: 'plain', text: remaining.slice(lastIndex) });
  }
  return parts;
}

function HighlightSpan({ type, text }) {
  const styleMap = {
    YELLOW: 'bg-yellow-200 text-yellow-900',
    GREEN:  'bg-green-200 text-green-900',
    RED:    'bg-red-100 text-red-700 line-through',
  };
  return <span className={`rounded px-0.5 ${styleMap[type]}`}>{text}</span>;
}

function renderLine(line, idx) {
  const parts = parseHighlights(line);
  return (
    <span key={idx}>
      {parts.map((part, i) =>
        part.type === 'plain'
          ? part.text
          : <HighlightSpan key={i} type={part.type} text={part.text} />
      )}
    </span>
  );
}

export default function OutputViewer({ output }) {
  if (!output) return null;

  const lines = output.split('\n');

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider self-center">Legend:</span>
        {[
          { color: 'bg-yellow-200', label: 'Updated / Modified' },
          { color: 'bg-green-200',  label: 'AI Tools' },
          { color: 'bg-red-100',    label: 'To Be Removed' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <span className={`inline-block w-3 h-3 rounded ${color} border border-gray-300`} />
            {label}
          </span>
        ))}
      </div>

      {/* Output body */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap break-words max-h-[70vh] overflow-y-auto"
        style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}>
        {lines.map((line, idx) => (
          <div key={idx}>
            {renderLine(line, idx)}
            {idx < lines.length - 1 && '\n'}
          </div>
        ))}
      </div>
    </div>
  );
}
