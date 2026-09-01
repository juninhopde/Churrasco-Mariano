# Mariano Churrasco a Domicílio — site comercial

Landing page de alta conversão para buffet de churrasco em domicílio, eventos e empresas.
Objetivo único do site: **gerar orçamento pelo WhatsApp (11) 97382-9765**.

## ⚠️ Clicar duas vezes no index.html NÃO funciona

Este é um projeto React: o `index.html` da raiz é código-fonte, não site pronto. Abrindo
direto do disco a tela fica branca — o navegador bloqueia módulos JavaScript em `file://`.

Três formas de ver o site funcionando:

| Situação | O que usar |
|---|---|
| Só quero abrir e ver, sem instalar nada | `site-clique-e-abre.html` — arquivo único, clique duplo |
| Vou editar o site | `npm install` e `npm run dev` |
| Vou publicar | pasta `dist/` (gerada por `npm run build`) ou o deploy automático via Actions |

Para regerar o arquivo único depois de qualquer alteração:

```bash
npm run build:arquivo-unico
```

Ele embute CSS, JavaScript e favicon num só HTML, com o script no fim do `<body>` para
rodar depois que o `#root` existe. As fotos continuam vindo da internet.

## Tecnologias

- **React 18** + **TypeScript** (modo strict)
- **Vite 5** (dev server e build)
- **Tailwind CSS 3** (design system em `tailwind.config.js`)
- **lucide-react** (ícones)
- Zero backend, zero banco de dados, zero dependência paga

## Rodar localmente

```bash
npm install      # instala as dependências
npm run dev      # abre em http://localhost:5173
npm run build    # gera a pasta dist/ (roda o TypeScript antes)
npm run preview  # serve a dist/ para conferir o resultado final
npm run typecheck
```

## Estrutura de pastas

```
├── index.html               # SEO, Open Graph, Schema.org, fontes
├── public/                  # servido sem processamento
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .nojekyll            # exigido pelo GitHub Pages
├── .github/workflows/
│   └── deploy.yml           # publica no Pages a cada push na main
└── src/
    ├── config/
    │   ├── business.ts      # ⭐ telefone, e-mail, nome, redes, CNPJ
    │   └── analytics.ts     # GA / GTM / Meta Pixel (vazios por padrão)
    ├── data/                # ⭐ todo o conteúdo editável
    │   ├── menu.ts          # cardápio + cardápios especiais
    │   ├── faq.ts
    │   ├── services.ts
    │   ├── gallery.ts
    │   ├── images.ts        # fotos (URLs do Unsplash)
    │   ├── trust.ts         # números da faixa de confiança
    │   ├── steps.ts
    │   └── nav.ts
    ├── components/          # peças reutilizáveis
    ├── sections/            # blocos da página, na ordem do App.tsx
    ├── hooks/
    ├── utils/               # montagem da mensagem de WhatsApp + validações
    ├── assets/              # suas fotos (hero, menu, gallery, services)
    ├── styles/index.css
    ├── App.tsx
    └── main.tsx
```

## Como alterar o WhatsApp

Um lugar só: `src/config/business.ts`.

```ts
whatsapp: '5511973829765',      // 55 + DDD + número, só dígitos
phoneDisplay: '(11) 97382-9765' // como aparece na tela
```

Todos os 14 pontos de contato do site (header, hero, cards, formulário, rodapé, botão
flutuante) leem daí. Nenhum número está escrito dentro de componente.

## Como alterar textos

- **Cardápio** → `src/data/menu.ts`
- **FAQ** → `src/data/faq.ts`
- **Serviços** → `src/data/services.ts`
- **Números de confiança** → `src/data/trust.ts`
- **Fotos** → `src/data/images.ts`
- **Menu do topo** → `src/data/nav.ts`
- **Títulos e parágrafos das seções** → arquivo correspondente em `src/sections/`

## As fotos do site

