import React from 'react';
import './styles.css'; // Create a CSS file for styling if needed

// Standard Paragraph
const ParagraphStd =  ({ children } : { children: React.ReactNode }) => {
  return <p className="paragraph-std">{children}</p>;
};

// Small Paragraph
const ParagraphSm =  ({ children }: { children: React.ReactNode }) => {
  return <p className="paragraph-sm">{children}</p>;
};

export { ParagraphStd, ParagraphSm };
