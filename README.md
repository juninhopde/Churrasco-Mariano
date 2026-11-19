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
    │   ├── menu.ts          # cardápio (5 categorias) + os 2 serviços dos cards
    │   ├── faq.ts
    │   ├── gallery.ts       # 5 fotos do evento — 1 grande + 4 pequenas, grade 4×2 sem buracos
    │   ├── video.ts         # vídeo/GIF do evento (arquivo próprio ou link do Instagram)
    │   ├── images.ts        # fotos (URLs do Unsplash + foto própria)
    │   └── nav.ts
    ├── components/          # peças reutilizáveis
    ├── sections/            # blocos da página, na ordem do App.tsx
    ├── hooks/
    │   └── useQuoteDraft.ts # estado ÚNICO do orçamento (cards, cardápio e formulário)
    ├── utils/
    │   ├── quote.ts         # tipos do orçamento
    │   ├── validation.ts    # regras dos campos obrigatórios
    │   ├── whatsapp.ts      # monta a mensagem e o link do WhatsApp
    │   └── scroll.ts        # leva o cliente ao formulário
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

O link `https://wa.me/…` é montado num lugar só (`buildWhatsAppUrl`, em `src/utils/whatsapp.ts`)
e lê o número daí. Nenhum número está escrito dentro de componente. **Única exceção:** o
`telephone` do Schema.org em `index.html` (HTML estático não lê o `business.ts`) — se o número
mudar, troque lá também.

## Como funciona o orçamento

Uma tela só, em três blocos: **(1) Sobre o evento** — serviço, data, cidade, convidados
(obrigatórios); **(2) Mais detalhes** — horário, tipo de evento, local e cardápio (opcional,
recolhido); **(3) Contato** — nome (obrigatório) e observações (opcional).

- Escolher um serviço num card, ou itens na seção Cardápio, preenche o formulário: tudo vive em
  `useQuoteDraft`, então nada é escolhido duas vezes.
- Não pede telefone nem e-mail: o próprio WhatsApp identifica quem escreveu.
- O botão abre o WhatsApp com a mensagem pronta. Se o navegador bloquear, aparece o botão
  alternativo (e "Copiar mensagem"). O site **não afirma** que o pedido foi enviado — só o
  cliente, tocando em Enviar no WhatsApp, conclui.
- O rascunho fica no `sessionStorage` (some ao fechar a aba): se o celular recarregar a página
  quando o cliente volta do WhatsApp, os dados continuam lá.
- Não há cálculo de preço de propósito — só entra quando houver tabela e regra comercial reais.

Para exigir (ou dispensar) um campo, edite `validateQuote` em `src/utils/validation.ts`.

## Efeitos de alegria (topo e botões)

Tudo é CSS leve (só `transform`/`opacity`), sem biblioteca, e **desliga sozinho** para quem
pediu menos movimento no sistema (`prefers-reduced-motion`).

| Efeito | Onde | Como ajustar ou desligar |
|---|---|---|
| Faíscas de brasa subindo no topo | `src/components/Embers.tsx` | `COUNT` muda a quantidade (no celular aparece só metade). Para desligar, apague `<Embers />` em `Hero.tsx` |
| "Ideal para [aniversário]" com palavra que troca | `src/components/EventTagline.tsx` | Edite a lista `WORDS` e o `INTERVAL_MS`. Para desligar, apague `<EventTagline />` em `Hero.tsx` |
| Brilho que cruza o botão "Pedir orçamento" (a cada ~3 s) | classe `btn-shine` (`src/styles/index.css`) | Tire `btn-shine` do `className` do botão (`Hero.tsx`, `FloatingCTA.tsx`) |
| Anel laranja que pulsa em volta do botão | classe `btn-pulse` | Tire `btn-pulse` do `className` do botão (`Hero.tsx`, `FloatingCTA.tsx`) |
| Faixa vermelha em movimento com os destaques (substitui as 4 linhas fixas que ficavam no fim do topo) | `src/components/Ticker.tsx` | Edite `ITEMS`; a velocidade é o `34s` de `.marquee-track` em `index.css`. Passar o mouse pausa. Para desligar, apague `<Ticker />` em `App.tsx` |
| Brilho de brasa "respirando" na base do topo | classe `glow-breathe` | Apague o `<div>` com `glow-breathe` em `Hero.tsx` |
| "Pop" ao escolher serviço, item ou chip | classe `animate-pop` | Tire a classe em `ChipGroup.tsx`, `Services.tsx`, `QuoteForm.tsx` |
| Topo mais vivo (chama visível, sombra só atrás do texto no desktop) | `Hero.tsx` | Volte a camada para `bg-carvao/72` em todas as larguras e apague o degradê `bg-gradient-to-r` |

