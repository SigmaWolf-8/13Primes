/**
 * 13Primes - Constants
 * 
 * System constants for the V5.1 Unified 364° System.
 * "One Circle, 13 Phases, Infinite Expressions"
 *
 * Mathematical Foundation:
 *   364 = 2² × 7 × 13 (natural harmonics)
 *   28 = 2² × 7 (lunar cycle)
 *   52 × 7° = 364° (weekly rhythm)
 *   91 × 4° = 364° (seasonal quarters)
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import type { SalviSign, AspectConfig, HouseMeaning } from './types';

// ============================================
// SYSTEM CONSTANTS
// ============================================

export const SYSTEM_VERSION = "5.1";
export const PRIME_CIRCLE = 364;
export const PHASE_SIZE = 28;
export const NUM_PHASES = 13;
export const GOLDEN_RATIO = 1.6180339887;
export const PHI_FRACTURE_DAY = 225; // 364 / φ ≈ 224.96 → Day 225 (November 11)
export const EPSILON = 1e-9;

// ============================================
// TRIBONACCI SEQUENCE
// ============================================
// T(n) = T(n-1) + T(n-2) + T(n-3)
// Key values: T(6)=13 (signs/houses/moons), T(5)=7 (days/week), T(7)=24 (hours/day)

export const TRIBONACCI = [0, 0, 1, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927] as const;

// ============================================
// TERNARY RESONANCE TYPES
// ============================================

export const RESONANCE_TYPES: Record<0 | 1 | 2, string> = {
  0: 'Completion (Return to Source)',
  1: 'Initiation (New Beginning)',
  2: 'Manifestation (Creative Expression)'
};

// ============================================
// THE 13 SALVI SIGNS
// ============================================

export const SALVI_SIGNS: readonly SalviSign[] = [
  { name: "Ares Prime",  archetype: "The Warrior of Light",      traditional: "Aries energy",                element: "Cardinal Fire",               startDegree: 0,   endDegree: 28,  tribonacci: 1 },
  { name: "Vectoris",    archetype: "Guardian of Pathways",      traditional: "Taurus/Gemini blend",         element: "Fixed Earth-Mutable Air",     startDegree: 28,  endDegree: 56,  tribonacci: 1 },
  { name: "Solaris",     archetype: "The Forgemaster",           traditional: "Cancer/Leo essence",          element: "Cardinal Water-Fixed Fire",   startDegree: 56,  endDegree: 84,  tribonacci: 2 },
  { name: "Liegis",      archetype: "The Relational Matrix",     traditional: "Virgo/Libra synthesis",       element: "Mutable Earth-Cardinal Air",  startDegree: 84,  endDegree: 112, tribonacci: 4 },
  { name: "Alphais",     archetype: "The Sage Chronicler",       traditional: "Scorpio wisdom",              element: "Fixed Water",                 startDegree: 112, endDegree: 140, tribonacci: 7 },
  { name: "Micronis",    archetype: "The Connector",             traditional: "Sagittarius expansion",       element: "Mutable Fire",                startDegree: 140, endDegree: 168, tribonacci: 13 },
  { name: "Nexus",       archetype: "The Combiner",              traditional: "Capricorn structure",         element: "Cardinal Earth",              startDegree: 168, endDegree: 196, tribonacci: 24 },
  { name: "Alchemis",    archetype: "The Transformer",           traditional: "Aquarius innovation",         element: "Fixed Air",                   startDegree: 196, endDegree: 224, tribonacci: 44 },
  { name: "Onyxis",      archetype: "The Beast-Master",          traditional: "Pisces/Ophiuchus mystery",    element: "Mutable Water",               startDegree: 224, endDegree: 252, tribonacci: 81 },
  { name: "Amalgamis",   archetype: "The Shapeshifter",          traditional: "Aries/Taurus rebirth",        element: "Cardinal Fire-Fixed Earth",   startDegree: 252, endDegree: 280, tribonacci: 149 },
  { name: "Quintis",     archetype: "The Explorer-Creator",      traditional: "Gemini/Cancer curiosity",     element: "Mutable Air-Cardinal Water",  startDegree: 280, endDegree: 308, tribonacci: 274 },
  { name: "Fallenis",    archetype: "The Shadow Integrator",     traditional: "Leo/Virgo descent",           element: "Fixed Fire-Mutable Earth",    startDegree: 308, endDegree: 336, tribonacci: 504 },
  { name: "Optimis",     archetype: "The Cosmic Steward",        traditional: "Libra/Scorpio transcendence", element: "Cardinal Air-Fixed Water",    startDegree: 336, endDegree: 364, tribonacci: 927 },
] as const;

// ============================================
// THE 13 PRIME HOUSES
// ============================================

export const HOUSE_NAMES = [
  "Prima",            // 1st - The First Prime - Warrior of Light
  "Vector Prime",     // 2nd - Guardian of Time & Space
  "Solus Prime",      // 3rd - The Forgemaster - Creator & Artisan
  "Liege Maximo",     // 4th - The Manipulator - Charismatic Leader
  "Alpha Trion",      // 5th - The Sage & Chronicler
  "Micronus Prime",   // 6th - The First Mini-Con - Master of Connection
  "Nexus Prime",      // 7th - The First Combiner - Master of Change
  "Alchemist Prime",  // 8th - The Scientist - Seeker of Truth
  "Onyx Prime",       // 9th - The Beast-Master - Mystic Integrator
  "Amalgamous Prime", // 10th - The Shapeshifter - Adaptive Master
  "Quintus Prime",    // 11th - The Explorer & Creator
  "The Fallen",       // 12th - Warrior of Darkness - Shadow Integrator
  "Optimus Prime"     // 13th - The Arisen - Cosmic Steward
] as const;

// ============================================
// V5.1 ASPECT ANGLES (Recalculated for 364°)
// ============================================

export const ASPECT_TYPES: Record<string, AspectConfig> = {
  conjunction: { angle: 0,       orb: 8, nature: "fusion",           symbol: "\u260C", power: 10, harmonic: 1,  phaseCount: 0, gf3: 0, ternaryResonance: "Completion" },
  opposition:  { angle: 182,     orb: 8, nature: "tension",          symbol: "\u260D", power: 9,  harmonic: 2,  phaseCount: 6, gf3: 0, ternaryResonance: "Completion" },
  trine:       { angle: 121.333, orb: 6, nature: "harmony",          symbol: "\u25B3", power: 8,  harmonic: 3,  phaseCount: 4, gf3: 1, ternaryResonance: "Initiation" },
  square:      { angle: 91,      orb: 6, nature: "challenge",        symbol: "\u25A1", power: 8,  harmonic: 4,  phaseCount: 3, gf3: 0, ternaryResonance: "Completion" },
  sextile:     { angle: 60.667,  orb: 4, nature: "opportunity",      symbol: "\u26B9", power: 6,  harmonic: 6,  phaseCount: 2, gf3: 2, ternaryResonance: "Manifestation" },
  quintile:    { angle: 72.8,    orb: 3, nature: "creative",         symbol: "Q",      power: 5,  harmonic: 5,  phaseCount: 3, gf3: 0, ternaryResonance: "Completion" },
  septile:     { angle: 52,      orb: 2, nature: "mystical",         symbol: "S",      power: 4,  harmonic: 7,  phaseCount: 2, gf3: 2, ternaryResonance: "Manifestation" },
  novile:      { angle: 40.444,  orb: 2, nature: "evolutionary",     symbol: "N",      power: 4,  harmonic: 9,  phaseCount: 1, gf3: 1, ternaryResonance: "Initiation" },
  tredecile:   { angle: 28,      orb: 2, nature: "phase-resonance",  symbol: "T",      power: 7,  harmonic: 13, phaseCount: 1, gf3: 1, ternaryResonance: "Initiation" },
  quincunx:    { angle: 151.667, orb: 3, nature: "adjustment",       symbol: "\u26BB", power: 5,  harmonic: 0,  phaseCount: 5, gf3: 2, ternaryResonance: "Manifestation" }
};

// Legacy 360° aspect types for backward compatibility
export const ASPECT_TYPES_360: Record<string, { angle: number; orb: number; nature: string; symbol: string; power: number }> = {
  conjunction: { angle: 0,   orb: 8, nature: "fusion",      symbol: "\u260C", power: 10 },
  opposition:  { angle: 180, orb: 8, nature: "tension",     symbol: "\u260D", power: 9 },
  trine:       { angle: 120, orb: 6, nature: "harmony",     symbol: "\u25B3", power: 8 },
  square:      { angle: 90,  orb: 6, nature: "challenge",   symbol: "\u25A1", power: 8 },
  sextile:     { angle: 60,  orb: 4, nature: "opportunity", symbol: "\u26B9", power: 6 },
  quincunx:    { angle: 150, orb: 3, nature: "adjustment",  symbol: "\u26BB", power: 5 }
};
