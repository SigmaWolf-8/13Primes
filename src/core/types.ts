/**
 * 13Primes - Core Types
 * 
 * Shared types aligned with libternary conventions (TritA/B/C naming).
 * Defines the type system for the 13 Primes V5.1 Unified 364° System.
 *
 * @see https://github.com/SigmaWolf-8/Ternary (libternary)
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

// ============================================
// TERNARY TYPES (aligned with libternary)
// ============================================

export type TritA = -1 | 0 | 1;  // Computational
export type TritB = 0 | 1 | 2;   // Network
export type TritC = 1 | 2 | 3;   // Human (bijective)

export type Representation = 'A' | 'B' | 'C';

export interface TernaryTriple {
  a: TritA;
  b: TritB;
  c: TritC;
}

export interface TernaryValue {
  value: TritA | TritB | TritC;
  representation: Representation;
  meaning: 'False' | 'Neutral' | 'True';
}

export interface ConversionResult {
  original: TernaryValue;
  converted: TernaryValue;
  bijection: string;
}

export interface OperationResult {
  operands: { a: number; b: number };
  operation: string;
  result: number;
  representation: Representation;
  constantTime: boolean;
}

// ============================================
// SALVI SIGN TYPES
// ============================================

export interface SalviSign {
  name: string;
  archetype: string;
  traditional: string;
  element: string;
  startDegree: number;
  endDegree: number;
  tribonacci: number;
}

export interface SalviSignResult {
  signNumber: number;
  signName: string;
  archetype: string;
  degreeInSign: number;
  element: string;
  tribonacci: number;
}

// ============================================
// HOUSE TYPES
// ============================================

export interface HouseResult {
  house: number;
  houseName: string;
  alsoIn13th: boolean;
  primeDegree: number;
}

export interface HouseMeaning {
  theme: string;
  domain: string;
  archetype: string;
  shadow: string;
  gift: string;
  keyInsight: string;
  description: string;
  lifeArea: string;
  coreQuestion: string;
}

// ============================================
// ASPECT TYPES
// ============================================

export interface AspectConfig {
  angle: number;
  orb: number;
  nature: string;
  symbol: string;
  power: number;
  harmonic: number;
  phaseCount: number;
  gf3: 0 | 1 | 2;
  ternaryResonance: string;
}

export interface AspectResult {
  type: string;
  exact: number;
  orb: number;
  harmonic: number;
  ternary?: {
    phaseCount: number;
    gf3: 0 | 1 | 2;
    resonance: string;
    bijectiveNotation: string;
  };
}

export interface AspectData {
  planet1: string;
  planet2: string;
  aspect: string;
  angle: number;
  exactAngle: number;
  orb: number;
  harmonic: number;
  ternary?: {
    phaseCount: number;
    gf3: 0 | 1 | 2;
    resonance: string;
    bijectiveNotation: string;
  };
}

export interface AspectTernarySignature {
  phaseCount: number;
  ternary: string;
  bijectiveTernary: string;
  gf3: TritB;
  resonance: string;
  resonanceTriple: TernaryTriple;
  informationDensity: string;
}

export interface AspectResonance {
  gf3Value: TritB;
  resonanceType: string;
  cosmicFrequency: number;
}

export interface TernaryHarmony {
  difference: number;
  phaseOffset: number;
  harmonicResonance: 'aligned' | 'dynamic' | 'transcendent';
  ternarySignature: string;
}

// ============================================
// 13-MOON CALENDAR TYPES
// ============================================

export interface ThirteenMoonDate {
  moonNumber: number;
  moonName: string;
  dayOfMoon: number;
  galacticSignature: string;
  harmonicTone: string;
  arc: 'Pre-\u03C6' | 'Post-\u03C6' | '\u03C6-point';
  dayOfYear: number;
  isDayOutOfTime: boolean;
}

export interface MoonData {
  number: number;
  name: string;
  signature: string;
  tone: string;
  arc: 'Pre-\u03C6' | 'Post-\u03C6';
}

export interface SpaceTimeBridge {
  sign: string;
  moon: string;
  resonance: string;
  phaseNumber: number;
  bijectiveTernary: string;
  arc: string;
}
