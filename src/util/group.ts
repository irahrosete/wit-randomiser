export const group = (namesArray: string[], groupSize: number) => {
  const newArray: string[][] = [];
    let tempArray: string[] = [];
    
    while (namesArray.length > groupSize + 1) {
      tempArray = namesArray.splice(0, groupSize);
      newArray.push(tempArray);
    }
    newArray.push(namesArray)
    
  return newArray
}