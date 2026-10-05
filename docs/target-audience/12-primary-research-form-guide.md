# ETAPA 02-E — Guia da Pesquisa Primária com Público Real (Google Forms)

**Projeto:** Mayara Rocha Arquitetura — Website e Ecossistema Digital
**Subetapa:** ETAPA 02-E — Pesquisa Primária / Voice of Customer (VoC)
**Documento:** `docs/target-audience/12-primary-research-form-guide.md`
**Script:** [`scripts/google-forms/create-stage-02e-public-research-form.gs`](../../scripts/google-forms/create-stage-02e-public-research-form.gs)
**Função a executar:** `createStage02EPublicResearchForm`
**Data:** 23/09/2026
**Status:** formulário **preparado, ainda não executado nem distribuído**. Nenhuma resposta foi coletada ou analisada.

> **Natureza da pesquisa:** exploratória, com amostra de conveniência. **Não** é estatisticamente representativa e seus resultados **não** devem ser apresentados como retrato de toda a população regional.

---

## 1. Objetivo da pesquisa

Ouvir diretamente **pessoas que estão construindo, reformando, procurando terreno ou planejando iniciar esse processo** — o lado de quem compra —, para testar hipóteses que a ETAPA 02 só conseguiu apoiar com evidências indiretas (percepção retrospectiva da Mayara, sites de concorrentes e estatísticas nacionais amplas).

A pesquisa **não** pressupõe interesse em planta pronta: o título do formulário é neutro, a dor é perguntada de forma aberta antes de qualquer lista, e o conceito de planta pronta só é apresentado no meio do formulário, de forma condicional e sem prometer entregáveis ainda não definidos comercialmente.

## 2. Hipóteses testadas

> Hipóteses do contexto da ETAPA 02 (`10-target-audience-final.md`). São **testadas, não impostas** ao participante, e **nenhum resultado** é antecipado aqui.

| ID | Hipótese a testar | Perguntas que a testam |
|---|---|---|
| HV-01 | Existe interesse real em planta pronta entre quem está construindo/reformando | P13, P14, P17, P18 |
| HV-02 | A compra 100% online é aceitável, ou o contato humano é necessário antes | P14, P16, P18 |
| HV-03 | Há descompasso entre o tamanho de casa desejado e o orçamento, e baixa segurança para estimar metragem | P6, P7, P8 |
| HV-04 | As dúvidas recorrentes são preço, prazo, processo, pagamento, aprovação/documentação e execução | P6, P7, P9, P12, P15, P16 |
| HV-05 | O perfil "primeira construção, com terreno, buscando economia/rapidez" é o mais receptivo a planta pronta | P1, P2, P5 × P14 (cruzamento na análise) |
| HV-06 | A faixa imaginada (R$ 500–1.500) é percebida como aceitável | P19–P22 (espontâneo) e P23 (só depois) |
| HV-07 | Um catálogo só em estilo contemporâneo pode restringir a demanda | P24, P24A, P24B |
| HV-08 | Imagens 3D/renders influenciam a decisão | P25, P16, P27 |
| HV-09 | Há interesse em interiores, fachada, 3D e projeto personalizado como complemento | P26, P14 (opção 3), P17 (opção 4) |
| HV-10 | Pequenos ajustes são valorizados (e com quem prefeririam resolvê-los) | P17, P16, P26 |
| HV-11 | Confiança depende de itens específicos (portfólio, registro, clareza do pacote, política de uso/reembolso) | P12, P15, P16, P27, P28 |
| HV-12 | Canais e linguagem de busca das pessoas (para SEO/conteúdo) | P10, P11, P31 |

## 3. Quem deve responder

- **Pessoas físicas**, maiores de 18 anos, que estejam **construindo, reformando/ampliando, com terreno e planejando construir, procurando terreno, ou que tenham comprado/estejam comprando um imóvel e pretendam fazer obras/adaptações ou planejar os ambientes** (opção acrescentada — ver seção 6).
- **Também** quem só está pesquisando, sem decisão definida (`P1`) — útil, mas **separado** por horizonte temporal (`P2`) na análise.
- **Geografia:** não restringida no formulário. A cidade (`P4`) é coletada para permitir separar Leme/Araras/Pirassununga e eixo próximo de outras localidades.

