export const group = (namesArray: string[], groupSize: number) => {
  const newArray: string[][] = [];
    let tempArray: string[] = [];
    const remainder: number = namesArray.length % groupSize    

    while (namesArray.length > 0) {
      tempArray = namesArray.splice(0, remainder == 1 ? groupSize + 1 : groupSize);
      newArray.push(tempArray);
      // setGroupedNamesArray(newArray);
    }
  return newArray
}