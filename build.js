const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const outdir = '_site';

// Ensure output directory exists
fs.mkdirSync(outdir, { recursive: true });

// Minify JS files
const jsFiles = [
  'game.js', 'movies.js', 'dailyPuzzles.js', 'tracker.js',
  // Album game files
  'game-albums.js', 'albums.js', 'albumPuzzles.js'
];
for (const file of jsFiles) {
  if (fs.existsSync(file)) {
    esbuild.buildSync({
      entryPoints: [file],
      outfile: path.join(outdir, file),
      minify: true,
    });
  }
}

// Minify CSS
const cssFiles = ['styles.css', 'styles-albums.css'];
for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    esbuild.buildSync({
      entryPoints: [file],
      outfile: path.join(outdir, file),
      minify: true,
    });
  }
}

// Copy static assets
const assets = ['index.html', 'debug.html', 'favicon.png', 'share.png', 'albums.html'];
for (const asset of assets) {
  if (fs.existsSync(asset)) {
    fs.copyFileSync(asset, path.join(outdir, asset));
  }
}

console.log('Build complete → _site/');
