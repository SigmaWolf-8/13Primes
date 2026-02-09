/**
 * 13Primes - 13-Moon Harmonic Calendar
 * 
 * Implements the 13-Moon Harmonic Calendar aligned with the Salvi Framework
 * canonical source (SigmaWolf-8/Ternary: server/salvi-core/ancient-calendar-sync.ts).
 * 
 * Mathematical Foundation:
 *   Time:  13 Moons × 28 days = 364 days
 *   Space: 13 Houses × 28°    = 364°
 * 
 *   Golden Ratio: 364 / φ = 224.93 → Day 225 (0-indexed: 224) = November 11
 *   Fibonacci Split: Pre-φ (8 moons, 224 days) + Post-φ (5 moons, 140 days)
 *   Ratio: 8/5 = 1.600 ≈ φ = 1.618 (within 1.1%)
 *
 * Salvi Framework Alignment (V5.1):
 *   - Year begins April 1 (Salvi Epoch anchor), NOT July 26 (Dreamspell)
 *   - Day Out of Time: November 11 (11/11), the golden ratio point
 *   - In leap years, Hunab Ku Day inserted before Day Out of Time (Nov 10)
 *   - 8 Pre-φ moons + 5 Post-φ moons (Fibonacci 8/5 ≈ φ)
 *   - 28,000-year cycle count (Abri Blanchard bone reference)
 *
 * Historical Attestation:
 *   - Abri Blanchard bone (France, ~28,000 BCE): lunar notation marks
 *   - Ishango bone (Congo, ~20,000 BCE): possible 6-month lunar tally
 *   - Book of Enoch / Dead Sea Scrolls (~300 BCE): 364-day sacred calendar
 *   - Essene/Qumran community: liturgical 364-day calendar
 *   - Celtic/Druidic traditions: 13-month tree calendar
 *
 * Live API: GET https://plenumnet.replit.app/api/salvi/timing/epoch/calendars/thirteen-moon
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import type { ThirteenMoonDate, MoonData } from '../core/types';

// ============================================
// SALVI FRAMEWORK EPOCH CONSTANTS
// ============================================

/** Year begins April 1 (month index 3 in JS Date.UTC) */
export const THIRTEEN_MOON_NEW_YEAR_MONTH = 3;
export const THIRTEEN_MOON_NEW_YEAR_DAY = 1;

/** Day Out of Time falls November 11 (month index 10 in JS Date.UTC) */
export const DAY_OUT_OF_TIME_MONTH = 10;
export const DAY_OUT_OF_TIME_DAY = 11;

/** Golden ratio constants */
export const GOLDEN_RATIO = 1.6180339887498949;
export const GOLDEN_RATIO_DAY = 224; // 0-indexed: 364/φ = 224.93

/** Milliseconds per day */
const MS_PER_DAY = 86_400_000;

// ============================================
// PLASMA WEEKDAYS (7-day cycle)
// ============================================

export const THIRTEEN_MOON_WEEKDAYS = [
  'Dali', 'Seli', 'Gamma', 'Kali', 'Alpha', 'Limi', 'Silio'
] as const;

// ============================================
// THE 13 MOONS
// ============================================

export const THIRTEEN_MOONS: readonly MoonData[] = [
  { number: 1,  name: 'Magnetic',      signature: 'Red Dragon',          tone: 'Purpose – Unify',          arc: 'Pre-φ' },
  { number: 2,  name: 'Lunar',         signature: 'White Wind',          tone: 'Challenge – Flow',         arc: 'Pre-φ' },
  { number: 3,  name: 'Electric',      signature: 'Blue Night',          tone: 'Service – Activate',       arc: 'Pre-φ' },
  { number: 4,  name: 'Self-Existing', signature: 'Yellow Seed',         tone: 'Form – Measure',           arc: 'Pre-φ' },
  { number: 5,  name: 'Overtone',      signature: 'Red Serpent',         tone: 'Radiance – Empower',       arc: 'Pre-φ' },
  { number: 6,  name: 'Rhythmic',      signature: 'White World-Bridger', tone: 'Equality – Organize',      arc: 'Pre-φ' },
  { number: 7,  name: 'Resonant',      signature: 'Blue Hand',           tone: 'Channel – Inspire',        arc: 'Pre-φ' },
  { number: 8,  name: 'Galactic',      signature: 'Yellow Star',         tone: 'Integrity – Harmonize',    arc: 'Pre-φ' },
  { number: 9,  name: 'Solar',         signature: 'Red Moon',            tone: 'Intention – Pulse',        arc: 'Post-φ' },
  { number: 10, name: 'Planetary',     signature: 'White Dog',           tone: 'Manifestation – Perfect',  arc: 'Post-φ' },
  { number: 11, name: 'Spectral',      signature: 'Blue Monkey',         tone: 'Liberation – Dissolve',    arc: 'Post-φ' },
  { number: 12, name: 'Crystal',       signature: 'Yellow Human',        tone: 'Cooperation – Dedicate',   arc: 'Post-φ' },
  { number: 13, name: 'Cosmic',        signature: 'Red Skywalker',       tone: 'Presence – Endure',        arc: 'Post-φ' },
] as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// ============================================
// CONVERSION FUNCTIONS
// ============================================

