
import { generateUuidv4, stableHash, strToIntOrUndefined } from './UtilsLib';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('generateUuidv4', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates a valid v4 UUID string', () => {
    const uuid = generateUuidv4();
    expect(typeof uuid).toBe('string');
    expect(UUID_V4_REGEX.test(uuid)).toBe(true);
  });

  it('has correct length, version and variant positions', () => {
    const uuid = generateUuidv4();
    expect(uuid.length).toBe(36); // 32 hex chars + 4 hyphens
    expect(uuid.charAt(14)).toBe('4'); // version nibble is '4' at index 14
    const variantChar = uuid.charAt(19).toLowerCase();
    expect(['8', '9', 'a', 'b']).toContain(variantChar); // variant must be 8,9,a or b
  });

  it('uses Math.random for each hex placeholder (31 calls)', () => {
    const spy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    generateUuidv4();
    expect(spy).toHaveBeenCalledTimes(31);
  });

  it('generates unique UUIDs across multiple calls', () => {
    const iterations = 100;
    const set = new Set<string>();
    for (let i = 0; i < iterations; i++) {
      set.add(generateUuidv4());
    }
    expect(set.size).toBe(iterations);
  });
});

describe('stableHash', () => {
  it('creates the same hash for different object with same properties', () => {
    const hash1 = stableHash({ a: 1, b: "2" });
    const hash2 = stableHash({ b: "2", a: 1 });

    expect(hash1).toEqual(hash2);
  });
});

describe('strToIntOrUndefined', () => {
  it('returns number for valid integer string', () => {
    expect(strToIntOrUndefined('10')).toBe(10);
    expect(strToIntOrUndefined('0')).toBe(0);
    expect(strToIntOrUndefined('-5')).toBe(-5);
  });

  it('returns undefined for empty string', () => {
    expect(strToIntOrUndefined('')).toBeUndefined();
  });

  it('returns undefined for invalid numbers', () => {
    expect(strToIntOrUndefined('abc')).toBeUndefined();
    expect(strToIntOrUndefined('10abc')).toBe(10); // parseInt behavior
  });

  it('handles whitespace', () => {
    expect(strToIntOrUndefined(' 15 ')).toBe(15);
  });

  it('returns undefined for non-numeric symbols', () => {
    expect(strToIntOrUndefined('#')).toBeUndefined();
    expect(strToIntOrUndefined('!')).toBeUndefined();
  });
});