## 4. Quem não é o foco

- Quem responde "Nenhuma dessas situações" em `P1`: vai para uma página curta de encerramento (registrada, **não descartada silenciosamente**) e não vê o resto.
- Projetos **comerciais/corporativos** (o formulário é residencial).
- **Profissionais do setor** (arquitetos, engenheiros, corretores) respondendo como profissionais: o formulário **não tem** pergunta que os identifique. Se algum se identificar em texto livre, analisar à parte. `P31` mostra *por qual canal* a pessoa chegou, não *quem ela é*.
- **Menores de 18 anos** (`P29`, opcional): excluir da análise e tratar conforme orientação profissional (seção 16).
- Preferencialmente **não** depender só de quem já segue a Mayara (viés — seção 12).

---

## 5. Estrutura do formulário

**18 páginas** no total (o respondente qualificado vê **15 a 17**). **38 itens** de pergunta no script; **26 obrigatórios**, **12 opcionais**.

| # | Página (título exibido) | Perguntas | Condição / ramificação |
|---|---|---|---|
| 1 | *(inicial)* apresentação + consentimento | P0 | "Não concordo" → **envia** com agradecimento |
| 2 | Seu momento | P1 | "Nenhuma dessas situações" → página 18 |
| 3 | Seu projeto | P2, P3, P4, P5 | — |
| 4 | Sua maior preocupação | P6 | **Sozinha** (dor aberta antes de qualquer lista) |
| 5 | Outros fatores | P7, P8, P9 | — |
| 6 | Como você procuraria | P10, P11, P12 | — |
| 7 | Projetos residenciais prontos | P13, P14, P15 | Texto neutro do conceito; P15 (aberta) fica **antes** da lista de confiança |
| 8 | Confiança e forma de compra | P16, P17, P18 | — |
| 9 | Percepção de preço | P19, P20, P21, P22 | Aviso "não é preço final"; **nenhuma faixa exibida** |
| 10 | Uma última pergunta sobre preço | P23 | **Página separada**, só depois das quatro anteriores |
| 11 | Estilo da casa | P24 | "Sim" → página 12; demais → página 13 |
| 12 | Estilo | P24A, P24B | Só se P24 = Sim |
| 13 | Visualização e serviços | P25, P26 | — |
| 14 | Como você decide | P27, P28 | — |
| 15 | Sobre você | P29, P30, P31 | P31 obrigatória (viés de amostra) |
| 16 | Conversa de aprofundamento (opcional) | P32 | "Não" → **envia**; "Sim"/"Talvez" → página 17 |
| 17 | Contato (opcional) | P32A, P32B | Só se P32 = Sim/Talvez; depois **envia** |
| 18 | Obrigado! | P1D (opcional) | Só se P1 = Nenhuma dessas situações |

### Tamanho e tempo

| Métrica | Valor |
|---|---|
| Itens vistos por participante qualificado | **33 a 37** (33 no caminho mais curto; +2 se P24 = Sim; +2 se aceitar entrevista) |
| Obrigatórias vistas | **25** (26 se P24 = Sim, por causa de P24A) |
| "Perguntas efetivas" (obrigatórias sem contar o consentimento P0 e o convite P32) | **23–24** — dentro da preferência de ~18–24 |
| Opcionais | P9, P19–P22, P24B, P28, P29, P30, P32A, P32B, P1D |
| Tempo estimado | **5–8 min** (5–7 respondendo só o obrigatório) — **é estimativa; medir no piloto** |

> **Transparência:** a lista de perguntas especificada resulta em mais itens do que a preferência de 18–24. O número só fica dentro da meta considerando **obrigatórias efetivas** e o fato de que **11 dos itens são opcionais**. Se o piloto passar de ~8 min, ver "Como enxugar" na seção 21.

## 6. Perguntas e finalidade de cada bloco

O texto completo, o tipo, a obrigatoriedade, a lógica e a **variável de segmentação** de cada pergunta ficam também na aba **"Dicionário"** da planilha gerada pelo script (código → pergunta → finalidade).

