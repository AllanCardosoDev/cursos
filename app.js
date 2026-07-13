// =========================================================
// Configurações da API fornecida pelo usuário
// =========================================================
const API_BASE_URL = 'https://hudapi.cloud';
const API_KEY = 'ck_d7a5c24ac48961307698a3cc4dd013d6459a678804ebc1bd';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : (window.location.origin + '/cursos/backend/api');

// =========================================================
const defaultCourses = {
  1: {
    id: 1,
    title: 'Combate a Incêndio',
    category: 'hazmat',
    categoryName: 'HAZMAT & Incêndio',
    categoryClass: 'cat-hazmat',
    level: 'Básico',
    levelText: 'Recruta → Cabo',
    description: 'Doutrina de combate a incêndios estruturais e florestais. Princípios da combustão, táticas ofensivas e uso de agentes extintores.',
    instructor: 'Cap. QOBM Roberto Mendes',
    duration: 40,
    enrolled: 248,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Introdução ao Combate a Incêndio',
        lessons: [
          { id: 1, title: 'Apresentação do Curso', duration: '15min', completed: true, text: 'Apresentação do curso de combate a incêndio básico do CBMAM. Diretrizes gerais e metodologias.' },
          { id: 2, title: 'Princípios do Fogo e Comportamento do Incêndio', duration: '30min', completed: false, text: 'O triângulo do fogo é composto por combustível, comburente (geralmente oxigênio) e calor. A quebra de um elemento causa a extinção imediata. Os métodos fundamentais são: resfriamento (redução da temperatura por água), abafamento (supressão do oxigênio) e isolamento (retirada de combustíveis). Os incêndios de classe A envolvem sólidos comuns como papel e madeira. Classe B são combustíveis líquidos e gases. Classe C envolve equipamentos elétricos e eletrônicos energizados.' },
          { id: 3, title: 'Equipamentos de Proteção Individual (EPI)', duration: '25min', completed: false, text: 'Uso de roupas de aproximação, capacete de combate, botas especiais e aparelho de proteção respiratória autônoma (EPRA).' }
        ]
      },
      {
        id: 2,
        title: 'Táticas de Combate e Resgate',
        lessons: [
          { id: 4, title: 'Combate Ofensivo e Defensivo', duration: '20min', completed: false, text: 'Métodos diretos e indiretos de aplicação de água. Ventilação tática hidráulica e mecânica.' },
          { id: 5, title: 'Busca e Resgate em Estruturas Colapsadas', duration: '35min', completed: false, text: 'Varredura rápida, técnicas de rastejamento militar e remoção segura de vítimas em ambientes confinados sob fumaça.' }
        ]
      },
      {
        id: 3,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 6, title: 'Avaliação Final do Curso', duration: '30min', completed: false, isFinalExam: true, text: 'Responda as questões da avaliação teórica oficial com aproveitamento mínimo de 60%.',
            quiz: [
              { questionText: 'Qual é o método de extinção que remove o comburente do triângulo do fogo?', options: ['Resfriamento', 'Abafamento', 'Isolamento', 'Reação em cadeia'], correctOption: 1 },
              { questionText: 'Quais são os três componentes fundamentais do Triângulo do Fogo?', options: ['Combustível, cinzas e fumaça', 'Combustível, comburente e calor', 'Comburente, calor e fagulhas', 'Oxigênio, chama e água'], correctOption: 1 },
              { questionText: 'O resfriamento atua diretamente removendo qual elemento do fogo?', options: ['Combustível', 'Reação em cadeia', 'Comburente', 'Calor'], correctOption: 3 },
              { questionText: 'Qual classe de incêndio envolve materiais combustíveis sólidos inflamáveis que deixam brasas e cinzas (ex: madeira)?', options: ['Classe A', 'Classe B', 'Classe C', 'Classe D'], correctOption: 0 },
              { questionText: 'Qual extintor é preferível para combate em equipamentos elétricos energizados (Classe C)?', options: ['Água pressurizada', 'Gás Carbônico (CO2)', 'Espuma mecânica', 'Água com detergente'], correctOption: 1 }
            ]
          }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: 'APH - Atendimento Pré-Hospitalar',
    category: 'defesa',
    categoryName: 'Defesa Civil & Socorro',
    categoryClass: 'cat-defesa',
    level: 'Intermediário',
    levelText: 'Soldado → Sargento',
    description: 'Protocolos de atendimento de emergência médica, suporte básico de vida, triagem de múltiplas vítimas (START) e trauma.',
    instructor: 'Ten. QOSM Dra. Carla Santos',
    duration: 60,
    enrolled: 412,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Suporte Básico de Vida (SBV)',
        lessons: [
          { id: 1, title: 'Avaliação Primária e Secundária da Vítima', duration: '20min', completed: false, text: 'Protocolo XABCDE de trauma. Controle de hemorragias massivas (X), vias aéreas (A), respiração (B), circulação (C), disfunção neurológica (D) e exposição com controle de hipotermia (E).' },
          { id: 2, title: 'Ressuscitação Cardiopulmonar (RCP)', duration: '40min', completed: false, text: 'Manobras de compressão e ventilação em adultos, crianças e lactentes. Uso do DEA (Desfibrilador Externo Automático) em situações militares.' }
        ]
      },
      {
        id: 2,
        title: 'Triagem e Múltiplas Vítimas',
        lessons: [
          { id: 3, title: 'Método START de Triagem', duration: '25min', completed: false, text: 'Classificação de vítimas por cor (verde, amarelo, vermelho, preto) baseado em respiração, perfusão e estado mental.' },
          { id: 4, title: 'Múltiplas Vítimas em Incidentes com Hazmat', duration: '30min', completed: false, text: 'Protocolos de descontaminação e atendimento em cenários com materiais perigosos.' }
        ]
      },
      {
        id: 3,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 5, title: 'Avaliação Final do Curso', duration: '30min', completed: false, isFinalExam: true, text: 'Avaliação teórica final de Atendimento Pré-Hospitalar (APH) do CBMAM.',
            quiz: [
              { questionText: 'Qual a prioridade zero na avaliação primária de trauma segundo o protocolo atualizado (XABCDE)?', options: ['Abertura de vias aéreas', 'Controle de hemorragia externa massiva', 'Avaliação neurológica', 'Prevenção de hipotermia'], correctOption: 1 },
              { questionText: 'Qual a relação correta de compressões e ventilações para RCP em adulto com um socorrista?', options: ['15 compressões para 2 ventilações', '30 compressões para 2 ventilações', '10 compressões para 1 ventilação', '30 compressões para 5 ventilações'], correctOption: 1 },
              { questionText: 'O que representa a letra D no protocolo de trauma?', options: ['Dor nas articulações', 'Disfunção neurológica / Estado mental', 'Descompressão torácica', 'Desfibrilação imediata'], correctOption: 1 },
              { questionText: 'No método START, qual cor é atribuída a uma vítima que não respira após abertura de vias aéreas?', options: ['Vermelha', 'Amarela', 'Verde', 'Preta'], correctOption: 3 }
            ]
          }
        ]
      }
    ]
  },
  3: {
    id: 3,
    title: 'Salvamento em Altura',
    category: 'physical',
    categoryName: 'Treinamento & Resgate',
    categoryClass: 'cat-physical',
    level: 'Intermediário',
    levelText: 'Soldado → Oficial',
    description: 'Técnicas de rapel tático, resgate em ribanceiras, ancoragens, tirolesas e salvamento em elevadores e guindastes.',
    instructor: 'Cap. QOBM André Oliveira',
    duration: 50,
    enrolled: 187,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Nós, Voltas e Ancoragens',
        lessons: [
          { id: 1, title: 'Tipos de Cordas e Manutenção', duration: '15min', completed: false, text: 'Cordas estáticas versus dinâmicas. Limpeza, armazenamento e descarte por desgaste químico ou físico.' },
          { id: 2, title: 'Confecção de Nós Operacionais', duration: '30min', completed: false, text: 'Confecção prática do nó Oito, Lais de Guia, Volta do Fiel e Prusik para sistemas de segurança.' }
        ]
      },
      {
        id: 2,
        title: 'Rapel Tático e Resgate em Ribanceiras',
        lessons: [
          { id: 3, title: 'Equipamentos Individuais de Resgate', duration: '20min', completed: false, text: 'Cadeirinha, ascensores, descensores (Oito, Stop), mosquetões e freios.' },
          { id: 4, title: 'Manobras em Rapel Tático', duration: '40min', completed: false, text: 'Descida controlada, mudança de direção, fracionamentos e resgate de vítima consciente e inconsciente.' }
        ]
      },
      {
        id: 3,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 5, title: 'Avaliação Final do Curso', duration: '30min', completed: false, isFinalExam: true, text: 'Avaliação teórica final de Salvamento em Altura do CBMAM.',
            quiz: [
              { questionText: 'Qual nó é amplamente considerado o mais seguro para criar uma alça fixa na ponta de uma corda de salvamento?', options: ['Nó Direito', 'Lais de Guia', 'Nó de Porco', 'Volta do Fiel'], correctOption: 1 },
              { questionText: 'Cordas estáticas são indicadas preferencialmente para qual atividade?', options: ['Rapel e içamento de cargas', 'Escalada esportiva com quedas frequentes', 'Amarração rápida de lonas', 'Pesca subaquática'], correctOption: 0 },
              { questionText: 'Em rapel, qual a função principal do freio oito?', options: ['Subir a corda', 'Controlar a velocidade de descida', 'Amarrar cargas', 'Sinalização'], correctOption: 1 }
            ]
          }
        ]
      }
    ]
  },
  4: {
    id: 4,
    title: 'Mergulho Operacional',
    category: 'prev',
    categoryName: 'Prevenção & Salvamento',
    categoryClass: 'cat-prev',
    level: 'Avançado',
    levelText: 'Militar Especialista',
    description: 'Instrução avançada de mergulho autônomo, buscas subaquáticas em rios amazônicos (baixa visibilidade) e física do mergulho.',
    instructor: 'Cap. QOBM Marcos Lima',
    duration: 80,
    enrolled: 92,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Física e Fisiologia do Mergulho',
        lessons: [
          { id: 1, title: 'Leis dos Gases aplicadas ao Mergulho', duration: '25min', completed: false, text: 'Lei de Boyle, Lei de Dalton e Lei de Henry. Efeitos da pressão sobre volumes gasosos no corpo humano.' },
          { id: 2, title: 'Doença Descompressiva e Barotraumas', duration: '35min', completed: false, text: 'Formação de bolhas de nitrogênio nos tecidos, sintomas de embolia gasosa arterial e uso correto de tabelas de descompressão do CBMAM.' }
        ]
      },
      {
        id: 2,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 3, title: 'Avaliação Final do Curso', duration: '30min', completed: false, isFinalExam: true, text: 'Avaliação teórica final de Mergulho Operacional do CBMAM.',
            quiz: [
              { questionText: 'Qual lei da física explica por que o volume de ar nos pulmões de um mergulhador dobra ao subir de 10m de profundidade para a superfície sem expirar?', options: ['Lei de Dalton', 'Lei de Boyle-Mariotte', 'Lei de Henry', 'Lei de Newton'], correctOption: 1 },
              { questionText: 'Qual é o tratamento imediato primário para um mergulhador militar apresentando sintomas graves de Doença Descompressiva?', options: ['Mergulhar novamente imediatamente', 'Oxigenoterapia hiperbárica na câmara de descompressão', 'Ingestão abundante de café quente', 'Massagem cardíaca vigorosa'], correctOption: 1 }
            ]
          }
        ]
      }
    ]
  },
  5: {
    id: 5,
    title: 'Direção Defensiva e Veículos de Emergência',
    category: 'defesa',
    categoryName: 'Defesa Civil & Socorro',
    categoryClass: 'cat-defesa',
    level: 'Básico',
    levelText: 'Recruta',
    description: 'Condução segura de viaturas pesadas em situação de emergência, códigos sonoros e luminosos, legislação de trânsito militar.',
    instructor: 'Maj. QOBM José Carlos',
    duration: 30,
    enrolled: 320,
    rating: 4.6,
    modules: [
      {
        id: 1,
        title: 'Legislação e Sinalização',
        lessons: [
          { id: 1, title: 'Código de Trânsito Brasileiro aplicado ao CBMAM', duration: '20min', completed: false, text: 'Artigos do CTB que regem veículos de emergência, preferências de passagem e responsabilidades do condutor militar.' },
          { id: 2, title: 'Sinalização Sonora e Luminosa', duration: '15min', completed: false, text: 'Giroflex, sirenes (wail, yelp, phaser), uso correto e protocolos em deslocamentos.' }
        ]
      },
      {
        id: 2,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 3, title: 'Avaliação Final do Curso', duration: '30min', completed: false, isFinalExam: true, text: 'Avaliação teórica final de Condução de Veículos de Emergência do CBMAM.',
            quiz: [
              { questionText: 'Qual a velocidade máxima permitida para veículos de emergência em vias com regulamentação?', options: ['Sempre 80 km/h', 'Limite da via, observando segurança', '100 km/h fixos', 'Sem limite'], correctOption: 1 }
            ]
          }
        ]
      }
    ]
  },
  6: {
    id: 6,
    title: 'Comunicação de Rádio Operacional',
    category: 'physical',
    categoryName: 'Treinamento & Resgate',
    categoryClass: 'cat-physical',
    level: 'Básico',
    levelText: 'Todos os efetivos',
    description: 'Protocolos de comunicação via rádio HT, fonia militar, código Q e procedimentos de despacho.',
    instructor: 'Cap. QOBM Fernanda Alves',
    duration: 20,
    enrolled: 510,
    rating: 4.5,
    modules: [
      {
        id: 1,
        title: 'Fonia e Procedimentos',
        lessons: [
          { id: 1, title: 'Códigos Q e Procedimentos de Chamada', duration: '15min', completed: false, text: 'QAP, QSL, QTH, QTR e QSA. Estrutura de chamada em três tempos e transmissão em fonia clara.' },
          { id: 2, title: 'Comunicação em Operações Táticas', duration: '20min', completed: false, text: 'Coordenação via rádio em ocorrências com múltiplas viaturas e efetivo em campo.' }
        ]
      },
      {
        id: 2,
        title: 'Homologação e Exame Final',
        lessons: [
          { id: 3, title: 'Avaliação Final do Curso', duration: '20min', completed: false, isFinalExam: true, text: 'Avaliação teórica final de Comunicação de Rádio Operacional do CBMAM.',
            quiz: [
              { questionText: 'O que significa QAP no código Q internacional?', options: ['Quem atende?', 'Aqui presente / Aguardando contato', 'Quilometragem até ponto', 'Quarto andar de prédio'], correctOption: 1 }
            ]
          }
        ]
      }
    ]
  }
};

// Glossário
const glossary = [
  { term: 'EPRA', definition: 'Equipamento de Proteção Respiratória Autônoma. Aparelho de ar comprimido usado em ambientes com fumaça ou atmosfera hostil.' },
  { term: 'EPI', definition: 'Equipamento de Proteção Individual. Roupas, capacetes, botas e luvas que protegem o bombeiro em operações.' },
  { term: 'HAZMAT', definition: 'Hazardous Materials. Materiais perigosos que oferecem risco à saúde, ao meio ambiente ou à segurança.' },
  { term: 'SBV', definition: 'Suporte Básico de Vida. Conjunto de procedimentos de emergência para manutenção da vida até chegada do socorro avançado.' },
  { term: 'RCP', definition: 'Reanimação Cardiopulmonar. Técnica de compressões torácicas e ventilações para vítimas em parada cardiorrespiratória.' },
  { term: 'DEA', definition: 'Desfibrilador Externo Automático. Equipamento portátil que analisa ritmo cardíaco e aplica choque elétrico quando necessário.' },
  { term: 'START', definition: 'Simple Triage And Rapid Treatment. Método de triagem rápida em múltiplas vítimas baseado em cor (verde, amarelo, vermelho, preto).' },
  { term: 'XABCDE', definition: 'Protocolo de avaliação primária: X (hemorragia), A (vias aéreas), B (respiração), C (circulação), D (neurológico), E (exposição).' },
  { term: 'Aceiro', definition: 'Faixa de vegetação limpa para impedir a propagação do fogo em incêndios florestais.' },
  { term: 'Combustão', definition: 'Reação química de oxidação rápida entre combustível e comburente com liberação de calor e luz.' },
  { term: 'Comburente', definition: 'Substância que permite a combustão, geralmente o oxigênio presente no ar atmosférico.' },
  { term: 'Triângulo do Fogo', definition: 'Representação dos três elementos essenciais para combustão: combustível, comburente e calor.' },
  { term: 'Lais de Guia', definition: 'Nó que forma uma alça fixa e segura, usado em salvamento e resgate.' },
  { term: 'Rapel', definition: 'Técnica de descida controlada por corda em paredes verticais ou em operações de resgate.' },
  { term: 'Lei de Boyle-Mariotte', definition: 'Lei física que relaciona pressão e volume de gases a temperatura constante. Fundamental no mergulho.' },
  { term: 'Doença Descompressiva', definition: 'Doença causada pela formação de bolhas de nitrogênio nos tecidos devido a ascensão rápida no mergulho.' },
  { term: 'Barotrauma', definition: 'Lesão tecidual causada por variações de pressão durante o mergulho, especialmente em ouvido e pulmões.' },
  { term: 'Fonia', definition: 'Comunicação por voz via rádio. Deve ser clara, objetiva e seguir protocolos militares.' },
  { term: 'Código Q', definition: 'Conjunto de códigos internacionais de três letras usado em radiocomunicação militar e amador.' },
  { term: 'QAP', definition: 'Sinal de código Q que significa "aqui presente" ou "estou aguardando contato".' },
  { term: 'Viatura', definition: 'Veículo oficial utilizado pelo Corpo de Bombeiros para transporte de efetivo e equipamentos.' },
  { term: 'Giroflex', definition: 'Sinalizador luminoso rotativo instalado em viaturas de emergência.' },
  { term: 'ABT', definition: 'Auto Bomba Tanque. Viatura do CBMAM dotada de tanque de água para combate a incêndios.' },
  { term: 'ABS', definition: 'Auto Busca e Salvamento. Viatura equipada para operações de resgate e salvamento.' },
  { term: 'TFM', definition: 'Teste de Aptidão Física Militar. Avaliação física periódica dos bombeiros militares.' },
  { term: 'CBMAM', definition: 'Corpo de Bombeiros Militar do Amazonas. Instituição de defesa civil e salvamento do Estado do Amazonas.' },
  { term: 'QOBM', definition: 'Quadro de Oficiais do Bombeiro Militar.' },
  { term: 'QOSM', definition: 'Quadro de Oficiais de Saúde Militar.' },
  { term: 'Cadete', definition: 'Aluno em formação inicial na Academia de Bombeiro Militar.' },
  { term: 'Tenente', definition: 'Posto hierárquico intermediário de oficial do CBMAM.' },
  { term: 'Capitão', definition: 'Posto hierárquico de oficial superior dentro do CBMAM.' },
  { term: 'Major', definition: 'Posto hierárquico de oficial superior dentro do CBMAM.' },
  { term: 'Cel. QOBM', definition: 'Coronel do Quadro de Oficiais do Bombeiro Militar. Posto mais alto da carreira.' }
];

