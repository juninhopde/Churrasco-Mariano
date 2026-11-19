/**
 * ÚNICO lugar com os dados da empresa.
 * Todo o site (header, footer, WhatsApp, SEO) lê daqui.
 */
export const businessConfig = {
  name: 'Mariano Churrasco a Domicílio',
  shortName: 'Mariano Churrasco',
  slogan: 'A brasa é nossa. A festa é sua.',

  /** Somente números: 55 (país) + 11 (DDD) + número. */
  whatsapp: '5511973829765',
  phoneDisplay: '(11) 97382-9765',

  /** Vazio = o rodapé não mostra e-mail. Preencha só com uma caixa que exista e seja lida. */
  email: '',
  city: 'Bragança Paulista',
  state: 'SP',

  instagram: 'https://instagram.com/marianodasilveira', // ex.: 'https://instagram.com/seuperfil' — vazio esconde o ícone
  facebook: '',

  /** EDITAR quando tiver. CNPJ visível é um dos maiores sinais de confiança do nicho. */
  cnpj: '',

  /** URL final do site — usada no canonical e no sitemap. */
  siteUrl: 'https://juninhopde.github.io/Churrasco-Mariano/',
} as const;
