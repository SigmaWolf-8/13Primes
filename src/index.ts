/**
 * 13Primes - Salvi Framework Astrological Vertical
 * 
 * The 13 Primes V5.1 Unified 364° System
 * "One Circle, 13 Phases, Infinite Expressions"
 *
 * Space: 13 Prime Houses × 28° = 364° (chart circle)
 * Time:  13 Moons × 28 days   = 364 days (harmonic calendar)
 * Math:  364 = 2² × 7 × 13    (natural harmonics)
 *
 * @see https://github.com/SigmaWolf-8/Ternary (libternary - core framework)
 * @see https://plenumnet.replit.app (PlenumNET - calendar API)
 * @license All Rights Reserved and Preserved | © Capomastro Holdings Ltd 2026
 */

// Core types
export * from './core/types';

// Constants (signs, houses, aspects, Tribonacci)
export * from './core/constants';

// Coordinate conversions (360° ↔ 364°)
export * from './core/conversions';

// Aspect calculations (364° system)
export * from './core/aspects';

// Ternary astrology operations (GF(3), bijective ternary, resonance)
export * from './core/ternary-astro';

// 13-Moon Harmonic Calendar
export * from './calendar/thirteen-moon';

// Space-Time Bridge (signs ↔ moons)
export * from './calendar/space-time-bridge';
