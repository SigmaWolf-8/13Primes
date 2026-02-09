/**
 * 13Primes - 13-Moon Harmonic Calendar
 * 
 * Implements the 13-Moon Harmonic Calendar from the Salvi Framework.
 * 
 * Mathematical Foundation:
 *   Time:  13 Moons × 28 days = 364 days
 *   Space: 13 Houses × 28°    = 364°
 * 
 *   Golden Ratio: 364 / φ = 224.96 → Day 225 (November 11)
 *   Fibonacci Split: Pre-φ (8 moons, 224 days) + Post-φ (5 moons, 140 days)
 *   Ratio: 8/5 = 1.600 ≈ φ = 1.618 (within 1.1%)
 *
 * @see https://plenumnet.replit.app/calendar
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import type { ThirteenMoonDate, MoonData } from '../core/types';

// ============================================
// CONSTANTS
// ============================================

export const PHI_FRACTURE_DAY = 225;
export const THIRTEEN_MOON_YEAR_START_MONTH = 6; // July (0-indexed)
export const THIRTEEN_MOON_YEAR_START_DAY = 26;

// ============================================
// THE 13 MOONS
// ============================================

export const THIRTEEN_MOONS: readonly MoonData[] = [
  { number: 1,  name: 'Magnetic',      signature: 'Red Dragon',          tone: 'Purpose \u2013 Unify',          arc: 'Pre-\u03C6' },
  { number: 2,  name: 'Lunar',         signature: 'White Wind',          tone: 'Challenge \u2013 Flow',         arc: 'Pre-\u03C6' },
  { number: 3,  name: 'Electric',      signature: 'Blue Night',          tone: 'Service \u2013 Activate',       arc: 'Pre-\u03C6' },
  { number: 4,  name: 'Self-Existing', signature: 'Yellow Seed',         tone: 'Form \u2013 Measure',           arc: 'Pre-\u03C6' },
  { number: 5,  name: 'Overtone',      signature: 'Red Serpent',         tone: 'Radiance \u2013 Empower',       arc: 'Pre-\u03C6' },
  { number: 6,  name: 'Rhythmic',      signature: 'White World-Bridger', tone: 'Equality \u2013 Organize',      arc: 'Pre-\u03C6' },
  { number: 7,  name: 'Resonant',      signature: 'Blue Hand',           tone: 'Channel \u2013 Inspire',        arc: 'Pre-\u03C6' },
  { number: 8,  name: 'Galactic',      signature: 'Yellow Star',         tone: 'Integrity \u2013 Harmonize',    arc: 'Pre-\u03C6' },
  { number: 9,  name: 'Solar',         signature: 'Red Moon',            tone: 'Intention \u2013 Pulse',        arc: 'Post-\u03C6' },
  { number: 10, name: 'Planetary',     signature: 'White Dog',           tone: 'Manifestation \u2013 Perfect',  arc: 'Post-\u03C6' },
  { number: 11, name: 'Spectral',      signature: 'Blue Monkey',         tone: 'Liberation \u2013 Dissolve',    arc: 'Post-\u03C6' },
  { number: 12, name: 'Crystal',       signature: 'Yellow Human',        tone: 'Cooperation \u2013 Dedicate',   arc: 'Post-\u03C6' },
  { number: 13, name: 'Cosmic',        signature: 'Red Skywalker',       tone: 'Presence \u2013 Endure',        arc: 'Post-\u03C6' },
] as const;

// ============================================
// CONVERSION FUNCTIONS
// ============================================

/**
 * Convert a Gregorian date to its 13-Moon Harmonic Calendar position
 * 
 * Year begins July 26 (Galactic New Year)
 * Day Out of Time = Day 225 (≈ 364/φ) falls on approximately November 11 (11/11)
 * 13 Moons × 28 days = 364 + 1 Day Out of Time = 365
 */
export function toThirteenMoonDate(date: Date): ThirteenMoonDate {
  const year = date.getFullYear();

  // 13-Moon year starts July 26
  const yearStart = new Date(year, THIRTEEN_MOON_YEAR_START_MONTH, THIRTEEN_MOON_YEAR_START_DAY);
  if (date < yearStart) {
    yearStart.setFullYear(year - 1);
  }

  const diffMs = date.getTime() - yearStart.getTime();
  const dayOfYear = Math.floor(diffMs / (24 * 60 * 60 * 1000)) + 1;

  // Day Out of Time: falls at the golden ratio point (day 225)
  if (dayOfYear === PHI_FRACTURE_DAY || dayOfYear > 364) {
    return {
      moonNumber: 0,
      moonName: 'Day Out of Time',
      dayOfMoon: 0,
      galacticSignature: 'Green Central Sun',
      harmonicTone: 'Forgiveness \u2013 Release',
      arc: '\u03C6-point',
      dayOfYear,
      isDayOutOfTime: true
    };
  }

  // Adjust for Day Out of Time being inserted at day 225
  const adjustedDay = dayOfYear > PHI_FRACTURE_DAY ? dayOfYear - 1 : dayOfYear;
  const moonIndex = Math.floor((adjustedDay - 1) / 28);
  const dayOfMoon = ((adjustedDay - 1) % 28) + 1;
  const moon = THIRTEEN_MOONS[Math.min(moonIndex, 12)];

  return {
    moonNumber: moon.number,
    moonName: moon.name,
    dayOfMoon,
    galacticSignature: moon.signature,
    harmonicTone: moon.tone,
    arc: moon.arc,
    dayOfYear,
    isDayOutOfTime: false
  };
}

/**
 * Get the galactic signature for a given date
 */
export function getGalacticSignature(date: Date): {
  signature: string;
  tone: string;
  moonName: string;
  arc: string;
} {
  const moonDate = toThirteenMoonDate(date);
  return {
    signature: moonDate.galacticSignature,
    tone: moonDate.harmonicTone,
    moonName: moonDate.moonName,
    arc: moonDate.arc
  };
}

/**
 * Calculate the aspect (in moon-phases) between two 13-Moon dates
 */
export function calculateMoonAspect(moon1: number, moon2: number): {
  phaseDifference: number;
  resonance: string;
  gf3: number;
} {
  let diff = Math.abs(moon1 - moon2);
  if (diff > 6) diff = 13 - diff; // Shorter arc

  const gf3 = diff % 3;
  const resonanceTypes: Record<number, string> = {
    0: 'Completion',
    1: 'Initiation',
    2: 'Manifestation'
  };

  return {
    phaseDifference: diff,
    resonance: resonanceTypes[gf3],
    gf3
  };
}
