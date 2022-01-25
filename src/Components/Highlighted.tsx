import React from 'react';

function Highlighted({ subject, term }: { subject: string; term: string | undefined }) {
  const regex = new RegExp(`(${term})`, 'gi');
  const parts = subject
    .trim()
    .split(regex)
    .filter((part) => part)
    .map((part, i) => {
      return regex.test(part) ? (
        <mark key={i} style={{ color: '' }}>
          {part}
        </mark>
      ) : (
        part
      );
    });

  return <React.Fragment>{parts.map((part) => part)}</React.Fragment>;
}

export default Highlighted;
