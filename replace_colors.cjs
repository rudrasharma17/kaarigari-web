const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.push('./index.html');

files.forEach(file => {
    if (file === 'src/index.css') return; // already handled
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace class names
    content = content.replace(/brand-lime/g, 'brand-accent');
    content = content.replace(/brand-black/g, 'brand-base');
    content = content.replace(/brand-dark/g, 'brand-surface');
    content = content.replace(/text-white/g, 'text-brand-light');
    content = content.replace(/bg-white/g, 'bg-brand-light');
    content = content.replace(/border-white/g, 'border-brand-light');
    
    fs.writeFileSync(file, content);
});
console.log('Replaced colors in files');
