function toCamelCase(str) {
    return str
        .toLowerCase()
        .trim()
        .split(/[\s_-]+/)
        .map((word, index) => {
            return index === 0 
                ? word 
                : word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
}

// Example usage:
console.log(toCamelCase('hello world'));           // helloWorld
console.log(toCamelCase('hello_world'));           // helloWorld
console.log(toCamelCase('hello-world-example'));   // helloWorldExample
console.log(toCamelCase('HELLO WORLD'));           // helloWorld
console.log(toCamelCase('hello   world'));         // helloWorld