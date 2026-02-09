/**
 * 13Primes - Space-Time Bridge
 * 
 * Maps chart positions (spatial 364°) to calendar moons (temporal 364 days).
 * This is the core innovation: the mathematical identity 13 × 28 = 364
 * unifies spatial astrology with temporal cycles.
 *
 * Space: 13 Salvi Signs × 28° = 364° (chart circle)
 * Time:  13 Moons × 28 days   = 364 days (harmonic calendar)
 *
 * Each sign has a temporal mirror in the 13-Moon calendar:
 *   Ares Prime ↔ Magnetic Moon (Initiation begins)
 *   Vectoris ↔ Lunar Moon (Polarity revealed)
 *   ... and so on for all 13 phases
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import { PHASE_SIZE, NUM_PHASES } from '../core/constants';
import { bijectiveTernaryString } from '../core/ternary-astro';
import { THIRTEEN_MOONS } from './thirteen-moon';
import type { SpaceTimeBridge } from '../core/types';

// ============================================
// SIGN-MOON CORRESPONDENCE TABLE
// ============================================

export const SIGN_MOON_BRIDGE = [
  { sign: 'Ares Prime',  moon: 'Magnetic',      resonance: 'Initiation begins' },
  { sign: 'Vectoris',    moon: 'Lunar',         resonance: 'Polarity revealed' },
  { sign: 'Solaris',     moon: 'Electric',      resonance: 'Energy activated' },
  { sign: 'Liegis',      moon: 'Self-Existing', resonance: 'Form crystallizes' },
  { sign: 'Alphais',     moon: 'Overtone',      resonance: 'Power radiates' },
  { sign: 'Micronis',    moon: 'Rhythmic',      resonance: 'Balance calibrates' },
  { sign: 'Nexus',       moon: 'Resonant',      resonance: 'Connection channels' },
  { sign: 'Alchemis',    moon: 'Galactic',      resonance: 'Transformation integrates' },
  { sign: 'Onyxis',      moon: 'Solar',         resonance: 'Intention pulses' },
  { sign: 'Amalgamis',   moon: 'Planetary',     resonance: 'Manifestation perfects' },
  { sign: 'Quintis',     moon: 'Spectral',      resonance: 'Liberation dissolves' },
  { sign: 'Fallenis',    moon: 'Crystal',       resonance: 'Cooperation dedicates' },
  { sign: 'Optimis',     moon: 'Cosmic',        resonance: 'Presence endures' },
] as const;

// ============================================
// BRIDGE FUNCTIONS
// ============================================

/**
 * Bridge between a Salvi Sign position (364°) and its temporal Moon mirror
 * 
 * @param primeDegree - Position in the 364° circle
 * @returns The space-time bridge data including sign, moon, resonance, and ternary notation
 */
export function getSpaceTimeBridge(primeDegree: number): SpaceTimeBridge {
  const phaseIndex = Math.floor(primeDegree / PHASE_SIZE) % NUM_PHASES;
  const bridge = SIGN_MOON_BRIDGE[phaseIndex];
  const moon = THIRTEEN_MOONS[phaseIndex];

  return {
    sign: bridge.sign,
    moon: bridge.moon,
    resonance: bridge.resonance,
    phaseNumber: phaseIndex + 1,
    bijectiveTernary: bijectiveTernaryString(phaseIndex + 1),
    arc: moon.arc
  };
}

/**
 * Get the full space-time resonance for a chart position
 * Combines sign information with its temporal mirror moon
 * 
 * @param primeDegree - Position in the 364° circle
 * @returns Detailed resonance analysis
 */
export function getFullResonance(primeDegree: number): {
  spatial: SpaceTimeBridge;
  temporal: {
    moonNumber: number;
    moonName: string;
    galacticSignature: string;
    harmonicTone: string;
    arc: string;
  };
  unity: {
    phaseNumber: number;
    degreeInPhase: number;
    dayInMoon: number;
    bijectiveTernary: string;
    resonanceMessage: string;
  };
} {
  const phaseIndex = Math.floor(primeDegree / PHASE_SIZE) % NUM_PHASES;
  const bridge = SIGN_MOON_BRIDGE[phaseIndex];
  const moon = THIRTEEN_MOONS[phaseIndex];
  const degreeInPhase = primeDegree % PHASE_SIZE;

  // Map degree-within-sign to day-within-moon (both are 0-27 range)
  const dayInMoon = Math.floor(degreeInPhase) + 1;

  return {
    spatial: getSpaceTimeBridge(primeDegree),
    temporal: {
      moonNumber: moon.number,
      moonName: moon.name,
      galacticSignature: moon.signature,
      harmonicTone: moon.tone,
      arc: moon.arc
    },
    unity: {
      phaseNumber: phaseIndex + 1,
      degreeInPhase,
      dayInMoon,
      bijectiveTernary: bijectiveTernaryString(phaseIndex + 1),
      resonanceMessage: `${bridge.sign} at ${degreeInPhase.toFixed(1)}\u00B0 mirrors ${moon.name} Moon day ${dayInMoon}: ${bridge.resonance}`
    }
  };
}
