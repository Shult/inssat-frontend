import React from 'react';
import './styles.css'; // Ensure the CSS file for styling is imported if needed

const Heading1Epic = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h1 className="heading1-epic" style={style}>{children}</h1>
);

const Heading1 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h1 className="heading1" style={style}>{children}</h1>
);

const Heading2 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h2 className="heading2" style={style}>{children}</h2>
);

const Heading3 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h3 className="heading3" style={style}>{children}</h3>
);

const Heading4 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h4 className="heading4" style={style}>{children}</h4>
);

const Heading5 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h5 className="heading5" style={style}>{children}</h5>
);

const Heading6 = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <h6 className="heading6" style={style}>{children}</h6>
);

export { Heading1Epic, Heading1, Heading2, Heading3, Heading4,Heading5, Heading6 };
