import stripHtml from "string-strip-html";

const LENGTH = 150;

function TextPreview ({ data }) {
  const str = stripHtml(data);
  if (str.length > LENGTH) {
    const strLength = str.substr(0, LENGTH);
    const lastSpaceIdx = strLength.lastIndexOf(' ');

    if (lastSpaceIdx === -1) {
      return `${strLength}...`;
    } else {
      return `${strLength.substr(0, lastSpaceIdx)}...`;
    }
  }

  return str;
}

export default TextPreview;
