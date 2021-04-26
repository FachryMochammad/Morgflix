export const createTags = (tag) => {
  const arrTags = [];
  let temp = "";
  for (let i = 0; i < tag.length; i++) {
    if (tag[i] !== ",") {
      temp += tag[i];
      if (i === tag.length - 1) arrTags.push(temp);
      continue;
    }
    arrTags.push(temp);
    temp = "";
  }
  return arrTags;
};