| Bloco | Perguntas | Finalidade | Como evita indução |
|---|---|---|---|
| Consentimento | P0 | Participação voluntária e uso agregado (LGPD) | Título neutro; sem citar "planta pronta" |
| Triagem e momento | P1–P5 | Separar quem age agora de quem só pesquisa; horizonte, cidade, primeira experiência | Horizonte temporal separa intenção de curiosidade |
| Dor espontânea | P6, depois P7–P9 | Capturar a preocupação **com as palavras da pessoa** antes das alternativas; testar segurança para estimar metragem × orçamento | P6 em página própria, antes de qualquer lista |
| Busca | P10–P12 | Canais, **linguagem espontânea** (SEO/conteúdo) e o que verificam antes de escolher | P11 sem exemplos |
| Conceito | P13–P18 | Conhecimento prévio, reação, confiança, ajustes, compra online × contato | Redação condicional ("Imagine que…"); P15 aberta antes da lista P16 |
| Preço | P19–P23 | Percepção de preço (Van Westendorp adaptado) e reação à faixa R$ 500–1.500 | Faixa só na P23, em página separada, **depois** das quatro espontâneas |
| Estilo e serviços | P24–P26 | Estilo (espontâneo → estruturado), importância de 3D, serviços de interesse | P24A aberta antes das opções P24B |
| Critérios | P27, P28 | Top 3 de fatores decisivos + objeção aberta | P28 aberta e opcional |
| Perfil mínimo | P29–P31 | Faixa etária (opcional), quem decide (opcional), **origem** (obrigatória, controle de viés) | Sem renda, sem dados pessoais |
| Entrevista | P32, P32A, P32B | Convite opcional; contato só de quem aceitou | Seção separada e opcional |
| Encerramento curto | P1D | Registrar a origem de quem não se enquadra | Opcional |

**Sobre o Van Westendorp:** é uma ferramenta **exploratória** de percepção de preço; **não determina preço isoladamente** e **não define preço final**. As quatro perguntas seguem a ordem *barato demais → boa compra → caro → caro demais*. Elas são **opcionais** (quem não tem referência pode pular; `P23` tem a opção "Não tenho referência"). Na análise, usar só respostas com os quatro valores preenchidos e em ordem coerente (barato demais < boa compra < caro < caro demais); descartar as incoerentes.

## 7. Lógica condicional

Implementada com recursos **nativos** do Google Forms/`FormApp`:

| Regra | Como está implementada |
|---|---|
| P0 "Não concordo" → encerrar | Alternativa com navegação `SUBMIT` (envia registrando só P0 e mostra o agradecimento) |
| P1 "Nenhuma dessas situações" → encerramento curto | Alternativa com navegação para a página 18; as demais seguem em frente |
| P24 "Sim" → P24A/P24B | "Sim" segue para a página 12; as outras duas alternativas **pulam** para a página 13 |
| P32 "Não" → concluir | Alternativa `SUBMIT`; "Sim"/"Talvez" → página 17 (contato) |
| Página 17 → enviar (sem cair na página 18) | Regra de página: ao chegar na página 18 **vindo da 17**, o formulário envia |

**Detalhes técnicos verificados na documentação oficial do `FormApp`:**
- A navegação por resposta existe para **múltipla escolha** (`createChoice(valor, PageBreakItem | PageNavigationType)`). Por isso as **perguntas ramificadas ficam sozinhas na sua página** (P0, P1, P24, P32).
- `PageBreakItem.setGoToPage(...)` vale "**depois de concluir a página anterior a este page break** (ao chegar nele por progressão linear)". Não significa "para onde ir depois desta página". Este script o usa **uma única vez** (página 18 → envia).
- Navegação **não tem efeito na última página** do formulário.

> **Nota técnica para manutenção:** esse mesmo detalhe de semântica provavelmente explica o comportamento observado no formulário de Discovery da ETAPA 01 (seção "resumida" de plantas aparecendo depois da "detalhada" — pendência técnica OD-012): o script `create-discovery-form.gs` aplica `setGoToPage` na página 8A, quando deveria aplicá-lo na 8B. A correção (poucas linhas) foi aplicada em **PR separada** (`fix/od-012-discovery-form-branching`), sem alterar documentos da ETAPA 01. O formulário de Discovery já respondido pela Mayara **não é afetado** (foi gerado com a versão antiga do script).

