/**
 * 13Primes - Aspect Calculations
 * 
 * Calculates planetary aspects in the V5.1 Unified 364° circle.
 * Includes the unique Tredecile aspect (28°) - the sign/house resonance aspect.
 *
 * V5.1 Aspect Angles:
 *   Conjunction: 0°, Opposition: 182°, Trine: 121.333°, Square: 91°
 *   Sextile: 60.667°, Quintile: 72.8°, Septile: 52°, Novile: 40.444°
 *   Tredecile: 28° (NEW - 364/13, the sign/house resonance)
 *
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

import { PRIME_CIRCLE, ASPECT_TYPES, ASPECT_TYPES_360 } from './constants';
import { tropicalToPrime } from './conversions';
import { bijectiveTernaryString } from './ternary-astro';
import type { AspectResult, AspectData } from './types';

/**
 * Calculate the aspect between two planetary positions
 * @param degree1 - First planet's tropical longitude (360°)
 * @param degree2 - Second planet's tropical longitude (360°)
 * @param use364 - Use 364° system (true) or legacy 360° (false)
 */
export function calculateAspect(
  degree1: number,
  degree2: number,
  use364: boolean = true
): AspectResult | null {
  if (use364) {
    const prime1 = tropicalToPrime(degree1);
    const prime2 = tropicalToPrime(degree2);

    let diff = Math.abs(prime1 - prime2) % PRIME_CIRCLE;
    if (diff > PRIME_CIRCLE / 2) diff = PRIME_CIRCLE - diff;

    for (const [type, config] of Object.entries(ASPECT_TYPES)) {
      const orbDiff = Math.abs(diff - config.angle);
      if (orbDiff <= config.orb) {
        return {
          type,
          exact: config.angle,
          orb: orbDiff,
          harmonic: config.harmonic,
          ternary: {
            phaseCount: config.phaseCount,
            gf3: config.gf3,
            resonance: config.ternaryResonance,
            bijectiveNotation: bijectiveTernaryString(config.phaseCount)
          }
        };
      }
    }
  } else {
    const diff = Math.abs(((degree1 - degree2 + 180) % 360) - 180);

    for (const [type, config] of Object.entries(ASPECT_TYPES_360)) {
      const orbDiff = Math.abs(diff - config.angle);
      if (orbDiff <= config.orb) {
        return { type, exact: config.angle, orb: orbDiff, harmonic: 0 };
      }
    }
  }

  return null;
}

/**
 * Calculate all aspects between a set of planets in the 364° circle
 * @param planets - Record of planet names to their tropical longitudes
 */
export function calculateAllAspects364(
  planets: Record<string, { long: number }>
): AspectData[] {
  const aspects: AspectData[] = [];
  const planetList = Object.keys(planets);

  for (let i = 0; i < planetList.length; i++) {
    for (let j = i + 1; j < planetList.length; j++) {
      const p1 = planetList[i];
      const p2 = planetList[j];
      const long1 = planets[p1].long;
      const long2 = planets[p2].long;

      const aspect = calculateAspect(long1, long2, true);
      if (aspect) {
        const prime1 = tropicalToPrime(long1);
        const prime2 = tropicalToPrime(long2);
        let actualAngle = Math.abs(prime1 - prime2) % PRIME_CIRCLE;
        if (actualAngle > PRIME_CIRCLE / 2) actualAngle = PRIME_CIRCLE - actualAngle;

        aspects.push({
          planet1: p1,
          planet2: p2,
          aspect: aspect.type,
          angle: actualAngle,
          exactAngle: aspect.exact,
          orb: aspect.orb,
          harmonic: aspect.harmonic || 0,
          ternary: aspect.ternary
        });
      }
    }
  }

  return aspects;
}

/**
 * Detect stelliums (3+ planets in the same sign)
 */
export function detectStelliums(
  positions: Record<string, { long: number }>
): { planets: string[]; sign: string }[] {
  const stelliums: { planets: string[]; sign: string }[] = [];
  const planetList = Object.entries(positions);

  const signGroups: Record<string, string[]> = {};
  for (const [planet, data] of planetList) {
    const normalizedDegree = ((data.long % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedDegree / 30);
    const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    const sign = signs[signIndex] || 'Unknown';
    if (!signGroups[sign]) signGroups[sign] = [];
    signGroups[sign].push(planet);
  }

  for (const [sign, planets] of Object.entries(signGroups)) {
    if (planets.length >= 3) {
      stelliums.push({ planets, sign });
    }
  }

  return stelliums;
}