const fakeRanking = [
  { name: 'Cadete Mariana Souza', xp: 4280, level: 'Cabo', avatar: 'M', badges: 8 },
  { name: 'Cadete Pedro Henrique', xp: 3940, level: 'Recruta', avatar: 'P', badges: 6 },
  { name: 'Cadete Juliana Costa', xp: 3120, level: 'Recruta', avatar: 'J', badges: 5 },
  { name: 'Cadete Lucas Oliveira', xp: 2890, level: 'Recruta', avatar: 'L', badges: 4 },
  { name: 'Cadete Beatriz Santos', xp: 2450, level: 'Recruta', avatar: 'B', badges: 3 },
  { name: 'Cadete Rafael Lima', xp: 1980, level: 'Recruta', avatar: 'R', badges: 3 },
  { name: 'Cadete Camila Pereira', xp: 1620, level: 'Recruta', avatar: 'C', badges: 2 },
  { name: 'Cadete Bruno Silva', xp: 1340, level: 'Recruta', avatar: 'B', badges: 2 },
  { name: 'Cadete Amanda Rocha', xp: 980, level: 'Recruta', avatar: 'A', badges: 1 },
  { name: 'Cadete Felipe Cardoso', xp: 720, level: 'Recruta', avatar: 'F', badges: 1 }
];

const upcomingActivities = [
  { id: 1, title: 'Salvamento Aquático - Rio Negro', date: '2026-06-24', time: '08:00', location: 'Manaus - Praia da Ponta Negra', instructor: 'Cap. QOBM Marcos Lima', type: 'aquatico', vagas: 30 },
  { id: 2, title: 'Simulado de Evacuação em Escola', date: '2026-06-28', time: '14:00', location: 'Escola Estadual Amazonas', instructor: 'Maj. QOBM João Silva', type: 'evacuacao', vagas: 20 },
  { id: 3, title: 'Combate a Incêndio Florestal', date: '2026-07-02', time: '07:00', location: 'BR-319 Km 45', instructor: 'Cap. QOBM Roberto Mendes', type: 'florestal', vagas: 40 },
  { id: 4, title: 'Rapel Tático - Torre de Treinamento', date: '2026-07-08', time: '09:00', location: 'Quartel do CBMAM', instructor: 'Cap. QOBM André Oliveira', type: 'altura', vagas: 15 },
  { id: 5, title: 'APH - Triagem START', date: '2026-07-12', time: '10:00', location: 'Hospital 28 de Agosto', instructor: 'Ten. QOSM Carla Santos', type: 'medico', vagas: 25 },
  { id: 6, title: 'Mergulho em Rio - Treinamento', date: '2026-07-18', time: '06:00', location: 'Rio Tarumã-Açu', instructor: 'Cap. QOBM Marcos Lima', type: 'aquatico', vagas: 12 },
  { id: 7, title: 'Direção Defensiva - Pista Molhada', date: '2026-07-22', time: '13:00', location: 'Autódromo Vivaldo Pinto', instructor: 'Maj. QOBM José Carlos', type: 'direcao', vagas: 18 },
  { id: 8, title: 'Comunicação Tática via Rádio', date: '2026-07-26', time: '15:00', location: 'Quartel Central', instructor: 'Cap. QOBM Fernanda Alves', type: 'radio', vagas: 50 }
];

const allBadges = [
  { id: 'dedication', name: 'DEDICAÇÃO', icon: '🎖️', desc: 'Concluiu 1 curso', check: (s) => s.completedCourses.length >= 1 },
  { id: 'discipline', name: 'DISCIPLINA', icon: '🏅', desc: 'Concluiu 3 cursos', check: (s) => s.completedCourses.length >= 3 },
  { id: 'excellence', name: 'EXCELÊNCIA', icon: '🏆', desc: 'Média geral > 90%', check: (s) => s.avgScore >= 90 && s.completedQuizzes > 0 },
  { id: 'firefighter', name: 'BOMBEIRO', icon: '🚒', desc: 'Concluiu curso de Combate a Incêndio', check: (s) => s.completedCoursesIds.includes(1) },
  { id: 'medic', name: 'SOCORRISTA', icon: '🚑', desc: 'Concluiu curso de APH', check: (s) => s.completedCoursesIds.includes(2) },
  { id: 'rescuer', name: 'RESGATISTA', icon: '🧗', desc: 'Concluiu curso de Salvamento em Altura', check: (s) => s.completedCoursesIds.includes(3) },
  { id: 'diver', name: 'MERGULHADOR', icon: '🤿', desc: 'Concluiu curso de Mergulho', check: (s) => s.completedCoursesIds.includes(4) },
  { id: 'streak7', name: '7 DIAS', icon: '🔥', desc: 'Acessou 7 dias seguidos', check: (s) => s.streakDays >= 7 },
  { id: 'streak30', name: '30 DIAS', icon: '⚡', desc: 'Acessou 30 dias seguidos', check: (s) => s.streakDays >= 30 },
  { id: 'firstnote', name: 'ANOTAÇÕES', icon: '📝', desc: 'Salvou sua primeira anotação', check: (s) => s.notesCount >= 1 },
  { id: 'firstbookmark', name: 'FAVORITO', icon: '🔖', desc: 'Marcou sua primeira aula', check: (s) => s.bookmarksCount >= 1 },
  { id: 'commenter', name: 'PARTICIPATIVO', icon: '💬', desc: 'Fez seu primeiro comentário', check: (s) => s.commentsCount >= 1 },
  { id: 'nps', name: 'AVALIADOR', icon: '⭐', desc: 'Avaliou um curso com NPS', check: (s) => s.npsCount >= 1 },
  { id: 'perfect', name: 'PERFEIÇÃO', icon: '💯', desc: 'Tirou 100% em uma avaliação', check: (s) => s.maxScore === 100 },
  { id: 'fullxp', name: 'XP 1000', icon: '🎯', desc: 'Atingiu 1000 pontos de experiência', check: (s) => s.xp >= 1000 },
  { id: 'fullxp5000', name: 'XP 5000', icon: '👑', desc: 'Atingiu 5000 pontos de experiência', check: (s) => s.xp >= 5000 }
];

const defaultNotifications = [
  { id: 1, title: 'Nova diretriz de Salvamento em Altura', message: 'As inscrições para a etapa prática presencial do curso encerram no próximo dia 30/06.', time: 'Há 3 horas', type: 'alert', read: false },
  { id: 2, title: 'Atualização das POPs 2026', message: 'Os novos Manuais de Procedimentos Operacionais Padrão foram adicionados ao módulo 1 do curso de Combate a Incêndio.', time: 'Ontem', type: 'info', read: false },
  { id: 3, title: 'Parabéns! Nova conquista desbloqueada', message: 'Você atingiu 7 dias consecutivos acessando a plataforma. Medalha "7 DIAS" liberada.', time: 'Há 2 dias', type: 'success', read: true },
  { id: 4, title: 'Atividade prática agendada', message: 'Salvamento Aquático no Rio Negro - 24/06 às 08:00. Confirme sua inscrição.', time: 'Há 3 dias', type: 'event', read: true }
];

const defaultStudents = [
  { id: 1, name: 'João Victor da Silva Oliveira', rank: 'Cadete BM', email: 'joao.victor@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 2480, level: 'Recruta' },
  { id: 2, name: 'Mariana Souza Costa', rank: 'Cadete BM', email: 'mariana.souza@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 4280, level: 'Cabo' },
  { id: 3, name: 'Pedro Henrique Almeida', rank: 'Soldado BM', email: 'pedro.almeida@cbm.am.gov.br', enrolled: '2024-03-15', status: 'active', xp: 3940, level: 'Cabo' },
  { id: 4, name: 'Juliana Costa Pereira', rank: 'Cadete BM', email: 'juliana.costa@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 3120, level: 'Recruta' },
  { id: 5, name: 'Lucas Oliveira Santos', rank: 'Cadete BM', email: 'lucas.oliveira@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 2890, level: 'Recruta' },
  { id: 6, name: 'Beatriz Santos Lima', rank: 'Cabo BM', email: 'beatriz.santos@cbm.am.gov.br', enrolled: '2023-08-10', status: 'active', xp: 2450, level: 'Recruta' },
  { id: 7, name: 'Rafael Lima Cardoso', rank: 'Cabo BM', email: 'rafael.lima@cbm.am.gov.br', enrolled: '2023-08-10', status: 'active', xp: 1980, level: 'Recruta' },
  { id: 8, name: 'Camila Pereira Rocha', rank: 'Soldado BM', email: 'camila.pereira@cbm.am.gov.br', enrolled: '2024-03-15', status: 'inactive', xp: 1620, level: 'Recruta' },
  { id: 9, name: 'Bruno Silva Mendes', rank: 'Cabo BM', email: 'bruno.silva@cbm.am.gov.br', enrolled: '2022-05-20', status: 'active', xp: 1340, level: 'Recruta' },
  { id: 10, name: 'Amanda Rocha Souza', rank: 'Cadete BM', email: 'amanda.rocha@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 980, level: 'Recruta' },
  { id: 11, name: 'Felipe Cardoso Almeida', rank: 'Cadete BM', email: 'felipe.cardoso@cbm.am.gov.br', enrolled: '2025-09-01', status: 'active', xp: 720, level: 'Recruta' },
  { id: 12, name: 'Fernanda Alves Lima', rank: 'Capitão QOBM', email: 'fernanda.alves@cbm.am.gov.br', enrolled: '2015-02-01', status: 'active', xp: 8920, level: 'Sargento' }
];

// Capítulos / legendas fictícias para o vídeo
const videoCaptions = {
  default: [
    { from: 0, text: 'Iniciando instrução militar...' },
    { from: 25, text: 'Bem-vindos à aula operacional do CBMAM.' },
    { from: 50, text: 'O triângulo do fogo é formado por três elementos essenciais.' },
    { from: 75, text: 'A quebra de qualquer um deles causa a extinção.' }
  ]
};

// =========================================================
// ESTADO GLOBAL DA APLICAÇÃO
// =========================================================
let state = {
  currentUser: null,
  courses: {},
  notes: {},
  quizScores: {},
  bookmarks: [],
  comments: {},
  nps: {},
  pretest: {},
  posttest: {},
  activitySignups: [],
  customActivities: [],
  notifications: [],
  activeCourseId: 1,
  activeModuleId: 1,
  activeLessonId: 2,
  currentTab: 'dashboard',
  theme: 'dark',
  lastAccessDate: null,
  streakDays: 0,
  xp: 0,
  quizPracticeMode: false,
  playbackSpeed: 1,
  recentActivities: [
    { text: 'Cadete João Victor acessou a plataforma EAD.', time: 'Há 5 min' },
    { text: 'Apostila de Combate a Incêndio atualizada.', time: 'Há 2 horas' }
  ]
};

// Variaveis globais de controle para renderização de PDF via PDF.js
let currentPdfDoc = null;
let currentPdfPageNum = 1;
let pdfRendering = false;
let pdfPagePending = null;
let sessionPdfData = {};

function loadState() {
  const savedState = localStorage.getItem('cbmam_ead_state');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    state = { ...state, ...parsed };
    if (!state.bookmarks) state.bookmarks = [];
    if (!state.comments) state.comments = {};
    if (!state.nps) state.nps = {};
    if (!state.pretest) state.pretest = {};
    if (!state.posttest) state.posttest = {};
    if (!state.activitySignups) state.activitySignups = [];
    if (!state.customActivities) state.customActivities = [];
    if (!state.notifications || state.notifications.length === 0) state.notifications = defaultNotifications;
    if (!state.theme) state.theme = 'dark';
    if (state.streakDays === undefined) state.streakDays = 0;
    if (state.xp === undefined) state.xp = 0;
    if (state.quizPracticeMode === undefined) state.quizPracticeMode = false;
  } else {
    state.courses = defaultCourses;
    state.notifications = defaultNotifications;
    saveState();
  }
  updateStreak();
  applyTheme(state.theme);
}

function saveState() {
  localStorage.setItem('cbmam_ead_state', JSON.stringify(state));
}

function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastAccessDate === today) return;
  
  if (state.lastAccessDate) {
    const last = new Date(state.lastAccessDate);
    const diffDays = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.streakDays++;
    } else if (diffDays > 1) {
      state.streakDays = 1;
    }
  } else {
    state.streakDays = 1;
  }
  state.lastAccessDate = today;
  saveState();
}

// =========================================================
// SISTEMA DE XP E NÍVEIS
// =========================================================
function calculateLevel(xp) {
  const levels = [
    { min: 0, name: 'Recruta', color: '#94a3b8' },
    { min: 500, name: 'Soldado', color: '#0ea5e9' },
    { min: 1500, name: 'Cabo', color: '#12b76a' },
    { min: 3000, name: 'Sargento', color: '#f79009' },
    { min: 5000, name: 'Tenente', color: '#dfb034' },
    { min: 8000, name: 'Capitão', color: '#d92d20' },
    { min: 12000, name: 'Major', color: '#a855f7' },
    { min: 18000, name: 'Cel. QOBM', color: '#ec4899' }
  ];
  let currentLevel = levels[0];
  let nextLevel = levels[1];
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].min) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1] || levels[i];
    }
  }
  const xpInLevel = xp - currentLevel.min;
  const xpForNext = nextLevel.min - currentLevel.min;
  const progress = nextLevel.min > currentLevel.min ? (xpInLevel / xpForNext) * 100 : 100;
  return { current: currentLevel, next: nextLevel, progress: progress, levelNumber: levels.indexOf(currentLevel) + 1 };
}

function addXP(amount, reason) {
  state.xp += amount;
  if (state.currentUser) {
    state.recentActivities.unshift({
      text: `${state.currentUser.name} ganhou ${amount} XP por ${reason}.`,
      time: 'Agora mesmo'
    });
  }
  saveState();
  renderHeaderUserInfo();
  checkNewBadges();
}

function checkNewBadges() {
  const stats = getBadgeStats();
  const unlockedBefore = JSON.parse(localStorage.getItem('cbmam_unlocked_badges') || '[]');
  const newlyUnlocked = [];
  
  allBadges.forEach(b => {
    if (b.check(stats) && !unlockedBefore.includes(b.id)) {
      newlyUnlocked.push(b);
    }
  });
  
  if (newlyUnlocked.length > 0) {
    const newList = [...unlockedBefore, ...newlyUnlocked.map(b => b.id)];
    localStorage.setItem('cbmam_unlocked_badges', JSON.stringify(newList));
    newlyUnlocked.forEach(b => {
      state.notifications.unshift({
        id: Date.now() + Math.random(),
        title: `🏅 Medalha "${b.name}" desbloqueada!`,
        message: b.desc,
        time: 'Agora',
        type: 'success',
        read: false
      });
    });
    saveState();
    renderNotifications();
  }
}

function getBadgeStats() {
  let totalLessons = 0;
  let completedLessons = 0;
  let totalQuizScore = 0;
  let completedQuizzes = 0;
  let maxScore = 0;
  const completedCourses = [];
  const completedCoursesIds = [];
  
  Object.values(state.courses).forEach(course => {
    const progress = calculateCourseProgress(course);
    if (progress === 100) {
      completedCourses.push(course);
      completedCoursesIds.push(course.id);
    }
    course.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        totalLessons++;
        if (les.completed) completedLessons++;
        const qKey = `${course.id}-${mod.id}-${les.id}`;
        const score = state.quizScores[qKey];
        if (score !== undefined) {
          totalQuizScore += score;
          completedQuizzes++;
          if (score > maxScore) maxScore = score;
        }
      });
    });
  });
  
  const avgScore = completedQuizzes > 0 ? Math.round(totalQuizScore / completedQuizzes) : 0;
  const notesCount = Object.keys(state.notes).length;
  const bookmarksCount = state.bookmarks.length;
  let commentsCount = 0;
  Object.values(state.comments).forEach(arr => commentsCount += arr.length);
  const npsCount = Object.keys(state.nps).length;
  
  return {
    completedCourses,
    completedCoursesIds,
    avgScore,
    completedQuizzes,
    maxScore,
    streakDays: state.streakDays,
    xp: state.xp,
    notesCount,
    bookmarksCount,
    commentsCount,
    npsCount
  };
}

