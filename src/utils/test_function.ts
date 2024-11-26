export function testFunction(input: any): string {
    if (input === null) {
        throw new Error('Invalid input');
    }
    return "Hello World";
}