A cor de apoio dos destaques é `brasa` (`tailwind.config.js`), um laranja da família do fogo.

## Como alterar textos

- **Cardápio** → `src/data/menu.ts` (`menuCategories`)
- **Cards de serviço (Churrasqueiro / Buffet completo)** → `src/data/menu.ts` (`serviceOptions`)
- **FAQ** → `src/data/faq.ts`
- **Vídeo/GIF do evento (seção Galeria)** → duas formas, em `src/data/video.ts`:
  1. **Arquivo próprio (melhor):** coloque UM arquivo `.mp4`, `.webm`, `.gif` ou `.webp` em `src/assets/evento/` e rode o build. Aparece direto no site, em loop e sem som (o `.mp4`/`.webm` é 5 a 20 vezes mais leve que um GIF do mesmo clipe; GIF: até uns 5 MB, 5 a 8 segundos, largura até 720 px).
  2. **Link do Instagram** (usado só se a pasta estiver vazia): cole o link de um post público. O site mostra a capa e, ao tocar no play, o Instagram abre em outra aba — a incorporação não toca dentro do site e exibe a barra do post (curtidas, comentário). Vazio (`''`) esconde.

  Com arquivo próprio, o link do Instagram vira o botão "Ver vídeo completo".
- **Galeria de fotos** → `src/data/gallery.ts` (fotos em `src/assets/gallery/`). São as 5 fotos do último evento; trocar um arquivo pelo mesmo nome já atualiza o site
- **Fotos** → `src/data/images.ts`
- **Menu do topo** → `src/data/nav.ts`
- **Títulos e parágrafos das seções** → arquivo correspondente em `src/sections/`

## As fotos do site

**Fotos próprias já no site:** as 5 do último evento (`src/assets/gallery/evento-*.jpg`) estão na
galeria, no card do Buffet completo e nas categorias Carnes suínas, Frango, Acompanhamentos e
Saladas do cardápio; a foto do Mariano está no card do Churrasqueiro. Têm só ~490 px de largura —
troque os arquivos pelos originais (mesmo nome) para ficarem nítidos. **Ainda de banco de imagem:**
fundo do hero e categoria Carnes bovinas (nenhuma foto do evento mostra carne bovina).

O restante vem do **Unsplash**, sob a [Unsplash License](https://unsplash.com/license):
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

3. Fundo do hero: em `src/sections/Hero.tsx`, troque as constantes `fundo` e `fundoSrcSet` pelo import da sua foto.

Prioridade das trocas que faltam, por impacto: **fundo do hero** → **Carnes bovinas** (cardápio) → originais em alta resolução das fotos do evento.

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
✓ 1608 modules transformed.
dist/index.html                    3.84 kB │ gzip:  1.40 kB
dist/assets/index-*.css           28.01 kB │ gzip:  6.25 kB
dist/assets/index-*.js           198.15 kB │ gzip: 62.78 kB
✓ built in ~6-14s
```

TypeScript strict sem erros. Sem `console.log`, sem TODO, sem função fictícia.

## Antes de divulgar — o que ainda depende de você

| Item | Onde | Por quê |
|---|---|---|
| Fotos em alta resolução + hero e carne bovina próprios | `src/data/images.ts`, `src/assets/` | As 5 do evento já estão no site, mas com ~490 px; o hero e Carnes bovinas ainda são de banco de imagem |
| E-mail (opcional) | `src/config/business.ts` | Está vazio (`email: ''`), então o rodapé não mostra e-mail. O endereço antigo era um exemplo não confirmado. Preencha só com uma caixa que exista e seja lida — o rodapé passa a exibi-lo sozinho |
| Instagram, CNPJ | `src/config/business.ts` | CNPJ visível é dos sinais de confiança mais fortes do nicho |
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

1. **O formulário é de uma tela só (antes eram 7 etapas).** Cada etapa derruba conversão. Só 5 campos bloqueiam o envio (serviço, data, cidade, convidados, nome); o resto é opcional e fica recolhido. O atalho "Chame no WhatsApp" continua logo abaixo para quem só quer perguntar o preço.
2. **O formulário não envia e-mail.** Ele monta a mensagem e abre o WhatsApp — sem backend, sem serviço pago, sem lead preso num banco que ninguém olha. Depois do clique, o cliente vê a mensagem e o botão alternativo, e confere tudo no próprio WhatsApp antes de enviar.
3. **Sem `aggregateRating` no Schema.org.** Colocar nota de avaliação sem avaliações reais é penalizado pelo Google.
4. **Seção de depoimentos removida**, a pedido. Ela era o bloco de maior peso na decisão de contratar: quando tiver 3 depoimentos reais (nome, evento, cidade), vale reativar.
