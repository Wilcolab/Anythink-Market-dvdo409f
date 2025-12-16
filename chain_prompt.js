/**
 * Converts strings to kebab-case format
 * 
 * A comprehensive string conversion utility that transforms various input formats
 * (camelCase, PascalCase, snake_case, etc.) into kebab-case.
 * 
 * @param {string} input - The string to convert to kebab-case
 * @returns {string} The kebab-case formatted string
 * @throws {TypeError} If input is not a string
 * 
 * @example
 * toKebabCase('camelCaseString') // 'camel-case-string'
 * toKebabCase('PascalCaseString') // 'pascal-case-string'
 * toKebabCase('snake_case_string') // 'snake-case-string'
 * toKebabCase('Already-kebab-case') // 'already-kebab-case'
 */
function toKebabCase(input) {
    // Step 1: Input validation
    if (typeof input !== 'string') {
        throw new TypeError(`Expected string, received ${typeof input}`);
    }

    if (input.length === 0) {
        return '';
    }

    // Step 2: Handle camelCase and PascalCase
    // Insert hyphen before uppercase letters
    let result = input.replace(/([a-z])([A-Z])/g, '$1-$2');

    // Step 3: Handle consecutive uppercase letters (e.g., XMLParser -> xml-parser)
    result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');

    // Step 4: Handle special characters and edge cases
    // Replace underscores, spaces, and other special chars with hyphens
    result = result.replace(/[_\s\.]+/g, '-');

    // Remove multiple consecutive hyphens
    result = result.replace(/-+/g, '-');

    // Step 5: Convert to lowercase and trim hyphens
    result = result.toLowerCase().replace(/^-+|-+$/g, '');

    return result;
}

// Comprehensive test suite
const testCases = [
    { input: 'camelCaseString', expected: 'camel-case-string' },
    { input: 'PascalCaseString', expected: 'pascal-case-string' },
    { input: 'snake_case_string', expected: 'snake-case-string' },
    { input: 'already-kebab-case', expected: 'already-kebab-case' },
    { input: 'XMLParser', expected: 'xml-parser' },
    { input: 'HTTPSConnection', expected: 'https-connection' },
    { input: 'simple', expected: 'simple' },
    { input: 'CONSTANT_VALUE', expected: 'constant-value' },
    { input: 'mixed_CamelCase-String', expected: 'mixed-camel-case-string' },
    { input: '  spaced  string  ', expected: 'spaced-string' },
];

console.log('Testing toKebabCase function:\n');
testCases.forEach(({ input, expected }) => {
    const result = toKebabCase(input);
    const passed = result === expected;
    console.log(`${passed ? '✓' : '✗'} toKebabCase('${input}') => '${result}'`);
    if (!passed) {
        console.log(`  Expected: '${expected}'`);
    }
});

// Error handling tests
console.log('\nTesting error handling:\n');
try {
    toKebabCase(123);
} catch (error) {
    console.log(`✓ Caught error for number input: ${error.message}`);
}

try {
    toKebabCase(null);
} catch (error) {
    console.log(`✓ Caught error for null input: ${error.message}`);
}

module.exports = toKebabCase;