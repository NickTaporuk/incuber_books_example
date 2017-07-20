const slugFormattingRegexp =/\W/g;
const searchFormattingRegexp =/\W|\s/g;
const textFormattingRegexp =/\w+|\s+/gi;
const slugFormattingReplaceChar ="_";
const textFormattingReplaceChar ="";
const explodeString = " ";

export const slugFormatting = (string,regexp = slugFormattingRegexp, replaceChar = slugFormattingReplaceChar) => {
    return string.toLowerCase().replace(regexp, replaceChar);
};

export const searchTextFormatting = (string,regexp = searchFormattingRegexp, replaceChar = textFormattingReplaceChar) => {
    return string.toLowerCase().replace(regexp, replaceChar);
};

export const textFormatting = (string,regexp = textFormattingRegexp) => {
    return !!string ? string.match(regexp) : string;
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetterEachSentence = (string) => {
        const split = textFormatting(string,textFormattingRegexp,textFormattingReplaceChar);
        const splited = split.map((item) => capitalizeFirstLetter(item));
        return splited.join(explodeString);
};