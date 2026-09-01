/**
 * Gera um HTML único (CSS, JS e favicon embutidos) que funciona com clique duplo,
 * sem servidor. Use depois de:  npx vite build --config vite.config.singlefile.ts
 *
 * Rode tudo de uma vez com:  npm run build:arquivo-unico
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve('dist-single');
const read = (f) => readFileSync(resolve(dir, f), 'utf8');

const js = read('bundle.js');
const css = read('bundle.css');
const svg = read('favicon.svg');
let html = read('index.html');

if (js.toLowerCase().includes('</script')) {
  throw new Error('O bundle contém </script> — não é seguro embutir inline.');
}

// favicon como data URI
html = html.replace('./favicon.svg', `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`);

// CSS no lugar do <link>
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/bundle\.css"[^>]*>/, () => `<style>\n${css}\n</style>`);

// remove o <script> que o Vite coloca no <head> ...
html = html.replace(/\s*<script type="module"[^>]*src="\.\/bundle\.js"[^>]*><\/script>/, '');
// ... e reinsere no fim do <body>, senão o script roda antes do #root existir
html = html.replace(/<\/body>/, () => `  <script>\n${js}\n  </script>\n</body>`);

if (html.indexOf('id="root"') > html.indexOf('<script>\n')) {
  throw new Error('O script ficou antes do #root — a página abriria em branco.');
}

const out = resolve('site-clique-e-abre.html');
writeFileSync(out, html, 'utf8');
console.log(`OK: ${out} (${(html.length / 1024).toFixed(0)} KB)`);
