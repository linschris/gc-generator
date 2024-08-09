const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
// const QUALITIES = ['maj', 'min', 'dim', 'aug', 'dom'];
// const SHARP = ['#', 'b', '-']; // - means No sharp/flat
// const TENSIONS = ['5', '6', '7', '9', '11', '13'];





export function getRandomChord() {
    console.log(NOTES);
    return getRandomValueFromArray(NOTES) + '_maj7';
}

function getRandomValueFromArray<T>(arr: T[]): T {
    const index = Math.round(Math.random() * (arr.length - 1));
    console.log(index);
    return arr[index];
};