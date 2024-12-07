export const defaultOps = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b
};

export function validateExpression(target, numbers, operations = {}) {
    const ops = Object.keys(operations)
    let stack = [{ subtotal: numbers.at(0), index: 1 }]

    while(stack.length) {
        let { subtotal, index } = stack.pop()
        if (subtotal > target) 
            continue
        
        if (index == numbers.length) {
            if (subtotal == target) 
                return target
            continue
        }

        let next = numbers[index]
        for (const op of ops) {
            let newSubTotal = operations[op](subtotal, next) 
            stack.push({ subtotal: newSubTotal, index: index + 1 })
        }
    }

    return false;
}
