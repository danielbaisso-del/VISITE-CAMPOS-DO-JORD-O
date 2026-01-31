/**
 * Application-wide configuration constants
 */

export const APP_CONFIG = {
  name: 'Visite Campos do Jordão',
  logo: {
    local: '/images/logo-branco.png',
    fallback: 'https://visitecamposdojordao.org.br/wp-content/uploads/2019/11/logo-branco.png',
  },
  hero: {
    image: 'https://s3.netcampos.com/imgs/20220417182615/portal-campos.jpg',
  },
} as const;

export const TONE_OPTIONS = [
  { value: 'friendly', label: 'Padrão' },
  { value: 'formal', label: 'Formal' },
  { value: 'mice', label: 'Eventos (MICE)' },
] as const;

export const DEFAULT_ACTIONS = [
  { label: 'Passeios', url: '/#explore' },
  { label: 'Onde Comer', url: '/#ondecomer' },
  { label: 'Onde Ficar', url: '/#hospedagens' },
];
