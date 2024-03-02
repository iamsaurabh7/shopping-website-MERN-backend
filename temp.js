var findTheDifference = function (s, t) {
  let charCount = new Map();
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (const char of t) {
    charCount.set(char, (charCount.get(char) || 0) - 1);
    if (charCount.get(char) === -1) {
      console.log(char);
      return char;
    }
  }
};

const s = "abc",
  t = "abhc";
findTheDifference(s, t);
