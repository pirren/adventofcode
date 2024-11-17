export default function scoreRecipes(input, { countCalories = false} = {}) {
    const spoons = 100;

    let ingredients = input.map(x => parseIngredients(x, countCalories));
    let max = 0;

    for (let a = 0; a <= spoons; a++) {
        for (let b = 0; b <= spoons - a; b++) {
            for (let c = 0; c <= spoons - a - b; c++) {
                let d = spoons - a - b - c;
                let score = scoreRecipe(ingredients, [a, b, c, d]);
                max = Math.max(score, max);
            }
        }
    }
    
    return max
}

function scoreRecipe(ingredients, amounts) {
    return Object.keys(ingredients[0]).reduce((score, property) => {
        let propertyScore = 0;
        for (let i = 0; i < ingredients.length; i++) {
            propertyScore += ingredients[i][property] * amounts[i];
        }
        if (property === 'calories' && propertyScore !== 500) {
            return 0;
        }
        return score * (property == 'calories' ? 1 : Math.max(0, propertyScore));
    }, 1);
}

function parseIngredients(line, countCalories = false) {
    let properties = line.split(': ').at(-1).split(', ');

    if (!countCalories) properties = properties.slice(0, -1);

    return {
        ...properties.reduce((obj, property) => {
            let [key, value] = property.split(' ');
            obj[key] = Number(value);
            return obj;
        }, {})
    }
}