O site vem com fotos do **Unsplash**, sob a [Unsplash License](https://unsplash.com/license):
uso comercial liberado, sem necessidade de atribuição. Elas são servidas direto do CDN do
Unsplash, que já entrega o tamanho e o formato certos para cada tela.

Todas estão catalogadas em `src/data/images.ts`, com autor e descrição (`alt`).

### Trocar por SUAS fotos (recomendado)

Foto de banco de imagem é reconhecida pelo cliente e converte menos que foto sua. Quando tiver
fotos dos seus eventos:

1. Salve em `src/assets/gallery/` (JPG ou WebP, largura máxima 1600px, comprimidas).
2. Em `src/data/gallery.ts`, importe e use no lugar da foto do catálogo:

```ts
import minhaFoto from '../assets/gallery/churrasco-01.jpg';

// componente AppImage aceita src direto:
{ id: 'g1', photo: { id: '', alt: 'Picanha na brasa no evento da família Silva', credit: 'próprio' }, span: 'big' }
```

3. Fundo do hero: em `src/sections/Hero.tsx`, troque a constante `fundo` pelo import da sua foto.

Prioridade das trocas, por impacto: **fundo do hero** → **galeria** → cards de serviço.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "site: primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mariano-churrasco.git
git push -u origin main
```

Depois, em **Settings → Pages → Source**, escolha **GitHub Actions**. O workflow
`.github/workflows/deploy.yml` compila e publica automaticamente a cada push.
O `base: './'` no `vite.config.ts` faz o site funcionar tanto em subpasta
(`usuario.github.io/mariano-churrasco/`) quanto em domínio próprio.

`.gitignore` já bloqueia `node_modules`, `dist` e `.env`. Nenhuma credencial no repositório.

## Publicar na Vercel

1. vercel.com → **Add New → Project** → importe o repositório.
2. A Vercel detecta Vite sozinha: build `npm run build`, output `dist`.
3. Deploy. Domínio próprio em **Settings → Domains**.

Netlify funciona igual: build `npm run build`, publish `dist`.

## Resultado do build

```
✓ 1613 modules transformed.
dist/index.html                   4.05 kB │ gzip:  1.42 kB
dist/assets/index-*.css          25.60 kB │ gzip:  5.82 kB
dist/assets/index-*.js          201.13 kB │ gzip: 62.58 kB
✓ built in 5.69s
```

TypeScript strict sem erros. Sem `console.log`, sem TODO, sem função fictícia.

## Antes de divulgar — o que ainda depende de você

| Item | Onde | Por quê |
|---|---|---|
| Suas fotos no lugar das do Unsplash | `src/data/images.ts`, `src/assets/` | Maior ganho de conversão que falta |
| E-mail, Instagram, CNPJ | `src/config/business.ts` | CNPJ visível é dos sinais de confiança mais fortes do nicho |
| URL final | `index.html` (canonical, OG, Schema), `public/robots.txt`, `public/sitemap.xml`, `business.ts` | Trocar `SEU-USUARIO` pela URL real |
| Imagem de compartilhamento | `public/og.jpg`, 1200×630 | É o que aparece quando o link é enviado no WhatsApp |
| Depoimentos de clientes | seção removida | Quando tiver depoimentos reais, vale reativar — é o sinal de confiança que mais pesa |

## Acessibilidade e performance

- HTML semântico, hierarquia de títulos correta, `aria-*` em menu, accordion, lightbox e progresso.
- Navegação completa por teclado: `Esc` fecha menu e lightbox, `←`/`→` navegam nas fotos, link "ir para o conteúdo", foco sempre visível.
- `prefers-reduced-motion` respeitado — quem desliga animação no sistema recebe a página estática.
- `overflow-x: hidden` no body e carrosséis com scroll-snap: sem rolagem horizontal acidental de 320px a 1920px.
- Fontes com `display=swap`, imagens com `loading="lazy"`, bundle de 62 kB gzip.

## Decisões que valem discussão

1. **O formulário de 7 etapas convive com o WhatsApp direto.** Cada etapa derruba conversão, então em todas as telas existe o atalho "chame direto no WhatsApp". Quem quer detalhar, detalha; quem quer só perguntar o preço, pergunta.
2. **O formulário não envia e-mail.** Ele monta a mensagem e abre o WhatsApp — sem backend, sem serviço pago, sem lead preso num banco que ninguém olha. A etapa 7 mostra o resumo antes do envio.
3. **Sem `aggregateRating` no Schema.org.** Colocar nota de avaliação sem avaliações reais é penalizado pelo Google.
4. **Seção de depoimentos removida**, a pedido. Ela era o bloco de maior peso na decisão de contratar: quando tiver 3 depoimentos reais (nome, evento, cidade), vale reativar.
