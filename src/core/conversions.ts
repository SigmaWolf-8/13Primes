/**
 * 13Primes - Coordinate Conversions
 * 
 * Converts between traditional 360° tropical coordinates (from astronomy-engine)
 * and the unified 364° Prime system. All storage uses 360°; interpretation uses 364°.
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import { PRIME_CIRCLE, PHASE_SIZE, NUM_PHASES, SALVI_SIGNS, HOUSE_NAMES, EPSILON } from './constants';
import type { SalviSignResult, HouseResult } from './types';

/**
 * Convert traditional 360° tropical longitude to unified 364° system
 */
export function tropicalToPrime(tropicalDegree: number): number {
  const normalized360 = ((tropicalDegree % 360) + 360) % 360;
  let prime = normalized360 * PRIME_CIRCLE / 360;
  if (Math.abs(prime - PRIME_CIRCLE) < EPSILON) {
    prime = 0;
  }
  return ((prime % PRIME_CIRCLE) + PRIME_CIRCLE) % PRIME_CIRCLE;
}

/**
 * V5.1: tropicalToSalvi now also uses 364° (unified with Prime)
 * In V5.0 this was 728°, now everything is 364°
 */
export function tropicalToSalvi(tropicalDegree: number): number {
  return tropicalToPrime(tropicalDegree);
}

/**
 * Legacy function for backward compatibility (V5.0 728° system)
 */
export function tropicalToSalviLegacy(tropicalDegree: number): number {
  return ((tropicalDegree * 728 / 360) % 728 + 728) % 728;
}

/**
 * Get the Salvi sign (1-13) from a 364° position
 */
export function getSalviSignFromPrimeDegree(primeDegree: number): SalviSignResult {
  let normalizedDegree = ((primeDegree % PRIME_CIRCLE) + PRIME_CIRCLE) % PRIME_CIRCLE;
  if (Math.abs(normalizedDegree - PRIME_CIRCLE) < EPSILON) {
    normalizedDegree = 0;
  }
  
  let signIndex = Math.floor(normalizedDegree / PHASE_SIZE);
  if (signIndex >= NUM_PHASES) signIndex = NUM_PHASES - 1;
  if (signIndex < 0) signIndex = 0;
  
  const sign = SALVI_SIGNS[signIndex];
  
  return {
    signNumber: signIndex + 1,
    signName: sign.name,
    archetype: sign.archetype,
    degreeInSign: normalizedDegree % PHASE_SIZE,
    element: sign.element,
    tribonacci: sign.tribonacci
  };
}

/**
 * Get Salvi sign directly from tropical (360°) degree
 */
export function getSalviSignFromTropical(tropicalDegree: number): SalviSignResult {
  const primeDegree = tropicalToPrime(tropicalDegree);
  return getSalviSignFromPrimeDegree(primeDegree);
}

/**
 * Calculate the 13 Prime house cusps from the tropical ascendant
 */
export function getPrimeCusps(tropicalAscendant: number): number[] {
  const ascPrime = tropicalToPrime(tropicalAscendant);
  const cusps: number[] = [];
  for (let i = 0; i < NUM_PHASES; i++) {
    cusps.push(((ascPrime + i * PHASE_SIZE) % PRIME_CIRCLE + PRIME_CIRCLE) % PRIME_CIRCLE);
  }
  return cusps;
}

/**
 * Get which Prime house a planet falls in, given the house cusps
 */
export function getHouseFromDegree(degree: number, houseCusps: number[]): HouseResult {
  const primeDegree = tropicalToPrime(degree);
  const ascendantPrime = tropicalToPrime(houseCusps[0]);
  
  const relativePos = ((primeDegree - ascendantPrime) % PRIME_CIRCLE + PRIME_CIRCLE) % PRIME_CIRCLE;
  
  let houseIndex = Math.floor(relativePos / PHASE_SIZE);
  if (houseIndex >= NUM_PHASES) houseIndex = NUM_PHASES - 1;
  
  return {
    house: houseIndex + 1,
    houseName: HOUSE_NAMES[houseIndex] || `House ${houseIndex + 1}`,
    alsoIn13th: houseIndex + 1 === 13,
    primeDegree
  };
}

/**
 * Check if a degree falls in the 13th house (Optimus Prime)
 */
export function isIn13thHouse(degree: number, houseCusps: number[]): boolean {
  if (houseCusps.length < NUM_PHASES) return false;
  
  const primeDegree = tropicalToPrime(degree);
  const ascendantPrime = tropicalToPrime(houseCusps[0]);
  
  const relativePos = ((primeDegree - ascendantPrime) % PRIME_CIRCLE + PRIME_CIRCLE) % PRIME_CIRCLE;
  
  const house13Start = 12 * PHASE_SIZE;
  const house13End = 13 * PHASE_SIZE;
  
  return relativePos >= house13Start && relativePos < house13End;
}

/**
 * Convert decimal to standard ternary string with subscript
 */
export function convertToTernary(n: number): string {
  if (n === 0) return '0\u2083';
  const digits: string[] = [];
  let num = n;
  while (num > 0) {
    digits.unshift(String(num % 3));
    num = Math.floor(num / 3);
  }
  return digits.join('') + '\u2083';
}
