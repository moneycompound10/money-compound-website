const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Asus/Desktop/merge-code-moneycompund-main/src/pages/products';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  try {
    const buffer = fs.readFileSync(filePath);
    let content = buffer.toString('utf8');
    
    // Replace literal backslash-quote with quote
    content = content.replace(/\\"/g, '"');
    
    // Replace invalid unicode characters
    content = content.replace(/\uFFFD/g, '-');
    
    // Replace HTML entities we accidentally messed up
    content = content.replace(/&amp;apos;/g, "'");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ' + f);
  } catch (err) {
    console.error('Error in ' + f + ': ' + err.message);
  }
});
