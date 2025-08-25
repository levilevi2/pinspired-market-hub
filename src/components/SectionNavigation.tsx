import { useState, useEffect } from "react";

interface SectionNavigationProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ 
  sections, 
  currentSection, 
  onSectionChange 
}) => {
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section-nav">
      {sections.map((_, index) => (
        <div
          key={index}
          className={`section-nav-dot ${currentSection === index ? 'active' : ''}`}
          onClick={() => {
            onSectionChange(index);
            scrollToSection(index);
          }}
          title={`סקציה ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SectionNavigation;