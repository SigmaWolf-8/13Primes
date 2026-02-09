/**
 * 13Primes - Ternary Astrology Operations
 *
 * Implements bijective ternary logic and GF(3) operations for astrological
 * aspect analysis. Aligned with libternary API conventions.
 *
 * Three Representations:
 *   A (Computational): {-1, 0, +1} - Internal processing
 *   B (Network):       {0, 1, 2}   - Data transmission
 *   C (Human):         {1, 2, 3}   - Display/logging (bijective)
 *
 * Bijection Formulas:
 *   A→B: f(a) = a + 1    B→A: f(b) = b - 1
 *   A→C: f(a) = a + 2    C→A: f(c) = c - 2
 *   B→C: f(b) = b + 1    C→B: f(c) = c - 1
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import { PRIME_CIRCLE, PHASE_SIZE, RESONANCE_TYPES } from './constants';
import { tropicalToPrime, convertToTernary } from './conversions';
import type {
  TritA, TritB, TritC, Representation,
  TernaryValue, ConversionResult, OperationResult,
  TernaryTriple, AspectTernarySignature, AspectResonance, TernaryHarmony
} from './types';

// ============================================
// TRIT CONVERSION (matches libternary API)
// ============================================

export function getTritMeaning(value: number, representation: Representation): 'False' | 'Neutral' | 'True' {
  switch (representation) {
    case 'A': return value === -1 ? 'False' : value === 0 ? 'Neutral' : 'True';
    case 'B': return value === 0 ? 'False' : value === 1 ? 'Neutral' : 'True';
    case 'C': return value === 1 ? 'False' : value === 2 ? 'Neutral' : 'True';
    default: return 'Neutral';
  }
}

export function convertTrit(value: number, from: Representation, to: Representation): ConversionResult {
  let converted: number;
  let bijection: string;

  if (from === to) { converted = value; bijection = 'identity'; }
  else if (from === 'A' && to === 'B') { converted = value + 1; bijection = 'f(a) = a + 1'; }
  else if (from === 'A' && to === 'C') { converted = value + 2; bijection = 'f(a) = a + 2'; }
  else if (from === 'B' && to === 'A') { converted = value - 1; bijection = 'f(b) = b - 1'; }
  else if (from === 'B' && to === 'C') { converted = value + 1; bijection = 'f(b) = b + 1'; }
  else if (from === 'C' && to === 'A') { converted = value - 2; bijection = 'f(c) = c - 2'; }
  else if (from === 'C' && to === 'B') { converted = value - 1; bijection = 'f(c) = c - 1'; }
  else { throw new Error(`Invalid conversion: ${from} to ${to}`); }

  return {
    original: { value: value as any, representation: from, meaning: getTritMeaning(value, from) },
    converted: { value: converted as any, representation: to, meaning: getTritMeaning(converted, to) },
    bijection
  };
}

// ============================================
// GF(3) OPERATIONS (matches libternary API)
// ============================================

export function ternaryAdd(a: TritA, b: TritA): OperationResult {
  const result = (((a + 1) + (b + 1)) % 3 - 1) as TritA;
  return { operands: { a, b }, operation: 'ternary_addition', result, representation: 'A', constantTime: true };
}

export function ternaryMultiply(a: TritA, b: TritA): OperationResult {
  const result = (((a + 1) * (b + 1)) % 3 - 1) as TritA;
  return { operands: { a, b }, operation: 'ternary_multiplication', result, representation: 'A', constantTime: true };
}

export function ternaryRotate(value: TritA, steps: number = 1): OperationResult {
  const normalizedSteps = ((steps % 3) + 3) % 3;
  const rotated = ((value + 1) + normalizedSteps) % 3;
  const result = (rotated - 1) as TritA;
  return { operands: { a: value, b: steps }, operation: 'ternary_rotation', result, representation: 'A', constantTime: true };
}

export function ternaryXor(a: TritA, b: TritA): OperationResult {
  let result: TritA;
  if (a === b) result = 0;
  else if (a === 0) result = b;
  else if (b === 0) result = a;
  else result = 0;
  return { operands: { a, b }, operation: 'ternary_xor', result, representation: 'A', constantTime: true };
}

export function ternaryNot(value: TritA): OperationResult {
  return { operands: { a: value, b: 0 }, operation: 'ternary_not', result: (-value) as TritA, representation: 'A', constantTime: true };
}

export const GF3 = {
  add: (a: TritB, b: TritB): TritB => ((a + b) % 3) as TritB,
  subtract: (a: TritB, b: TritB): TritB => (((a - b) % 3 + 3) % 3) as TritB,
  multiply: (a: TritB, b: TritB): TritB => ((a * b) % 3) as TritB,
  negate: (a: TritB): TritB => ((3 - a) % 3) as TritB
};

// ============================================
// BIJECTIVE TERNARY CONVERSION
// ============================================

export function toBijectiveTernary(n: number): TritC[] {
  if (n <= 0) return [1];
  const digits: TritC[] = [];
  let num = n;
  while (num > 0) {
    let remainder = num % 3;
    if (remainder === 0) { remainder = 3; num = Math.floor(num / 3) - 1; }
    else { num = Math.floor(num / 3); }
    digits.unshift(remainder as TritC);
  }
  return digits;
}

export function fromBijectiveTernary(digits: TritC[]): number {
  let result = 0;
  for (const d of digits) result = result * 3 + d;
  return result;
}

export function bijectiveTernaryString(n: number): string {
  return toBijectiveTernary(n).join('') + '\u2083\u1D47';
}

// ============================================
// INFORMATION DENSITY (matches libternary API)
// ============================================

export function calculateInformationDensity(tritCount: number): {
  trits: number;
  bitsEquivalent: number;
  efficiencyGain: string;
} {
  const log2of3 = Math.log2(3);
  return {
    trits: tritCount,
    bitsEquivalent: Math.round(tritCount * log2of3 * 100) / 100,
    efficiencyGain: `+${((log2of3 - 1) * 100).toFixed(2)}%`
  };
}

// ============================================
// ASPECT TERNARY ANALYSIS
// ============================================

export function getAspectTernarySignature(angle: number): AspectTernarySignature {
  const phaseCount = Math.round(angle / PHASE_SIZE);
  const mod3 = (phaseCount % 3) as TritB;
  const density = calculateInformationDensity(phaseCount);

  return {
    phaseCount,
    ternary: convertToTernary(phaseCount),
    bijectiveTernary: bijectiveTernaryString(phaseCount),
    gf3: mod3,
    resonance: RESONANCE_TYPES[mod3],
    resonanceTriple: {
      a: (mod3 === 0 ? 0 : mod3 === 1 ? 1 : -1) as TritA,
      b: mod3,
      c: (mod3 === 0 ? 3 : mod3) as TritC
    },
    informationDensity: density.efficiencyGain
  };
}

export function calculateAspectResonance(aspectAngle: number): AspectResonance {
  const phaseCount = Math.round(aspectAngle / PHASE_SIZE);
  const gf3Value = (phaseCount % 3) as TritB;
  return {
    gf3Value,
    resonanceType: RESONANCE_TYPES[gf3Value],
    cosmicFrequency: phaseCount > 0 ? PRIME_CIRCLE / phaseCount : PRIME_CIRCLE
  };
}

export function calculateTernaryHarmony(angle1: number, angle2: number): TernaryHarmony {
  const prime1 = tropicalToPrime(angle1);
  const prime2 = tropicalToPrime(angle2);

  let diff = Math.abs(prime1 - prime2) % PRIME_CIRCLE;
  if (diff > PRIME_CIRCLE / 2) diff = PRIME_CIRCLE - diff;

  const phaseOffset = Math.round(diff / PHASE_SIZE);
  const mod3 = phaseOffset % 3;

  return {
    difference: diff,
    phaseOffset,
    harmonicResonance: mod3 === 0 ? 'transcendent' : mod3 === 1 ? 'aligned' : 'dynamic',
    ternarySignature: bijectiveTernaryString(phaseOffset)
  };
}