// =========================================================
// AUTENTICAÇÃO E LOGIN
// =========================================================
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorBox = document.getElementById('loginError');
  
  errorBox.style.display = 'none';
  
  // Validação real
  if (!email || !email.includes('@')) {
    errorBox.textContent = '❌ E-mail inválido. Use o formato militar@cbm.am.gov.br';
    errorBox.style.display = 'block';
    return;
  }
  if (password.length < 4) {
    errorBox.textContent = '❌ Senha deve ter no mínimo 4 caracteres.';
    errorBox.style.display = 'block';
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'E-mail ou senha inválidos');
    }
    
    const data = await res.json();
    state.token = data.token;
    state.currentUser = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.cargo,
      name: data.user.nome,
      rank: data.user.cargo === 'admin' ? 'Major BM' : (data.user.cargo === 'instructor' ? 'Capitão BM' : 'Cadete BM')
    };
    
    saveState();
    await loadCourses();
    initAppLayout();
  } catch (err) {
    errorBox.textContent = `❌ ${err.message}`;
    errorBox.style.display = 'block';
  }
}

function handleLogout() {
  state.currentUser = null;
  saveState();
  document.getElementById('appLayout').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('active');
}

function openForgotPasswordModal(e) {
  if (e) e.preventDefault();
  document.getElementById('forgotPasswordModal').style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('recoveryEmail').value.trim();
  const feedback = document.getElementById('forgotPasswordFeedback');
  
  if (!email || !email.includes('@')) {
    feedback.innerHTML = '<span style="color: var(--accent-red);">❌ Informe um e-mail válido.</span>';
    return;
  }
  
  feedback.innerHTML = `
    <div style="padding: 12px; background-color: rgba(18, 183, 106, 0.1); border: 1px solid var(--success); border-radius: 8px;">
      <strong style="color: var(--success);">✅ E-mail enviado!</strong><br>
      <span style="font-size: 0.85rem; color: var(--text-secondary);">
        Um link de redefinição foi enviado para <strong>${email}</strong>.<br>
        Verifique sua caixa de entrada e spam.
      </span>
    </div>
  `;
  document.getElementById('recoveryEmail').value = '';
  setTimeout(() => closeModal('forgotPasswordModal'), 3500);
}

// =========================================================
// INICIALIZAÇÃO DO APP
// =========================================================
async function initAppLayout() {
  if (!state.currentUser) {
    document.getElementById('appLayout').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    return;
  }
  
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appLayout').style.display = 'flex';
  
  // Carrega todos os dados reais do backend
  await loadCourses();
  await loadProfile();
  await loadBookmarks();
  await loadNotifications();
  await loadActivities();
  
  renderHeaderUserInfo();
  renderSidebarMenu();
  
  if (state.currentUser.role === 'admin' || state.currentUser.role === 'instructor') {
    switchTab('admin');
  } else {
    switchTab('dashboard');
  }
  
  renderDashboard();
  renderCatalog();
  renderClassroom();
  renderCertificates();
  renderNotifications();
  renderHeaderUserInfo();
  checkNewBadges();
}

function renderHeaderUserInfo() {
  if (!state.currentUser) return;
  document.getElementById('userNameLabel').textContent = state.currentUser.name;
  document.getElementById('userRankLabel').textContent = state.currentUser.rank;
  document.getElementById('headerUserGreeting').textContent = `Olá, ${state.currentUser.name.split(' ')[0]}`;
  document.getElementById('userAvatar').textContent = state.currentUser.name.charAt(0);
  
  // XP e nível no sidebar
  const level = calculateLevel(state.xp);
  const xpFill = document.getElementById('userXpFill');
  const levelBadge = document.getElementById('userLevelBadge');
  if (xpFill) xpFill.style.width = `${level.progress}%`;
  if (levelBadge) levelBadge.textContent = `${level.current.name} (${state.xp} XP)`;
  
  // Streak
  const streakDays = document.getElementById('streakDays');
  if (streakDays) streakDays.textContent = state.streakDays;
}

function renderSidebarMenu() {
  const menuContainer = document.getElementById('navMenuItems');
  let menuHtml = '';
  const isAdmin = state.currentUser.role === 'admin' || state.currentUser.role === 'instructor';
  
  const navItem = (id, label, svg) => `<li>
    <a class="nav-item ${state.currentTab === id ? 'active' : ''}" onclick="switchTab('${id}')">
      ${svg}<span>${label}</span>
    </a>
  </li>`;
  
  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    catalog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
    classroom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    certificates: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    ranking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M17 4h2a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4M7 4H5a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4M12 4v10"/></svg>',
    glossary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>',
    bookmarks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    admin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  };
  
  if (isAdmin) {
    menuHtml = navItem('admin', 'Painel Admin', icons.admin);
    menuHtml += navItem('catalog', 'Catálogo', icons.catalog);
    menuHtml += navItem('classroom', 'Visualizar Aulas', icons.classroom);
    menuHtml += navItem('glossary', 'Glossário', icons.glossary);
    document.getElementById('sidebarLogoTitle').textContent = state.currentUser.role === 'admin' ? 'CBMAM ADM' : 'CBMAM INST';
    document.getElementById('sidebarLogoSubtitle').textContent = state.currentUser.role === 'admin' ? 'Painel Admin' : 'Controle Instrutor';
  } else {
    menuHtml = navItem('dashboard', 'Página Inicial', icons.home);
    menuHtml += navItem('catalog', 'Catálogo', icons.catalog);
    menuHtml += navItem('classroom', 'Aula Atual', icons.classroom);
    menuHtml += navItem('certificates', 'Certificados & Progresso', icons.certificates);
    menuHtml += navItem('ranking', 'Ranking', icons.ranking);
    menuHtml += navItem('calendar', 'Calendário Prático', icons.calendar);
    menuHtml += navItem('bookmarks', 'Favoritos', icons.bookmarks);
    menuHtml += navItem('history', 'Meu Histórico', icons.history);
    menuHtml += navItem('glossary', 'Glossário', icons.glossary);
    document.getElementById('sidebarLogoTitle').textContent = 'CBMAM';
    document.getElementById('sidebarLogoSubtitle').textContent = 'Ensino a Distância';
  }
  
  menuContainer.innerHTML = menuHtml;
}

function switchTab(tabId) {
  state.currentTab = tabId;
  saveState();
  
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  const targetTab = document.getElementById(`${tabId}Tab`);
  if (targetTab) targetTab.classList.add('active');
  
  renderSidebarMenu();
  closeSidebar();
  
  const titleMap = {
    dashboard: 'Painel de Ensino',
    catalog: 'Catálogo de Cursos',
    classroom: 'Instrução Operacional',
    certificates: 'Meu Rendimento Militar',
    admin: 'Painel Geral de Analytics',
    ranking: 'Ranking da Academia',
    glossary: 'Glossário Militar',
    calendar: 'Calendário de Atividades',
    history: 'Meu Histórico',
    bookmarks: 'Aulas Favoritas'
  };
  document.getElementById('currentPageTitle').textContent = titleMap[tabId] || 'EAD CBMAM';
  
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'classroom') renderClassroom();
  if (tabId === 'certificates') renderCertificates();
  if (tabId === 'admin') renderAdminPanel();
  if (tabId === 'ranking') renderRanking();
  if (tabId === 'glossary') renderGlossary();
  if (tabId === 'calendar') renderCalendar();
  if (tabId === 'history') renderHistory();
  if (tabId === 'bookmarks') renderBookmarks();
  
  // Fechar dropdowns ao trocar de aba
  document.getElementById('notifDropdown').classList.remove('active');
  document.getElementById('searchResults').classList.remove('active');
}

function calculateCourseProgress(course) {
  if (course.apenas_pdf_texto) {
    return course.pdf_progress ? course.pdf_progress.progresso_porcentagem : 0;
  }
  let totalLessons = 0;
  let completedLessons = 0;
  course.modules.forEach(mod => {
    mod.lessons.forEach(les => {
      totalLessons++;
      if (les.completed) completedLessons++;
    });
  });
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
}

// =========================================================
// SIDEBAR MOBILE / HAMBURGER
// =========================================================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarBackdrop').classList.toggle('active');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('active');
}

// =========================================================
// TEMA CLARO/ESCURO
// =========================================================
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme(state.theme);
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('themeIcon').textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    document.getElementById('themeIcon').textContent = '🌙';
  }
}