**Verificação feita nesta execução:** o script foi executado contra um **simulador local estrito** (só aceita métodos documentados do `FormApp`/`SpreadsheetApp`) que reproduz a regra de navegação acima. Resultado: recusa → envia na página 1; desqualificado → páginas 1, 2 e 18; qualificado sem opcionais → 15 páginas / 33 itens; qualificado com estilo "Sim" e entrevista "Sim" → 17 páginas / 37 itens, enviando ao fim do contato **sem** mostrar a página 18. **Isso não substitui o teste no Google Forms real** (seção 20), que é obrigatório antes de distribuir.

**Se alguma ramificação não funcionar no teste real** (ajuste manual mínimo, no editor do Forms): abra a pergunta ramificada → ⋮ → "Ir para a seção com base na resposta" e reaponte a alternativa; para a regra da página 17, abra a seção "Contato (opcional)" → rodapé "Depois da seção 17" → "Enviar formulário".

---

## 8. Como executar o Apps Script

1. Acesse **https://script.google.com/** com a conta Google onde o formulário deve ficar.
2. **Novo projeto** → apague o `Code.gs` → cole **todo** o conteúdo de `scripts/google-forms/create-stage-02e-public-research-form.gs` → salve (`Ctrl+S`).
3. Confirme `CONFIG.CONFIRM_CREATION = true`.
4. No seletor de função escolha **`createStage02EPublicResearchForm`** e clique em **Executar**.
5. Autorize as permissões (seção 9). A execução recomeça sozinha.
6. Abra **Ver → Registros** e copie as URLs (seção 10).
7. **Não distribua ainda** — siga as seções 19 e 20 (teste e piloto).
8. Depois de gerar, volte `CONFIRM_CREATION` para `false`. **Cada execução cria um formulário e uma planilha novos**; nada existente é alterado ou apagado.

## 9. Permissões do Google

Na primeira execução: **Revisar permissões** → escolha a conta → "O Google não verificou este app" → **Avançado** → **Acessar (não seguro)** → **Permitir**.

O script é seu e roda na sua conta. Ele pede acesso ao **Google Forms** (criar o formulário) e ao **Google Sheets/Drive** (criar a planilha de respostas). Não usa chaves, tokens, APIs externas nem chamadas HTTP; **não envia** o formulário a ninguém e **não publica** respostas.

## 10. Como localizar as URLs geradas

**Ver → Registros** exibe:

```text
Título.............: Pesquisa sobre construção, reforma e projetos residenciais
ID do formulário...: ...
URL de edição......: https://docs.google.com/forms/d/.../edit
URL pública (resposta): https://docs.google.com/forms/d/e/.../viewform
Planilha (ID)/(URL): ...
Páginas: 18 | Perguntas: 38 | Obrigatórias: 26
```

- **URL de edição** → só para você (revisar/testar).
- **URL pública** → a única que vai para os participantes (depois do piloto).
- **Planilha** → respostas + aba **Dicionário**. Se o log disser que a planilha não foi criada, vincule manualmente: formulário → aba **Respostas** → ícone verde de planilha → **Criar planilha**.

## 11. Configurações manuais necessárias

O que o script **não** controla (o `FormApp` não expõe):

- [ ] **Conferir** *Configurações → Respostas*: **não** coletar e-mails, **não** limitar a 1 resposta, **não** exigir login. (O script já configura e-mail = desligado, 1 resposta = desligado, edição posterior = desligada, link "enviar outra resposta" = oculto, barra de progresso = ligada.)
- [ ] Se a conta for **Google Workspace**: conferir que o formulário **não** está restrito à organização (opção de restringir a usuários da organização deve estar **desmarcada**), senão pessoas de fora não conseguem responder.
- [ ] *(Recomendado)* **Embaralhar a ordem das opções** em `P12`, `P16` e `P27` (reduz viés de posição). Não embaralhar `P7`/`P26` sem revisar, porque contêm "Nenhum desses" (o Forms mantém apenas "Outro" no fim).
- [ ] Ajustar **tema/cores** (opcional).
- [ ] Conferir que a **planilha** está vinculada e **não** compartilhada publicamente (ela conterá contatos opcionais).
- [ ] *(Opcional)* Renomear o arquivo no Drive com um nome interno. O título exibido ao respondente é o título do formulário.
- [ ] *(Opcional)* Ativar notificação por e-mail de novas respostas. Atenção: o e-mail pode trazer o contato deixado na `P32B`.

