'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';

export default function TechEcosystem() {
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [hoveredProj, setHoveredProj] = useState(null);
  const [selectedProj, setSelectedProj] = useState(null);
  const [connections, setConnections] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  // Filter out archived projects to keep it clean
  const activeProjects = projects.filter(p => p.status !== 'archived');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Recalculate coordinates for SVG paths
  useEffect(() => {
    if (windowWidth < 768) {
      setConnections([]);
      return; // Disable SVG lines on mobile for clean UX
    }

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newConnections = [];

    // Find all matches between tech and projects
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        const skillEl = container.querySelector(`[data-tech-id="${skill.name.toLowerCase()}"]`);
        if (!skillEl) return;

        const skillRect = skillEl.getBoundingClientRect();
        const yStart = skillRect.top - containerRect.top + skillRect.height / 2;
        const xStart = skillRect.right - containerRect.left;

        activeProjects.forEach((proj) => {
          // Case-insensitive/whitespace match
          const hasTech = proj.tech.some(
            (t) => t.toLowerCase() === skill.name.toLowerCase() || 
                   (t === 'Typescript' && skill.name === 'TypeScript') ||
                   (t === 'MySql' && skill.name === 'MySQL')
          );

          if (hasTech) {
            const projEl = container.querySelector(`[data-proj-id="${proj.id}"]`);
            if (!projEl) return;

            const projRect = projEl.getBoundingClientRect();
            const yEnd = projRect.top - containerRect.top + projRect.height / 2;
            const xEnd = projRect.left - containerRect.left;

            newConnections.push({
              tech: skill.name,
              project: proj.id,
              x1: xStart,
              y1: yStart,
              x2: xEnd,
              y2: yEnd,
            });
          }
        });
      });
    });

    setConnections(newConnections);
  }, [windowWidth, activeProjects]);

  const handleTechClick = (techName) => {
    if (selectedTech === techName) {
      setSelectedTech(null);
    } else {
      setSelectedTech(techName);
      setSelectedProj(null);
    }
  };

  const handleProjClick = (projId) => {
    if (selectedProj === projId) {
      setSelectedProj(null);
    } else {
      setSelectedProj(projId);
      setSelectedTech(null);
    }
  };

  const activeTech = hoveredTech || selectedTech;
  const activeProj = hoveredProj || selectedProj;

  // Determine highlight states for skills & projects
  const isTechHighlighted = (techName) => {
    if (!activeTech && !activeProj) return true;
    if (activeTech === techName) return true;
    if (activeProj) {
      const projObj = activeProjects.find((p) => p.id === activeProj);
      return projObj?.tech.some((t) => t.toLowerCase() === techName.toLowerCase());
    }
    return false;
  };

  const isProjHighlighted = (projId) => {
    if (!activeTech && !activeProj) return true;
    if (activeProj === projId) return true;
    if (activeTech) {
      const projObj = activeProjects.find((p) => p.id === projId);
      return projObj?.tech.some((t) => t.toLowerCase() === activeTech.toLowerCase());
    }
    return false;
  };

  return (
    <div ref={containerRef} className="relative w-full py-8 select-none">
      {/* SVG Canvas for drawing paths (Visible on desktop only) */}
      {windowWidth >= 768 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {connections.map((conn, idx) => {
            const isHighlighted =
              (activeTech === conn.tech) ||
              (activeProj === conn.project);

            const isFaded = (activeTech || activeProj) && !isHighlighted;

            // Generate a smooth horizontal S-curve (Bezier)
            const controlOffset = Math.abs(conn.x2 - conn.x1) * 0.4;
            const path = `M ${conn.x1} ${conn.y1} C ${conn.x1 + controlOffset} ${conn.y1}, ${conn.x2 - controlOffset} ${conn.y2}, ${conn.x2} ${conn.y2}`;

            return (
              <path
                key={idx}
                d={path}
                className="svg-connection-path"
                style={{
                  stroke: isHighlighted ? 'var(--dev-teal)' : 'rgba(75, 85, 99, 0.12)',
                  strokeWidth: isHighlighted ? 1.8 : 1,
                  opacity: isFaded ? 0.15 : 0.8,
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Structured Dual Columns Layout */}
      <div className="grid md:grid-cols-12 gap-8 items-start relative z-20">
        {/* Left: Technologies List (Categories) */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex flex-col gap-1 mb-2">
            <span className="mono-label">Ecosystem Grid</span>
            <h3 className="font-semibold text-lg text-gray-200">Technologies I use in actual projects</h3>
          </div>
          
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.label} className="border-b border-gray-900 pb-4 last:border-0 last:pb-0">
                <span className="font-mono text-xs text-gray-500 block mb-2">{category.label}</span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const highlighted = isTechHighlighted(skill.name);
                    const isSelected = selectedTech === skill.name;
                    const accentColor = category.color === 'cyan' ? 'var(--dev-teal)' : 'var(--gis-glacier)';

                    return (
                      <button
                        key={skill.name}
                        data-tech-id={skill.name.toLowerCase()}
                        onMouseEnter={() => setHoveredTech(skill.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={() => handleTechClick(skill.name)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-tech transition-all duration-300"
                        style={{
                          borderColor: isSelected
                            ? accentColor
                            : highlighted
                            ? 'rgba(75, 85, 99, 0.4)'
                            : 'rgba(31, 41, 55, 0.15)',
                          background: isSelected
                            ? 'rgba(13, 148, 136, 0.08)'
                            : highlighted
                            ? 'rgba(15, 23, 42, 0.4)'
                            : 'transparent',
                          color: highlighted ? 'var(--color-text-main)' : 'var(--color-text-dim)',
                          opacity: highlighted ? 1 : 0.4,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: skill.level === 'learning' ? 'var(--color-text-dim)' : accentColor,
                          }}
                        />
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Projects Specifications List */}
        <div className="md:col-span-5 space-y-4 md:pl-6">
          <div className="flex flex-col gap-1 mb-2">
            <span className="mono-label">Active Implementations</span>
            <h3 className="font-semibold text-lg text-gray-200">System nodes</h3>
          </div>

          <div className="space-y-3">
            {activeProjects.map((proj) => {
              const highlighted = isProjHighlighted(proj.id);
              const isSelected = selectedProj === proj.id;

              return (
                <div
                  key={proj.id}
                  data-proj-id={proj.id}
                  onMouseEnter={() => setHoveredProj(proj.id)}
                  onMouseLeave={() => setHoveredProj(null)}
                  onClick={() => handleProjClick(proj.id)}
                  className="p-4 rounded border cursor-pointer transition-all duration-300 relative select-none"
                  style={{
                    borderColor: isSelected
                      ? 'var(--dev-teal)'
                      : highlighted
                      ? 'rgba(75, 85, 99, 0.4)'
                      : 'rgba(31, 41, 55, 0.15)',
                    background: highlighted ? 'rgba(11, 15, 25, 0.6)' : 'rgba(3, 7, 18, 0.2)',
                    opacity: highlighted ? 1 : 0.35,
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="mono-label text-[9px] block mb-0.5">SYS_{proj.year}</span>
                      <h4
                        className="font-semibold text-sm transition-colors duration-200"
                        style={{ color: highlighted ? 'var(--color-text-main)' : 'var(--color-text-dim)' }}
                      >
                        {proj.title}
                      </h4>
                    </div>
                    <span className="status-tag text-[9px] scale-90 origin-top-right">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 leading-snug">
                    {proj.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
