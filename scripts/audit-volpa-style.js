#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = [
  'index.html', 'leadpagina.html', 'blog.html', 'blogpost.html',
  'kennisbank-scheiden.html', 'contact.html', 'over-arnoud.html',
  'mediation.html', 'financieel-advies.html', 'juridische-begeleiding.html'
];
const problems = [];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const checks = [
    [/class="stepnum"/, 'decoratieve stapnummers'],
    [/<div class="sec-num">/, 'herhalende sectielabels'],
    [/<(?:h1|h2|h3)[^>]*>[^<]*<em>/, 'decoratieve nadruk in kop'],
    [/[—]/, 'em-dash in kernpagina'],
  ];
  for (const [pattern, label] of checks) {
    if (pattern.test(html)) problems.push(`${page}: ${label}`);
  }
}
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [pattern, label] of [
  [/class="hero-card"/, 'hero-opvulkaart'],
  [/class="hero-stats"/, 'pseudo-statistiekstrook'],
  [/class="pathnum"|class="tnum"/, 'decoratieve route- of onderwerpnummers'],
]) {
  if (pattern.test(home)) problems.push(`index.html: ${label}`);
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Stijlaudit geslaagd: ${pages.length} kernpagina's gecontroleerd.`);
}
