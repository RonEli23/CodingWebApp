import { CodeBlock } from "./CodeBlockClass";

export const basicFunction = new CodeBlock(
    "Basic Function and Variable Declaration",
    `// Declare a function called greet that takes a parameter called name and logs "Hello, <name>!" to the console.
    // Call the function with your name as an argument.
    
    // Your code here`,
    `function greet(name) {
        console.log("Hello", name, "!");
    }
    
    greet("John");`
)

export const asyncFunction = new CodeBlock(
    "Asynchronous Function",
    `// Write an asynchronous function called fetchData that simulates fetching data from an API.
    // Use async and await to fetch data from a pretend API endpoint after a delay of 2 seconds.
    // Log the fetched data to the console.
    async function fetchData() {
        async function fetchFromAPI() {
            // Your code here
        }
    
        try {
            // Your code here
        } catch (error) {
            // Your code here
        }
    }
    
    fetchData();`,
    `async function fetchData() {
        async function fetchFromAPI() {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds
            return { exampleData: "This is some fetched data" }; // Simulated fetched data
        }
    
        try {
            const data = await fetchFromAPI();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    fetchData();`
)


export const JSONWork = new CodeBlock(
    "Working with JSON Data",
    `// Create a function called parseJSON that takes a JSON string as input and parses it into a JavaScript object.
    // Call the function with the provided JSON string.
    
    const jsonString = '{"name": "Alice", "age": 30, "city": "New York"}';
    
    // Your code here`,
    `function parseJSON(jsonString) {
        return JSON.parse(jsonString);
    }
    
    const jsonString = '{"name": "Alice", "age": 30, "city": "New York"}';
    const parsedObject = parseJSON(jsonString);
    console.log(parsedObject);`
)

export const arrayManipulation = new CodeBlock(
    "Array Manipulation",
    `// Create an array called numbers containing some random numbers.
    // Write a function called filterEvenNumbers that takes an array of numbers as input and returns a new array containing only the even numbers.
    
    // Your code here`,
    `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function filterEvenNumbers(arr) {
        return arr.filter(num => num % 2 === 0);
    }
    
    const evenNumbers = filterEvenNumbers(numbers);
    console.log(evenNumbers);`
)
