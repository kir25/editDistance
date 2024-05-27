import {
    minimalDistance,
    insertIntoArray,
    applyReplacement,
    applyDeletion,
    applyInsertion,
    getDp,
    calculateEditDistanceStep
} from '../utils';

describe('insertIntoArray', () => {
    test('inserts item into the array', () => {
        const originalArray = [1, 2, 4, 5];
        const index = 2;
        const newItem = 3;
        const expectedArray = [1, 2, 3, 4, 5];
        expect(insertIntoArray(originalArray, index, newItem)).toEqual(expectedArray);
    });
});

describe('applyReplacement', () => {
    test('replaces an element correctly in the array', () => {
        const curWord = ['h', 'e', 'l', 'l', 'o'];
        const curI = 1;
        const curJ = 2;
        const word1 = ['w', 'o', 'r', 'l', 'd'];
        const expectedResult = ['h', 'e', 'o', 'l', 'o'];
        const expectedIndices = [0, 1];

        const result = applyReplacement(curWord, curI, curJ, word1);

        expect(curWord).toEqual(expectedResult);
        expect(result).toEqual(expectedIndices);
    });
});

describe('applyDeletion', () => {
    test('deletes an element correctly in the array', () => {
        const curWord = ['h', 'e', 'l', 'l', 'o'];
        const curJ = 2;
        const expectedResult = ['h', 'e', '', 'l', 'o'];
        const expectedIndex = 1;

        const result = applyDeletion(curWord, curJ);

        expect(curWord).toEqual(expectedResult);
        expect(result).toEqual(expectedIndex);
    });
})

describe('applyInsertion', () => {
    test('inserts an element correctly and logs the output', () => {
        const curWord = ['h', 'e', 'l', 'l', 'o'];
        const curJ = 2;
        const curI = 1;
        const word1 = ['w', 'o', 'r', 'l', 'd'];
        const expectedIndices = [0, 3];

        const result = applyInsertion(curWord, curJ, curI, word1);

        expect(curWord).toEqual(['h', 'e', 'l', 'l', 'o']);
        expect(result).toEqual(expectedIndices);
    });
});

describe('getDp', () => {
    test('returns 0 if both indices are negative', () => {
        expect(getDp(-1, -1, [])).toBe(0);
    });

    test('returns j + 1 if i is negative', () => {
        expect(getDp(-1, 2, [])).toBe(3);
    });

    test('returns i + 1 if j is negative', () => {
        expect(getDp(3, -1, [])).toBe(4);
    });

    test('returns value from dp matrix at [i][j]', () => {
        const dp = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(getDp(1, 1, dp)).toBe(5);
        expect(getDp(0, 2, dp)).toBe(3);
        expect(getDp(2, 0, dp)).toBe(7);
    });
});

describe('calculateEditDistanceStep', () => {
    test('calculates minimum edit operations correctly', () => {
        const dp = [
            [0, 1, 2],
            [1, 1, 2],
            [2, 2, 1]
        ];
        const word1 = ['h', 'i'];
        const word2 = ['b', 'e'];

        expect(calculateEditDistanceStep(1, 1, dp, word1, word2)).toBe(1);
    });
})

describe('minimalDistance', () => {
    test('edit distance between "wordone" and "wordtwo"', () => {
        expect(minimalDistance('wordone', 'wordtwo')).toBe(3);
    });
});
