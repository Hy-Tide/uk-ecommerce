const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Deepika Venkatesan\\.gemini\\antigravity-ide\\brain\\70fbdbfd-ee71-43bd-ae10-b78faefea994\\.system_generated\\steps\\175\\content.md', 'utf8');

// Find the start and end of the options object
const startTag = '"swaggerDoc": ';
const startIndex = content.indexOf(startTag);
if (startIndex !== -1) {
  let depth = 0;
  let jsonStart = startIndex + startTag.length;
  let jsonEnd = -1;
  for (let i = jsonStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') depth--;
    if (depth === 0) {
      jsonEnd = i + 1;
      break;
    }
  }
  
  if (jsonEnd !== -1) {
    const jsonStr = content.substring(jsonStart, jsonEnd);
    try {
      const swagger = JSON.parse(jsonStr);
      const paths = swagger.paths;
      const productApis = [];
      for (const [path, methods] of Object.entries(paths)) {
        for (const [method, details] of Object.entries(methods)) {
          if (details.tags && details.tags.includes('Website Products')) {
            productApis.push({ method: method.toUpperCase(), path, summary: details.summary });
          }
        }
      }
      console.log(JSON.stringify(productApis, null, 2));
    } catch (e) {
      console.error("Parse error:", e);
    }
  }
} else {
  console.log('Not found');
}