// =========================================================
// NOTIFICAÇÕES
// =========================================================
function toggleNotifications() {
  const dropdown = document.getElementById('notifDropdown');
  dropdown.classList.toggle('active');
  document.getElementById('searchResults').classList.remove('active');
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;
  if (state.notifications.length === 0) {
    list.innerHTML = '<div class="notif-item">Nenhuma notificação.</div>';
  } else {
    list.innerHTML = state.notifications.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markNotifRead(${n.id})">
        <span class="notif-icon">${n.type === 'alert' ? '⚠️' : n.type === 'info' ? '📢' : n.type === 'success' ? '✅' : '📅'}</span>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-message">${n.message}</div>
          <span class="notif-time">${n.time}</span>
        </div>
      </div>
    `).join('');
  }
  
  const unread = state.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifBadge');
  badge.textContent = unread;
  badge.classList.toggle('zero', unread === 0);
}

function markAllRead() {
  state.notifications.forEach(n => n.read = true);
  saveState();
  renderNotifications();
}

function markNotifRead(id) {
  const notif = state.notifications.find(n => n.id === id);
  if (notif) {
    notif.read = true;
    saveState();
    renderNotifications();
  }
}

// =========================================================
// BUSCA GLOBAL
// =========================================================
function handleGlobalSearch(query) {
  const resultsBox = document.getElementById('searchResults');
  if (!query || query.length < 2) {
    resultsBox.classList.remove('active');
    return;
  }
  
  const q = query.toLowerCase();
  const results = [];
  
  // Buscar nos cursos
  Object.values(state.courses).forEach(course => {
    if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
      results.push({
        type: 'Curso',
        title: course.title,
        snippet: course.description.substring(0, 100) + '...',
        action: `launchCourse(${course.id}); clearSearch();`
      });
    }
    course.modules.forEach(mod => {
      if (mod.title.toLowerCase().includes(q)) {
        results.push({
          type: 'Módulo',
          title: `${course.title} → ${mod.title}`,
          snippet: '',
          action: `launchCourse(${course.id}); switchTab('classroom'); clearSearch();`
        });
      }
      mod.lessons.forEach(les => {
        if (les.title.toLowerCase().includes(q) || (les.text && les.text.toLowerCase().includes(q))) {
          results.push({
            type: 'Aula',
            title: les.title,
            snippet: `${course.title} · ${mod.title}`,
            action: `selectLessonFromSearch(${course.id}, ${mod.id}, ${les.id}); clearSearch();`
          });
        }
      });
    });
  });
  
  // Buscar no glossário
  glossary.forEach(g => {
    if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
      results.push({
        type: 'Glossário',
        title: g.term,
        snippet: g.definition.substring(0, 90) + '...',
        action: `switchTab('glossary'); document.getElementById('glossarySearch').value='${g.term}'; renderGlossary('${g.term}'); clearSearch();`
      });
    }
  });
  
  if (results.length === 0) {
    resultsBox.innerHTML = '<div class="search-empty">Nenhum resultado encontrado.</div>';
  } else {
    resultsBox.innerHTML = results.slice(0, 10).map(r => `
      <div class="search-result-item" onclick="${r.action}">
        <div class="search-result-type">${r.type}</div>
        <div class="search-result-title">${r.title}</div>
        ${r.snippet ? `<div class="search-result-snippet">${r.snippet}</div>` : ''}
      </div>
    `).join('');
  }
  
  resultsBox.classList.add('active');
}

function selectLessonFromSearch(courseId, moduleId, lessonId) {
  state.activeCourseId = courseId;
  state.activeModuleId = moduleId;
  state.activeLessonId = lessonId;
  saveState();
  switchTab('classroom');
}

function clearSearch() {
  document.getElementById('globalSearch').value = '';
  document.getElementById('searchResults').classList.remove('active');
}

// Fechar dropdowns ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    document.getElementById('searchResults').classList.remove('active');
  }
  if (!e.target.closest('.notif-btn') && !e.target.closest('.notif-dropdown')) {
    document.getElementById('notifDropdown').classList.remove('active');
  }
});

// =========================================================
// RENDERIZAÇÃO: DASHBOARD
// =========================================================
function renderDashboard() {
  const container = document.getElementById('studentCoursesProgressGrid');
  if (!container) return;
  
  let html = '';
  Object.values(state.courses).forEach(course => {
    const progress = calculateCourseProgress(course);
    let icon = '🔥', iconClass = 'flame';
    if (course.category === 'defesa') { icon = '🚑'; iconClass = 'cross'; }
    if (course.category === 'physical') { icon = '🧗'; iconClass = 'height'; }
    if (course.category === 'prev') { icon = '🤿'; iconClass = 'diver'; }
    
    html += `
      <div class="progress-card">
        <div class="progress-card-header">
          <div class="progress-icon ${iconClass}">${icon}</div>
          <span class="progress-level">${course.level}</span>
        </div>
        <h4>${course.title}</h4>
        <p>${course.description.substring(0, 80)}...</p>
        <div class="progress-bar-container">
          <div class="progress-bar-text">
            <span>Progresso</span>
            <strong>${progress}%</strong>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill ${iconClass === 'flame' ? 'red' : iconClass === 'cross' ? 'blue' : iconClass === 'height' ? 'orange' : 'green'}" style="width: ${progress}%;"></div>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm btn-full" onclick="launchCourse(${course.id})">Acessar Instrução</button>
      </div>
    `;
  });
  container.innerHTML = html;
  
  // Avisos no dashboard
  const announcementsEl = document.getElementById('dashboardAnnouncements');
  if (announcementsEl) {
    announcementsEl.innerHTML = state.notifications.slice(0, 4).map(n => `
      <div class="announcement-item">
        <span class="announcement-icon-alert">${n.type === 'alert' ? '⚠️' : n.type === 'info' ? '📢' : n.type === 'success' ? '✅' : '📅'}</span>
        <div class="announcement-content">
          <h5>${n.title}</h5>
          <p>${n.message}</p>
          <span class="announcement-time">${n.time}</span>
        </div>
      </div>
    `).join('');
  }
}

function launchCourse(courseId) {
  state.activeCourseId = courseId;
  const course = state.courses[courseId];
  if (course && course.modules.length > 0) {
    state.activeModuleId = course.modules[0].id;
    if (course.modules[0].lessons.length > 0) {
      state.activeLessonId = course.modules[0].lessons[0].id;
    }
  }
  saveState();
  switchTab('classroom');
}

// =========================================================
// RENDERIZAÇÃO: CATÁLOGO COM FILTROS
// =========================================================
function renderCatalog(filter = 'all') {
  const container = document.getElementById('catalogGridContainer');
  if (!container) return;
  
  let html = '';
  Object.values(state.courses).forEach(course => {
    if (filter !== 'all' && course.category !== filter) return;
    
    let icon = '🔥', catClass = 'cat-hazmat';
    if (course.category === 'defesa') { icon = '🛡️'; catClass = 'cat-defesa'; }
    if (course.category === 'physical') { icon = '🧗'; catClass = 'cat-physical'; }
    if (course.category === 'prev') { icon = '🚒'; catClass = 'cat-prev'; }
    
    const modulesCount = course.modules.length;
    const lessonsCount = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    
    html += `
      <div class="catalog-card ${catClass}">
        <div class="catalog-card-image">
          <div class="catalog-pattern ${catClass}-pattern"></div>
          <div class="category-icon-wrapper">${icon}</div>
          <div class="catalog-card-overlay"></div>
        </div>
        <div class="catalog-card-body">
          <span class="catalog-card-meta">${course.categoryName} · ${course.level}</span>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
            👨‍🏫 ${course.instructor || 'CBMAM'} · ⭐ ${course.rating || '4.5'} · 👥 ${course.enrolled || 0} cadetes
          </div>
          <div class="catalog-card-footer">
            <span class="course-count">${modulesCount} módulos · ${lessonsCount} instruções</span>
            <button class="btn btn-primary btn-sm" onclick="launchCourse(${course.id})">Acessar</button>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html || '<div style="grid-column: 1/-1; text-align:center; padding:40px; color: var(--text-muted);">Nenhum curso encontrado nesta categoria.</div>';
}

function filterCatalog(filter, btn) {
  document.querySelectorAll('#catalogFilters .filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCatalog(filter);
}

// =========================================================
// RENDERIZAÇÃO: SALA DE AULA
// =========================================================
let isPlaying = false;
let playInterval = null;
let playbackSpeed = 1;

function renderClassroom() {
  const course = state.courses[state.activeCourseId];
  if (!course) return;
  
  const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
  if (!moduleObj) return;
  
  const lessonObj = moduleObj.lessons.find(l => l.id === state.activeLessonId);
  if (!lessonObj) return;
  
  document.getElementById('classroomBreadcrumbsText').innerHTML = `Cursos &gt; ${course.title} &gt; ${moduleObj.title} &gt; ${lessonObj.title}`;
  document.getElementById('classroomLessonTitle').textContent = lessonObj.title;
  
  document.getElementById('classroomStudyText').innerHTML = `
    <p><strong>📘 Doutrina Operacional:</strong></p>
    <p>${lessonObj.text || 'O material pedagógico e de apoio estará disponível após a geração da aula pelo instrutor.'}</p>
  `;
  
  const materialsContainer = document.getElementById('classroomMaterialsDownloadList');
  materialsContainer.innerHTML = `
    <a href="#" class="download-item" onclick="alert('Download da apostila iniciado!'); return false;">
      <div class="download-item-info">
        <span>📄</span>
        <div>
          <div class="download-item-title">Manual de Instruções de ${course.title} - Módulo ${moduleObj.id}</div>
          <div class="download-item-size">PDF · 3.5 MB</div>
        </div>
      </div>
      <span>⬇️</span>
    </a>
    <a href="#" class="download-item" onclick="alert('Download da norma técnica iniciado!'); return false;">
      <div class="download-item-info">
        <span>📋</span>
        <div>
          <div class="download-item-title">POP - Procedimento Operacional Padrão</div>
          <div class="download-item-size">PDF · 1.2 MB</div>
        </div>
      </div>
      <span>⬇️</span>
    </a>
  `;
  
  const currentLessonId = state.activeLessonId;
  document.getElementById('classNotesTextArea').value = 'Carregando anotações...';
  
  fetch(`${API_BASE}/notes/${currentLessonId}`, {
    headers: { 'Authorization': `Bearer ${state.token}` }
  })
  .then(r => r.json())
  .then(data => {
    if (state.activeLessonId === currentLessonId) {
      document.getElementById('classNotesTextArea').value = data.note_text || '';
    }
  })
  .catch(err => {
    console.error('Erro ao buscar anotação:', err);
    if (state.activeLessonId === currentLessonId) {
      document.getElementById('classNotesTextArea').value = '';
    }
  });
  
  renderModulesAccordion(course);
  renderQuizBox(lessonObj);
  renderBookmarkState();
  renderLessonGlossary(lessonObj);
  renderForum();
}

function renderModulesAccordion(course) {
  const accordionContainer = document.getElementById('classroomModulesAccordion');
  let html = '';
  
  course.modules.forEach(mod => {
    const isModuleActive = mod.id === state.activeModuleId;
    const completedCount = mod.lessons.filter(l => l.completed).length;
    const totalCount = mod.lessons.length;
    const isCompleted = completedCount === totalCount;
    
    html += `
      <div class="accordion-section ${isModuleActive ? 'open' : ''}">
        <div class="accordion-header" onclick="toggleAccordionSection(${mod.id})">
          <div class="accordion-header-left">
            <span>📂</span>
            <h4>${mod.title}</h4>
          </div>
          <span class="accordion-progress-badge ${isCompleted ? 'progress-done' : 'progress-todo'}">
            ${completedCount}/${totalCount}
          </span>
        </div>
        <div class="accordion-body">
          ${mod.lessons.map(les => {
            const isActiveLesson = mod.id === state.activeModuleId && les.id === state.activeLessonId;
            return `
              <div class="class-item ${isActiveLesson ? 'active' : ''} ${les.completed ? 'completed' : ''}" onclick="selectLesson(${mod.id}, ${les.id})">
                <div class="class-item-info">
                  <span class="class-status-icon">${les.completed ? '✅' : '▶'}</span>
                  <div>
                    <div class="class-item-title">${les.title}</div>
                    <div class="class-item-duration">${les.duration}${les.isFinalExam ? ' · 🧪 Avaliação Final' : ''}</div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });
  
  accordionContainer.innerHTML = html;
}

function toggleAccordionSection(modId) {
  state.activeModuleId = modId;
  saveState();
  renderClassroom();
}

function selectLesson(modId, lesId) {
  const course = state.courses[state.activeCourseId];
  if (course) {
    const mod = course.modules.find(m => m.id === modId);
    const les = mod ? mod.lessons.find(l => l.id === lesId) : null;
    if (les && les.isFinalExam && state.currentUser.role === 'student') {
      // Trava da prova: usa o gate combinado do backend (GET /courses/:id →
      // course.exam_gate). Inclui conteúdo (apostilas + atividades) E
      // limite de tentativas (2 por padrão).
      const gate = course.exam_gate;
      if (gate && gate.liberado === false) {
        let titulo = '🔒 AVALIAÇÃO BLOQUEADA!';
        let corpo = '';
        let linhasPendentes = '';

        if (gate.motivo === 'atividades_pendentes') {
          const ap = gate.conteudo.apostilas;
          const at = gate.conteudo.atividades;
          corpo =
            `Para fazer a Avaliação Final você precisa ter cumprido TODAS as ` +
            `atividades inseridas pelo instrutor do curso (apostilas viradas até a ` +
            `última página e presença em todas as atividades práticas).`;

          if (ap.faltam && ap.faltam.length) {
            linhasPendentes += '\n\n📚 Apostilas pendentes:\n';
            linhasPendentes += ap.faltam.map(f => `- ${f.titulo}`).join('\n');
          }
          if (at.faltam && at.faltam.length) {
            linhasPendentes += '\n\n��️ Atividades práticas pendentes (sem presença confirmada):\n';
            linhasPendentes += at.faltam.map(f => `- ${f.titulo}`).join('\n');
          }
        } else if (gate.motivo === 'tentativas_esgotadas') {
          titulo = '⛔ TENTATIVAS ESGOTADAS!';
          corpo =
            `Você já utilizou as ${gate.tentativas.maximo} tentativas desta prova ` +
            `(${gate.tentativas.reprovacoes} reprovação(ões)). ` +
            `\n\nProcure o instrutor do curso para destravar uma nova tentativa.`;
          linhasPendentes = '';
        } else if (gate.motivo === 'prova_nao_cadastrada') {
          corpo = 'A Avaliação Final ainda não foi cadastrada para este curso. Avise o instrutor.';
        } else {
          corpo = 'A Avaliação Final está bloqueada. Verifique com o instrutor.';
        }

        alert(`${titulo}\n\n${corpo}${linhasPendentes}`);
        return;
      }

      // Fallback legado (caso o backend não envie exam_gate na versão antiga):
      // checa flag local de "completed" por aula.
      let unreadLessons = [];
      course.modules.forEach(m => {
        m.lessons.forEach(l => {
          if (!l.isFinalExam && !l.completed) {
            unreadLessons.push(l.title);
          }
        });
      });
      if (unreadLessons.length > 0) {
        alert(`🔒 AVALIAÇÃO BLOQUEADA!\n\nVocê precisa concluir a leitura de todas as instruções teóricas antes de realizar a Avaliação Final.\n\nAulas pendentes de leitura:\n- ${unreadLessons.join('\n- ')}`);
        return;
      }
    }
  }

  state.activeModuleId = modId;
  state.activeLessonId = lesId;
  saveState();
  renderClassroom();

  isPlaying = false;
  clearInterval(playInterval);

  // Inicializar o leitor de PDF correspondente à aula
  initClassroomPDFReader();
}

function initClassroomPDFReader() {
  const course = state.courses[state.activeCourseId];
  if (!course) return;
  
  currentPdfDoc = null;
  currentPdfPageNum = 1;
  pdfRendering = false;
  pdfPagePending = null;
  
  const readerEl = document.getElementById('pdfBookReader');
  
  if (course.apenas_pdf_texto) {
    if (readerEl) readerEl.style.display = 'flex';
    
    if (course.pdf_progress && course.pdf_progress.pagina_atual) {
      currentPdfPageNum = course.pdf_progress.pagina_atual;
    }
    
    if (course.pdf_url) {
      loadPDFDocument(course.pdf_url);
    } else {
      drawFallbackBookPage(1);
    }
    return;
  }
  
  const mod = course.modules.find(m => m.id === state.activeModuleId);
  const les = mod ? mod.lessons.find(l => l.id === state.activeLessonId) : null;
  if (!les) return;
  
  if (les.isFinalExam) {
    if (readerEl) readerEl.style.display = 'none';
    return;
  } else {
    if (readerEl) readerEl.style.display = 'flex';
  }

  // Se há apostila desta aula, baixa via rota autenticada (envia JWT,
  // recebe blob, passa para PDF.js). Mantém fallback legado (pdfData
  // / sessionPdfData) para cursos seed mais antigos.
  if (les.pdf_url && state.token) {
    loadPDFDocumentAuthenticated(les);
    return;
  }
  if (les.pdfData) {
    const buffer = base64ToArrayBuffer(les.pdfData);
    loadPDFDocument({ data: buffer });
  } else if (sessionPdfData[`${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`]) {
    const buffer = sessionPdfData[`${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`];
    loadPDFDocument({ data: buffer });
  } else {
    drawFallbackBookPage(1);
  }
}

async function renderPDFPage(num) {
  if (!currentPdfDoc) return;
  pdfRendering = true;
  try {
    const page = await currentPdfDoc.getPage(num);
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    await page.render(renderContext).promise;
    pdfRendering = false;
    if (pdfPagePending !== null) {
      renderPDFPage(pdfPagePending);
      pdfPagePending = null;
    }
  } catch (err) {
    console.error(err);
    pdfRendering = false;
  }
  
  const textIndicator = document.getElementById('pdfPageText');
  if (textIndicator) textIndicator.textContent = `Página ${num} / ${currentPdfDoc.numPages}`;
  
  // Evento de conclusão de leitura ou progresso de página
  if (currentPdfDoc) {
    const course = state.courses[state.activeCourseId];
    if (course.apenas_pdf_texto) {
      savePDFProgress(course.id, num, currentPdfDoc.numPages);
    } else {
      const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
      const lessonObj = moduleObj ? moduleObj.lessons.find(l => l.id === state.activeLessonId) : null;
      if (lessonObj && lessonObj.pdf_url) {
        // Apostila da aula: grava progresso POR AULA (libera a prova final).
        saveLessonPDFProgress(lessonObj.id, num, currentPdfDoc.numPages);
      }
      if (num === currentPdfDoc.numPages && !lessonObj.completed) {
        lessonObj.completed = true;
        saveLessonProgress(lessonObj.id);
        addXP(100, `ler livro doutrinário da aula "${lessonObj.title}"`);
        saveState();
        renderModulesAccordion(course);
        alert(`🎉 Leitura concluída! Você passou todas as páginas deste livro doutrinário. +100 XP`);
      }
    }
  }
}

function prevPDFPage() {
  const course = state.courses[state.activeCourseId];
  const mod = course.modules.find(m => m.id === state.activeModuleId);
  const les = mod ? mod.lessons.find(l => l.id === state.activeLessonId) : null;
  if (!les) return;
  
  if (currentPdfDoc) {
    if (currentPdfPageNum <= 1) return;
    currentPdfPageNum--;
    queueRenderPage(currentPdfPageNum);
  } else {
    const text = les.text || '';
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    const paragraphsPerPage = 2;
    if (currentPdfPageNum <= 1) return;
    currentPdfPageNum--;
    drawFallbackBookPage(currentPdfPageNum);
  }
}

function nextPDFPage() {
  const course = state.courses[state.activeCourseId];
  const mod = course.modules.find(m => m.id === state.activeModuleId);
  const les = mod ? mod.lessons.find(l => l.id === state.activeLessonId) : null;
  if (!les) return;
  
  if (currentPdfDoc) {
    if (currentPdfPageNum >= currentPdfDoc.numPages) return;
    currentPdfPageNum++;
    queueRenderPage(currentPdfPageNum);
  } else {
    const text = les.text || '';
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    const paragraphsPerPage = 2;
    const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage) || 1;
    if (currentPdfPageNum >= totalPages) return;
    currentPdfPageNum++;
    drawFallbackBookPage(currentPdfPageNum);
  }
}

function queueRenderPage(num) {
  if (pdfRendering) {
    pdfPagePending = num;
  } else {
    renderPDFPage(num);
  }
}

async function loadPDFDocument(pdfDataOrUrl) {
  try {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      const loadingTask = window.pdfjsLib.getDocument(pdfDataOrUrl);
      currentPdfDoc = await loadingTask.promise;
      currentPdfPageNum = 1;
      renderPDFPage(currentPdfPageNum);
    }
  } catch (err) {
    console.error("Erro ao carregar PDF:", err);
  }
}

// Carrega o PDF de uma apostila via rota autenticada (envia JWT no header,
// recebe o blob, monta o Uint8Array e alimenta o PDF.js).
async function loadPDFDocumentAuthenticated(lesson) {
  try {
    const statusText = document.querySelector('.pdf-book-header span');
    if (statusText) statusText.textContent = `⏳ Carregando apostila "${lesson.title}"...`;

    const res = await fetch(`${API_BASE}/courses/files/apostila/${lesson.id}`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 404) {
        if (statusText) statusText.textContent = '📕 Apostila indisponível.';
      } else {
        if (statusText) statusText.textContent = `⚠️ Erro ao carregar apostila (HTTP ${res.status})`;
      }
      return;
    }

    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();
    await loadPDFDocument({ data: new Uint8Array(buffer) });

    // Restaura página lida (server-side já guardou o progresso por aula)
    if (lesson.pdf_lido && lesson.pdf_lido.pagina_atual && lesson.pdf_lido.pagina_atual > 1) {
      currentPdfPageNum = Math.min(lesson.pdf_lido.pagina_atual, currentPdfDoc.numPages);
      renderPDFPage(currentPdfPageNum);
    }
  } catch (err) {
    console.error('Erro ao carregar PDF autenticado:', err);
    const statusText = document.querySelector('.pdf-book-header span');
    if (statusText) statusText.textContent = '⚠️ Falha ao abrir a apostila.';
  }
}

async function handleLessonPDFUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const statusText = document.querySelector('.pdf-book-header span');
  if (statusText) statusText.textContent = `⏳ Lendo PDF: ${file.name}...`;
  
  const reader = new FileReader();
  reader.onload = async function(evt) {
    const typedarray = new Uint8Array(evt.target.result);
    const course = state.courses[state.activeCourseId];
    const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
    const lessonObj = moduleObj.lessons.find(l => l.id === state.activeLessonId);
    
    if (file.size > 1.5 * 1024 * 1024) {
      sessionPdfData[`${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`] = typedarray;
      if (lessonObj.pdfData) delete lessonObj.pdfData;
      alert(`⚠️ Nota: Este arquivo PDF é grande (${(file.size/1024/1024).toFixed(1)} MB). Ele foi carregado na memória do navegador e estará ativo apenas durante esta sessão.`);
    } else {
      lessonObj.pdfData = arrayBufferToBase64(typedarray);
    }
    
    saveState();
    loadPDFDocument({ data: typedarray });
    if (statusText) statusText.innerHTML = `📖 Livro: ${file.name}`;
    alert(`✅ PDF "${file.name}" carregado e associado à aula com sucesso!`);
  };
  reader.readAsArrayBuffer(file);
}

