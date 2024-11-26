export function testFunction(input: any) {
    if (input === null) {
        throw new Error('Invalid input');
    }
    return "Hello World";
}