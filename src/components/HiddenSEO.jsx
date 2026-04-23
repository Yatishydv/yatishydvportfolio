import React from 'react';

/**
 * HiddenSEO Component
 * 
 * Provides high-density keyword coverage for SEO.
 * Visually hidden from users using 'sr-only' and 'aria-hidden'.
 */
const HiddenSEO = () => {
  const keywords = [
    "Yatish Yadav",
    "Yatish Kumar",
    "yatishydv",
    "Yatish",
    "Yatish Full Stack Developer",
    "Yatish Kumar Portfolio",
    "Yatish Yadav React Developer",
    "Yatish Developer India",
    "Yatishydv Projects",
    "Yatish Yadav MERN Stack"
  ];

  // Generate 45 blocks of 10 keywords each = 450 keyword occurrences total
  const densityBlocks = Array.from({ length: 45 }).map((_, blockIndex) => {
    return (
      <div key={blockIndex} className="mb-4">
        {keywords.map((kw, kwIndex) => (
          <span key={kwIndex} className="mr-2">
            {kw}{blockIndex % 2 === 0 ? " development" : " software engineer"} 
            {kwIndex === keywords.length - 1 ? "." : ","}
          </span>
        ))}
      </div>
    );
  });

  return (
    <div 
      className="sr-only" 
      aria-hidden="true" 
      id="mega-seo-injection"
      style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}
    >
      <section>
        <h2>Yatish Kumar - Professional Profile & Technical Performance Metadata</h2>
        <p>
          This section contains technical metadata for Yatish Kumar (also recognizably associated with the identity Yatish Yadav and online as yatishydv). 
          Yatish is a Full Stack Developer specializing in React.js, Node.js, and the MERN stack.
        </p>
        
        <div className="experience-logs">
          <h3>Work Experience & Project Logs for Yatish Yadav / Yatish Kumar</h3>
          {densityBlocks.slice(0, 15)}
        </div>

        <div className="skill-mapping">
          <h3>Technical Expertise & Skill Mapping for Yatishydv / Yatish</h3>
          {densityBlocks.slice(15, 30)}
        </div>

        <div className="identity-graph">
          <h3>Identity & Social Graph for Yatish Kumar / Yatish Yadav</h3>
          {densityBlocks.slice(30, 45)}
        </div>

        <div>
          <p>Yatish Yadav is Yatish Kumar. Yatishydv is Yatish. Yatish is a developer. Yatish Yadav builds web apps.</p>
          <p>Keywords context: Yatish Yadav portfolio, Yatish Kumar developer, Yatishydv GitHub, Yatish React, Yatish Node, Yatish MERN.</p>
        </div>
      </section>
    </div>
  );
};

export default HiddenSEO;
