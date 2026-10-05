# Mayara Rocha Arquitetura — Website e ecossistema digital

Concepção e construção do site e do ecossistema digital de uma arquiteta e urbanista,
conduzida de forma incremental e rastreável, com apoio de ferramentas de IA
(Claude Code, ChatGPT, Google Stitch, Canva).

## Status das etapas

| # | Etapa | Situação |
|---|---|---|
| 01 | Discovery do Negócio | **Concluída (08/09/2026)** — ver [`docs/discovery/07-stage-01-closure.md`](docs/discovery/07-stage-01-closure.md) |
| 02 | Público-alvo | **Concluída (17/09/2026)** — ver [`docs/target-audience/11-stage-02-closure.md`](docs/target-audience/11-stage-02-closure.md). Subetapa **02-E** (pesquisa primária com público real) em andamento: formulário preparado, aguardando teste, piloto e coleta |
| 03 | Personas | Não iniciada |
| 04 | Proposta de Valor e Posicionamento | Não iniciada |
| 05 | Jornada do Cliente e Funil | Não iniciada |
| 06 | Arquitetura da Informação | Não iniciada |
| 07 | Requisitos Funcionais e Não Funcionais | Não iniciada |
| 08 | Diagramas e Modelagem | Não iniciada |
| 09 | Wireframes | Não iniciada |
| 10 | Design System e UI/UX | Não iniciada |
| 11 | Protótipo Responsivo | Não iniciada |
| 12 | Planejamento Técnico e GitHub | Não iniciada |
| 13 | Desenvolvimento | Não iniciada |
| 14 | Testes e Qualidade | Não iniciada |
| 15 | SEO, Analytics e Tracking | Não iniciada |
| 16 | Estratégia LinkedIn e Instagram | Não iniciada |
| 17 | Tráfego Pago | Não iniciada |
| 18 | CRO e Otimização Contínua | Não iniciada |

> **Discovery concluído ≠ loja pronta para lançamento.** Licença/termos, responsabilidade
> técnica (RRT), reembolso, fiscal e LGPD são bloqueios de lançamento registrados em
> [`docs/discovery/06-open-decisions-register.md`](docs/discovery/06-open-decisions-register.md)
> e devem ser resolvidos antes da comercialização pública.

> **Público-alvo definido:** produto digital (plantas prontas) como prioridade de crescimento
> digital, projeto arquitetônico como público primário de serviços, design de interiores como
> secundário estratégico. Ver [`docs/target-audience/10-target-audience-final.md`](docs/target-audience/10-target-audience-final.md)
> para a consolidação completa (segmentos S01–S07, evidências e pendências não bloqueadoras).

## Estrutura

```text
docs/
├── discovery/
│   ├── 01-business-discovery.md      # Discovery inicial: fatos, hipóteses, riscos, oportunidades
│   ├── 02-interview-guide.md         # Roteiro interno de entrevista (45 perguntas, 4 partes)
│   ├── 03-client-questionnaire.md    # Especificação do questionário da cliente (fonte do Google Forms)
│   ├── 04-google-forms-setup.md      # Guia de execução do script + checklist de teste
│   ├── 05-discovery-findings.md      # Consolidação das respostas reais + saneamento (08/09/2026)
│   ├── 06-open-decisions-register.md # Decisões abertas: OD-001..OD-012 (categoria, responsável, status)
│   └── 07-stage-01-closure.md        # Encerramento formal da ETAPA 01
├── target-audience/
│   ├── 01-target-audience-discovery.md      # Público amplo, segmentos candidatos (S01-S07), hipóteses
│   ├── 02-segmentation-matrix.md            # Matriz de segmentação + produto × público
│   ├── 03-priority-audiences.md             # Priorização, JTBD, dores/desejos/objeções
│   ├── 04-validation-questions.md           # Perguntas de validação + status pós-formulário
│   ├── 05-form-guide.md                     # Guia de execução do formulário da ETAPA 02
│   ├── 06-client-validation-results.md      # Respostas reais da Mayara incorporadas
│   ├── 07-market-validation.md              # Validação externa de mercado (13 concorrentes + dados institucionais)
│   ├── 08-regional-competitors-input.md     # Concorrentes regionais identificados
│   ├── 09-regional-competitive-analysis.md  # Inteligência competitiva regional (Leme/Araras/Pirassununga)
│   ├── 10-target-audience-final.md          # Consolidação definitiva do público-alvo
│   ├── 11-stage-02-closure.md               # Encerramento formal da ETAPA 02
│   └── 12-primary-research-form-guide.md    # ETAPA 02-E: guia da pesquisa primária com público real
└── portfolio/
    ├── linkedin-post.md              # Post de abertura do projeto (anonimizado)
    ├── linkedin-etapa-01.md          # Post de conclusão da ETAPA 01 (anonimizado)
    └── etapa-01-card.svg             # Card 1200x1200 para acompanhar o post da ETAPA 01

scripts/
└── google-forms/
    ├── create-discovery-form.gs                    # Google Apps Script que gera o formulário de Discovery
    ├── create-stage-02-target-audience-form.gs     # Google Apps Script que gera o formulário de validação de público-alvo
    └── create-stage-02e-public-research-form.gs    # Google Apps Script que gera o formulário da pesquisa primária (02-E)
```

## Princípios do projeto

- **Não inventar informação** sobre a cliente. O que não foi confirmado fica marcado como
  `[HIPÓTESE — NECESSITA VALIDAÇÃO]`, `[PENDÊNCIA CONTROLADA]` ou `[NÃO INFORMADO]`. Respostas
  posteriores da cliente prevalecem sobre hipóteses; o histórico contraditório é preservado
  e marcado como `HISTÓRICO` / `SUPERADA` / `RESOLVIDA`.
- Evolução incremental, uma etapa por vez. A ETAPA 02 só começa depois do encerramento da 01.
- Decisões, premissas e pendências ficam versionadas em `docs/`.
- Temas legais/regulatórios/fiscais (CAU, RRT, direitos autorais, LGPD, tributário) são
  marcados `[VALIDAR PROFISSIONALMENTE]` e nunca tratados como conclusão.
- **Uma publicação de portfólio no LinkedIn a cada etapa concluída** (anonimizada), em `docs/portfolio/`.

## Ferramentas de IA previstas

- **Claude Code** — construção e organização do projeto
- **ChatGPT** — planejamento, análise e documentação
- **Google Stitch** — prototipação e exploração de interfaces
- **Canva** — materiais visuais e apresentações
