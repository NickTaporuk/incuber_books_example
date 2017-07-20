export const booksTitleFilter = (object, filteredChars) => {
    return !!filteredChars ? object.filter(o => {
        return o.title.toLowerCase().indexOf(filteredChars.toLowerCase()) > -1
    }) : object;
};