function drawFallbackBookPage(num) {
  const canvas = document.getElementById('pdfCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 800;
  canvas.height = 1000;
  
  ctx.fillStyle = '#faf9f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#c59b27';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(35, 10);
  ctx.lineTo(35, canvas.height - 10);
  ctx.stroke();
  
  ctx.fillStyle = '#b01c1c';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('CORPO DE BOMBEIROS MILITAR DO AMAZONAS', 60, 50);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('DIRETRIZ E DOUTRINA OPERACIONAL', 60, 75);
  
  ctx.strokeStyle = '#1e1e38';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 90);
  ctx.lineTo(canvas.width - 60, 90);
  ctx.stroke();
  
  const course = state.courses[state.activeCourseId];
  const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
  const lessonObj = moduleObj.lessons.find(l => l.id === state.activeLessonId);
  
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 22px Inter, sans-serif';
  wrapText(ctx, lessonObj.title, 60, 130, canvas.width - 120, 30);
  
  ctx.fillStyle = '#9b1b1b';
  ctx.font = '13px Inter, sans-serif';
  ctx.fillText(`Instrutor: ${course.instructor || 'Comando Geral'} · Módulo: ${moduleObj.title}`, 60, 190);
  
  const text = lessonObj.text || 'Nenhum texto doutrinário cadastrado.';
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');
  
  const paragraphsPerPage = 2;
  const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage) || 1;
  const startIdx = (num - 1) * paragraphsPerPage;
  const pageParagraphs = paragraphs.slice(startIdx, startIdx + paragraphsPerPage);
  
  ctx.fillStyle = '#333333';
  ctx.font = '15px Times New Roman, serif';
  let yPos = 240;
  
  pageParagraphs.forEach(p => {
    yPos = wrapText(ctx, p, 60, yPos, canvas.width - 120, 24);
    yPos += 20;
  });
  
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('Apostila digital de capacitação militar. Proibida reprodução sem autorização.', 60, canvas.height - 50);
  
  const pageText = `Página ${num} / ${totalPages}`;
  ctx.fillText(pageText, canvas.width - 150, canvas.height - 50);
  document.getElementById('pdfPageText').textContent = pageText;
  
  if (num === totalPages) {
    if (!lessonObj.completed) {
      lessonObj.completed = true;
      saveLessonProgress(lessonObj.id);
      addXP(100, `ler livro doutrinário da aula "${lessonObj.title}"`);
      saveState();
      renderModulesAccordion(course);
      alert(`🎉 Leitura concluída! Você passou todas as páginas deste livro didático. +100 XP`);
    }
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function saveClassNotes() {
  const noteText = document.getElementById('classNotesTextArea').value;
  const currentLessonId = state.activeLessonId;
  
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = 'Salvando...';
  btn.disabled = true;

  fetch(`${API_BASE}/notes/${currentLessonId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`
    },
    body: JSON.stringify({ note_text: noteText })
  })
  .then(res => {
    if (!res.ok) throw new Error('Falha ao salvar anotação');
    return res.json();
  })
  .then(async () => {
    const noteKey = `${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`;
    state.notes[noteKey] = noteText;
    saveState();
    
    await loadProfile();
    renderHeaderUserInfo();

    btn.textContent = '✅ Salvo!';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 2000);
  })
  .catch(err => {
    if (err && err.message === '__handled__') return; // 403 já tratado acima
    alert(err.message);
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

// =========================================================
// BOOKMARKS / FAVORITOS
// =========================================================
function renderBookmarkState() {
  const btn = document.getElementById('bookmarkBtn');
  const icon = document.getElementById('bookmarkIcon');
  if (!btn || !icon) return;

  const isBookmarked = state.bookmarks.some(b => (b.lesson_id || b.lessonId) === state.activeLessonId);
  if (isBookmarked) {
    btn.classList.add('active');
    icon.textContent = '★';
  } else {
    btn.classList.remove('active');
    icon.textContent = '☆';
  }
}

async function toggleBookmark() {
  const currentLessonId = state.activeLessonId;
  const isBookmarked = state.bookmarks.some(b => (b.lesson_id || b.lessonId) === currentLessonId);
  
  const btn = document.getElementById('bookmarkBtn');
  if (btn) btn.disabled = true;

  try {
    const method = isBookmarked ? 'DELETE' : 'POST';
    const res = await fetch(`${API_BASE}/bookmarks/${currentLessonId}`, {
      method: method,
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    
    if (res.ok) {
      if (isBookmarked) {
        state.bookmarks = state.bookmarks.filter(b => (b.lesson_id || b.lessonId) !== currentLessonId);
      } else {
        const course = state.courses[state.activeCourseId];
        const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
        const lessonObj = moduleObj.lessons.find(l => l.id === currentLessonId);
        state.bookmarks.push({
          lesson_id: currentLessonId,
          lesson_title: lessonObj.title,
          course_id: state.activeCourseId,
          course_title: course.title,
          module_title: moduleObj.title,
          date: new Date().toISOString()
        });
        addXP(15, 'marcar aula como favorita');
      }
      saveState();
      renderBookmarkState();
      checkNewBadges();
      await loadProfile();
      renderHeaderUserInfo();
    } else {
      throw new Error('Erro ao atualizar favorito no servidor');
    }
  } catch (err) {
    alert(err.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}

function renderBookmarks() {
  const container = document.getElementById('bookmarksList');
  if (!container) return;
  
  if (state.bookmarks.length === 0) {
    container.innerHTML = '<div class="timeline-empty">Você ainda não marcou nenhuma aula. Use o ícone ☆ no canto superior direito da sala de aula para favoritar.</div>';
    return;
  }
  
  let html = '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:16px;">';
  state.bookmarks.forEach((b, idx) => {
    const courseId = b.course_id || b.courseId;
    const lessonId = b.lesson_id || b.lessonId;
    const course = state.courses[courseId];
    if (!course) return;
    
    let foundMod = null;
    let foundLesson = null;
    for (const m of course.modules) {
      const l = m.lessons.find(les => les.id === lessonId);
      if (l) {
        foundMod = m;
        foundLesson = l;
        break;
      }
    }
    if (!foundLesson || !foundMod) return;
    
    html += `
      <div class="progress-card" style="cursor:pointer;" onclick="state.activeCourseId=${courseId}; state.activeModuleId=${foundMod.id}; state.activeLessonId=${lessonId}; saveState(); switchTab('classroom');">
        <div class="progress-card-header">
          <div class="progress-icon flame">📚</div>
          <span class="progress-level">${course.level}</span>
        </div>
        <h4>${foundLesson.title}</h4>
        <p>${course.title} · ${foundMod.title}</p>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin: 8px 0;">
          ⏱️ ${foundLesson.duration}
        </div>
        <button class="btn btn-primary btn-sm btn-full" onclick="event.stopPropagation(); removeBookmarkByIndex(${idx});">🗑️ Remover</button>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

async function removeBookmarkByIndex(idx) {
  const b = state.bookmarks[idx];
  if (!b) return;
  const lessonId = b.lesson_id || b.lessonId;
  
  try {
    const res = await fetch(`${API_BASE}/bookmarks/${lessonId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      state.bookmarks.splice(idx, 1);
      saveState();
      renderBookmarks();
      renderBookmarkState();
      await loadProfile();
      renderHeaderUserInfo();
    }
  } catch (err) {
    console.error('Erro ao deletar favorito:', err);
  }
}

// =========================================================
// PLAYER DE VÍDEO
// =========================================================
function togglePlayVideo() {
  const overlay = document.getElementById('videoPlayOverlay');
  const progressFill = document.getElementById('videoProgressFill');
  const progressHandle = document.getElementById('videoProgressHandle');
  const timeText = document.getElementById('videoTimeText');
  const captions = document.getElementById('videoCaptions');
  
  if (isPlaying) {
    isPlaying = false;
    clearInterval(playInterval);
    overlay.style.display = 'flex';
    captions.style.display = 'none';
  } else {
    isPlaying = true;
    overlay.style.display = 'none';
    let percent = parseFloat(progressFill.style.width) || 0;
    
    const tick = () => {
      percent += playbackSpeed * 0.5;
      if (percent > 100) {
        clearInterval(playInterval);
        isPlaying = false;
        overlay.style.display = 'flex';
        captions.style.display = 'none';
        const course = state.courses[state.activeCourseId];
        const moduleObj = course.modules.find(m => m.id === state.activeModuleId);
        const lessonObj = moduleObj.lessons.find(l => l.id === state.activeLessonId);
        if (!lessonObj.quiz && !lessonObj.completed) {
          lessonObj.completed = true;
          saveLessonProgress(lessonObj.id);
          addXP(100, `concluir aula "${lessonObj.title}"`);
          saveState();
          renderClassroom();
          alert('🎉 Vídeo concluído! Aula marcada como assistida. +100 XP');
        }
        return;
      }
      progressFill.style.width = `${percent}%`;
      progressHandle.style.left = `${percent}%`;
      const currentSecs = Math.floor((percent / 100) * 300);
      const minutes = Math.floor(currentSecs / 60);
      const seconds = currentSecs % 60;
      timeText.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')} / 05:00`;
      
      // Atualizar legendas
      const currentCap = videoCaptions.default.find(c => c.from <= percent && percent < c.from + 25);
      if (currentCap && captions.style.display === 'none') {
        captions.textContent = currentCap.text;
        captions.style.display = 'block';
      } else if (!currentCap && captions.style.display === 'block') {
        captions.style.display = 'none';
      }
    };
    
    playInterval = setInterval(tick, 300);
  }
}

function seekVideo(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const percent = ((event.clientX - rect.left) / rect.width) * 100;
  document.getElementById('videoProgressFill').style.width = `${percent}%`;
  document.getElementById('videoProgressHandle').style.left = `${percent}%`;
}

function restartVideo() {
  isPlaying = false;
  clearInterval(playInterval);
  document.getElementById('videoProgressFill').style.width = '0%';
  document.getElementById('videoProgressHandle').style.left = '0%';
  document.getElementById('videoTimeText').textContent = '00:00 / 05:00';
  document.getElementById('videoPlayOverlay').style.display = 'flex';
  document.getElementById('videoCaptions').style.display = 'none';
}

function changePlaybackSpeed() {
  const speeds = [1, 1.25, 1.5, 2, 0.75];
  const currentIdx = speeds.indexOf(playbackSpeed);
  playbackSpeed = speeds[(currentIdx + 1) % speeds.length];
  state.playbackSpeed = playbackSpeed;
  saveState();
  document.getElementById('speedBtn').querySelector('span').textContent = `${playbackSpeed}x`;
}

function toggleCaptions() {
  const captions = document.getElementById('videoCaptions');
  captions.style.display = captions.style.display === 'none' ? 'block' : 'none';
  if (captions.style.display === 'block' && !captions.textContent) {
    captions.textContent = videoCaptions.default[0].text;
  }
}

function toggleFullscreen() {
  const container = document.querySelector('.classroom-video-container');
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// =========================================================
// QUIZ: MODO PRÁTICA / AVALIAÇÃO
// =========================================================
let currentQuizAnswers = {};
let currentQuizShuffled = []; // armazena questões embaralhadas

function renderQuizBox(lesson) {
  const container = document.getElementById('quizContainerBox');
  if (!container) return;
  
  if (!lesson.quiz) {
    container.innerHTML = `
      <div class="quiz-header">
        <h3>📋 Avaliação Prática</h3>
        <p>Não há prova teórica para esta instrução. Conclua assistindo ao vídeo.</p>
      </div>
    `;
    return;
  }
  
  const quizKey = `${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`;
  const savedScore = state.quizScores[quizKey];
  
  if (savedScore !== undefined && !state.quizPracticeMode) {
    const passed = savedScore >= 60;
    container.innerHTML = `
      <div class="quiz-result-view">
        <span style="font-size: 2.5rem">${passed ? '🎖️' : '❌'}</span>
        <div class="quiz-result-score ${passed ? 'score-passed' : 'score-failed'}">${savedScore}%</div>
        <span class="quiz-result-badge ${passed ? 'passed' : 'failed'}">${passed ? 'Aprovado' : 'Reprovado'}</span>
        <p class="quiz-result-description">
          ${passed 
            ? 'Excelente aproveitamento militar! Você superou a nota mínima exigida de 60%.' 
            : 'As diretrizes do CBMAM exigem aproveitamento mínimo de 60% para homologação.'}
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" onclick="resetQuiz('${quizKey}')">🔄 Refazer Avaliação</button>
          <button class="btn btn-secondary btn-sm" onclick="startPracticeMode()">🎯 Modo Prática</button>
        </div>
      </div>
    `;
    return;
  }
  
  // Embaralhar ordem das alternativas
  currentQuizShuffled = lesson.quiz.map(q => {
    const indexed = q.options.map((opt, idx) => ({ text: opt, isCorrect: idx === q.correctOption }));
    // Fisher-Yates shuffle
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    return {
      questionText: q.questionText,
      shuffledOptions: indexed,
      originalCorrectOption: q.correctOption
    };
  });
  
  currentQuizAnswers = {};
  
  const practiceBanner = state.quizPracticeMode ? `
    <div class="quiz-mode-info">
      🎯 <strong>Modo Prática ativo:</strong> Suas respostas não contam nota. Use para estudo livre.
    </div>
  ` : '';
  
  let html = `
    <div class="quiz-header">
      <h3>${state.quizPracticeMode ? '🎯 Prática' : '📝 Avaliação Teórica'}</h3>
      <p>⚠️ Mínimo de <strong>60%</strong> para homologação.</p>
    </div>
    <div class="quiz-mode-toggle">
      <button class="quiz-mode-btn ${!state.quizPracticeMode ? 'active' : ''}" onclick="state.quizPracticeMode=false; renderQuizBox(getCurrentLesson()); saveState();">📝 Avaliação</button>
      <button class="quiz-mode-btn ${state.quizPracticeMode ? 'active' : ''}" onclick="state.quizPracticeMode=true; renderQuizBox(getCurrentLesson()); saveState();">🎯 Prática</button>
    </div>
    ${practiceBanner}
    <div style="display: flex; flex-direction: column; gap: 24px; margin-top: 8px;">
  `;
  
  currentQuizShuffled.forEach((q, qIndex) => {
    html += `
      <div class="quiz-question-box" id="questionBox-${qIndex}">
        <span class="quiz-question-number">Questão ${qIndex + 1} de ${currentQuizShuffled.length}</span>
        <div class="quiz-question-text">${q.questionText}</div>
        <ul class="quiz-options-list" data-question="${qIndex}">
          ${q.shuffledOptions.map((opt, oIndex) => {
            const letter = String.fromCharCode(65 + oIndex);
            return `
              <li class="quiz-option-item" id="optionItem-${qIndex}-${oIndex}" onclick="selectQuizOption(${qIndex}, ${oIndex}, ${opt.isCorrect})">
                <span class="quiz-option-letter">${letter}</span>
                <span>${opt.text}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
  });
  
  html += `
      <button class="btn btn-primary btn-full" style="margin-top: 12px;" onclick="submitQuiz()">
        ${state.quizPracticeMode ? '🎯 Verificar Respostas' : '📤 Enviar para Homologação'}
      </button>
    </div>
  `;
  
  container.innerHTML = html;
}

function getCurrentLesson() {
  const course = state.courses[state.activeCourseId];
  if (!course) return null;
  const mod = course.modules.find(m => m.id === state.activeModuleId);
  if (!mod) return null;
  return mod.lessons.find(l => l.id === state.activeLessonId);
}

function startPracticeMode() {
  state.quizPracticeMode = true;
  saveState();
  renderQuizBox(getCurrentLesson());
}

function selectQuizOption(qIndex, oIndex, isCorrect) {
  const q = currentQuizShuffled[qIndex];
  q.shuffledOptions.forEach((_, oi) => {
    const el = document.getElementById(`optionItem-${qIndex}-${oi}`);
    if (el) el.classList.remove('selected');
  });
  const selectedEl = document.getElementById(`optionItem-${qIndex}-${oIndex}`);
  if (selectedEl) selectedEl.classList.add('selected');
  
  currentQuizAnswers[qIndex] = { selected: oIndex, isCorrect };
}

function submitQuiz() {
  const lesson = getCurrentLesson();
  const quiz = lesson.quiz;
  
  const answeredCount = Object.keys(currentQuizAnswers).length;
  if (answeredCount < quiz.length) {
    alert(`Responda todas as ${quiz.length} questões antes de enviar!`);
    return;
  }
  
  let correctCount = 0;
  currentQuizShuffled.forEach((q, qIndex) => {
    const ans = currentQuizAnswers[qIndex];
    if (ans && ans.isCorrect) correctCount++;
    
    // Mostrar feedback visual
    q.shuffledOptions.forEach((opt, oi) => {
      const el = document.getElementById(`optionItem-${qIndex}-${oi}`);
      if (!el) return;
      if (opt.isCorrect) {
        el.classList.add('correct');
      } else if (oi === ans.selected) {
        el.classList.add('incorrect');
      }
    });
  });
  
  const scorePercent = Math.round((correctCount / quiz.length) * 100);
  const quizKey = `${state.activeCourseId}-${state.activeModuleId}-${state.activeLessonId}`;
  
  if (state.quizPracticeMode) {
    setTimeout(() => {
      alert(`📊 Resultado da Prática: ${scorePercent}% (${correctCount}/${quiz.length})\n\nEste modo não afeta sua nota. Para registrar nota oficial, mude para o modo Avaliação.`);
      renderQuizBox(lesson);
    }, 800);
    return;
  }
  
  const answers = lesson.quiz.map((originalQuestion, qIndex) => {
    const ans = currentQuizAnswers[qIndex];
    if (!ans) return null;
    const shuffledQuestion = currentQuizShuffled[qIndex];
    const selectedOptionText = shuffledQuestion.shuffledOptions[ans.selected].text;
    const originalOptionIndex = originalQuestion.options.indexOf(selectedOptionText);
    return originalOptionIndex;
  });

  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  fetch(`${API_BASE}/courses/quiz/${lesson.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`
    },
    body: JSON.stringify({ answers })
  })
  .then(async res => {
    if (res.status === 403) {
      // Trava da prova: pode ser conteúdo pendente (apostilas + atividades)
      // ou tentativas esgotadas (regra de 2 tentativas).
      const body = await res.json().catch(() => ({}));
      const gate = body && body.gate;
      let titulo = '🔒 AVALIAÇÃO BLOQUEADA PELO SISTEMA';
      let linhas = '';

      if (gate && gate.motivo === 'tentativas_esgotadas') {
        titulo = '⛔ TENTATIVAS ESGOTADAS';
        linhas =
          `\nVocê já usou as ${gate.tentativas.maximo} tentativas disponíveis ` +
          `(${gate.tentativas.reprovacoes} reprovação(ões)).\n` +
          `Procure o instrutor do curso para destravar.`;
      } else if (gate && gate.motivo === 'atividades_pendentes' && gate.conteudo) {
        const ap = gate.conteudo.apostilas || { faltam: [] };
        const at = gate.conteudo.atividades || { faltam: [] };
        if (ap.faltam && ap.faltam.length) {
          linhas += '\n📚 Apostilas pendentes:\n' +
            ap.faltam.map(f => `- ${f.titulo}`).join('\n');
        }
        if (at.faltam && at.faltam.length) {
          linhas += '\n\n🎯 Atividades pendentes (sem presença):\n' +
            at.faltam.map(f => `- ${f.titulo}`).join('\n');
        }
        linhas += `\n\nVolte para a sala de aula e cumpra todas as atividades.`;
      } else {
        linhas = '\n' + (body.message || 'Verifique com o instrutor.');
      }

      alert(`${titulo}\n\n${body.message || ''}${linhas}`);
      btn.textContent = originalText;
      btn.disabled = false;
      throw new Error('__handled__');
    }
    if (!res.ok) throw new Error('Erro ao submeter prova no servidor');
    return res.json();
  })
  .then(async data => {
    const finalScore = Math.round(data.score);
    state.quizScores[quizKey] = finalScore;
    
    if (data.passed) {
      lesson.completed = true;
      lesson.quiz_score = finalScore;
      lesson.quiz_passed = true;
      
      addXP(finalScore + 50, `concluir avaliação (${finalScore}%)`);
      await loadProfile();
      
      setTimeout(() => {
        const stats = getBadgeStats();
        let bonusMsg = '';
        if (finalScore === 100) {
          bonusMsg = '\n\n💯 PERFEIÇÃO! Medalha "Perfeição" desbloqueada!';
        }
        alert(`🎖️ Aprovado com ${finalScore}%! +${finalScore + 50} XP${bonusMsg}`);
        renderClassroom();
        renderCertificates();
      }, 1000);
    } else {
      lesson.completed = false;
      lesson.quiz_score = finalScore;
      lesson.quiz_passed = false;
      
      state.recentActivities.unshift({
        text: `${state.currentUser.name} reprovou na avaliação com ${finalScore}%.`,
        time: 'Agora mesmo'
      });
      saveState();
      await loadProfile();
      
      setTimeout(() => {
        alert(`❌ Reprovado com ${finalScore}%. Mínimo exigido: 60%. Tente novamente!`);
        renderQuizBox(lesson);
      }, 1000);
    }
  })
  .catch(err => {
    alert(err.message);
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

function resetQuiz(quizKey) {
  delete state.quizScores[quizKey];
  const [cId, mId, lId] = quizKey.split('-').map(Number);
  const course = state.courses[cId];
  if (course) {
    const mod = course.modules.find(m => m.id === mId);
    if (mod) {
      const les = mod.lessons.find(l => l.id === lId);
      if (les) les.completed = false;
    }
  }
  state.quizPracticeMode = false;
  saveState();
  renderClassroom();
}

// =========================================================
// GLOSSÁRIO MINI POR AULA
// =========================================================
function renderLessonGlossary(lesson) {
  const container = document.getElementById('lessonGlossaryMini');
  if (!container) return;
  
  const text = (lesson.text || '').toLowerCase();
  const matched = glossary.filter(g => text.includes(g.term.toLowerCase())).slice(0, 4);
  
  if (matched.length === 0) {
    container.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted);">Nenhum termo técnico identificado nesta aula.</p>';
    return;
  }
  
  container.innerHTML = matched.map(g => `
    <div class="glossary-mini-item">
      <strong>${g.term}</strong>${g.definition}
    </div>
  `).join('');
}

function renderGlossary(filter = '') {
  const container = document.getElementById('glossaryGrid');
  if (!container) return;
  
  const f = (filter || '').toLowerCase().trim();
  const filtered = f 
    ? glossary.filter(g => g.term.toLowerCase().includes(f) || g.definition.toLowerCase().includes(f))
    : glossary;
  
  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-muted);">Nenhum termo encontrado.</div>';
    return;
  }
  
  container.innerHTML = filtered.map(g => `
    <div class="glossary-item">
      <div class="glossary-term">${g.term}</div>
      <div class="glossary-def">${g.definition}</div>
    </div>
  `).join('');
}

// =========================================================
// FÓRUM DE COMENTÁRIOS
// =========================================================
function renderForum() {
  const container = document.getElementById('forumContainer');
  if (!container) return;
  
  const currentLessonId = state.activeLessonId;
  container.innerHTML = '<div style="text-align:center; padding:10px; color:var(--text-muted);">Carregando comentários...</div>';
  
  fetch(`${API_BASE}/comments/${currentLessonId}`, {
    headers: { 'Authorization': `Bearer ${state.token}` }
  })
  .then(r => r.json())
  .then(comments => {
    if (state.activeLessonId !== currentLessonId) return;
    
    let html = '';
    if (!comments || comments.length === 0) {
      html += '<div class="forum-empty">💭 Nenhum comentário ainda. Seja o primeiro a perguntar!</div>';
    } else {
      html += comments.map(c => {
        const userRoleLabel = c.user_role === 'admin' ? 'Major BM' : (c.user_role === 'instructor' ? 'Capitão BM' : 'Cadete BM');
        return `
          <div class="forum-comment">
            <div class="forum-comment-header">
              <div class="forum-avatar">${c.user_name.charAt(0)}</div>
              <div>
                <div class="forum-author">${c.user_name}</div>
                <div class="forum-rank">${userRoleLabel}</div>
              </div>
              <div class="forum-time">${new Date(c.created_at).toLocaleString('pt-BR')}</div>
            </div>
            <div class="forum-text">${c.comment_text}</div>
          </div>
        `;
      }).join('');
    }
    
    html += `
      <div class="forum-input-wrap">
        <textarea class="forum-input" id="forumInput" placeholder="Escreva sua dúvida ou comentário..."></textarea>
        <button class="btn btn-primary" onclick="postForumComment()">Enviar</button>
      </div>
    `;
    
    container.innerHTML = html;
  })
  .catch(err => {
    console.error('Erro ao buscar comentários:', err);
    if (state.activeLessonId === currentLessonId) {
      container.innerHTML = '<div class="forum-empty">Erro ao carregar discussões.</div>';
    }
  });
}

async function postForumComment() {
  const input = document.getElementById('forumInput');
  const text = input.value.trim();
  if (!text) return;
  
  const currentLessonId = state.activeLessonId;
  const btn = event.target;
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/comments/${currentLessonId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ comment_text: text })
    });
    
    if (res.ok) {
      input.value = '';
      addXP(10, 'comentar no fórum');
      renderForum();
      await loadProfile();
      renderHeaderUserInfo();
    } else {
      throw new Error('Erro ao enviar comentário');
    }
  } catch (err) {
    alert(err.message);
  } finally {
    btn.disabled = false;
  }
}

// =========================================================
// RANKING
// =========================================================
async function renderRanking() {
  const podium = document.getElementById('rankingPodium');
  const tbody = document.getElementById('rankingTableBody');
  if (!podium || !tbody) return;
  
  podium.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Carregando ranking...</div>';
  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Carregando...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/users/ranking`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (!res.ok) throw new Error('Falha ao carregar ranking');
    
    const ranking = await res.json(); // Array of { nome, xp, cargo }
    
    // Sincroniza o XP do próprio usuário com o state.xp
    const me = ranking.find(u => u.nome === state.currentUser.name) || { nome: state.currentUser.name, xp: state.xp, cargo: state.currentUser.role };
    
    if (!ranking.some(u => u.nome === state.currentUser.name) && me.cargo === 'student') {
      ranking.push(me);
    }
    ranking.sort((a, b) => b.xp - a.xp);

    const top3 = ranking.slice(0, 3);
    const rest = ranking.slice(3);
    
    let podiumHtml = '';
    
    // Top 2 (renderizado à esquerda)
    if (top3[1]) {
      podiumHtml += `
        <div class="podium-item second">
          <div class="podium-rank">2</div>
          <div class="podium-medal">🥈</div>
          <div class="podium-name">${top3[1].nome}</div>
          <div class="podium-xp">${top3[1].xp.toLocaleString('pt-BR')} XP</div>
        </div>
      `;
    }
    // Top 1 (renderizado no meio)
    if (top3[0]) {
      podiumHtml += `
        <div class="podium-item first">
          <div class="podium-rank">1</div>
          <div class="podium-medal">🥇</div>
          <div class="podium-name">${top3[0].nome}</div>
          <div class="podium-xp">${top3[0].xp.toLocaleString('pt-BR')} XP</div>
        </div>
      `;
    }
    // Top 3 (renderizado à direita)
    if (top3[2]) {
      podiumHtml += `
        <div class="podium-item third">
          <div class="podium-rank">3</div>
          <div class="podium-medal">🥉</div>
          <div class="podium-name">${top3[2].nome}</div>
          <div class="podium-xp">${top3[2].xp.toLocaleString('pt-BR')} XP</div>
        </div>
      `;
    }
    podium.innerHTML = podiumHtml;
    
    tbody.innerHTML = rest.map((r, i) => {
      const isYou = r.nome === state.currentUser.name;
      const levelInfo = calculateLevel(r.xp);
      return `
        <tr class="${isYou ? 'you' : ''}">
          <td><strong>${i + 4}º</strong></td>
          <td>
            <div class="rank-cell">
              <div class="rank-cell-avatar">${r.nome.charAt(0)}</div>
              <span>${r.nome} ${isYou ? '(você)' : ''}</span>
            </div>
          </td>
          <td>${levelInfo.current.name}</td>
          <td><strong>${r.xp.toLocaleString('pt-BR')}</strong></td>
          <td>${Math.floor(r.xp / 600)} 🏅</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Erro ao renderizar ranking:', err);
    podium.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Erro ao carregar.</div>';
  }
}

// =========================================================
// CALENDÁRIO / ATIVIDADES PRÁTICAS
// =========================================================
async function renderCalendar(filter = 'all') {
  const container = document.getElementById('calendarGrid');
  if (!container) return;
  
  container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-muted); grid-column: 1/-1;">Carregando atividades...</div>';
  
  await loadActivities();
  
  const allActivities = state.activities || [];
  const filtered = filter === 'all' ? allActivities : allActivities.filter(a => a.type === filter);
  
  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-muted); grid-column: 1/-1;">Nenhuma atividade encontrada.</div>';
    return;
  }
  
  const typeIcons = {
    aquatico: '🌊', altura: '🧗', florestal: '🌲', medico: '🚑', 
    evacuacao: '🏃', direcao: '🚗', radio: '📻', altura: '🧗'
  };
  
  container.innerHTML = filtered.map(a => {
    const signed = a.registered === 1 || a.registered === true;
    return `
      <div class="activity-card ${signed ? 'signed-up' : ''}">
        <div class="activity-header">
          <div class="activity-icon-box ${a.type}">${typeIcons[a.type] || '📅'}</div>
          <div class="activity-info">
            <div class="activity-title">${a.title}</div>
            <div class="activity-meta">
              <div class="activity-meta-row">📅 ${formatDateBR(a.date)} às ${a.time}</div>
              <div class="activity-meta-row">📍 ${a.location}</div>
              <div class="activity-meta-row">👨‍🏫 ${a.instructor}</div>
              <div class="activity-meta-row">👥 ${a.enrolled_count}/${a.capacity} vagas preenchidas</div>
            </div>
          </div>
        </div>
        <div class="activity-actions">
          ${signed 
            ? '<button class="btn btn-secondary btn-sm" disabled>✅ Inscrito</button><button class="btn btn-secondary btn-sm" onclick="cancelSignup(' + a.id + ')">Cancelar</button>'
            : '<button class="btn btn-primary btn-sm" onclick="signupActivity(' + a.id + ')">Inscrever-se</button>'}
        </div>
      </div>
    `;
  }).join('');
}

