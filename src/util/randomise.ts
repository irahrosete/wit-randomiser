export const randomise = (namesArray: string[]) => {
  let i = namesArray.length;
  while (--i > 0) {
    const temp = Math.floor(Math.random() * (i + 1));
    [namesArray[temp], namesArray[i]] = [namesArray[i], namesArray[temp]];
  }
}