---

## 12. Como distribuir

> Este guia **não** executa nem cria campanhas. Distribuição só **depois** do piloto e do congelamento da versão.

Diversificar os canais — **evitar depender só de seguidores da Mayara**:

- grupos locais de construção/reforma/imóveis (Leme, Araras, Pirassununga e arredores);
- WhatsApp e Facebook (grupos e contatos);
- Instagram (perfis pessoais, stories, comunidades locais);
- contatos e indicações de amigos/familiares;
- corretores/imobiliárias;
- lojas de materiais de construção;
- engenheiros/profissionais relacionados (para repassar a clientes);
- eventual mídia paga de **recrutamento** (apenas para atrair respondentes, sem vender nada).

**Como divulgar:** chamada neutra, por exemplo "Pesquisa rápida (5–8 min) sobre construção e reforma de casas". **Não** escrever "pesquisa sobre plantas prontas", **não** explicar a estratégia da Mayara, **não** dizer o que se espera confirmar. Registrar a origem pela `P31` (e pela `P1D` para quem não se enquadra).

## 13. Como reduzir viés

- Não divulgar como "pesquisa sobre plantas prontas".
- Não revelar previamente a estratégia da Mayara nem o problema que se espera confirmar.
- Distribuir em **mais de um canal** e comparar as respostas **por canal** (`P31`).
- Analisar **separadamente**: intenção **em até 12 meses** × intenção distante (`P2`); **primeira construção** × experiência anterior (`P5`); quem **já conhecia** planta pronta × quem conheceu pelo formulário (`P13`).
- **Não misturar** respostas de quem foi desqualificado (`P1`) com as qualificadas.
- **Não interpretar interesse declarado como compra real.**
- **Não generalizar** uma amostra de conveniência para toda a população.
- Conferir, na análise, respostas incoerentes ou repetidas (não há login/e-mail, então duplicatas não são detectáveis automaticamente).

## 14. Meta de amostra

| Meta | Valor |
|---|---|
| Mínimo útil | **30 respostas qualificadas** |
| Preferencial | **50+ respostas qualificadas** |
| Entrevistas qualitativas posteriores | **5–8 participantes** |

Isso **não** torna a amostra estatisticamente representativa. **Qualidade da triagem e diversidade de origem importam tanto quanto o número bruto.** Regra prática (heurística, não estatística): não interpretar subgrupos com poucas respostas (por exemplo, menos de ~8–10 por célula) — usar só como indício qualitativo.

## 15. Limitações metodológicas

- **Amostra de conveniência e autosseleção:** quem responde tende a ter mais interesse/opinião.
- **Intenção declarada ≠ comportamento:** respostas sobre "compraria" são hipotéticas.
- **Van Westendorp** exploratório, com amostra pequena: dá faixas indicativas, não preço.
- **Viés de ordem/posição** das opções: só mitigável manualmente (embaralhar; seção 11).
- **`P27` é um Top 3 sem ordem** (checkbox com exatamente 3 — validação nativa). Não captura 1º/2º/3º. Uma grade de ranking seria pesada no celular; se a ordem for indispensável, é preciso decisão explícita e ajuste manual.
- **"Nenhum desses"** (`P7`, `P26`) pode ser marcado junto com outras opções — o Forms não impede; limpar na análise.
- **Sem identificação de profissionais do setor** entre os respondentes.
- **Sem login/e-mail:** não há controle de duplicidade nem de bots.
- **Entrada numérica** (P19–P22) depende da localidade do Forms: orientar "somente números, sem R$, pontos ou vírgulas". Um valor como "1.200" pode ser lido de forma diferente conforme a configuração — checar e limpar.
- **Uma única mensagem de confirmação** para todos os finais (inclui quem recusou ou foi desqualificado): o `FormApp` não permite mensagens por caminho.
- **Progresso "Página X de 18"** conta as páginas condicionais; o respondente vê menos.
- **Mobile:** texto e listas foram pensados para celular, mas o teste real é obrigatório.

## 16. LGPD / privacidade

> **Este texto é um MODELO e precisa de validação profissional** (`[VALIDAR PROFISSIONALMENTE]`). Não é parecer jurídico.

