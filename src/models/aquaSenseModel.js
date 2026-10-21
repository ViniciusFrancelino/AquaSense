export const INITIAL_READINGS = { ph: 7.3, chlorine: 1.5, temperature: 27, clarity: 94 }

export const INITIAL_HISTORY = [
  INITIAL_READINGS,
  { ph: 7.2, chlorine: 1.4, temperature: 26, clarity: 91 },
  { ph: 7.4, chlorine: 1.6, temperature: 27, clarity: 93 },
  { ph: 7.3, chlorine: 1.5, temperature: 27, clarity: 96 },
  { ph: 7.2, chlorine: 1.5, temperature: 26, clarity: 92 },
]

export const METRIC_RANGES = {
  ph: [6, 9],
  chlorine: [0, 4],
  temperature: [15, 38],
  clarity: [50, 100],
}

export const FAQS = [
  ['O AquaSense funciona em qualquer piscina?', 'Sim! O sensor foi pensado para piscinas residenciais de diferentes tamanhos. Basta posicioná-lo na água e conectar ao aplicativo.'],
  ['Preciso ter conhecimento técnico para instalar?', 'Não. A instalação é simples e leva poucos minutos. Você recebe um passo a passo no aplicativo para começar.'],
  ['Com que frequência as medições são atualizadas?', 'O AquaSense acompanha a água ao longo do dia e atualiza os indicadores automaticamente.'],
  ['Os dados do simulador são medições reais?', 'Não. Esta demonstração usa valores ilustrativos para mostrar como funciona a experiência. Para cuidar da piscina, siga as orientações dos fabricantes e profissionais especializados.'],
]

export const FEATURES = [
  { icon: 'activity', title: 'Monitoramento inteligente', desc: 'Acompanhe os principais indicadores da sua piscina em um só lugar.' },
  { icon: 'zap', title: 'Alertas no momento certo', desc: 'Saiba quando algo merece atenção e aja antes que vire um problema.' },
  { icon: 'sparkles', title: 'Rotina mais leve', desc: 'Receba sugestões simples para deixar a manutenção mais prática.' },
  { icon: 'clock', title: 'Histórico que ajuda', desc: 'Veja a evolução da água e entenda o que funciona melhor.' },
]

export const PLANS = [
  { name: 'Essential', price: 29, desc: 'O essencial para começar a cuidar melhor.', items: ['Leituras diárias', 'Indicadores principais', 'Histórico de 7 dias'] },
  { name: 'Plus', price: 49, desc: 'Mais acompanhamento para sua tranquilidade.', items: ['Tudo do Essential', 'Alertas inteligentes', 'Histórico de 30 dias', 'Recomendações personalizadas'], popular: true },
  { name: 'Premium', price: 79, desc: 'Cuidado completo, do seu jeito.', items: ['Tudo do Plus', 'Múltiplas piscinas', 'Relatórios mensais', 'Suporte prioritário'] },
]

export const TESTIMONIALS = [
  { quote: '“Antes eu só percebia que a água precisava de cuidado quando já estava na hora do mergulho. Agora consigo acompanhar tudo com muito mais tranquilidade.”', name: 'Marina Costa', city: 'Campinas, SP', initials: 'MC' },
  { quote: '“As recomendações são fáceis de entender e me ajudam a manter a rotina em dia. Sobrou mais tempo para curtir a piscina com a família.”', name: 'Rafael Mendes', city: 'Jundiaí, SP', initials: 'RM' },
  { quote: '“Eu vivia tentando adivinhar o que a água precisava. Com o AquaSense, ficou muito mais simples acompanhar os indicadores.”', name: 'Camila Rocha', city: 'Santos, SP', initials: 'CR' },
]

export function getMetricStatus(key, value) {
  if (key === 'ph') return value < 7 || value > 7.6 ? 'attention' : 'good'
  if (key === 'chlorine') return value < 1 || value > 3 ? 'attention' : 'good'
  if (key === 'temperature') return value > 32 ? 'attention' : 'good'
  return value < 80 ? 'attention' : 'good'
}

export function getWaterStatus(readings) {
  return Object.keys(readings).every(key => getMetricStatus(key, readings[key]) === 'good')
    ? 'Água equilibrada'
    : 'Atenção necessária'
}

export function getRecommendation(readings) {
  if (readings.ph < 7 || readings.ph > 7.6) return 'O pH está fora da faixa ilustrativa. Considere conferir o equilíbrio da água.'
  if (readings.chlorine < 1 || readings.chlorine > 3) return 'O nível de cloro pede atenção. Confira as instruções do produto utilizado.'
  if (readings.temperature > 32) return 'A água está mais quente. Temperaturas elevadas podem exigir acompanhamento extra.'
  if (readings.clarity < 80) return 'A transparência está reduzida. Vale verificar o filtro e a circulação da água.'
  return 'Tudo parece equilibrado. Aproveite a piscina e mantenha sua rotina de cuidados!'
}

export function createRandomReadings() {
  return {
    ph: +(6.7 + Math.random() * 1.2).toFixed(1),
    chlorine: +(.5 + Math.random() * 3).toFixed(1),
    temperature: Math.round(22 + Math.random() * 13),
    clarity: Math.round(65 + Math.random() * 35),
  }
}

export function getPlanPrice(price, annualBilling) {
  return annualBilling ? Math.round(price * .85) : price
}
