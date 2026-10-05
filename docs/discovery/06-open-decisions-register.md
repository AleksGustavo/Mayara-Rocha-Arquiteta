# 06 — Registro de Decisões Abertas (Open Decisions Register)

**Projeto:** Mayara Rocha Arquitetura — Website e Ecossistema Digital
**Etapa:** ETAPA 01 — Discovery do Negócio (encerramento)
**Atualizado em:** 08/09/2026
**Relacionado a:** [`05-discovery-findings.md`](05-discovery-findings.md) · [`07-stage-01-closure.md`](07-stage-01-closure.md)

> Este registro rastreia decisões **conhecidas como pendentes**. Nenhuma delas é `BLOQUEIO DE DISCOVERY` — o Discovery está encerrado. Elas são pendências controladas, bloqueios de lançamento ou correções técnicas.

## Categorias

| Categoria | Significado |
|---|---|
| `BLOQUEIO DE DISCOVERY` | Falta informação essencial para compreender o negócio. **(Nenhum item nesta categoria.)** |
| `PENDÊNCIA CONTROLADA` | Decisão conhecida como pendente, com momento futuro definido para resolução. |
| `BLOQUEIO DE LANÇAMENTO` | Não impede planejamento/desenvolvimento inicial, mas impede colocar a funcionalidade em produção. |
| `PENDÊNCIA TÉCNICA` | Correção técnica que não altera o entendimento atual do negócio. |

## Registro

| ID | Pendência | Categoria | Responsável | Resolver até | Impacto | Status |
|---|---|---|---|---|---|---|
| OD-001 | Formalização da licença/direitos de uso da planta vendida | `BLOQUEIO DE LANÇAMENTO` | Mayara + assessoria jurídica | Antes de publicar termos comerciais e antes do checkout em produção | Define o que o comprador pode/não pode fazer com o projeto; sem isso não há venda segura | `INTENÇÃO DEFINIDA — AGUARDANDO VALIDAÇÃO PROFISSIONAL` |
| OD-002 | Responsabilidade técnica / necessidade e momento de RRT na venda de projeto pronto e/ou adaptação | `BLOQUEIO DE LANÇAMENTO` | Mayara + CAU/assessoria | Antes do checkout em produção | Define quem responde tecnicamente pelo projeto vendido e construído | `A VALIDAR` `[VALIDAR PROFISSIONALMENTE]` |
| OD-003 | Pacote exato de arquivos entregue ao comprador (Q7) | `PENDÊNCIA CONTROLADA` | Mayara | Antes da especificação definitiva de entrega/download e antes do lançamento | Conteúdo da página do produto e implementação da entrega dependem disso; hoje só sabemos "arquivos disponíveis" (PDF, DWG, 3D, renders), não "arquivos incluídos" | `A DEFINIR PELA CLIENTE` |
| OD-004 | Limites comerciais dos "pequenos ajustes"/revisões (Q4) | `PENDÊNCIA CONTROLADA` | Mayara | Antes de fechar o escopo comercial do produto e os termos | Exemplos já confirmados (portas, disposição de mobiliário); faltam limites: nº de solicitações, revisões, prazo, o que vira serviço pago | `PARCIALMENTE DEFINIDA` |
| OD-005 | Política de cancelamento/reembolso/revisão do produto digital (Q8) | `BLOQUEIO DE LANÇAMENTO` | Mayara + assessoria jurídica | Antes de disponibilizar checkout e venda pública | Compra online de produto digital envolve direito de arrependimento / CDC | `A DEFINIR` `[VALIDAR PROFISSIONALMENTE]` |
| OD-006 | Termos de uso / contrato de licença do produto digital | `BLOQUEIO DE LANÇAMENTO` | Mayara + assessoria jurídica | Antes do checkout em produção | Documento que vincula juridicamente a intenção comercial de OD-001 | `A PRODUZIR` `[VALIDAR PROFISSIONALMENTE]` |
| OD-007 | Emissão fiscal do produto digital e enquadramento tributário | `BLOQUEIO DE LANÇAMENTO` | Mayara + contador | Antes do checkout em produção | Nota fiscal, impostos e regime aplicável à venda de produto digital | `A VALIDAR` `[VALIDAR PROFISSIONALMENTE]` |
| OD-008 | Tratamento de dados pessoais dos compradores (LGPD) | `BLOQUEIO DE LANÇAMENTO` | Equipe do projeto + assessoria jurídica | Antes do checkout em produção | Coleta de dados no cadastro/checkout e no chat pós-compra | `A DEFINIR` `[VALIDAR PROFISSIONALMENTE]` |
| OD-009 | Autorizações formais de publicação do portfólio | `PENDÊNCIA CONTROLADA` | Mayara | Antes de publicar qualquer projeto específico no site/redes | Sem autorização, nenhum projeto do acervo (>10) pode ser publicado com segurança | `ACEITA SOLICITAR — AINDA NÃO OBTIDAS` |
| OD-010 | Escolha do gateway/provedor de pagamento | `PENDÊNCIA CONTROLADA` | Equipe do projeto + Mayara | Antes do desenvolvimento do checkout | Requisito de negócio já definido: suportar **Pix, cartão e boleto** | `REQUISITO DEFINIDO — PROVEDOR A ESCOLHER` |
| OD-011 | Chat de dúvidas pós-compra no site | `PENDÊNCIA CONTROLADA` | Equipe do projeto | Antes do desenvolvimento da área pós-compra | Requisito candidato vindo da Q5; ferramenta/arquitetura a decidir nas etapas técnicas | `REQUISITO CANDIDATO` |
| OD-012 | Ramificação condicional do Google Forms (`create-discovery-form.gs`) | `PENDÊNCIA TÉCNICA` | Equipe do projeto | Antes de reutilizar o formulário para outra coleta | A Seção 8B apareceu mesmo com "já no lançamento" selecionado. **Causa:** `PageBreakItem.setGoToPage` vale ao chegar no page break vindo da página anterior; o script o aplicava na 8A em vez da 8B. | `CORRIGIDA NO SCRIPT` (23/10/2026 — fix/od-012; formulário já respondido não é afetado; testar no Forms real ao reutilizar) |

## Notas

- **OD-001 vs Q4:** a intenção "sem alteração livre pelo comprador" (OD-001) **não** impede que o comprador **solicite pequenos ajustes à própria Mayara** dentro das regras do produto (OD-004). São coisas diferentes.
- **Q7 e Q8** (OD-003 e OD-005) foram deixadas em aberto **por decisão consciente da cliente**. Não são falhas de Discovery e **não bloqueiam** a ETAPA 02.
- Itens `BLOQUEIO DE LANÇAMENTO` podem e devem ser encaminhados **em paralelo** às próximas etapas de planejamento — só não podem estar pendentes quando a venda for ao ar.