O formulário informa, na abertura: finalidade de pesquisa e desenvolvimento do projeto; participação voluntária; possibilidade de fechar antes de enviar; uso agregado das respostas; contato opcional apenas no final; ausência de documentos e dados sensíveis. Não pede: CPF, RG, endereço completo, renda, telefone obrigatório ou nome obrigatório.

**Pontos a validar profissionalmente antes da coleta oficial:**
- identificação do **responsável pela pesquisa** e um **canal de contato** para dúvidas/solicitações do participante (não constam do texto do formulário);
- **prazo de guarda** e descarte dos dados (especialmente os contatos);
- tratamento de **menores de 18 anos** (a opção existe em `P29`; recomenda-se excluir esses registros);
- adequação da **base legal** e do texto de consentimento.

**Sobre "anonimato":** o formulário **não coleta e-mail nem exige login**, portanto as respostas **não exigem identificação** — exceto se a pessoa **optar** por deixar contato ao final. Por isso o texto **não promete anonimato absoluto**: respostas de texto livre podem conter informações pessoais espontâneas.

**Sobre a separação dos contatos:** o Google Forms grava `P32A`/`P32B` **na mesma linha** das demais respostas; **não há separação técnica** sem uma arquitetura adicional. Procedimento recomendado (manual): (1) restringir o acesso à planilha bruta; (2) criar uma **cópia de análise** sem as colunas `P32A`/`P32B`; (3) usar os contatos **só** para convidar para a entrevista; (4) apagar os contatos ao fim do prazo definido.

## 17. Como selecionar participantes para entrevistas

Entre quem marcou "Sim" ou "Talvez" em `P32` e deixou contato, escolher **5–8** buscando **diversidade**, não os mais entusiasmados:

- momento do projeto (`P1`) e horizonte (`P2` — priorizar quem age em até 12 meses);
- primeira construção × experiência anterior (`P5`);
- cidade (`P4`) e canal de origem (`P31`);
- reações diferentes ao conceito (`P14`/`P18`) — **incluir céticos** ("não compraria online", "prefiro projeto personalizado");
- respostas abertas ricas (`P6`, `P15`, `P28`).

Recomendação curta: conversas de ~15 min, convite **só** relacionado à pesquisa, sem venda. O roteiro completo **não** faz parte desta execução.

## 18. O que NÃO concluir a partir da pesquisa

- Que os resultados representam toda a população (ou toda a região).
- Que "X% das pessoas comprariam planta pronta" — isso seria intenção declarada de uma amostra de conveniência.
- O **tamanho de mercado** ou a **demanda** por plantas prontas.
- O **preço final** (o Van Westendorp é só um indício de percepção).
- **Taxa de conversão**, CAC ou retorno de qualquer canal.
- Perfis demográficos ou **personas** — dados demográficos são mínimos e opcionais. Personas pertencem à **ETAPA 03** e só com dados reais.
- Que quem marcou interesse em interiores/fachada/3D **vai** contratar.
- Nada sobre aspectos **legais/regulatórios** (RRT, licença, reembolso etc. seguem `[VALIDAR PROFISSIONALMENTE]`).

---

## 19. Preparação para a análise futura

A planilha permite segmentar por: momento do projeto (`P1`), horizonte temporal (`P2`), cidade (`P4`), primeira experiência (`P5`), canal de origem (`P31`), conhecimento prévio de planta pronta (`P13`), predisposição à compra online e necessidade de contato humano (`P14`, `P18`), percepção de preço (`P19`–`P23`), estilo (`P24`–`P24B`), serviços de interesse (`P26`), Top 3 de critérios (`P27`) e aceite para entrevista (`P32`). A aba **Dicionário** traz a coluna "Variável de segmentação" para cada pergunta. **Nenhuma resposta é analisada nesta execução.**

## 20. Teste e piloto antes da distribuição (obrigatório)

**Não distribuir sem cumprir esta lista.**