/**
 * Convert a Gregorian date to its 13-Moon Harmonic Calendar position
 *
 * Aligned with canonical Salvi Framework implementation:
 *   - Year begins April 1 (Salvi Epoch anchor)
 *   - Day Out of Time: November 11 (11/11), the golden ratio point
 *     364/φ = 224.93 → day 224 (0-indexed from April 1) = November 11
 *   - 8 Fibonacci moons before DOT, 5 Fibonacci moons after (8/5 ≈ φ)
 *   - In leap years, Hunab Ku Day is inserted before DOT (Nov 10)
 *   - The DOT exists outside the regular moon count — it belongs to no moon
 *
 * Structure: 13 moons × 28 days = 364 regular days + 1 Day Out of Time
 * Each 28-day moon: Week 1 (1-7), Week 2 (8-14), Week 3 (15-21), Week 4 (22-28)
 * Every day of the month always falls on the same day of the week.
 */
export function toThirteenMoonDate(date: Date): ThirteenMoonDate {
  const gYear = date.getUTCFullYear();
  const dateMs = date.getTime();

  const newYearThisYear = Date.UTC(gYear, THIRTEEN_MOON_NEW_YEAR_MONTH, THIRTEEN_MOON_NEW_YEAR_DAY);
  const thirteenMoonYear = dateMs >= newYearThisYear ? gYear : gYear - 1;

  const yearStartMs = Date.UTC(thirteenMoonYear, THIRTEEN_MOON_NEW_YEAR_MONTH, THIRTEEN_MOON_NEW_YEAR_DAY);
  const daysSinceNewYear = Math.floor((dateMs - yearStartMs) / MS_PER_DAY);

  const dotMs = Date.UTC(thirteenMoonYear, DAY_OUT_OF_TIME_MONTH, DAY_OUT_OF_TIME_DAY);
  const isDayOutOfTime = dateMs >= dotMs && dateMs < dotMs + MS_PER_DAY;

  const leapYearForCycle = thirteenMoonYear + 1;
  const hasLeapDay = isLeapYear(leapYearForCycle);
  const hunabKuMs = hasLeapDay ? Date.UTC(leapYearForCycle, 1, 29) : 0;
  const isHunabKu = hasLeapDay && dateMs >= hunabKuMs && dateMs < hunabKuMs + MS_PER_DAY;

  const totalCycles = thirteenMoonYear + 28000;

  if (isDayOutOfTime) {
    return {
      moonNumber: 0,
      moonName: 'Day Out of Time',
      dayOfMoon: 0,
      galacticSignature: 'Green Central Sun',
      harmonicTone: '∞',
      arc: 'φ-point',
      dayOfYear: GOLDEN_RATIO_DAY + 1,
      isDayOutOfTime: true,
      isHunabKu: false,
      weekday: 'Day Out of Time',
      totalCycles,
      formatted: `Day Out of Time (11/11 — Golden Ratio Point: 364/φ = ${(364 / GOLDEN_RATIO).toFixed(2)}), Year ${thirteenMoonYear} [Cycle ${totalCycles.toLocaleString()}]`
    };
  }

  if (isHunabKu) {
    return {
      moonNumber: 0,
      moonName: 'Hunab Ku Day',
      dayOfMoon: 0,
      galacticSignature: 'Hunab Ku',
      harmonicTone: '0',
      arc: 'Post-φ',
      dayOfYear: 0,
      isDayOutOfTime: false,
      isHunabKu: true,
      weekday: 'Hunab Ku',
      totalCycles,
      formatted: `Hunab Ku Day (Leap Day), Year ${thirteenMoonYear} [Cycle ${totalCycles.toLocaleString()}]`
    };
  }

  let adjustedDay = daysSinceNewYear;

  if (dateMs >= dotMs + MS_PER_DAY) {
    adjustedDay = adjustedDay - 1;
  }
  if (hasLeapDay && dateMs >= hunabKuMs + MS_PER_DAY) {
    adjustedDay = adjustedDay - 1;
  }

  adjustedDay = Math.max(0, Math.min(adjustedDay, 363));

  const moonIndex = Math.floor(adjustedDay / 28);
  const dayInMoon = (adjustedDay % 28) + 1;
  const weekdayIndex = adjustedDay % 7;
  const weekday = THIRTEEN_MOON_WEEKDAYS[weekdayIndex];

  const safeMoonIndex = Math.max(0, Math.min(moonIndex, 12));
  const moon = THIRTEEN_MOONS[safeMoonIndex];

  return {
    moonNumber: moon.number,
    moonName: moon.name,
    dayOfMoon: dayInMoon,
    galacticSignature: moon.signature,
    harmonicTone: moon.tone,
    arc: moon.arc,
    dayOfYear: adjustedDay + 1,
    isDayOutOfTime: false,
    isHunabKu: false,
    weekday,
    totalCycles,
    formatted: `${moon.name} Moon, Day ${dayInMoon} (${weekday}), Year ${thirteenMoonYear} [Cycle ${totalCycles.toLocaleString()}]`
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
  weekday: string;
} {
  const moonDate = toThirteenMoonDate(date);
  return {
    signature: moonDate.galacticSignature,
    tone: moonDate.harmonicTone,
    moonName: moonDate.moonName,
    arc: moonDate.arc,
    weekday: moonDate.weekday ?? ''
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
  if (diff > 6) diff = 13 - diff;

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
