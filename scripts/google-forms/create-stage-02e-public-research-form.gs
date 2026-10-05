/**
 * create-stage-02e-public-research-form.gs
 * -----------------------------------------------------------------------------
 * Projeto: Mayara Rocha Arquitetura — Website e Ecossistema Digital
 * ETAPA 02-E — Pesquisa Primária / Voice of Customer (VoC)
 *
 * O QUE ESTE SCRIPT FAZ
 *   Cria automaticamente um Google Forms de pesquisa exploratória com pessoas
 *   reais que estão construindo, reformando, procurando terreno ou planejando
 *   iniciar esse processo. Também cria e vincula uma planilha de respostas
 *   (com uma aba "Dicionário" que mapeia código da pergunta -> texto -> finalidade).
 *
 * COMO USAR (passo a passo completo em docs/target-audience/12-primary-research-form-guide.md)
 *   1. Abra https://script.google.com/ e crie um novo projeto.
 *   2. Apague o Code.gs e cole TODO este arquivo. Salve.
 *   3. Deixe CONFIG.CONFIRM_CREATION = true.
 *   4. Selecione a função  createStage02EPublicResearchForm  e clique em Executar.
 *   5. Autorize as permissões (Google Forms + Google Sheets/Drive).
 *   6. Abra o Registro de execução (Ver > Registros) e copie as URLs.
 *   7. Teste todas as ramificações, faça o piloto (3-5 pessoas) e só então distribua.
 *
 * IMPORTANTE
 *   - CADA EXECUÇÃO CRIA UM NOVO FORMULÁRIO E UMA NOVA PLANILHA. O script nunca
 *     apaga, edita ou lê formulários/planilhas existentes.
 *   - Depois de gerar com sucesso, volte CONFIG.CONFIRM_CREATION para false.
 *   - Sem bibliotecas externas, chaves, tokens ou chamadas HTTP. Nada é enviado
 *     automaticamente a ninguém e nenhuma resposta é publicada.
 *   - O formulário NÃO coleta e-mail e NÃO exige login. O contato para entrevista
 *     é opcional e fica na mesma linha da resposta (ver guia: privacidade/LGPD).
 *   - O texto de consentimento é um MODELO e deve ser validado profissionalmente.
 *
 * NAVEGAÇÃO CONDICIONAL — SEMÂNTICA VERIFICADA NA DOCUMENTAÇÃO DO FormApp
 *   - createChoice(valor, PageBreakItem | PageNavigationType): a navegação vale
 *     ao responder aquela alternativa. Perguntas ramificadas ficam SOZINHAS
 *     (ou como última pergunta) da sua página.
 *   - PageBreakItem.setGoToPage(...): vale "depois de concluir a página ANTERIOR a
 *     este page break (ao chegar nele por progressão linear)". Ou seja, NÃO é
 *     "para onde ir depois desta página", e sim "o que acontece ao chegar aqui
 *     vindo da página de cima". É usado uma única vez neste script (página de
 *     encerramento -> enviar).
 *   - Navegação não tem efeito na última página do formulário.
 * -----------------------------------------------------------------------------
 */

/** Configuração de execução / segurança. */
var CONFIG = {
  FORM_TITLE: 'Pesquisa sobre construção, reforma e projetos residenciais',
  RESPONSES_SPREADSHEET_NAME: 'ETAPA 02-E — Respostas Pesquisa Primária Público Real',
  DICTIONARY_SHEET_NAME: 'Dicionário',
  // Trava de segurança. Enquanto for false, o script não cria nada.
  CONFIRM_CREATION: true
};

/* ===========================================================================
 * 1. ESPECIFICAÇÃO DO FORMULÁRIO (fonte única de verdade)
 * ---------------------------------------------------------------------------
 * Tipos: 'SHORT_TEXT' | 'PARAGRAPH_TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'LINEAR_SCALE'
 * Campos de questão:
 *   code, type, title, help, required, options[], otherOption (campo "Outro"),
 *   scale {min,max,low,high}, validation {kind,n,help}, branch {opção: destino},
 *   seg (variável de segmentação, só para o Dicionário)
 *   destino de branch: 'SUBMIT' (enviar/encerrar) ou a key de uma seção.
 *   Alternativa sem entrada em branch = segue para a próxima página.
 * Campos de seção:
 *   key, title, description, purpose, noPageBreak (1ª página), shownWhen,
 *   submitWhenReachedLinearly (ver nota de semântica acima)
 * =========================================================================== */

var HELP_MULTI = 'Marque quantas quiser.';

var ORIGIN_OPTIONS = [
  'WhatsApp/grupo',
  'Facebook/grupo',
  'Instagram',
  'Anúncio',
  'Indicação de amigo/familiar',
  'Corretor/imobiliária',
  'Loja de materiais/construção',
  'Arquiteto/engenheiro/profissional'
];

