const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const outdir = '_site';

// Ensure output directory exists
fs.mkdirSync(outdir, { recursive: true });

// Minify JS files
const jsFiles = ['game.js', 'movies.js', 'dailyPuzzles.js', 'tracker.js', 'gameUtils.js'];
for (const file of jsFiles) {
  esbuild.buildSync({
    entryPoints: [file],
    outfile: path.join(outdir, file),
    minify: true,
  });
}

// Minify CSS
esbuild.buildSync({
  entryPoints: ['styles.css'],
  outfile: path.join(outdir, 'styles.css'),
  minify: true,
});

// Copy static assets
const assets = ['index.html', 'debug.html', 'favicon.png', 'share.png'];
for (const asset of assets) {
  if (fs.existsSync(asset)) {
    fs.copyFileSync(asset, path.join(outdir, asset));
  }
}

console.log('Build complete → _site/');
