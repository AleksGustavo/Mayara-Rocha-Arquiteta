/**
 * create-discovery-form.gs
 * -----------------------------------------------------------------------------
 * Projeto: Mayara Rocha Arquitetura — Website e Ecossistema Digital
 * Etapa 01 — Discovery do Negócio
 *
 * O QUE ESTE SCRIPT FAZ
 *   Cria automaticamente, no Google Forms, o questionário de Discovery para a
 *   cliente, a partir da especificação em docs/discovery/03-client-questionnaire.md.
 *   Você NÃO precisa cadastrar nenhuma pergunta manualmente.
 *
 * COMO USAR (resumo — passo a passo completo em docs/discovery/04-google-forms-setup.md)
 *   1. Abra https://script.google.com/ e crie um novo projeto.
 *   2. Apague o conteúdo do arquivo Code.gs e cole TODO este arquivo.
 *   3. Em CONFIG (logo abaixo), deixe CONFIRM_CREATION = true.
 *   4. Selecione a função  createDiscoveryForm  e clique em Executar.
 *   5. Autorize as permissões que o Google pedir (acesso ao Google Forms/Drive).
 *   6. Abra "Registro de execução" (Ver > Registros) e copie as 3 URLs/ID impressos.
 *   7. Faça uma resposta de teste antes de enviar o link para a Mayara.
 *
 * IMPORTANTE
 *   - CADA EXECUÇÃO CRIA UM NOVO FORMULÁRIO. O script nunca apaga, edita ou
 *     acessa formulários existentes ou outros arquivos da sua conta.
 *   - Para evitar criar vários formulários por engano, volte CONFIRM_CREATION
 *     para false depois de gerar o formulário com sucesso.
 *   - Não há dependências externas, npm, APIs de terceiros ou credenciais.
 *   - Nenhuma resposta da Mayara é preenchida automaticamente: o script só
 *     monta as perguntas.
 * -----------------------------------------------------------------------------
 */

/** Configuração de segurança / execução. */
var CONFIG = {
  FORM_TITLE: 'Discovery — Mayara Rocha Arquitetura',
  // Trava de segurança. Enquanto for false, o script não cria nada.
  // Coloque true para gerar o formulário; volte para false depois.
  CONFIRM_CREATION: true
};

/* ===========================================================================
 * 1. CONFIGURAÇÃO DO FORMULÁRIO (fonte única de verdade)
 *    Espelha docs/discovery/03-client-questionnaire.md
 * ---------------------------------------------------------------------------
 * Tipos aceitos por questão: 'SHORT_TEXT' | 'PARAGRAPH' | 'MULTIPLE_CHOICE'
 *                            | 'CHECKBOX' | 'DROPDOWN' | 'LINEAR_SCALE'
 * Campos de uma questão:
 *   code      (string)  identificador (ex.: 'FORM-Q01') — só para rastreio
 *   type      (string)  um dos tipos acima
 *   title     (string)  enunciado exibido para a cliente
 *   help      (string)  texto de ajuda (opcional)
 *   required  (boolean)
 *   options   (string[]) para MULTIPLE_CHOICE / CHECKBOX / DROPDOWN
 *   scale     ({min,max,low,high}) para LINEAR_SCALE
 *   branch    (obj)     só na pergunta de desvio: { 'texto da opção': 'sectionKey' }
 * Campo de uma seção:
 *   goTo      (string)  sectionKey para onde ir ao terminar a seção (pula a página seguinte)
 * =========================================================================== */

var SERVICE_LIST = [
  'Projeto arquitetônico',
  'Plantas sob medida',
  'Design de interiores',
  'Fachadas',
  'Vistas 3D',
  'Renderização',
  'Personalização de projetos',
  'Consultoria'
];