var FORM_CONFIG = {
  title: CONFIG.FORM_TITLE,

  description: [
    'Estamos realizando uma pesquisa para entender como pessoas que estão construindo, reformando ou planejando uma residência tomam decisões sobre projeto, orçamento e contratação de serviços de arquitetura.',
    '',
    'A pesquisa leva cerca de 5 a 8 minutos. As respostas serão analisadas de forma agregada para orientar o desenvolvimento de um projeto digital. Você não precisa informar seu nome. Ao final, poderá opcionalmente deixar um contato caso aceite participar de uma conversa curta de aprofundamento.',
    '',
    'Sua participação é voluntária: você pode fechar o formulário a qualquer momento antes de enviar. Usaremos as respostas apenas para pesquisa e desenvolvimento deste projeto. Não pedimos documentos nem dados sensíveis.'
  ].join('\n'),

  confirmationMessage: [
    'Obrigado por participar.',
    '',
    'Sua resposta ajudará a entender melhor como pessoas reais tomam decisões antes de construir, reformar ou contratar um projeto residencial. As respostas serão analisadas em conjunto e usadas para orientar as próximas etapas do projeto.'
  ].join('\n'),

  sections: [

    /* ------------------------------------------------- S0: página inicial */
    {
      key: 's0_consent', noPageBreak: true,
      title: 'Consentimento',
      purpose: 'Consentimento voluntário (LGPD); encerra se não concordar',
      questions: [
        {
          code: 'P0', type: 'MULTIPLE_CHOICE', required: true, seg: 'consentimento',
          title: 'Você concorda em participar voluntariamente desta pesquisa para essa finalidade?',
          options: ['Sim, concordo e quero continuar', 'Não concordo'],
          branch: { 'Não concordo': 'SUBMIT' }
        }
      ]
    },

    /* ------------------------------------------------- S1: triagem */
    {
      key: 's1a_triagem', title: 'Seu momento',
      description: 'Para começar, uma pergunta rápida para entender se esta pesquisa faz sentido para você.',
      purpose: 'Triagem: momento do projeto (encerra em página curta se nenhuma situação se aplica)',
      questions: [
        {
          code: 'P1', type: 'MULTIPLE_CHOICE', required: true, seg: 'momento do projeto',
          title: 'Qual destas situações mais se aproxima do seu momento atual?',
          options: [
            'Estou construindo uma residência',
            'Estou reformando/ampliando uma residência',
            'Já tenho terreno e pretendo construir',
            'Estou procurando/comprando um terreno para construir',
            'Pretendo construir, mas ainda não tenho terreno',
            'Pretendo reformar, mas ainda não comecei',
            'Comprei ou estou comprando um imóvel e pretendo fazer obras, adaptações ou planejar os ambientes',
            'Estou pesquisando possibilidades, sem decisão definida',
            'Nenhuma dessas situações'
          ],
          branch: { 'Nenhuma dessas situações': 's10_encerramento' }
        }
      ]
    },
    {
      key: 's1b_projeto', title: 'Seu projeto',
      purpose: 'Horizonte temporal, finalidade do projeto, cidade e primeira experiência',
      questions: [
        {
          code: 'P2', type: 'MULTIPLE_CHOICE', required: true, seg: 'horizonte temporal',
          title: 'Quando você pretende iniciar ou concluir a próxima etapa desse projeto?',
          options: ['Já está acontecendo', 'Nos próximos 3 meses', 'Entre 4 e 6 meses', 'Entre 7 e 12 meses', 'Entre 1 e 2 anos', 'Mais de 2 anos', 'Ainda não sei']
        },
        {
          code: 'P3', type: 'MULTIPLE_CHOICE', required: true, otherOption: true, seg: 'finalidade do projeto',
          title: 'Esse projeto é principalmente para:',
          options: ['Minha própria moradia', 'Moradia de familiar', 'Investimento/aluguel', 'Venda', 'Uso de lazer/fim de semana', 'Prefiro não responder']
        },
        {
          code: 'P4', type: 'SHORT_TEXT', required: true, seg: 'cidade',
          title: 'Em qual cidade você pretende construir/reformar?',
          help: 'Informe apenas cidade e estado. Não informe endereço.'
        },
        {
          code: 'P5', type: 'MULTIPLE_CHOICE', required: true, seg: 'primeira experiência',
          title: 'Esta seria sua primeira experiência construindo ou fazendo uma reforma de maior porte?',
          options: ['Sim', 'Não', 'Ainda não sei / nunca cheguei a essa etapa']
        }
      ]
    },

    /* ------------------------------------------------- S2: dor espontânea */
    {
      key: 's2a_dor_aberta', title: 'Sua maior preocupação',
      purpose: 'Dor espontânea — aparece SOZINHA e ANTES de qualquer lista, para não induzir',
      questions: [
        {
          code: 'P6', type: 'PARAGRAPH_TEXT', required: true, seg: 'dor espontânea',
          title: 'Sem olhar uma lista de opções: qual é hoje sua maior preocupação ou dificuldade em relação a construir ou reformar?',
          help: 'Responda com suas próprias palavras. Não há resposta certa.'
        }
      ]
    },
    {
      key: 's2b_dor_lista', title: 'Outros fatores',
      purpose: 'Preocupações estruturadas, segurança para estimar metragem × orçamento e informação inicial desejada',
      questions: [
        {
          code: 'P7', type: 'CHECKBOX', required: true, otherOption: true, seg: 'preocupações',
          title: 'Além do que você escreveu, quais fatores mais preocupam você?',
          help: 'Marque até 5.',
          options: [
            'Custo total da obra',
            'Não saber quanto realmente vou gastar',
            'Escolher um projeto adequado ao meu orçamento',
            'Entender qual tamanho de casa faz sentido',
            'Prazo da obra/projeto',
            'Escolher um profissional confiável',
            'Aprovação na prefeitura/documentação',
            'Alterações e imprevistos durante a obra',
            'Encontrar mão de obra',
            'Visualizar como ficará antes de construir',
            'Fazer o projeto caber no terreno',
            'Forma de pagamento',
            'Nenhum desses'
          ],
          validation: { kind: 'SELECT_AT_MOST', n: 5, help: 'Marque no máximo 5 opções.' }
        },
        {
          code: 'P8', type: 'LINEAR_SCALE', required: true, seg: 'segurança para estimar metragem × orçamento',
          title: 'Hoje, quão seguro(a) você se sente para estimar quantos metros quadrados sua residência deveria ter, considerando seu orçamento?',
          scale: { min: 1, max: 5, low: 'Não faço ideia', high: 'Tenho uma estimativa bem clara' }
        },
        {
          code: 'P9', type: 'PARAGRAPH_TEXT', required: false, seg: 'informação inicial desejada',
          title: 'Antes de contratar ou comprar um projeto, qual informação você gostaria de entender primeiro?'
        }
      ]
    },

    /* ------------------------------------------------- S3: busca */
    {
      key: 's3_busca', title: 'Como você procuraria',
      purpose: 'Canais de busca, linguagem espontânea (SEO/conteúdo) e informações verificadas antes de escolher',
      questions: [
        {
          code: 'P10', type: 'MULTIPLE_CHOICE', required: true, otherOption: true, seg: 'canal de busca',
          title: 'Se você precisasse procurar hoje um projeto ou profissional para sua residência, onde começaria?',
          options: [
            'Google', 'Instagram', 'YouTube', 'TikTok', 'Pinterest',
            'Indicação de amigos/familiares',
            'Indicação de engenheiro/construtor/corretor',
            'Escritório/profissional da minha cidade',
            'Marketplace/site de projetos',
            'Não sei'
          ]
        },
        {
          code: 'P11', type: 'PARAGRAPH_TEXT', required: true, seg: 'linguagem espontânea de busca',
          title: 'Que palavras você provavelmente digitaria no Google ou em uma rede social para procurar essa solução?',
          help: 'Escreva do jeito que você realmente digitaria. Se não souber, pode escrever "não sei".'
        },
        {
          code: 'P12', type: 'CHECKBOX', required: true, otherOption: true, seg: 'informações verificadas antes de escolher',
          title: 'Antes de escolher um arquiteto ou projeto, quais informações você costuma querer verificar?',
          help: HELP_MULTI,
          options: [
            'Projetos/portfólio anteriores',
            'Fotos de obras construídas',
            'Avaliações/depoimentos de clientes',
            'Formação/registro profissional',
            'Preço',
            'Prazo',
            'O que está incluído no serviço/produto',
            'Como funciona o processo',
            'Possibilidade de alterações',
            'Formas de pagamento',
            'Atendimento/conversa com o profissional',
            'Imagens 3D/renders',
            'Planta baixa e medidas'
          ]
        }
      ]
    },

    /* ------------------------------------------------- S4: conceito */
    {
      key: 's4a_conceito', title: 'Projetos residenciais prontos',
      description: 'Nas próximas perguntas, considere "planta pronta" como um projeto residencial previamente desenvolvido e disponibilizado para escolha/compra, com características e entregáveis informados antes da contratação. Dependendo da oferta, pequenos ajustes podem ou não estar disponíveis.',
      purpose: 'Teste do conceito de planta pronta: conhecimento prévio, reação e necessidade espontânea de informação (P15 vem ANTES da lista de confiança)',
      questions: [
        {
          code: 'P13', type: 'MULTIPLE_CHOICE', required: true, seg: 'conhecimento prévio de planta pronta',
          title: 'Antes desta pesquisa, você já conhecia a possibilidade de adquirir uma planta/projeto residencial pronto?',
          options: [
            'Sim, e já pesquisei sobre isso',
            'Sim, mas nunca pesquisei',
            'Já tinha ouvido falar, mas não sabia como funcionava',
            'Não conhecia'
          ]
        },
        {
          code: 'P14', type: 'MULTIPLE_CHOICE', required: true, seg: 'predisposição à compra online / necessidade de contato humano',
          title: 'Imagine que você encontrou uma planta pronta que atende ao tamanho do terreno, quantidade de cômodos e estilo que procura. Qual seria sua reação mais provável?',
          options: [
            'Eu consideraria comprar diretamente online se todas as informações fossem claras',
            'Eu consideraria comprar, mas gostaria de falar com um profissional antes',
            'Eu usaria como referência, mas preferiria contratar um projeto personalizado',
            'Eu provavelmente não compraria uma planta pronta',
            'Não sei / precisaria entender melhor'
          ]
        },
        {
          code: 'P15', type: 'PARAGRAPH_TEXT', required: true, seg: 'necessidade espontânea de informação para comprar',
          title: 'O que você precisaria saber ou ver antes de se sentir confortável para comprar uma planta pronta?',
          help: 'Se você não compraria, conte o que teria que ser diferente (ou por quê).'
        }
      ]
    },
    {
      key: 's4b_confianca', title: 'Confiança e forma de compra',
      purpose: 'Itens de confiança, pequenos ajustes e forma de atendimento (online × contato humano)',
      questions: [
        {
          code: 'P16', type: 'CHECKBOX', required: true, otherOption: true, seg: 'itens de confiança',
          title: 'Quais itens aumentariam sua confiança nessa compra?',
          help: HELP_MULTI,
          options: [
            'Informações claras sobre o que será entregue',
            'Planta baixa legível',
            'Medidas e metragem',
            'Dimensão de terreno recomendada',
            'Imagens 3D/renders',
            'Fotos de projeto construído semelhante',
            'Identificação e registro do profissional',
            'Avaliações de clientes',
            'Possibilidade de tirar dúvidas antes da compra',
            'Possibilidade de pequenos ajustes',
            'Política clara de uso, alterações e reembolso',
            'Pagamento seguro',
            'Informações sobre aprovação/documentação'
          ]
        },
        {
          code: 'P17', type: 'MULTIPLE_CHOICE', required: true, seg: 'pequenos ajustes',
          title: 'Se a planta atendesse quase tudo o que você precisa, mas fosse necessário um pequeno ajuste, qual opção faria mais sentido?',
          options: [
            'Compraria se pudesse contratar o ajuste com o próprio profissional',
            'Compraria e resolveria o ajuste depois com outro profissional',
            'Preferiria procurar outra planta que não precisasse de ajuste',
            'Preferiria contratar um projeto totalmente personalizado',
            'Depende do preço e do tipo de ajuste',
            'Não sei'
          ]
        },
        {
          code: 'P18', type: 'MULTIPLE_CHOICE', required: true, seg: 'forma de atendimento preferida (online × contato humano)',
          title: 'Para uma compra desse tipo, qual forma de atendimento você preferiria?',
          options: [
            'Comprar totalmente online, sem precisar conversar com alguém',
            'Ter a opção de conversar antes, mas sem ser obrigatório',
            'Conversar com um profissional antes de qualquer compra',
            'Fazer uma videochamada/reunião antes',
            'Não compraria esse tipo de produto online',
            'Não sei'
          ]
        }
      ]
    },

    /* ------------------------------------------------- S5: preço */
    {
      key: 's5a_preco', title: 'Percepção de preço',
      description: [
        'As perguntas abaixo são apenas para entender percepção de preço. Elas não representam o preço final de nenhum produto.',
        '',
        'Imagine uma planta residencial pronta apresentada com informações claras sobre metragem, ambientes, terreno recomendado, imagens do projeto e descrição do que será entregue. Considere apenas o valor do projeto/planta, não o custo da obra.',
        '',
        'Se não tiver nenhuma referência, pode deixar em branco e seguir.'
      ].join('\n'),
      purpose: 'Percepção de preço — Van Westendorp adaptado (exploratório). Nenhuma faixa é mostrada aqui, para não ancorar',
      questions: [
        {
          code: 'P19', type: 'SHORT_TEXT', required: false, seg: 'percepção de preço — barato demais',
          title: 'A partir de qual valor você acharia esse produto BARATO DEMAIS, a ponto de desconfiar da qualidade?',
          help: 'Digite apenas números, sem R$, pontos ou vírgulas (ex.: 800).',
          validation: { kind: 'NUMBER_GREATER_THAN', n: 0, help: 'Digite apenas números maiores que zero, sem R$, pontos ou vírgulas.' }
        },
        {
          code: 'P20', type: 'SHORT_TEXT', required: false, seg: 'percepção de preço — boa compra',
          title: 'A partir de qual valor você consideraria uma BOA COMPRA / um preço atraente?',
          help: 'Digite apenas números, sem R$, pontos ou vírgulas (ex.: 800).',
          validation: { kind: 'NUMBER_GREATER_THAN', n: 0, help: 'Digite apenas números maiores que zero, sem R$, pontos ou vírgulas.' }
        },
        {
          code: 'P21', type: 'SHORT_TEXT', required: false, seg: 'percepção de preço — caro, mas considerável',
          title: 'A partir de qual valor começaria a parecer CARO, mas ainda poderia ser considerado?',
          help: 'Digite apenas números, sem R$, pontos ou vírgulas (ex.: 800).',
          validation: { kind: 'NUMBER_GREATER_THAN', n: 0, help: 'Digite apenas números maiores que zero, sem R$, pontos ou vírgulas.' }
        },
        {
          code: 'P22', type: 'SHORT_TEXT', required: false, seg: 'percepção de preço — caro demais',
          title: 'A partir de qual valor seria CARO DEMAIS, a ponto de você não considerar a compra?',
          help: 'Digite apenas números, sem R$, pontos ou vírgulas (ex.: 800).',
          validation: { kind: 'NUMBER_GREATER_THAN', n: 0, help: 'Digite apenas números maiores que zero, sem R$, pontos ou vírgulas.' }
        }
      ]
    },
    {
      key: 's5b_preco_faixa', title: 'Uma última pergunta sobre preço',
      purpose: 'Reação à faixa R$ 500–1.500 — em página SEPARADA e SÓ depois das quatro perguntas espontâneas (evita ancoragem)',
      questions: [
        {
          code: 'P23', type: 'MULTIPLE_CHOICE', required: true, seg: 'percepção de preço — reação à faixa',
          title: 'Depois de responder às perguntas anteriores: se uma planta pronta adequada às suas necessidades custasse entre R$ 500 e R$ 1.500, como você perceberia essa faixa?',
          options: [
            'Muito abaixo do que eu esperaria',
            'Um pouco abaixo do que eu esperaria',
            'Próxima do que eu esperaria',
            'Um pouco acima do que eu esperaria',
            'Muito acima do que eu esperaria',
            'Não tenho referência para avaliar'
          ]
        }
      ]
    },

    /* ------------------------------------------------- S6: estilo, 3D e serviços */
    {
      key: 's6a_estilo_pergunta', title: 'Estilo da casa',
      purpose: 'Estilo: triagem (ramificação — só quem diz "Sim" vê as perguntas de detalhe)',
      questions: [
        {
          code: 'P24', type: 'MULTIPLE_CHOICE', required: true, seg: 'estilo — já tem em mente',
          title: 'Quando você pensa na aparência da sua futura casa, você já tem um estilo arquitetônico em mente?',
          options: ['Sim', 'Tenho algumas referências, mas não sei o nome do estilo', 'Ainda não'],
          branch: {
            'Tenho algumas referências, mas não sei o nome do estilo': 's6c_visual_servicos',
            'Ainda não': 's6c_visual_servicos'
          }
        }
      ]
    },
    {
      key: 's6b_estilo_detalhe', title: 'Estilo',
      shownWhen: 'P24 = Sim',
      purpose: 'Estilo: resposta espontânea primeiro (P24A), opções depois e opcionais (P24B)',
      questions: [
        {
          code: 'P24A', type: 'PARAGRAPH_TEXT', required: true, seg: 'estilo — espontâneo',
          title: 'Qual estilo você procura?',
          help: 'Descreva com suas próprias palavras.'
        },
        {
          code: 'P24B', type: 'MULTIPLE_CHOICE', required: false, otherOption: true, seg: 'estilo — estruturado',
          title: 'Se quiser, qual destas opções mais se aproxima do que você gosta?',
          options: ['Contemporâneo', 'Moderno', 'Minimalista', 'Clássico', 'Rústico', 'Colonial', 'Industrial', 'Não sei identificar']
        }
      ]
    },
    {
      key: 's6c_visual_servicos', title: 'Visualização e serviços',
      purpose: 'Importância de imagens 3D/renders e serviços de interesse (interesse declarado, não intenção firme de compra)',
      questions: [
        {
          code: 'P25', type: 'LINEAR_SCALE', required: true, seg: 'importância de 3D/renders',
          title: 'Quanto imagens 3D/renders ajudariam você a decidir sobre um projeto antes de construir?',
          scale: { min: 1, max: 5, low: 'Não fariam diferença', high: 'Seriam muito importantes' }
        },
        {
          code: 'P26', type: 'CHECKBOX', required: true, otherOption: true, seg: 'serviços de interesse',
          title: 'Além do projeto arquitetônico/planta, quais destes serviços poderiam ser úteis para você?',
          help: HELP_MULTI,
          options: [
            'Design de interiores',
            'Projeto/estudo de fachada',
            'Imagens 3D/renderização',
            'Pequenos ajustes em uma planta pronta',
            'Projeto totalmente personalizado',
            'Orientação inicial sobre tamanho/metragem',
            'Nenhum desses'
          ]
        }
      ]
    },

    /* ------------------------------------------------- S7: critérios */
    {
      key: 's7_criterios', title: 'Como você decide',
      purpose: 'Critérios de decisão (Top 3) e motivo aberto de desistência (objeção)',
      questions: [
        {
          code: 'P27', type: 'CHECKBOX', required: true, seg: 'Top 3 critérios',
          title: 'Pensando em escolher entre diferentes profissionais ou opções de projeto, selecione os 3 fatores mais importantes para você.',
          help: 'Marque exatamente 3.',
          options: [
            'Preço',
            'Confiança no profissional',
            'Qualidade do portfólio',
            'Estilo do projeto',
            'Prazo',
            'Facilidade de comunicação',
            'Clareza sobre o que está incluído',
            'Possibilidade de alterações',
            'Avaliações/depoimentos',
            'Imagens 3D',
            'Experiência/conhecimento técnico',
            'Forma de pagamento'
          ],
          validation: { kind: 'SELECT_EXACTLY', n: 3, help: 'Selecione exatamente 3 opções.' }
        },
        {
          code: 'P28', type: 'PARAGRAPH_TEXT', required: false, seg: 'objeção aberta',
          title: 'Existe algum motivo que faria você desistir imediatamente de comprar um projeto ou contratar um profissional, mesmo gostando do trabalho?'
        }
      ]
    },

    /* ------------------------------------------------- S8: perfil mínimo */
    {
      key: 's8_perfil', title: 'Sobre você',
      description: 'Perguntas opcionais, exceto a última. Servem apenas para análise agregada.',
      purpose: 'Perfil mínimo e origem da resposta (análise de viés da amostra). Sem renda, sem dados pessoais',
      questions: [
        {
          code: 'P29', type: 'MULTIPLE_CHOICE', required: false, seg: 'faixa etária (opcional)',
          title: 'Em qual faixa etária você está?',
          options: ['Menos de 18 anos', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefiro não responder']
        },
        {
          code: 'P30', type: 'MULTIPLE_CHOICE', required: false, seg: 'quem decide',
          title: 'Sobre a decisão de construir/reformar, você:',
          options: [
            'Decide principalmente sozinho(a)',
            'Decide junto com outra pessoa/família',
            'Participa, mas outra pessoa decide principalmente',
            'Ainda não sei',
            'Prefiro não responder'
          ]
        },
        {
          code: 'P31', type: 'MULTIPLE_CHOICE', required: true, otherOption: true, seg: 'canal de origem da resposta',
          title: 'Como você chegou até esta pesquisa?',
          options: ORIGIN_OPTIONS
        }
      ]
    },

    /* ------------------------------------------------- S9: entrevista opcional */
    {
      key: 's9a_entrevista', title: 'Conversa de aprofundamento (opcional)',
      description: 'Queremos conversar por cerca de 15 minutos com algumas pessoas para entender melhor as respostas. Participar dessa conversa é totalmente opcional.',
      purpose: 'Convite opcional para entrevista (ramificação: Não = enviar; Sim/Talvez = página de contato)',
      questions: [
        {
          code: 'P32', type: 'MULTIPLE_CHOICE', required: true, seg: 'aceite para entrevista',
          title: 'Você aceitaria participar de uma conversa curta de aproximadamente 15 minutos?',
          options: ['Sim', 'Talvez', 'Não'],
          branch: { 'Sim': 's9b_contato', 'Talvez': 's9b_contato', 'Não': 'SUBMIT' }
        }
      ]
    },
    {
      key: 's9b_contato', title: 'Contato (opcional)',
      shownWhen: 'P32 = Sim ou Talvez',
      description: 'Use somente se quiser ser convidado(a). Este contato será usado apenas para um convite relacionado a esta pesquisa. Você pode deixar em branco e enviar.',
      purpose: 'Contato opcional, coletado só de quem aceitou/talvez aceitou a entrevista',
      questions: [
        {
          code: 'P32A', type: 'MULTIPLE_CHOICE', required: false, seg: 'meio de contato preferido',
          title: 'Como prefere ser contatado(a)?',
          options: ['WhatsApp', 'E-mail']
        },
        {
          code: 'P32B', type: 'SHORT_TEXT', required: false, seg: 'contato (dado pessoal — separar antes da análise)',
          title: 'Informe apenas o contato necessário.',
          help: 'Número de WhatsApp ou e-mail, conforme escolhido acima.'
        }
      ]
    },

    /* ------------------------------------------------- S10: encerramento curto */
    {
      key: 's10_encerramento', title: 'Obrigado!',
      shownWhen: 'P1 = Nenhuma dessas situações',
      description: 'Esta pesquisa é voltada a pessoas que estão construindo, reformando ou planejando uma residência, então não faremos mais perguntas. Agradecemos seu tempo! Se quiser, conte como chegou até aqui e clique em Enviar.',
      purpose: 'Encerramento curto de quem não se enquadra; registra a origem para análise de viés (não descartar silenciosamente)',
      submitWhenReachedLinearly: true, // ao chegar aqui vindo da página de contato (s9b), envia em vez de mostrar esta página
      questions: [
        {
          code: 'P1D', type: 'MULTIPLE_CHOICE', required: false, otherOption: true, seg: 'canal de origem (não qualificados)',
          title: 'Como você chegou até esta pesquisa? (opcional)',
          options: ORIGIN_OPTIONS
        }
      ]
    }
  ]
};

/* ===========================================================================
 * 2. FUNÇÃO PRINCIPAL
 * =========================================================================== */

/**
 * Função a executar no editor do Apps Script.
 * Cria o formulário, as seções, as perguntas, a navegação condicional e a
 * planilha de respostas vinculada. Não envia nada a ninguém.
 */
function createStage02EPublicResearchForm() {
  if (CONFIG.CONFIRM_CREATION !== true) {
    throw new Error(
      'CONFIG.CONFIRM_CREATION está false. Coloque true para criar o formulário e execute ' +
      'novamente. Depois de criar, volte para false para não gerar duplicatas.'
    );
  }

  validateConfig_(FORM_CONFIG);

  var form = createForm_(FORM_CONFIG);

  // 1ª passada: páginas e perguntas.
  var pages = {};          // sectionKey -> PageBreakItem
  var branchQuestions = []; // {item, q}
  FORM_CONFIG.sections.forEach(function (section) {
    var pageBreak = addSection_(form, section);
    if (pageBreak) { pages[section.key] = pageBreak; }
    section.questions.forEach(function (q) {
      var item = addQuestion_(form, q);
      if (q.branch) { branchQuestions.push({ item: item, q: q }); }
    });
  });

  // 2ª passada: navegação (todas as páginas de destino já existem).
  configureNavigation_(pages, branchQuestions);

  var spreadsheet = attachResponsesSpreadsheet_(form);

  logInfo_(form, spreadsheet, pages);
  return form;
}

/* ===========================================================================
 * 3. VALIDAÇÃO DA ESPECIFICAÇÃO (falha cedo se a configuração estiver incoerente)
 * =========================================================================== */

function validateConfig_(config) {
  var sectionKeys = {};
  var codes = {};
  config.sections.forEach(function (s) { sectionKeys[s.key] = true; });

  config.sections.forEach(function (s) {
    if (s.questions.length === 0) { throw new Error('Seção sem perguntas: ' + s.key); }
    s.questions.forEach(function (q, idx) {
      if (codes[q.code]) { throw new Error('Código de pergunta duplicado: ' + q.code); }
      codes[q.code] = true;

      var isChoice = (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX');
      if (isChoice && (!q.options || q.options.length === 0)) {
        throw new Error('Pergunta de escolha sem opções: ' + q.code);
      }
      if (q.type === 'LINEAR_SCALE' && !q.scale) {
        throw new Error('Escala sem configuração: ' + q.code);
      }
      if (q.branch) {
        if (q.type !== 'MULTIPLE_CHOICE') { throw new Error('Só múltipla escolha pode ramificar: ' + q.code); }
        if (q.otherOption) { throw new Error('Pergunta ramificada não pode ter campo "Outro": ' + q.code); }
        if (idx !== s.questions.length - 1) {
          throw new Error('Pergunta ramificada deve ser a última da página: ' + q.code);
        }
        Object.keys(q.branch).forEach(function (opt) {
          if (q.options.indexOf(opt) === -1) {
            throw new Error('Ramificação usa opção inexistente em ' + q.code + ': "' + opt + '"');
          }
          var target = q.branch[opt];
          if (target !== 'SUBMIT' && !sectionKeys[target]) {
            throw new Error('Ramificação com destino inexistente em ' + q.code + ': "' + target + '"');
          }
        });
      }
    });
  });
}

/* ===========================================================================
 * 4. FUNÇÕES REUTILIZÁVEIS
 * =========================================================================== */

/** Cria o formulário base. Não coleta e-mail e não exige login. */
function createForm_(config) {
  var form = FormApp.create(config.title);
  form.setTitle(config.title);
  form.setDescription(config.description);
  form.setConfirmationMessage(config.confirmationMessage);

  // Opções que podem ser descontinuadas/indisponíveis: falha isolada não interrompe.
  trySet_(function () { form.setCollectEmail(false); });
  trySet_(function () { form.setLimitOneResponsePerUser(false); });
  trySet_(function () { form.setProgressBar(true); });
  trySet_(function () { form.setAllowResponseEdits(false); });
  trySet_(function () { form.setShowLinkToRespondAgain(false); });
  return form;
}

function trySet_(fn) {
  try { fn(); } catch (e) { Logger.log('Aviso: opção de formulário ignorada (' + e + ')'); }
}

/** Cria a página (page break) de uma seção. A 1ª seção usa a página inicial do formulário. */
function addSection_(form, section) {
  if (section.noPageBreak) { return null; }
  var pageBreak = form.addPageBreakItem().setTitle(section.title);
  if (section.description) { pageBreak.setHelpText(section.description); }
  if (section.submitWhenReachedLinearly) {
    // Semântica: ao chegar nesta página vindo da página anterior (linear), envia o formulário.
    pageBreak.setGoToPage(FormApp.PageNavigationType.SUBMIT);
  }
  return pageBreak;
}

function addQuestion_(form, q) {
  switch (q.type) {
    case 'SHORT_TEXT':      return addText_(form, q);
    case 'PARAGRAPH_TEXT':  return addParagraph_(form, q);
    case 'MULTIPLE_CHOICE': return addMultipleChoice_(form, q);
    case 'CHECKBOX':        return addCheckbox_(form, q);
    case 'LINEAR_SCALE':    return addScale_(form, q);
    default: throw new Error('Tipo de pergunta desconhecido: ' + q.type + ' (' + q.code + ')');
  }
}

function addText_(form, q) {
  var item = form.addTextItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  applyTextValidation_(item, q);
  return item;
}

function addParagraph_(form, q) {
  var item = form.addParagraphTextItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  return item;
}

function addMultipleChoice_(form, q) {
  var item = form.addMultipleChoiceItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setChoiceValues(q.options); // navegação (se houver) é aplicada em configureNavigation_
  if (q.otherOption) { item.showOtherOption(true); }
  return item;
}

function addCheckbox_(form, q) {
  var item = form.addCheckboxItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setChoiceValues(q.options);
  if (q.otherOption) { item.showOtherOption(true); }
  if (q.validation) {
    var v = FormApp.createCheckboxValidation().setHelpText(q.validation.help);
    if (q.validation.kind === 'SELECT_AT_MOST') { v = v.requireSelectAtMost(q.validation.n); }
    else if (q.validation.kind === 'SELECT_EXACTLY') { v = v.requireSelectExactly(q.validation.n); }
    else { throw new Error('Validação de checkbox desconhecida: ' + q.validation.kind); }
    item.setValidation(v.build());
  }
  return item;
}

function addScale_(form, q) {
  var s = q.scale;
  var item = form.addScaleItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setBounds(s.min, s.max).setLabels(s.low, s.high);
  return item;
}

function applyTextValidation_(item, q) {
  if (!q.validation) { return; }
  if (q.validation.kind !== 'NUMBER_GREATER_THAN') {
    throw new Error('Validação de texto desconhecida: ' + q.validation.kind);
  }
  var v = FormApp.createTextValidation()
    .setHelpText(q.validation.help)
    .requireNumberGreaterThan(q.validation.n)
    .build();
  item.setValidation(v);
}

/**
 * Aplica a navegação condicional das perguntas de múltipla escolha ramificadas.
 * Alternativas sem entrada em "branch" seguem para a próxima página (CONTINUE).
 */
function configureNavigation_(pages, branchQuestions) {
  branchQuestions.forEach(function (bq) {
    var item = bq.item;
    var choices = item.getChoices().map(function (choice) {
      var value = choice.getValue();
      var target = bq.q.branch[value];
      if (!target) { return item.createChoice(value, FormApp.PageNavigationType.CONTINUE); }
      if (target === 'SUBMIT') { return item.createChoice(value, FormApp.PageNavigationType.SUBMIT); }
      return item.createChoice(value, pages[target]);
    });
    item.setChoices(choices);
  });
}

/* ===========================================================================
 * 5. PLANILHA DE RESPOSTAS + DICIONÁRIO
 * =========================================================================== */

/**
 * Cria uma planilha nova, escreve a aba "Dicionário" e a define como destino das
 * respostas. Se algo falhar, o formulário continua válido e o log explica o passo manual.
 */
function attachResponsesSpreadsheet_(form) {
  try {
    var ss = SpreadsheetApp.create(CONFIG.RESPONSES_SPREADSHEET_NAME);
    writeDictionary_(ss);            // antes de vincular, para não misturar com a aba de respostas
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    return ss;
  } catch (e) {
    Logger.log(
      'Aviso: não foi possível criar/vincular a planilha automaticamente (' + e + '). ' +
      'Vincule manualmente: formulário > aba "Respostas" > ícone verde de planilha > "Criar planilha".'
    );
    return null;
  }
}

/** Escreve a aba "Dicionário" (código -> pergunta -> finalidade -> variável de segmentação). */
function writeDictionary_(ss) {
  var typeLabel = {
    SHORT_TEXT: 'Resposta curta', PARAGRAPH_TEXT: 'Resposta longa',
    MULTIPLE_CHOICE: 'Escolha única', CHECKBOX: 'Caixas de seleção', LINEAR_SCALE: 'Escala'
  };
  var rows = [[
    'Código', 'Página', 'Pergunta (cabeçalho na aba de respostas)', 'Tipo', 'Obrigatória',
    'Lógica de exibição / ramificação', 'Finalidade do bloco', 'Variável de segmentação'
  ]];

  var titleByKey = {};
  FORM_CONFIG.sections.forEach(function (s) { titleByKey[s.key] = s.title; });

  FORM_CONFIG.sections.forEach(function (s) {
    s.questions.forEach(function (q) {
      var logic = s.shownWhen ? ('Exibida se ' + s.shownWhen) : '';
      if (q.branch) {
        var parts = Object.keys(q.branch).map(function (opt) {
          var t = q.branch[opt];
          return '"' + opt + '" -> ' + (t === 'SUBMIT' ? 'enviar/encerrar' : 'página "' + titleByKey[t] + '"');
        });
        logic = (logic ? logic + '; ' : '') + 'Ramifica: ' + parts.join(' | ');
      }
      rows.push([
        q.code, s.title, q.title, typeLabel[q.type], q.required ? 'Sim' : 'Não',
        logic, s.purpose || '', q.seg || ''
      ]);
    });
  });

  var sheet = ss.getSheets()[0];
  sheet.setName(CONFIG.DICTIONARY_SHEET_NAME);
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sheet.getRange(1, 1, 1, rows[0].length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  SpreadsheetApp.flush();
}

/* ===========================================================================
 * 6. LOG
 * =========================================================================== */

function logInfo_(form, spreadsheet, pages) {
  var totalQuestions = 0;
  var required = 0;
  FORM_CONFIG.sections.forEach(function (s) {
    s.questions.forEach(function (q) { totalQuestions++; if (q.required) { required++; } });
  });
  var pageCount = Object.keys(pages).length + 1; // + página inicial (sem page break)

  var linhas = [
    '',
    '=========== FORMULÁRIO DA ETAPA 02-E CRIADO COM SUCESSO ===========',
    'Título.............: ' + form.getTitle(),
    'ID do formulário...: ' + form.getId(),
    'URL de edição......: ' + form.getEditUrl(),
    'URL pública (resposta): ' + form.getPublishedUrl(),
    'Planilha (ID).....: ' + (spreadsheet ? spreadsheet.getId() : '(não criada — ver aviso acima)'),
    'Planilha (URL)....: ' + (spreadsheet ? spreadsheet.getUrl() : '(não criada — ver aviso acima)'),
    'Páginas: ' + pageCount + ' | Perguntas: ' + totalQuestions + ' | Obrigatórias: ' + required,
    '====================================================================',
    'PRÓXIMOS PASSOS (não distribua ainda):',
    '  1. Abra a URL de edição e confira Configurações > Respostas (sem e-mail, sem login).',
    '  2. Teste TODAS as ramificações como respondente, inclusive pelo celular.',
    '  3. Verifique a planilha (aba "Dicionário" + aba de respostas).',
    '  4. Faça um piloto com 3-5 pessoas, corrija ambiguidades e congele a versão.',
    '  5. Volte CONFIG.CONFIRM_CREATION para false.',
    'Guia completo: docs/target-audience/12-primary-research-form-guide.md',
    ''
  ];
  var texto = linhas.join('\n');
  Logger.log(texto);
  if (typeof console !== 'undefined' && console.log) { console.log(texto); }
}