function filterActivities(filter, btn) {
  document.querySelectorAll('#calendarTab .filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCalendar(filter);
}

async function signupActivity(id) {
  try {
    const res = await fetch(`${API_BASE}/activities/${id}/signup`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    
    if (res.ok) {
      addXP(50, 'inscrição em atividade prática');
      await loadNotifications();
      renderCalendar();
      renderNotifications();
      await loadProfile();
      renderHeaderUserInfo();
    } else {
      const data = await res.json();
      alert(data.message || 'Erro ao realizar inscrição.');
    }
  } catch (err) {
    console.error('Erro ao inscrever-se:', err);
  }
}

async function cancelSignup(id) {
  try {
    const res = await fetch(`${API_BASE}/activities/${id}/signup`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    
    if (res.ok) {
      renderCalendar();
    }
  } catch (err) {
    console.error('Erro ao cancelar inscrição:', err);
  }
}

function formatDateBR(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// =========================================================
// HISTÓRICO / TIMELINE
// =========================================================
function renderHistory() {
  const statsEl = document.getElementById('timelineStats');
  const timelineEl = document.getElementById('timelineContainer');
  if (!statsEl || !timelineEl) return;
  
  const stats = getBadgeStats();
  const unlockedBadges = JSON.parse(localStorage.getItem('cbmam_unlocked_badges') || '[]');
  
  statsEl.innerHTML = `
    <div class="timeline-stat-card">
      <h4>${stats.completedCourses.length}</h4>
      <p>Cursos Concluídos</p>
    </div>
    <div class="timeline-stat-card">
      <h4>${stats.avgScore}%</h4>
      <p>Média em Provas</p>
    </div>
    <div class="timeline-stat-card">
      <h4>${state.streakDays} 🔥</h4>
      <p>Streak Atual</p>
    </div>
    <div class="timeline-stat-card">
      <h4>${state.xp.toLocaleString('pt-BR')}</h4>
      <p>XP Total</p>
    </div>
    <div class="timeline-stat-card">
      <h4>${unlockedBadges.length}/${allBadges.length}</h4>
      <p>Medalhas</p>
    </div>
    <div class="timeline-stat-card">
      <h4>${stats.bookmarksCount}</h4>
      <p>Aulas Favoritas</p>
    </div>
  `;
  
  // Construir timeline
  const events = [];
  
  // Aulas concluídas
  Object.values(state.courses).forEach(course => {
    course.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        if (les.completed) {
          events.push({
            type: 'completed',
            icon: '✅',
            title: `Aula concluída: ${les.title}`,
            desc: `${course.title} · ${mod.title}`,
            date: 'Concluída'
          });
        }
      });
    });
  });
  
  // Quizzes realizados
  Object.entries(state.quizScores).forEach(([key, score]) => {
    const [cId, mId, lId] = key.split('-').map(Number);
    const course = state.courses[cId];
    if (course) {
      const mod = course.modules.find(m => m.id === mId);
      const lesson = mod ? mod.lessons.find(l => l.id === lId) : null;
      if (lesson) {
        events.push({
          type: 'quiz',
          icon: score >= 60 ? '🎖️' : '❌',
          title: `Avaliação: ${lesson.title} - ${score}%`,
          desc: `${course.title} · ${mod.title}`,
          date: 'Realizada'
        });
      }
    }
  });
  
  // Inscrições
  state.activitySignups.forEach(id => {
    const a = upcomingActivities.find(act => act.id === id);
    if (a) {
      events.push({
        type: 'event',
        icon: '📅',
        title: `Inscrito em: ${a.title}`,
        desc: `${formatDateBR(a.date)} · ${a.location}`,
        date: a.date
      });
    }
  });
  
  // Medalhas desbloqueadas
  unlockedBadges.forEach(id => {
    const b = allBadges.find(x => x.id === id);
    if (b) {
      events.push({
        type: 'achievement',
        icon: b.icon,
        title: `Conquista: ${b.name}`,
        desc: b.desc,
        date: 'Desbloqueada'
      });
    }
  });
  
  if (events.length === 0) {
    timelineEl.innerHTML = '<div class="timeline-empty">📊 Seu histórico aparecerá aqui conforme você avança nos cursos e conquistas medalhas.</div>';
    return;
  }
  
  timelineEl.innerHTML = events.slice(0, 30).map(e => `
    <div class="timeline-item ${e.type === 'completed' ? 'completed' : e.type === 'quiz' ? 'quiz' : ''}">
      <div class="timeline-date">${e.date}</div>
      <div class="timeline-title">${e.icon} ${e.title}</div>
      <div class="timeline-desc">${e.desc}</div>
    </div>
  `).join('');
}

// =========================================================
// CERTIFICADOS
// =========================================================
function renderCertificates() {
  const container = document.getElementById('certificateContainer');
  const btnExport = document.getElementById('btnExportCert');
  const npsCard = document.getElementById('npsCard');
  if (!container) return;
  
  let totalLessons = 0;
  let completedLessons = 0;
  let totalQuizScore = 0;
  let completedQuizzes = 0;
  let maxScore = 0;
  const completedCourses = [];
  const completedCoursesIds = [];
  
  Object.values(state.courses).forEach(course => {
    const progress = calculateCourseProgress(course);
    if (progress === 100) {
      completedCourses.push(course);
      completedCoursesIds.push(course.id);
    }
    course.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        totalLessons++;
        if (les.completed) completedLessons++;
        const qKey = `${course.id}-${mod.id}-${les.id}`;
        const score = state.quizScores[qKey];
        if (score !== undefined) {
          totalQuizScore += score;
          completedQuizzes++;
          if (score > maxScore) maxScore = score;
        }
      });
    });
  });
  
  const globalCompletion = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const avgScore = completedQuizzes > 0 ? Math.round(totalQuizScore / completedQuizzes) : 0;
  
  document.getElementById('statsRadialPercentage').textContent = `${globalCompletion}%`;
  document.getElementById('statsModulesCompletedText').textContent = `${completedLessons} / ${totalLessons}`;
  document.getElementById('statsAverageQuizGradeText').textContent = `${avgScore}%`;
  document.getElementById('statsXpText').textContent = `${state.xp.toLocaleString('pt-BR')} XP`;
  document.getElementById('statsStreakText').textContent = `${state.streakDays} dias 🔥`;
  
  const offset = 282.7 - (globalCompletion / 100) * 282.7;
  document.getElementById('statsRadialFill').style.strokeDashoffset = offset;
  
  // Medalhas
  const badgesGrid = document.getElementById('badgesGrid');
  const unlockedBadges = JSON.parse(localStorage.getItem('cbmam_unlocked_badges') || '[]');
  const stats = {
    completedCourses,
    completedCoursesIds,
    avgScore,
    completedQuizzes,
    maxScore,
    streakDays: state.streakDays,
    xp: state.xp,
    notesCount: state.profileStats ? state.profileStats.notesCount : Object.keys(state.notes).length,
    bookmarksCount: state.profileStats ? state.profileStats.bookmarksCount : state.bookmarks.length,
    commentsCount: state.profileStats ? state.profileStats.commentsCount : getTotalComments(),
    npsCount: state.profileStats ? state.profileStats.npsCount : Object.keys(state.nps).length
  };
  
  badgesGrid.innerHTML = allBadges.map(b => {
    const unlocked = b.check(stats);
    if (unlocked && !unlockedBadges.includes(b.id)) {
      unlockedBadges.push(b.id);
      localStorage.setItem('cbmam_unlocked_badges', JSON.stringify(unlockedBadges));
    }
    return `
      <div class="badge-item ${unlocked ? 'unlocked' : ''}" title="${b.desc}">
        <div class="badge-medal">${b.icon}</div>
        <span class="badge-name">${b.name}</span>
        <span style="font-size: 0.65rem; color: var(--text-muted)">${b.desc}</span>
      </div>
    `;
  }).join('');
  
  document.getElementById('badgesUnlockedCount').textContent = unlockedBadges.length;
  document.getElementById('badgesTotalCount').textContent = allBadges.length;
  
  // Certificado
  if (completedCourses.length > 0) {
    const selectedCourse = completedCourses[0];
    const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const hash = 'CBMAM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    container.innerHTML = `
      <div class="military-certificate">
        <div class="cert-header">
          <div class="cert-logo">🔥</div>
          <div class="cert-institution">Corpo de Bombeiros Militar do Amazonas</div>
          <div class="cert-subinstitution">Academia de Bombeiro Militar - EAD</div>
        </div>
        <div class="cert-body">
          <div class="cert-title">CERTIFICADO</div>
          <div class="cert-text">O CORPO DE BOMBEIROS MILITAR DO AMAZONAS certifica que o militar</div>
          <div class="cert-student-name">${state.currentUser.name}</div>
          <div class="cert-text">
            concluiu com êxito a instrução de nível profissional em
            <br><span class="cert-course-name">${selectedCourse.title.toUpperCase()}</span><br>
            com rendimento técnico médio superior a 60% nas avaliações.
          </div>
        </div>
        <div class="cert-footer">
          <div class="cert-signature-block">
            <div class="cert-signature-line"></div>
            <span class="cert-signer-name">Cel. QOBM Orleilso Muniz da S. Júnior</span>
            <span class="cert-signer-role">Comandante-Geral do CBMAM</span>
          </div>
          <div class="cert-stamp">CBMAM<br>EDUCAÇÃO<br>EXCELÊNCIA</div>
        </div>
        <div class="cert-watermark-bottom">
          Código de Autenticação Rastreável: ${hash} · Emitido em ${today}
        </div>
      </div>
    `;
    btnExport.style.display = 'inline-flex';
    
    // NPS Card
    if (!state.nps[selectedCourse.id]) {
      npsCard.style.display = 'block';
      renderNPS(selectedCourse.id);
    } else {
      npsCard.style.display = 'none';
    }
  } else {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; border: 2px dashed var(--border); border-radius: 12px; width: 100%;">
        <span style="font-size: 3rem; margin-bottom: 16px; display: block;">🔒</span>
        <h4>Nenhum Certificado Emitido</h4>
        <p style="color: var(--text-secondary); max-width: 320px; margin: 8px auto 0; font-size: 0.85rem;">Conclua 100% de qualquer capacitação e atinja nota média ≥ 60% para emitir seu certificado oficial.</p>
      </div>
    `;
    btnExport.style.display = 'none';
    npsCard.style.display = 'none';
  }
}