var FORM_CONFIG = {
  title: CONFIG.FORM_TITLE,

  description: [
    'Oi, Mayara! Estas perguntas nos ajudam a planejar o seu site e a sua presenca digital do jeito certo — com base no seu trabalho real, e nao em achismo.',
    '',
    'Sao cerca de 12 a 15 minutos. Responda com o que voce ja sabe hoje; nao precisa ter todas as respostas perfeitas. O que ficar em aberto a gente conversa depois, numa call rapida.',
    '',
    'Nada aqui e definitivo: e um ponto de partida. Pode ser sincera — quanto mais real, melhor fica o resultado.',
    '',
    'Nao pedimos nenhum dado sensivel e voce nao precisa anexar arquivos agora.'
  ].join('\n'),

  confirmationMessage: [
    'Obrigado, Mayara! Suas respostas vao direto para o planejamento da proxima fase do projeto.',
    'Se algum ponto precisar de mais detalhe, a gente resolve numa conversa rapida.'
  ].join(' '),

  sections: [
    /* ---------------------------------------------------------------- Seção 2 */
    {
      key: 's2_sobre',
      title: 'Sobre voce',
      description: '',
      questions: [
        {
          code: 'FORM-Q01', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Ha quanto tempo voce atua profissionalmente com arquitetura?',
          options: ['Menos de 2 anos', '2 a 5 anos', '5 a 10 anos', 'Mais de 10 anos']
        },
        {
          code: 'FORM-Q02', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem registro ativo no CAU?',
          help: 'So para entendermos o que pode ser comunicado no site. Esse ponto e validado profissionalmente depois.',
          options: ['Sim', 'Em processo', 'Nao']
        },
        {
          code: 'FORM-Q03', type: 'CHECKBOX', required: true,
          title: 'Em quais regioes voce atende atualmente?',
          help: 'Pode marcar mais de uma.',
          options: ['Minha cidade e regiao', 'Todo o estado', 'Todo o Brasil, de forma remota', 'Outro']
        },
        {
          code: 'FORM-Q04', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce aceita fazer projetos 100% a distancia (remoto)?',
          options: ['Sim, sem problema', 'Sim, com algumas limitacoes', 'Prefiro nao', 'Nunca fiz']
        },
        {
          code: 'FORM-Q05', type: 'PARAGRAPH', required: true,
          title: 'Em poucas linhas, quais sao seus 3 maiores diferenciais como profissional?',
          help: 'Do jeito que vier a cabeca. A gente lapida depois.'
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 3 */
    {
      key: 's3_servicos',
      title: 'Seus servicos',
      description: '',
      questions: [
        {
          code: 'FORM-Q06', type: 'CHECKBOX', required: true,
          title: 'Quais servicos voce oferece hoje?',
          help: 'Marque tudo o que se aplica.',
          options: [
            'Projeto arquitetonico', 'Plantas sob medida', 'Design de interiores',
            'Fachadas', 'Vistas 3D internas', 'Vistas 3D externas', 'Renderizacao',
            'Personalizacao de projetos', 'Consultoria', 'Acompanhamento de obra', 'Outro'
          ]
        },
        {
          code: 'FORM-Q07', type: 'DROPDOWN', required: true,
          title: 'Qual servico e o MAIS PROCURADO pelos clientes?',
          options: SERVICE_LIST
        },
        {
          code: 'FORM-Q08', type: 'DROPDOWN', required: true,
          title: 'Qual servico e o MAIS RENTAVEL para voce?',
          options: SERVICE_LIST
        },
        {
          code: 'FORM-Q09', type: 'DROPDOWN', required: true,
          title: 'Qual servico voce MAIS GOSTA de fazer?',
          options: SERVICE_LIST
        },
        {
          code: 'FORM-Q10', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce usa contrato nos seus projetos?',
          help: 'A parte juridica do contrato e revisada profissionalmente numa etapa posterior.',
          options: ['Sim, modelo proprio', 'Sim, modelo de terceiros', 'As vezes', 'Nao uso']
        },
        {
          code: 'FORM-Q11', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantos projetos voce consegue atender ao mesmo tempo, com qualidade?',
          help: 'Isso ajuda a definir metas realistas de contatos por mes.',
          options: ['1 a 2', '3 a 4', '5 a 6', 'Mais de 6']
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 4 */
    {
      key: 's4_clientes',
      title: 'Clientes e publico desejado',
      description: '',
      questions: [
        {
          code: 'FORM-Q12', type: 'CHECKBOX', required: true,
          title: 'Como seus clientes costumam chegar ate voce hoje?',
          help: 'Pode marcar mais de uma.',
          options: ['Indicacao', 'Instagram', 'Google', 'WhatsApp', 'LinkedIn', 'Ja me conheciam', 'Outro']
        },
        {
          code: 'FORM-Q13', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual a faixa de honorario predominante dos seus projetos hoje?',
          help: 'Valor aproximado do seu honorario por projeto (nao o custo da obra).',
          options: ['Ate R$ 5 mil', 'R$ 5 mil a R$ 15 mil', 'R$ 15 mil a R$ 40 mil', 'Acima de R$ 40 mil', 'Prefiro nao dizer']
        },
        {
          code: 'FORM-Q14', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantos contatos de possiveis clientes voce recebe por mes, em media?',
          options: ['0 a 5', '6 a 15', '16 a 30', 'Mais de 30']
        },
        {
          code: 'FORM-Q15', type: 'SHORT_TEXT', required: true,
          title: 'Que tipo de cliente voce quer atrair nos proximos 2 a 3 anos?',
          help: 'Uma frase basta. Ex.: "familias construindo a primeira casa em terreno proprio".'
        },
        {
          code: 'FORM-Q16', type: 'CHECKBOX', required: true,
          title: 'Que tipos de projeto voce quer priorizar?',
          help: 'Marque os principais.',
          options: [
            'Casa terrea', 'Sobrado', 'Apartamento / reforma', 'Comercio', 'Alto padrao',
            'Medio padrao', 'Construcao nova', 'Reforma', 'Projetos para investidores / construtoras'
          ]
        },
        {
          code: 'FORM-Q17', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual ticket medio por projeto voce gostaria de alcancar?',
          help: 'Isso orienta o posicionamento do site. Nao vira preco publico.',
          options: ['Ate R$ 10 mil', 'R$ 10 mil a R$ 25 mil', 'R$ 25 mil a R$ 50 mil', 'Acima de R$ 50 mil', 'Ainda nao sei']
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 5 */
    {
      key: 's5_portfolio',
      title: 'Portfolio',
      description: '',
      questions: [
        {
          code: 'FORM-Q18', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantos projetos voce pode divulgar publicamente hoje?',
          options: ['Nenhum ainda', '1 a 3', '4 a 10', 'Mais de 10']
        },
        {
          code: 'FORM-Q19', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Desses projetos, quantos foram realmente construidos?',
          options: ['Nenhum', '1 a 3', '4 a 10', 'Mais de 10']
        },
        {
          code: 'FORM-Q20', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem fotografias profissionais de obras concluidas?',
          options: ['Sim, de varios projetos', 'De 1 ou 2 projetos', 'Nao, so fotos de celular', 'Nao tenho']
        },
        {
          code: 'FORM-Q21', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem depoimentos de clientes?',
          help: 'Nao precisa anexar agora.',
          options: ['Sim, por escrito', 'Sim, em video', 'Alguns prints de conversa', 'Nao tenho']
        },
        {
          code: 'FORM-Q22', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem autorizacao dos clientes para publicar os projetos (imagens e, as vezes, localizacao)?',
          help: 'A parte formal de autorizacao e organizada e validada profissionalmente depois.',
          options: ['Sim, da maioria', 'De alguns', 'Nao tenho isso formalizado', 'Nao sei']
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 6 */
    {
      key: 's6_marca',
      title: 'Marca e presenca digital',
      description: '',
      questions: [
        {
          code: 'FORM-Q23', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce ja tem logotipo?',
          options: ['Sim, em arquivo vetorial (AI, SVG, PDF)', 'Sim, so em imagem (PNG/JPG)', 'Tenho algo provisorio', 'Nao tenho']
        },
        {
          code: 'FORM-Q24', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce ja tem cores e tipografia definidas para a sua marca?',
          options: ['Sim, com manual de marca', 'Sim, mas de forma informal', 'Nao']
        },
        {
          code: 'FORM-Q25', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce quer usar o seu proprio nome ou criar um nome de escritorio?',
          options: ['Meu nome (Mayara Rocha)', 'Um nome de escritorio', 'Ainda nao decidi']
        },
        {
          code: 'FORM-Q26', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce ja tem um dominio proprio registrado (ex.: seunome.com.br)?',
          help: 'Se tiver, voce pode informar qual na proxima pergunta.',
          options: ['Sim', 'Nao', 'Nao sei']
        },
        {
          code: 'FORM-Q27', type: 'SHORT_TEXT', required: false,
          title: 'Se voce ja tem dominio, qual e? (opcional)',
          help: 'Deixe em branco se nao tiver.'
        },
        {
          code: 'FORM-Q28', type: 'SHORT_TEXT', required: false,
          title: 'Qual o seu Instagram profissional e quantos seguidores, aproximadamente? (opcional)',
          help: 'Ex.: "@meuperfil — cerca de 2 mil". Deixe em branco se nao usa.'
        },
        {
          code: 'FORM-Q29', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem LinkedIn e o usa profissionalmente?',
          options: ['Sim, uso com frequencia', 'Tenho, mas uso pouco', 'Tenho parado', 'Nao tenho']
        },
        {
          code: 'FORM-Q30', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce topa gravar videos curtos / Reels com alguma regularidade?',
          options: ['Sim, tranquilamente', 'Sim, com um roteiro pronto', 'Prefiro nao', 'Nao']
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 7 */
    {
      key: 's7_site',
      title: 'Site',
      description: '',
      questions: [
        {
          code: 'FORM-Q31', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Na sua visao, qual e o objetivo numero 1 do site?',
          help: 'Escolha o principal, mesmo que existam outros.',
          options: [
            'Gerar contatos e pedidos de orcamento',
            'Mostrar portfolio e passar credibilidade',
            'Vender plantas prontas',
            'Divulgar servicos de design de interiores',
            'Ainda nao sei'
          ]
        },
        {
          code: 'FORM-Q32', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual a acao principal que voce quer que o visitante realize?',
          options: [
            'Chamar no WhatsApp', 'Preencher um formulario de orcamento',
            'Comprar uma planta', 'Agendar uma conversa', 'Seguir no Instagram'
          ]
        },
        {
          code: 'FORM-Q33', type: 'CHECKBOX', required: true,
          title: 'Quais secoes sao obrigatorias para voce no site?',
          help: 'Marque as que nao podem faltar.',
          options: [
            'Portfolio', 'Servicos', 'Sobre mim', 'Depoimentos',
            'Perguntas frequentes (FAQ)', 'Blog', 'Loja de plantas', 'Contato', 'Precos'
          ]
        },
        {
          code: 'FORM-Q34', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce ja tem textos escritos (sobre, servicos) ou comecamos do zero?',
          options: ['Ja tenho boa parte', 'Tenho rascunhos', 'Comecar do zero']
        },
        {
          code: 'FORM-Q35', type: 'MULTIPLE_CHOICE', required: false,
          title: 'Voce quer um blog para aparecer no Google?',
          options: ['Sim, e posso ajudar com temas', 'Sim, mas nao tenho tempo de escrever', 'Nao por enquanto']
        },
        {
          // PERGUNTA DE DESVIO — precisa ser a ULTIMA da secao 7.
          code: 'FORM-Q36', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce pretende comercializar plantas prontas pelo site?',
          help: 'Nao tem resposta certa. Isso so define quanto vamos detalhar o assunto agora.',
          options: [
            'Sim, ja no lancamento',
            'Sim, mas em uma segunda fase',
            'Ainda estou avaliando',
            'Nao pretendo no momento'
          ],
          branch: {
            'Sim, ja no lancamento': 's8a_plantas_det',
            'Sim, mas em uma segunda fase': 's8b_plantas_res',
            'Ainda estou avaliando': 's8b_plantas_res',
            'Nao pretendo no momento': 's9_3d_ia'
          }
        }
      ]
    },

    /* --------------------------------------------------------------- Seção 8A */
    {
      key: 's8a_plantas_det',
      title: 'Plantas prontas (detalhado)',
      description: 'Algumas perguntas rapidas porque voce marcou que pretende vender plantas ja no lancamento.',
      goTo: 's9_3d_ia', // ao terminar esta secao, pula a 8B e vai direto para a 9
      questions: [
        {
          code: 'FORM-Q37', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantas plantas voce tem realmente prontas para vender hoje?',
          options: ['Nenhuma 100% pronta ainda', '1 a 3', '4 a 10', 'Mais de 10']
        },
        {
          code: 'FORM-Q38', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual o estado desses projetos?',
          options: ['Prontos para vender como estao', 'Precisam de pequenos ajustes', 'Precisam de bastante retrabalho']
        },
        {
          code: 'FORM-Q39', type: 'CHECKBOX', required: true,
          title: 'Que arquivos existem para essas plantas?',
          help: 'Marque tudo o que existe hoje.',
          options: ['PDF', 'DWG (CAD)', 'Arquivo 3D (SketchUp, Revit, etc.)', 'Renders / imagens 3D', 'Memorial descritivo', 'So imagens']
        },
        {
          code: 'FORM-Q40', type: 'CHECKBOX', required: true,
          title: 'Quais tamanhos e tipologias essas plantas cobrem?',
          options: [
            'Terrea pequena (ate 80 m2)', 'Terrea media (80 a 150 m2)', 'Terrea grande (acima de 150 m2)',
            'Sobrado', 'Geminada', 'Terreno pequeno (ate 200 m2)', 'Terreno grande (acima de 200 m2)'
          ]
        },
        {
          code: 'FORM-Q41', type: 'CHECKBOX', required: true,
          title: 'Quais estilos essas plantas tem?',
          options: ['Contemporaneo', 'Moderno', 'Colonial / tradicional', 'Industrial', 'Rustico / natural', 'Outro']
        },
        {
          code: 'FORM-Q42', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce aceitaria personalizar a planta depois da compra?',
          options: ['Sim, como servico pago a parte', 'Sim, pequenos ajustes inclusos', 'Nao, vendida como esta', 'Ainda nao sei']
        },
        {
          code: 'FORM-Q43', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual faixa de preco voce imagina por planta?',
          help: 'E so uma estimativa para orientar o planejamento. Nada e publicado sem a sua validacao.',
          options: ['Ate R$ 500', 'R$ 500 a R$ 1.500', 'R$ 1.500 a R$ 3.000', 'R$ 3.000 a R$ 6.000', 'Acima de R$ 6.000', 'Nao faco ideia']
        },
        {
          code: 'FORM-Q44', type: 'MULTIPLE_CHOICE', required: true,
          title: 'A compra deve ser automatica ou voce quer falar com a pessoa antes?',
          options: ['100% automatica', 'Automatica, com contato depois', 'Sempre falar antes de vender', 'Nao sei']
        },
        {
          code: 'FORM-Q45', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Sobre direitos de uso e responsabilidade tecnica da planta vendida, o que faz mais sentido para voce hoje?',
          help: 'Esse ponto e validado profissionalmente junto ao CAU e a uma assessoria juridica. Sua resposta aqui e so um ponto de partida.',
          options: ['Uso unico: uma construcao por compra', 'Uso livre para o comprador', 'Preciso de orientacao para decidir', 'Ainda nao pensei nisso']
        }
      ]
    },

    /* --------------------------------------------------------------- Seção 8B */
    {
      key: 's8b_plantas_res',
      title: 'Plantas prontas (resumido)',
      description: 'So duas perguntas rapidas sobre a ideia de vender plantas no futuro.',
      questions: [
        {
          code: 'FORM-Q46', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce ja tem plantas que poderiam virar produto no futuro?',
          options: ['Sim, varias', 'Algumas', 'Poucas', 'Nao ainda']
        },
        {
          code: 'FORM-Q47', type: 'CHECKBOX', required: false,
          title: 'Qual a sua maior duvida sobre vender plantas prontas?',
          help: 'Pode marcar mais de uma. Os pontos legais sao validados profissionalmente.',
          options: ['Preco', 'Direitos autorais', 'Responsabilidade tecnica', 'Personalizacao', 'Suporte ao comprador', 'Concorrencia', 'Outro']
        }
      ]
    },

    /* ---------------------------------------------------------------- Seção 9 */
    {
      key: 's9_3d_ia',
      title: '3D e Inteligencia Artificial',
      description: '',
      questions: [
        {
          code: 'FORM-Q48', type: 'LINEAR_SCALE', required: true,
          title: 'Como voce avalia a qualidade atual dos seus renders?',
          scale: { min: 1, max: 10, low: 'Bem basica', high: 'Nivel de revista' }
        },
        {
          code: 'FORM-Q49', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce tem interesse em videos de "passeio" pelo imovel (camera/drone percorrendo a casa)?',
          options: ['Sim, muito', 'Talvez', 'Nao']
        },
        {
          code: 'FORM-Q50', type: 'LINEAR_SCALE', required: true,
          title: 'Qual o seu interesse em usar imagens/videos gerados por Inteligencia Artificial no marketing?',
          scale: { min: 1, max: 5, low: 'Nenhum', high: 'Muito' }
        },
        {
          code: 'FORM-Q51', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Voce autoriza usar os seus projetos como base em ferramentas de IA (imagem, video, texto)?',
          help: 'Voce pode mudar de ideia depois. Isso e registrado formalmente e validado profissionalmente.',
          options: ['Sim', 'Sim, desde que anonimizados (sem nome/endereco do cliente)', 'Preciso pensar melhor', 'Nao']
        },
        {
          code: 'FORM-Q52', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Algum projeto precisa ser anonimizado (sem nome ou endereco do cliente) antes de qualquer uso?',
          options: ['Sim, varios', 'Alguns', 'Nao', 'Nao sei']
        }
      ]
    },

    /* --------------------------------------------------------------- Seção 10 */
    {
      key: 's10_marketing',
      title: 'Marketing e objetivos',
      description: '',
      questions: [
        {
          code: 'FORM-Q53', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual orcamento mensal voce poderia investir em anuncios?',
          help: 'Nada sera investido agora. E so para planejar.',
          options: ['Ainda nenhum', 'Ate R$ 500', 'R$ 500 a R$ 1.500', 'R$ 1.500 a R$ 3.000', 'Acima de R$ 3.000']
        },
        {
          code: 'FORM-Q54', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual o objetivo principal dos anuncios, quando comecarem?',
          options: ['Contatos para projetos', 'Vendas de plantas', 'Ganhar seguidores', 'Autoridade e reconhecimento']
        },
        {
          code: 'FORM-Q55', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Qual a metrica mais importante para voce medir o sucesso do site?',
          help: 'Escolha a principal.',
          options: ['Numero de contatos / leads', 'Orcamentos enviados', 'Contratos fechados', 'Vendas de plantas', 'Faturamento', 'Seguidores e alcance']
        },
        {
          code: 'FORM-Q56', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantos contatos de clientes por mes seriam um bom resultado?',
          options: ['Ate 5', '6 a 15', '16 a 30', 'Mais de 30']
        },
        {
          code: 'FORM-Q57', type: 'MULTIPLE_CHOICE', required: true,
          title: 'Quantos projetos novos por mes voce quer fechar?',
          help: 'Considere a sua capacidade real de entrega.',
          options: ['1 a 2', '3 a 4', '5 a 6', 'Mais de 6']
        }
      ]
    },

    /* --------------------------------------------------------------- Seção 11 */
    {
      key: 's11_encerramento',
      title: 'Encerramento',
      description: '',
      questions: [
        {
          code: 'FORM-Q58', type: 'PARAGRAPH', required: false,
          title: 'Tem algo importante sobre o seu trabalho ou seus objetivos que a gente nao perguntou?',
          help: 'Campo livre. Pode deixar em branco.'
        },
        {
          code: 'FORM-Q59', type: 'SHORT_TEXT', required: false,
          title: 'Qual a melhor forma e horario para uma conversa rapida de complemento?',
          help: 'Ex.: "WhatsApp, a tarde" ou "ligacao, de manha".'
        }
      ]
    }
  ]
};

/* ===========================================================================
 * 2. FUNÇÃO PRINCIPAL
 * =========================================================================== */

/**
 * Função a ser executada no editor do Apps Script.
 * Cria um novo Google Forms completo a partir de FORM_CONFIG.
 */
function createDiscoveryForm() {
  if (CONFIG.CONFIRM_CREATION !== true) {
    throw new Error(
      'CONFIG.CONFIRM_CREATION esta como false. ' +
      'Coloque true para criar o formulario e execute novamente. ' +
      'Depois de criar, volte para false para nao gerar formularios duplicados.'
    );
  }

  var form = createForm(FORM_CONFIG);

  // 1a passada: cria as paginas (page breaks) e as perguntas.
  var pages = {};          // sectionKey -> PageBreakItem
  var branchItem = null;   // referencia a pergunta de desvio (FORM-Q36)

  FORM_CONFIG.sections.forEach(function (section) {
    var pageBreak = addSection(form, section.title, section.description);
    pages[section.key] = pageBreak;

    section.questions.forEach(function (q) {
      var item = addQuestion(form, q);
      if (q.branch) {
        branchItem = { item: item, map: q.branch };
      }
    });
  });

  // 2a passada: navegacao condicional (agora que todas as paginas existem).
  configureNavigation(form, pages, branchItem);

  // 3a passada: log das URLs e do ID.
  logFormInfo(form);

  return form;
}

/* ===========================================================================
 * 3. FUNÇÕES REUTILIZÁVEIS
 * =========================================================================== */

/** Cria o formulario base (titulo, descricao, mensagem final e opcoes gerais). */
function createForm(config) {
  var form = FormApp.create(config.title);
  form.setTitle(config.title);
  form.setDescription(config.description);
  form.setConfirmationMessage(config.confirmationMessage);

  // Opcoes que deixam o formulario leve e sem exigencia de login.
  // Alguns desses metodos podem ser descontinuados pelo Google com o tempo;
  // se algum falhar, ele e ignorado sem interromper a criacao do formulario.
  trySet(function () { form.setCollectEmail(false); });
  trySet(function () { form.setProgressBar(true); });
  trySet(function () { form.setAllowResponseEdits(true); });
  trySet(function () { form.setShowLinkToRespondAgain(false); });
  trySet(function () { form.setLimitOneResponsePerUser(false); });

  return form;
}

/** Executa uma configuracao opcional; loga um aviso se ela nao estiver disponivel. */
function trySet(fn) {
  try {
    fn();
  } catch (e) {
    Logger.log('Aviso: opcao de formulario ignorada (' + e + ')');
  }
}

/** Adiciona uma nova pagina/secao e devolve o PageBreakItem criado. */
function addSection(form, title, description) {
  var pageBreak = form.addPageBreakItem().setTitle(title);
  if (description) {
    pageBreak.setHelpText(description);
  }
  return pageBreak;
}

/** Dispatcher: cria a pergunta conforme o tipo e devolve o Item criado. */
function addQuestion(form, q) {
  switch (q.type) {
    case 'SHORT_TEXT':      return addText(form, q);
    case 'PARAGRAPH':       return addParagraph(form, q);
    case 'MULTIPLE_CHOICE': return addMultipleChoice(form, q);
    case 'CHECKBOX':        return addCheckbox(form, q);
    case 'DROPDOWN':        return addDropdown(form, q);
    case 'LINEAR_SCALE':    return addScale(form, q);
    default:
      throw new Error('Tipo de pergunta desconhecido: "' + q.type + '" (' + q.code + ')');
  }
}

function addText(form, q) {
  var item = form.addTextItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  return item;
}

function addParagraph(form, q) {
  var item = form.addParagraphTextItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  return item;
}

function addMultipleChoice(form, q) {
  var item = form.addMultipleChoiceItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  // A navegacao condicional (se houver) e aplicada depois, em configureNavigation().
  item.setChoiceValues(q.options);
  return item;
}

function addCheckbox(form, q) {
  var item = form.addCheckboxItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setChoiceValues(q.options);
  return item;
}

function addDropdown(form, q) {
  var item = form.addListItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setChoiceValues(q.options);
  return item;
}

function addScale(form, q) {
  var s = q.scale || {};
  var item = form.addScaleItem().setTitle(q.title).setRequired(!!q.required);
  if (q.help) { item.setHelpText(q.help); }
  item.setBounds(s.min == null ? 1 : s.min, s.max == null ? 5 : s.max);
  if (s.low || s.high) {
    item.setLabels(s.low || '', s.high || '');
  }
  return item;
}

/**
 * Aplica a navegacao condicional:
 *  - a pergunta de desvio (FORM-Q36) manda cada opcao para uma pagina;
 *  - a pagina 8A pula a 8B e segue para a 9 (via goTo declarado na secao).
 * O Google Forms so suporta navegacao por resposta em perguntas de multipla
 * escolha (radio) que sejam a ultima pergunta da pagina — que e o caso aqui.
 */
function configureNavigation(form, pages, branchItem) {
  // 8A -> pula 8B -> vai para 9.
  // ATENCAO (OD-012): PageBreakItem.setGoToPage(...) vale "depois de concluir a pagina
  // ANTERIOR a este page break (ao chegar nele por progressao linear)". Portanto o salto
  // de uma secao X deve ser configurado no page break da secao SEGUINTE a X, e nao no de X.
  // Chegar a 8B por escolha de resposta (navegacao do FORM-Q36) nao dispara este salto.
  FORM_CONFIG.sections.forEach(function (section, idx) {
    var next = FORM_CONFIG.sections[idx + 1];
    if (section.goTo && next && pages[next.key] && pages[section.goTo]) {
      pages[next.key].setGoToPage(pages[section.goTo]);
    }
  });

  // Pergunta de desvio: monta as choices com destino de pagina.
  if (branchItem && branchItem.item && branchItem.map) {
    var mcItem = branchItem.item;
    var choices = mcItem.getChoices().map(function (choice) {
      var value = choice.getValue();
      var targetKey = branchItem.map[value];
      if (targetKey && pages[targetKey]) {
        return mcItem.createChoice(value, pages[targetKey]);
      }
      // Sem destino mapeado: segue o fluxo normal (proxima pagina).
      return mcItem.createChoice(value, FormApp.PageNavigationType.CONTINUE);
    });
    mcItem.setChoices(choices);
  }
}

/** Imprime no Registro de execucao as informacoes uteis do formulario criado. */
function logFormInfo(form) {
  var editUrl = form.getEditUrl();
  var publishedUrl = form.getPublishedUrl();
  var id = form.getId();

  var linhas = [
    '',
    '==================== FORMULARIO CRIADO COM SUCESSO ====================',
    'Titulo........: ' + form.getTitle(),
    'ID............: ' + id,
    'URL de edicao.: ' + editUrl,
    'URL de resposta (enviar para a Mayara): ' + publishedUrl,
    '=====================================================================',
    'Dica: faca uma resposta de teste antes de enviar o link para a cliente.',
    'Dica: volte CONFIG.CONFIRM_CREATION para false para evitar duplicatas.',
    ''
  ];
  var texto = linhas.join('\n');

  Logger.log(texto);
  if (typeof console !== 'undefined' && console.log) {
    console.log(texto);
  }
}
