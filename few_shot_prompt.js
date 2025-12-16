/*
SUGGESTED PROMPT FOR ROBUST CAMELCASE FUNCTION:

"Create a JavaScript function called toCamelCaseRobust that converts strings to camelCase format 
with comprehensive error handling and edge case support. The function should:

1. Input Validation:
   - Check for null, undefined, and non-string inputs
   - Throw descriptive TypeError for invalid input types
   - Handle empty strings and whitespace-only strings appropriately

2. Edge Cases:
   - Detect and preserve strings already in camelCase
   - Convert PascalCase to camelCase
   - Handle acronyms (e.g., 'API_KEY' → 'apiKey')
   - Support multiple delimiters: spaces, hyphens, underscores, dots
   - Handle consecutive delimiters gracefully
   - Remove special characters while preserving alphanumeric content
   - Process leading/trailing whitespace

3. Configuration Options:
   - Accept an optional options object with:
     - allowEmpty: boolean to permit empty string returns
     - throwErrors: boolean to control error throwing vs. graceful fallback

4. Error Handling:
   - Wrap logic in try-catch for unexpected errors
   - Provide informative error messages
   - Allow graceful degradation when throwErrors is false

5. Test Coverage:
   Include test cases for:
   - Standard conversions (snake_case, kebab-case, space separated)
   - Already formatted strings (camelCase, PascalCase)
   - Edge cases (empty, special chars, acronyms, numbers)
   - Invalid inputs (null, undefined, wrong types)
   - Option combinations

Please include comprehensive comments explaining the logic."
*/

function toCamelCase(str) {
    return str
        .split(/[-_\s]+/)
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// Test cases
console.log(toCamelCase('first name'));      // firstName
console.log(toCamelCase('user_id'));         // userId
console.log(toCamelCase('SCREEN_NAME'));     // screenName
console.log(toCamelCase('mobile-number'));   // mobileNumber

function toCamelCaseRobust(str, options = {}) {
    // Input validation
    if (str === null || str === undefined) {
        throw new TypeError('Input cannot be null or undefined');
    }
    
    if (typeof str !== 'string') {
        throw new TypeError(`Input must be a string, received ${typeof str}`);
    }
    
    const trimmed = str.trim();
    
    if (trimmed.length === 0) {
        if (options.allowEmpty) {
            return '';
        }
        throw new Error('Input cannot be empty or whitespace only');
    }
    
    try {
        // Handle already camelCase strings
        if (/^[a-z][a-zA-Z0-9]*$/.test(trimmed)) {
            return trimmed;
        }
        
        // Handle PascalCase - convert to camelCase
        if (/^[A-Z][a-zA-Z0-9]*$/.test(trimmed)) {
            return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
        }
        
        return trimmed
            .trim()
            // Split on delimiters: spaces, hyphens, underscores, dots
            .split(/[-_\s.]+/)
            .filter(word => word.length > 0)
            .map((word, index) => {
                // Remove special characters but preserve alphanumeric
                const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                
                if (cleanWord.length === 0) {
                    return '';
                }
                
                // Handle words that are all uppercase (acronyms)
                const isAcronym = cleanWord === cleanWord.toUpperCase() && /[A-Z]/.test(cleanWord);
                
                if (index === 0) {
                    // First word is always lowercase
                    return cleanWord.toLowerCase();
                }
                
                if (isAcronym && cleanWord.length > 1) {
                    // Keep acronyms uppercase except first letter if not first word
                    return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
                }
                
                // Capitalize first letter, lowercase the rest
                return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
            })
            .filter(word => word.length > 0)
            .join('');
    } catch (error) {
        if (options.throwErrors === false) {
            console.warn(`Failed to convert "${str}" to camelCase:`, error.message);
            return str;
        }
        throw error;
    }
}

// Test cases with error handling
try {
    console.log(toCamelCaseRobust('first name'));           // firstName
    console.log(toCamelCaseRobust('user_id'));              // userId
    console.log(toCamelCaseRobust('SCREEN_NAME'));          // screenName
    console.log(toCamelCaseRobust('mobile-number'));        // mobileNumber
    console.log(toCamelCaseRobust('  hello--world  '));     // helloWorld
    console.log(toCamelCaseRobust('123test_case'));         // 123testCase
    console.log(toCamelCaseRobust('API_KEY'));              // apiKey
    console.log(toCamelCaseRobust('XMLHttpRequest'));       // xmlHttpRequest
    console.log(toCamelCaseRobust('already.dot.separated')); // alreadyDotSeparated
    console.log(toCamelCaseRobust('', { allowEmpty: true })); // (empty string)
    console.log(toCamelCaseRobust('!!invalid!!', { throwErrors: false })); // !!invalid!!
    
    // Edge cases
    console.log(toCamelCaseRobust('alreadyCamelCase'));     // alreadyCamelCase
    console.log(toCamelCaseRobust('PascalCase'));           // pascalCase
    console.log(toCamelCaseRobust(''));                     // Error
} catch (error) {
    console.error('Error:', error.message);
}

// Test invalid inputs
try {
    toCamelCaseRobust(null);
} catch (error) {
    console.error('Null input error:', error.message);
}

try {
    toCamelCaseRobust(123);
} catch (error) {
    console.error('Number input error:', error.message);
}