function getTotalComments() {
  let count = 0;
  Object.values(state.comments).forEach(arr => count += arr.length);
  return count;
}

function renderNPS(courseId) {
  const scaleEl = document.getElementById('npsScale');
  if (!scaleEl) return;
  
  scaleEl.innerHTML = '';
  for (let i = 0; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.className = 'nps-btn';
    btn.textContent = i;
    btn.onclick = () => submitNPS(courseId, i);
    scaleEl.appendChild(btn);
  }
}

async function submitNPS(courseId, score) {
  try {
    const res = await fetch(`${API_BASE}/nps/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ score: score, comment: 'Avaliação da plataforma' })
    });
    
    if (res.ok) {
      state.nps[courseId] = { score, comment: '', time: new Date().toISOString() };
      saveState();
      document.getElementById('npsThanks').style.display = 'block';
      document.getElementById('npsScale').style.display = 'none';
      addXP(30, 'avaliar curso com NPS');
      checkNewBadges();
      await loadProfile();
      renderHeaderUserInfo();
    } else {
      throw new Error('Erro ao enviar NPS');
    }
  } catch (err) {
    alert(err.message);
  }
}

function exportCertificatePDF() {
  window.print();
}

// =========================================================
// PAINEL ADMIN
// =========================================================
function renderAdminPanel() {
  const selectTarget = document.getElementById('selectTargetCourse');
  if (!selectTarget) return;
  
  let selectOptions = '';
  Object.values(state.courses).forEach(c => {
    c.modules.forEach(m => {
      selectOptions += `<option value="${c.id}-${m.id}">${c.title} - Módulo ${m.id}: ${m.title}</option>`;
    });
  });
  selectTarget.innerHTML = selectOptions;
  
  const barChart = document.getElementById('adminBarChart');
  let barHtml = '';
  Object.values(state.courses).forEach(c => {
    let scoreSum = 0;
    let count = 0;
    c.modules.forEach(m => {
      m.lessons.forEach(l => {
        const qKey = `${c.id}-${m.id}-${l.id}`;
        const score = state.quizScores[qKey];
        if (score !== undefined) {
          scoreSum += score;
          count++;
        }
      });
    });
    const finalScore = count > 0 ? Math.round(scoreSum / count) : Math.floor(Math.random() * 25) + 70;
    barHtml += `
      <div class="bar-column">
        <span class="bar-value">${finalScore}%</span>
        <div class="bar-fill" style="height: ${finalScore}%;"></div>
        <span class="bar-label">${c.title.split(' ')[0]}</span>
      </div>
    `;
  });
  barChart.innerHTML = barHtml;
  
  const logsContainer = document.getElementById('adminRecentActivityList');
  logsContainer.innerHTML = state.recentActivities.slice(0, 15).map(act => `
    <div class="announcement-item">
      <span style="color: var(--accent-red)">👮</span>
      <div class="announcement-content">
        <p style="font-size: 0.85rem; line-height: 1.4;">${act.text}</p>
        <span class="announcement-time">${act.time}</span>
      </div>
    </div>
  `).join('');
  
  renderAdminCourses();
  renderAdminStudents();
  renderAdminActivities();
}

function switchAdminSection(section, btn) {
  document.querySelectorAll('.admin-nav-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById(`admin${section.charAt(0).toUpperCase() + section.slice(1)}Section`);
  if (target) target.style.display = 'block';
}

// CRUD de cursos no admin
function renderAdminCourses() {
  const container = document.getElementById('adminCoursesList');
  if (!container) return;
  
  container.innerHTML = Object.values(state.courses).map(c => {
    const progress = calculateCourseProgress(c);
    const enrolled = c.enrolled || 0;
    return `
      <div class="admin-course-card">
        <h4>${c.title}</h4>
        <div class="admin-course-meta">
          <span>📚 ${c.modules.length} módulos · ${c.modules.reduce((s,m) => s + m.lessons.length, 0)} aulas</span>
          <span>📊 Progresso médio da plataforma: ${progress}%</span>
          <span>👨‍🏫 Instrutor: ${c.instructor || 'Não definido'}</span>
          <span>👥 ${enrolled} cadetes inscritos</span>
          <span>⭐ Avaliação: ${c.rating || 'N/A'}</span>
        </div>
        <div class="admin-course-actions">
          <button class="btn btn-secondary btn-sm" onclick="editCourse(${c.id})">✏️ Editar</button>
          <button class="btn btn-secondary btn-sm" onclick="duplicateCourse(${c.id})">📋 Duplicar</button>
          <button class="btn btn-secondary btn-sm" onclick="deleteCourse(${c.id})" style="color: var(--accent-red);">🗑️ Excluir</button>
        </div>
      </div>
    `;
  }).join('');
}

function openCreateCourseModal() {
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">📚</div>
    <h2>Novo Curso</h2>
    <form onsubmit="createCourse(event)">
      <div class="form-group">
        <label>Título do Curso</label>
        <input type="text" id="newCourseTitle" required>
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <textarea id="newCourseDesc" rows="3" required></textarea>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Categoria</label>
          <select id="newCourseCategory">
            <option value="hazmat">Incêndio / HAZMAT</option>
            <option value="defesa">Defesa Civil / Socorro</option>
            <option value="physical">Treinamento / Resgate</option>
            <option value="prev">Prevenção / Salvamento</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nível</label>
          <select id="newCourseLevel">
            <option>Básico</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Instrutor</label>
        <input type="text" id="newCourseInstructor" placeholder="Ex: Cap. QOBM Nome" required>
      </div>
      <div class="form-group">
        <label style="display: flex; align-items: center; gap: 8px; margin: 12px 0; cursor: pointer;">
          <input type="checkbox" id="newCourseOnlyPDF" onchange="togglePDFUploadInput(this.checked)">
          Curso Baseado Apenas em PDF/Texto (Modo Livro)
        </label>
      </div>
      <div class="form-group" id="pdfUploadContainer" style="display: none;">
        <label>Selecione o arquivo PDF do Livro/Apostila</label>
        <input type="file" id="newCoursePDFFile" accept=".pdf" style="width: 100%; padding: 8px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 6px;">
      </div>
      <button type="submit" class="btn btn-primary btn-full">Criar Curso</button>
    </form>
  `;
  modal.style.display = 'flex';
}

window.togglePDFUploadInput = function(checked) {
  const container = document.getElementById('pdfUploadContainer');
  if (container) {
    container.style.display = checked ? 'block' : 'none';
    const fileInput = document.getElementById('newCoursePDFFile');
    if (fileInput) fileInput.required = checked;
  }
}

async function createCourse(e) {
  e.preventDefault();
  const title = document.getElementById('newCourseTitle').value.trim();
  const desc = document.getElementById('newCourseDesc').value.trim();
  const category = document.getElementById('newCourseCategory').value;
  const level = document.getElementById('newCourseLevel').value;
  const instructor = document.getElementById('newCourseInstructor').value.trim();
  const apenasPDF = document.getElementById('newCourseOnlyPDF').checked;
  const pdfFile = apenasPDF ? document.getElementById('newCoursePDFFile').files[0] : null;

  if (apenasPDF && !pdfFile) {
    alert('⚠️ Por favor, selecione o arquivo PDF do curso.');
    return;
  }

  let pdf_url = null;
  if (pdfFile) {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    try {
      const uploadRes = await fetch(`${API_BASE}/courses/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`
        },
        body: formData
      });
      if (!uploadRes.ok) {
        throw new Error('Falha no upload do PDF');
      }
      const uploadData = await uploadRes.json();
      pdf_url = uploadData.url;
    } catch (err) {
      alert('❌ Erro ao fazer upload do PDF: ' + err.message);
      return;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({
        title,
        category,
        level,
        instructor,
        description: desc,
        duration: apenasPDF ? 10 : 40,
        apenas_pdf_texto: apenasPDF,
        pdf_url
      })
    });
    if (!res.ok) {
      throw new Error('Erro ao criar curso na API');
    }
    const data = await res.json();
    
    // Cria um módulo e lição de leitura automáticos para o livro PDF
    if (apenasPDF) {
      const moduleRes = await fetch(`${API_BASE}/courses/${data.courseId}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ title: 'Material Didático Completo', order: 1 })
      });
      if (moduleRes.ok) {
        const moduleData = await moduleRes.json();
        await fetch(`${API_BASE}/courses/modules/${moduleData.moduleId}/lessons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify({
            title: 'Leitura Integrada do Livro',
            duration: '60min',
            text: 'Leia o conteúdo do PDF utilizando os botões de avançar/voltar. Seu progresso será registrado automaticamente página por página.',
            pdf_url,
            is_final_exam: false,
            order: 1
          })
        });
      }
    }

    closeModal('genericModal');
    alert('✅ Curso criado com sucesso!');
    await loadCourses();
    renderAdminCourses();
    renderCatalog();
    renderDashboard();
  } catch (err) {
    alert('❌ Erro ao criar o curso: ' + err.message);
  }
}

function editCourse(id) {
  const c = state.courses[id];
  if (!c) return;
  alert(`Edição detalhada do curso "${c.title}" — em uma versão completa abriria um modal com edição de módulos/aulas/avaliações.`);
}

function duplicateCourse(id) {
  const c = state.courses[id];
  if (!c) return;
  const newId = Math.max(...Object.keys(state.courses).map(Number)) + 1;
  state.courses[newId] = JSON.parse(JSON.stringify(c));
  state.courses[newId].id = newId;
  state.courses[newId].title = c.title + ' (Cópia)';
  state.courses[newId].modules.forEach(m => {
    m.lessons.forEach(l => l.completed = false);
  });
  saveState();
  renderAdminCourses();
  alert(`✅ Curso duplicado.`);
}

function deleteCourse(id) {
  const c = state.courses[id];
  if (!c) return;
  if (confirm(`Tem certeza que deseja excluir o curso "${c.title}"? Esta ação não pode ser desfeita.`)) {
    delete state.courses[id];
    saveState();
    renderAdminCourses();
    renderCatalog();
    renderDashboard();
    alert('🗑️ Curso excluído.');
  }
}

