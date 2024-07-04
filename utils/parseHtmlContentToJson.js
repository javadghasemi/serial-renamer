import {parse} from "node-html-parser";

export const parseHtmlContentToJson = htmlContent => {
  const dom = parse(htmlContent);
  return JSON.parse(dom.childNodes[1].childNodes[1].childNodes[4].textContent);
}

// {name: jsonData.props.pageProps.contentData.parentDisplayText, ...jsonData.props.pageProps.contentData.section}