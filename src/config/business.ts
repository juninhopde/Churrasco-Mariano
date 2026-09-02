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

  email: 'contato@marianochurrasco.com.br', // EDITAR
  city: 'Bragança Paulista',
  state: 'SP',

  instagram: 'https://instagram.com/marianodasilveira', // ex.: 'https://instagram.com/seuperfil' — vazio esconde o ícone
  facebook: '',

  /** EDITAR quando tiver. CNPJ visível é um dos maiores sinais de confiança do nicho. */
  cnpj: '',

  /** URL final do site — usada no canonical e no sitemap. */
  siteUrl: 'https://SEU-USUARIO.github.io/mariano-churrasco/',
} as const;

export const whatsappLink = (message: string): string =>
  `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`;
