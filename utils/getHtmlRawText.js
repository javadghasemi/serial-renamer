export const getHtmlRawText = async url => {
  const request = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
      accept: "text/html",
      "accept-language": "en-US",
    }
  });

  return request.text();
}