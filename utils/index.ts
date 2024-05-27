export const insertIntoArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
];

export function applyReplacement(curWord, curI, curJ, word1) {
    curWord[curJ] = word1[curI];
    console.log(curWord.join(''));
    return [curI - 1, curJ - 1];
};

export function applyDeletion(curWord, curJ) {
    curWord[curJ] = '';
    console.log(curWord.join(''));
    return curJ - 1;
};

export function applyInsertion(curWord, curJ, curI, word1) {
    const newWord = insertIntoArray(curWord, curJ + 1, word1[curI]);
    console.log(newWord.join(''));
    return [curI - 1, curJ + 1];
};

export const getDp = (i, j, dp) => {
    if (i < 0 && j < 0) return 0;
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    return dp[i][j];
};

export const calculateEditDistanceStep = (i, j, dp, word1, word2) => {
    return Math.min(
        getDp(i - 1, j, dp) + 1,
        getDp(i, j - 1, dp) + 1,
        getDp(i - 1, j - 1, dp) + (word1[i] === word2[j] ? 0 : 1)
    );
};

export const minimalDistance = (word1, word2) => {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n);

    for (let i = 0; i < n; i++) {
        dp[i] = Array(m);
        for (let j = 0; j < m; j++) {
            dp[i][j] = calculateEditDistanceStep(i, j, dp, word1, word2);
        }
    };

    let distance = getDp(n - 1, m - 1, dp);
    const immutableDistance = distance;
    console.log(distance);
    let curI = n - 1;
    let curJ = m - 1;
    let curWord = Array.from(word2);

    console.log(curWord.join(''));
    while (distance > 0) {
        const del = getDp(curI, curJ - 1, dp);
        const insert = getDp(curI - 1, curJ, dp);
        const replace = getDp(curI - 1, curJ - 1, dp);
        if (replace < distance) {
            [curI, curJ] = applyReplacement(curWord, curI, curJ, word1);
            distance = replace;
        } else if (del < distance) {
            curJ = applyDeletion(curWord, curJ);
            distance = del;
        } else if (insert < distance) {
            [curI, curJ] = applyInsertion(curWord, curJ, curI, word1);
            distance = insert;
        } else {
            curI -= 1;
            curJ -= 1;
        }
    }
    return immutableDistance;
};