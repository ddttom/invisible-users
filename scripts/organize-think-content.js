const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../packages/notes/scrap/think');
const textPath = path.join(baseDir, 'full_text.txt');
const illustrationsDir = path.join(baseDir, 'illustrations');
const chaptersDir = path.join(baseDir, 'chapters');

if (!fs.existsSync(chaptersDir)) {
    fs.mkdirSync(chaptersDir, { recursive: true });
}

const text = fs.readFileSync(textPath, 'utf8');
const lines = text.split('\n');

let currentChapter = '00-FrontMatter';
let currentPage = 0;
const pageToChapter = {};
const chapterContent = {};
let locked = false;

// Initialize first chapter
chapterContent[currentChapter] = [];

// Matches:
// Chapter 1. Title (Must have space after dot)
// Preface: Title
// Introduction: Title
// Index
// Acknowledgments
const chapterRegex = /^(?:Chapter\s+\d+\.\s+|Preface:|Introduction:|Index|Acknowledgments)/;
const pageRegex = /^--\s+(\d+)\s+of\s+\d+\s+--/;

for (const line of lines) {
    const pageMatch = line.match(pageRegex);
    if (pageMatch) {
        currentPage = parseInt(pageMatch[1], 10);
        // If we are locked, we still map page to the locked chapter (e.g. ToC)
        // If not locked, we map to current chapter
        pageToChapter[currentPage] = currentChapter;
    }

    if (!locked) {
        const trimmed = line.trim();
        if (trimmed === 'Table of Contents') {
            currentChapter = 'Table-of-Contents';
            if (!chapterContent[currentChapter]) chapterContent[currentChapter] = [];
            locked = true;
            if (currentPage > 0) pageToChapter[currentPage] = currentChapter;
        } else {
            const chapterMatch = line.match(chapterRegex);

            // Special check: Avoid matching "Index" in the early ToC if it appears there?
            // Early ToC lines are usually indented or have page numbers? In this text extraction, they look like "CHAPTER 1 ...".
            // My regex requires Title Case "Chapter", "Preface:".
            // "Index" is Title Case.
            // But "Index" usually appears at end.
            // If "Index" or "Acknowledgments" appears in lines 75-116 (Early ToC), we might trigger.
            // Line 115: Acknowledgments
            // Line 116: Index
            // These DO appear in early ToC.
            // I should ignore them if currentPage is small (e.g. < 20).
            // Preface starts at Page 7.
            // Early ToC is Page 5-6.

            if (chapterMatch) {
                // Heuristic: If we are on page < 7 and it's not Preface, it's likely ToC trash.
                // Actually Preface starts Page 7.
                // So anything before Page 7 matching these might be ToC.
                // BUT "Preface:" matches. I want to catch Preface.
                // "Index" on Page 6 should be ignored.

                let isRealChapter = true;
                if (currentPage < 7 && !trimmed.startsWith('Preface:') && !trimmed.startsWith('00-FrontMatter')) {
                     // Check if it's the valid Preface start?
                     // Preface start is Page 7.
                     isRealChapter = false;
                }

                if (isRealChapter) {
                    currentChapter = sanitizeChapterName(trimmed);
                    if (!chapterContent[currentChapter]) {
                        chapterContent[currentChapter] = [];
                    }
                    if (currentPage > 0) {
                        pageToChapter[currentPage] = currentChapter;
                    }
                }
            }
        }
    }

    chapterContent[currentChapter].push(line);
}

// Write chapters
for (const [name, content] of Object.entries(chapterContent)) {
    const filePath = path.join(chaptersDir, `${name}.md`);
    fs.writeFileSync(filePath, content.join('\n'));
    console.log(`Wrote ${name}.md`);

    // Create illustration subfolder
    const illSubDir = path.join(illustrationsDir, name);
    if (!fs.existsSync(illSubDir)) {
        fs.mkdirSync(illSubDir, { recursive: true });
    }
}

// Move images
if (fs.existsSync(illustrationsDir)) {
    const images = fs.readdirSync(illustrationsDir).filter(f => f.endsWith('.png'));
    for (const img of images) {
        const match = img.match(/page_(\d+)_/);
        if (match) {
            const page = parseInt(match[1], 10);
            let targetChapter = pageToChapter[page];

            if (!targetChapter) {
                // Find closest previous page in map
                 let p = page;
                 while (p > 0 && !targetChapter) {
                     targetChapter = pageToChapter[p];
                     p--;
                 }
                 if (!targetChapter) targetChapter = '00-FrontMatter';
            }

            const src = path.join(illustrationsDir, img);
            const dest = path.join(illustrationsDir, targetChapter, img);
            fs.renameSync(src, dest);
        }
    }
}

function sanitizeChapterName(name) {
    return name.replace(/[:.]/g, '')
               .replace(/[?]/g, '')
               .replace(/\s+/g, '-')
               .replace(/[^a-zA-Z0-9-]/g, '')
               .substring(0, 60);
}

console.log('Organizing complete.');