// CRUD de alunos
function renderAdminStudents(filter = '') {
  const tbody = document.getElementById('adminStudentsBody');
  if (!tbody) return;
  
  const f = (filter || '').toLowerCase();
  const list = defaultStudents.filter(s => 
    s.name.toLowerCase().includes(f) || 
    s.email.toLowerCase().includes(f) || 
    s.rank.toLowerCase().includes(f)
  );
  
  tbody.innerHTML = list.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td>${s.rank}</td>
      <td>${s.email}</td>
      <td>${s.xp.toLocaleString('pt-BR')}</td>
      <td>${s.level}</td>
      <td><span class="status-badge ${s.status}">${s.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
      <td>
        <button class="btn-icon" title="Ver perfil" onclick="viewStudent(${s.id})">👁</button>
        <button class="btn-icon" title="Enviar mensagem" onclick="messageStudent(${s.id})">✉️</button>
        <button class="btn-icon danger" title="Desativar" onclick="toggleStudentStatus(${s.id})">${s.status === 'active' ? '🚫' : '✅'}</button>
      </td>
    </tr>
  `).join('');
}

function viewStudent(id) {
  const s = defaultStudents.find(x => x.id === id);
  if (!s) return;
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">👤</div>
    <h2>Perfil do Aluno</h2>
    <div style="text-align: left; margin-top: 20px; display: flex; flex-direction: column; gap: 12px; background: rgba(255,255,255,0.02); padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
      <div><strong>Nome Completo:</strong> ${s.name}</div>
      <div><strong>Patente/Posto:</strong> ${s.rank}</div>
      <div><strong>E-mail Funcional:</strong> ${s.email}</div>
      <div><strong>Data de Matrícula:</strong> ${formatDateBR(s.enrolled)}</div>
      <div><strong>Experiência (XP):</strong> ${s.xp.toLocaleString('pt-BR')} XP (${s.level})</div>
      <div><strong>Status de Acesso:</strong> <span class="status-badge ${s.status}">${s.status === 'active' ? 'Ativo' : 'Inativo'}</span></div>
    </div>
    <button class="btn btn-secondary btn-full" style="margin-top: 20px;" onclick="closeModal('genericModal')">Fechar</button>
  `;
  modal.style.display = 'flex';
}

function messageStudent(id) {
  const s = defaultStudents.find(x => x.id === id);
  if (!s) return;
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">✉️</div>
    <h2>Enviar Mensagem</h2>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">Destinatário: <strong>${s.name}</strong> (${s.email})</p>
    <form onsubmit="event.preventDefault(); alert('Mensagem enviada com sucesso para ${s.email}!'); closeModal('genericModal');" style="text-align: left;">
      <div class="form-group" style="margin-bottom: 16px;">
        <label>Mensagem</label>
        <textarea id="messageText" rows="4" placeholder="Digite a mensagem de orientação..." required style="width: 100%;"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">Enviar Mensagem Oficial</button>
    </form>
  `;
  modal.style.display = 'flex';
}

function toggleStudentStatus(id) {
  const s = defaultStudents.find(x => x.id === id);
  if (!s) return;
  s.status = s.status === 'active' ? 'inactive' : 'active';
  renderAdminStudents(document.getElementById('studentSearchInput').value);
}

// CRUD de atividades
function renderAdminActivities() {
  const container = document.getElementById('adminActivitiesList');
  if (!container) return;
  
  const all = state.activities || [];
  container.innerHTML = all.map(a => `
    <div class="admin-activity-card">
      <div style="display:flex; justify-content: space-between; align-items: flex-start;">
        <h4>${a.title}</h4>
        <span style="font-size: 0.7rem; padding: 4px 8px; background-color: var(--bg-hover); border-radius: 4px;">${a.type}</span>
      </div>
      <div class="admin-course-meta">
        <span>📅 ${formatDateBR(a.date)} às ${a.time}</span>
        <span>📍 ${a.location}</span>
        <span>👨‍🏫 ${a.instructor}</span>
        <span>👥 ${a.enrolled_count}/${a.capacity} vagas preenchidas</span>
        <span>✅ ${a.registered === 1 || a.registered === true ? 'Inscrito' : 'Disponível'}</span>
      </div>
      <div class="admin-course-actions">
        <button class="btn btn-secondary btn-sm" onclick="editActivity(${a.id})">✏️ Editar</button>
        <button class="btn btn-secondary btn-sm" onclick="viewActivitySignups(${a.id})">👥 Ver Inscritos</button>
      </div>
    </div>
  `).join('');
}

function editActivity(id) {
  const all = state.activities || [];
  const a = all.find(x => x.id === id);
  if (!a) return;
  
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">📅</div>
    <h2>Editar Atividade Prática</h2>
    <form onsubmit="saveActivityDetails(event, ${id})" style="text-align:left; margin-top:15px; display:flex; flex-direction:column; gap:12px;">
      <div class="form-group">
        <label>Título</label>
        <input type="text" id="editActivityTitle" value="${a.title}" required>
      </div>
      <div class="form-row-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label>Data</label>
          <input type="date" id="editActivityDate" value="${a.date}" required>
        </div>
        <div class="form-group">
          <label>Hora</label>
          <input type="time" id="editActivityTime" value="${a.time}" required>
        </div>
      </div>
      <div class="form-group">
        <label>Local</label>
        <input type="text" id="editActivityLocation" value="${a.location}" required>
      </div>
      <div class="form-row-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label>Tipo</label>
          <select id="editActivityType">
            <option value="aquatico" ${a.type === 'aquatico' ? 'selected' : ''}>Aquático</option>
            <option value="altura" ${a.type === 'altura' ? 'selected' : ''}>Altura</option>
            <option value="florestal" ${a.type === 'florestal' ? 'selected' : ''}>Florestal</option>
            <option value="medico" ${a.type === 'medico' ? 'selected' : ''}>APH</option>
            <option value="evacuacao" ${a.type === 'evacuacao' ? 'selected' : ''}>Evacuação</option>
            <option value="direcao" ${a.type === 'direcao' ? 'selected' : ''}>Direção</option>
            <option value="radio" ${a.type === 'radio' ? 'selected' : ''}>Rádio</option>
          </select>
        </div>
        <div class="form-group">
          <label>Vagas (Capacidade)</label>
          <input type="number" id="editActivityVagas" value="${a.capacity || a.vagas}" required>
        </div>
      </div>
      <div class="form-group">
        <label>Instrutor</label>
        <input type="text" id="editActivityInstructor" value="${a.instructor}" required>
      </div>
      <button type="submit" class="btn btn-primary btn-full">Salvar Atividade</button>
    </form>
  `;
  modal.style.display = 'flex';
}

async function saveActivityDetails(e, id) {
  e.preventDefault();
  const title = document.getElementById('editActivityTitle').value.trim();
  const date = document.getElementById('editActivityDate').value;
  const time = document.getElementById('editActivityTime').value;
  const location = document.getElementById('editActivityLocation').value.trim();
  const type = document.getElementById('editActivityType').value;
  const capacity = parseInt(document.getElementById('editActivityVagas').value);
  const instructor = document.getElementById('editActivityInstructor').value.trim();
  
  try {
    const res = await fetch(`${API_BASE}/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ title, date, time, location, type, capacity, instructor })
    });
    
    if (res.ok) {
      closeModal('genericModal');
      await loadActivities();
      renderAdminActivities();
      if (state.currentTab === 'calendar') renderCalendar();
      alert("✅ Atividade prática atualizada com sucesso!");
    } else {
      const data = await res.json();
      alert(data.message || 'Erro ao atualizar atividade.');
    }
  } catch (err) {
    console.error('Erro ao atualizar atividade:', err);
  }
}

async function viewActivitySignups(id) {
  const all = state.activities || [];
  const a = all.find(x => x.id === id);
  if (!a) return;
  
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">👥</div>
    <h2>Alunos Inscritos</h2>
    <p style="color:var(--text-secondary); margin-bottom:15px;">Atividade: <strong>${a.title}</strong></p>
    
    <div id="activitySignupsList" style="text-align:left; background:rgba(0,0,0,0.1); border:1px solid var(--border); border-radius:8px; padding:15px; max-height:260px; overflow-y:auto;">
      Carregando inscritos...
    </div>
    
    <button class="btn btn-secondary btn-full" style="margin-top:20px;" onclick="closeModal('genericModal')">Fechar</button>
  `;
  modal.style.display = 'flex';

  try {
    const res = await fetch(`${API_BASE}/activities/${id}/signups`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const signups = await res.json();
      const listContainer = document.getElementById('activitySignupsList');
      if (signups.length === 0) {
        listContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; text-align:center;">Nenhum aluno inscrito nesta atividade ainda.</p>';
      } else {
        listContainer.innerHTML = `
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin:0; padding:0;">
            ${signups.map(s => {
              const userRoleLabel = s.rank === 'admin' ? 'Major BM' : (s.rank === 'instructor' ? 'Capitão BM' : 'Cadete BM');
              return `<li style="font-size:0.85rem; border-bottom:1px solid var(--border); padding-bottom:6px; color: var(--text-primary);">👮 ${s.name} (${userRoleLabel})</li>`;
            }).join('')}
          </ul>
        `;
      }
    }
  } catch (err) {
    console.error('Erro ao buscar inscritos:', err);
  }
}

function openCreateActivityModal() {
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalBody').innerHTML = `
    <div class="modal-icon">📅</div>
    <h2>Nova Atividade Prática</h2>
    <form onsubmit="createActivity(event)">
      <div class="form-group">
        <label>Título</label>
        <input type="text" id="newActivityTitle" required>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Data</label>
          <input type="date" id="newActivityDate" required>
        </div>
        <div class="form-group">
          <label>Hora</label>
          <input type="time" id="newActivityTime" required>
        </div>
      </div>
      <div class="form-group">
        <label>Local</label>
        <input type="text" id="newActivityLocation" required>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Tipo</label>
          <select id="newActivityType">
            <option value="aquatico">Aquático</option>
            <option value="altura">Altura</option>
            <option value="florestal">Florestal</option>
            <option value="medico">APH</option>
            <option value="evacuacao">Evacuação</option>
            <option value="direcao">Direção</option>
            <option value="radio">Rádio</option>
          </select>
        </div>
        <div class="form-group">
          <label>Vagas</label>
          <input type="number" id="newActivityVagas" value="20" required>
        </div>
      </div>
      <div class="form-group">
        <label>Instrutor</label>
        <input type="text" id="newActivityInstructor" required>
      </div>
      <button type="submit" class="btn btn-primary btn-full">Criar Atividade</button>
    </form>
  `;
  modal.style.display = 'flex';
}

async function createActivity(e) {
  e.preventDefault();
  const title = document.getElementById('newActivityTitle').value.trim();
  const date = document.getElementById('newActivityDate').value;
  const time = document.getElementById('newActivityTime').value;
  const location = document.getElementById('newActivityLocation').value.trim();
  const type = document.getElementById('newActivityType').value;
  const capacity = parseInt(document.getElementById('newActivityVagas').value);
  const instructor = document.getElementById('newActivityInstructor').value.trim();
  
  try {
    const res = await fetch(`${API_BASE}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ title, date, time, location, type, capacity, instructor })
    });
    
    if (res.ok) {
      closeModal('genericModal');
      await loadActivities();
      renderAdminActivities();
      if (state.currentTab === 'calendar') renderCalendar();
      alert('✅ Atividade prática criada com sucesso!');
    } else {
      const data = await res.json();
      alert(data.message || 'Erro ao criar atividade.');
    }
  } catch (err) {
    console.error('Erro ao criar atividade:', err);
  }
}

// =========================================================
// PDF UPLOAD (mantido)
// =========================================================
function handlePDFUploadSim(e) {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById('pdfUploadStatusText').innerHTML = `
    ✅ Arquivo Carregado: <strong>${file.name}</strong> (${(file.size/1024).toFixed(1)} KB)
  `;
  const reader = new FileReader();
  reader.onload = function(evt) {
    document.getElementById('quizSourceText').value = evt.target.result || `Resumo técnico extraído de ${file.name}.`;
  };
  reader.readAsText(file);
}

// =========================================================
// GERAÇÃO DE QUIZ COM IA (HUD API)
// =========================================================
async function generateAIQuiz(e) {
  e.preventDefault();
  const targetVal = document.getElementById('selectTargetCourse').value;
  const [courseId, moduleId] = targetVal.split('-').map(Number);
  const textContent = document.getElementById('quizSourceText').value;
  
  const btn = document.getElementById('btnGenerateAIQuiz');
  btn.textContent = '🤖 Chamando a HUD API...';
  btn.disabled = true;
  
  const promptMessage = `
    Você é um instrutor militar do Corpo de Bombeiros. Baseando-se no texto abaixo, crie 5 questões objetivas de múltipla escolha com 4 alternativas cada.
    
    Texto: "${textContent}"
    
    Retorne APENAS um JSON válido com a estrutura:
    {
      "quiz": [
        {
          "questionText": "...",
          "options": ["A", "B", "C", "D"],
          "correctOption": 0
        }
      ]
    }
    Onde correctOption é 0, 1, 2 ou 3.
  `;
  
  try {
    const response = await fetch(`${API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        messages: [{ role: 'user', content: promptMessage }],
        temperature: 0.2
      })
    });
    
    if (!response.ok) throw new Error('API offline');
    
    const resultJson = await response.json();
    const completionText = resultJson.choices[0].message.content.trim();
    const cleanJson = completionText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);
    const parsedQuiz = parsedData.quiz || parsedData;
    
    if (parsedQuiz && Array.isArray(parsedQuiz)) {
      applyQuizToLesson(courseId, moduleId, parsedQuiz);
      alert('✅ Quiz gerado com sucesso pela IA e integrado ao módulo!');
    } else {
      throw new Error('Formato incorreto');
    }
  } catch (error) {
    console.warn('Fallback local ativado:', error);
    setTimeout(() => {
      const generatedQuiz = generateLocalFallbackQuiz(textContent);
      applyQuizToLesson(courseId, moduleId, generatedQuiz);
      alert('🤖 API externa indisponível. Quiz gerado localmente como fallback.');
    }, 1000);
  } finally {
    btn.textContent = '🤖 Gerar Avaliação de Alta Fidelidade (Min. 60% de Nota)';
    btn.disabled = false;
    document.getElementById('quizGeneratorForm').reset();
    document.getElementById('pdfUploadStatusText').innerHTML = `Arraste ou clique para carregar o arquivo <strong>PDF ou Manual Técnico</strong>`;
  }
}

function applyQuizToLesson(courseId, moduleId, quizQuestions) {
  const course = state.courses[courseId];
  if (!course) return;
  const mod = course.modules.find(m => m.id === moduleId);
  if (!mod) return;
  
  let targetLesson = mod.lessons[mod.lessons.length - 1];
  if (targetLesson.quiz) {
    const newLessonId = mod.lessons.length + 1;
    targetLesson = {
      id: newLessonId,
      title: `Avaliação Especial: IA`,
      duration: '20min',
      completed: false,
      text: 'Avaliação gerada via IA a partir do manual técnico.',
      quiz: quizQuestions
    };
    mod.lessons.push(targetLesson);
  } else {
    targetLesson.quiz = quizQuestions;
  }
  
  state.recentActivities.unshift({
    text: `Instrutor ${state.currentUser.name} gerou Quiz IA para ${course.title}.`,
    time: 'Agora mesmo'
  });
  
  saveState();
  renderAdminPanel();
  renderClassroom();
}

function generateLocalFallbackQuiz(text) {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('florestal') || lowerText.includes('mata') || lowerText.includes('fogo')) {
    return [
      { questionText: 'Qual fator acelera a propagação de incêndios florestais?', options: ['Baixa umidade e ventos fortes', 'Alta taxa de oxigênio do solo', 'Pressão elevada', 'Ausência de UV'], correctOption: 0 },
      { questionText: 'Técnica de queimar controlada uma faixa à frente do incêndio:', options: ['Aceiro físico', 'Linha de fogo / Contra-fogo', 'Ataque direto', 'Espuma química'], correctOption: 1 },
      { questionText: 'Largura mínima de aceiro manual:', options: ['10 metros', 'Duas vezes a altura da vegetação', '1 a 2 metros', '30 centímetros'], correctOption: 2 }
    ];
  } else if (lowerText.includes('aph') || lowerText.includes('médico') || lowerText.includes('vítima')) {
    return [
      { questionText: 'Conduta prioritária em fratura cervical:', options: ['Sentar a vítima', 'Imobilização manual da cabeça em posição neutra', 'Massagear o pescoço', 'Tração brusca'], correctOption: 1 },
      { questionText: 'Cor da lona START para óbito óbvio:', options: ['Vermelha', 'Amarela', 'Preta', 'Verde'], correctOption: 2 }
    ];
  } else {
    return [
      { questionText: 'Conduta padrão em riscos eminentes em área civil:', options: ['Isolamento e notificação da Defesa Civil', 'Aguardar ofício do Governador', 'Remoção forçada', 'Vistorias sem registro'], correctOption: 0 },
      { questionText: 'Aproveitamento mínimo para validação de módulos:', options: ['50%', '60%', 'Apenas presencial', '85%'], correctOption: 1 }
    ];
  }
}

async function loadCourses() {
  try {
    const res = await fetch(`${API_BASE}/courses`, {
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    });
    if (res.ok) {
      const coursesData = await res.json();
      state.courses = {};
      
      for (const c of coursesData) {
        // Carrega também os detalhes (módulos e progresso de cada um)
        const detailsRes = await fetch(`${API_BASE}/courses/${c.id}`, {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        });
        if (detailsRes.ok) {
          const details = await detailsRes.json();
          state.courses[c.id] = {
            id: c.id,
            title: c.titulo,
            category: c.categoria,
            categoryName: c.categoria_nome,
            categoryClass: c.categoria_classe,
            level: c.nivel,
            levelText: c.nivel_texto,
            description: c.descricao,
            instructor: c.instrutor,
            duration: c.duracao,
            apenas_pdf_texto: c.apenas_pdf_texto === 1 || c.apenas_pdf_texto === true,
            pdf_url: c.pdf_url,
            pdf_progress: details.pdf_progress,
            modules: details.modules
          };
        }
      }
    }
  } catch (err) {
    console.error('Erro ao buscar cursos do backend:', err);
  }
}

async function savePDFProgress(courseId, currentPage, totalPages) {
  try {
    const res = await fetch(`${API_BASE}/courses/${courseId}/pdf-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ pagina_atual: currentPage, total_paginas: totalPages })
    });
    if (res.ok) {
      const data = await res.json();
      state.courses[courseId].pdf_progress = {
        pagina_atual: data.pagina_atual,
        total_paginas: data.total_paginas,
        progresso_porcentagem: data.progresso_porcentagem,
        concluido: data.concluido
      };
      
      renderHeaderUserInfo();
      
      const statusText = document.querySelector('.pdf-book-header span');
      if (statusText) {
        statusText.innerHTML = `📖 Lendo Livro - Progresso: ${data.progresso_porcentagem}% (${data.pagina_atual}/${data.total_paginas})`;
      }
      
      if (data.concluido && !state.courses[courseId].completed) {
        state.courses[courseId].completed = true;
        addXP(200, `concluir livro principal do curso "${state.courses[courseId].title}"`);
        alert(`🎉 Curso concluído! Você leu todas as páginas do livro do curso. +200 XP`);
      }
    }
  } catch (err) {
    console.error('Erro ao atualizar progresso de PDF:', err);
  }
}

// Progresso de leitura POR AULA (apostila individual).
// Cada virar de página grava no backend; quando o aluno chega na
// última página, o backend marca concluido=1 e isso destrava a prova
// final (via getCourseGate).
async function saveLessonPDFProgress(lessonId, currentPage, totalPages) {
  try {
    const res = await fetch(`${API_BASE}/courses/lessons/${lessonId}/pdf-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ pagina_atual: currentPage, total_paginas: totalPages })
    });
    if (!res.ok) return; // 429 (rate limit) ou erro silencioso
    const data = await res.json();

    // Atualiza cache local da lesson
    const course = state.courses[state.activeCourseId];
    const moduleObj = course && course.modules ? course.modules.find(m => m.id === state.activeModuleId) : null;
    const lessonObj = moduleObj && moduleObj.lessons ? moduleObj.lessons.find(l => l.id === lessonId) : null;
    if (lessonObj) {
      lessonObj.pdf_lido = {
        pagina_atual: data.pagina_atual,
        total_paginas: data.total_paginas,
        progresso_porcentagem: data.progresso_porcentagem,
        concluido: data.concluido,
      };
    }

    const statusText = document.querySelector('.pdf-book-header span');
    if (statusText) {
      statusText.innerHTML =
        `📖 Lendo Apostila - Progresso: ${data.progresso_porcentagem}% (${data.pagina_atual}/${data.total_paginas})`;
    }

    if (data.concluido) {
      // Recarrega o curso para puxar o exam_gate atualizado (liberação da prova)
      await loadCourses(false);
      addXP(150, `concluir apostila "${lessonObj ? lessonObj.title : ''}"`);
    }
  } catch (err) {
    console.error('Erro ao atualizar progresso do PDF da aula:', err);
  }
}

async function saveLessonProgress(lessonId) {
  try {
    await fetch(`${API_BASE}/courses/progress/${lessonId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    });
  } catch (err) {
    console.error('Erro ao salvar progresso de aula:', err);
  }
}

async function loadProfile() {
  if (!state.token) return;
  try {
    const res = await fetch(`${API_BASE}/users/me/profile`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.xp = data.user.xp;
      state.profileStats = data.stats;
      saveState();
    }
  } catch (err) {
    console.error('Erro ao carregar perfil:', err);
  }
}

async function loadBookmarks() {
  if (!state.token) return;
  try {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.bookmarks = data;
      saveState();
    }
  } catch (err) {
    console.error('Erro ao carregar favoritos:', err);
  }
}

async function loadNotifications() {
  if (!state.token) return;
  try {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.notifications = data.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        time: new Date(n.created_at).toLocaleDateString('pt-BR'),
        read: n.is_read === 1 || n.is_read === true
      }));
      saveState();
    }
  } catch (err) {
    console.error('Erro ao carregar notificações:', err);
  }
}

async function loadActivities() {
  if (!state.token) return;
  try {
    const res = await fetch(`${API_BASE}/activities`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.activities = data;
      saveState();
    }
  } catch (err) {
    console.error('Erro ao carregar atividades:', err);
  }
}

// =========================================================
// INICIALIZAÇÃO
// =========================================================
window.onload = function() {
  loadState();
  initAppLayout();
};