1. [ ] Executar o script e abrir o formulário **como respondente** (janela anônima).
2. [ ] Testar **todas** as ramificações: recusar o consentimento; "Nenhuma dessas situações"; P24 = Sim / "algumas referências" / "Ainda não"; P32 = Sim / Talvez / Não. Confirmar que quem aceita o contato **é enviado sem ver** a página "Obrigado!" de desqualificação.
3. [ ] Responder **pelo celular** (rolagem, toque, escalas, campo "Outro").
4. [ ] Conferir a **planilha**: respostas caem na aba de respostas; aba **Dicionário** presente e coerente.
5. [ ] Testar **valores de preço**: número normal (800), "0", negativo, texto ("abc"), "1.200", "1200".
6. [ ] Testar limites: `P7` com 6 opções (deve bloquear) e `P27` com 2 e com 4 opções (deve bloquear).
7. [ ] Revisar **todos os textos** (ortografia, tom, ausência de indução).
8. [ ] Conferir que a **faixa R$ 500–1.500** aparece **somente** na `P23`.
9. [ ] **Cronometrar** o preenchimento.
10. [ ] Fazer um **piloto com 3–5 pessoas** reais do perfil; anotar dúvidas e ambiguidades.
11. [ ] Corrigir e **congelar** a versão.
12. [ ] Só então **iniciar a coleta oficial**.

**Identificação do piloto:** peça aos participantes do piloto para escolher **"Outro" em `P31` e escrever `PILOTO`**; nos seus próprios testes, use `TESTE`. Registre a data/hora do congelamento. **Respostas do piloto e dos testes devem ser identificadas e removidas da análise oficial** se o formulário sofrer mudança relevante depois do piloto.

## 21. Como enxugar se o piloto passar de ~8 minutos

Ordem sugerida (do menos ao mais prejudicial para as hipóteses): `P9` (opcional, sobrepõe `P15`) → `P29` e `P30` (opcionais) → `P3` → `P12` (sobrepõe `P16`) → tornar `P24B` inexistente. Editar no editor do Forms ou alterar o script e **gerar um formulário novo** (o piloto anterior deixa de valer).

## 22. Decisões e desvios de implementação (transparência)

| # | Decisão | Motivo |
|---|---|---|
| 1 | Script em `scripts/google-forms/` (o prompt citava `scripts/`) | Manter junto dos outros geradores de formulário do repositório |
| 2 | `P1` ganhou a opção "Comprei ou estou comprando um imóvel e pretendo fazer obras, adaptações ou planejar os ambientes" | Sem ela, quem compra imóvel pronto para adaptar/decorar (público de reforma/interiores) seria desqualificado; alinha à intenção de pesquisar quem "compra casas, terrenos, constrói ou reforma". **Pode ser removida** |
| 3 | `P1`, `P24` e `P32` em páginas próprias; `P0` na página inicial | A navegação por resposta é confiável em múltipla escolha isolada na página |
| 4 | `P6` sozinha; `P15` antes de `P16`; `P23` em página separada; `P24A` antes de `P24B` | Perguntar primeiro de forma aberta e evitar ancoragem de preço |
| 5 | `P27` como checkbox com **exatamente 3** (validação nativa) | Top 3 simples no celular; sem ordem (limitação registrada) |
| 6 | `P19`–`P22` **opcionais** | Participação voluntária; `P23` já prevê "Não tenho referência" |
| 7 | `P11` **obrigatória** | Linguagem espontânea de busca é hipótese central (aceita "não sei") |
| 8 | Aba **Dicionário** na planilha; pergunta opcional `P1D` na página de encerramento | Facilitar a análise futura e medir origem de quem não se enquadra |
| 9 | Acentuação completa neste formulário | Formulário público; o anterior foi gerado sem acentos |
| 10 | `setRequireLogin` **não** é chamado (método descontinuado) | Formulários novos já não exigem login; sem e-mail coletado |

## 23. Próxima etapa

1. Executar o script, revisar o formulário, testar (seção 20), fazer o **piloto** e congelar.
2. Distribuir (seção 12) e coletar até a meta (seção 14).
3. **Prompt de análise** dedicado (a criar): segmentar por horizonte/primeira experiência/canal, tratar preço com Van Westendorp, comparar hipóteses e escolher entrevistados. Resultado em um novo documento em `docs/target-audience/`.

> **Status:** a ETAPA 02 foi formalmente encerrada em `11-stage-02-closure.md` (17/09/2026); esta subetapa 02-E a **reabre para validação complementar** com o público real. Caso os resultados alterem a segmentação, isso será registrado em novo documento (os documentos `10` e `11` **não** foram alterados nesta execução). A **ETAPA 03 — Personas** permanece **não iniciada**.
