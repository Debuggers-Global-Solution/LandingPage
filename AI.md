# AI.md — Uso de Inteligência Artificial no Projeto
**Projeto:** OrbitAlert — Equipe Debuggers (Turma 1ESPG-26)
**Disciplinas:** Front-End Design e Web Development
**Ferramenta de IA utilizada:** Claude (Anthropic)


## Interação 1 — Ajustes finais de design
- **O que foi solicitado:** Pequenas melhorias visuais sem poluir a interface.
- **O que a IA retornou:** Um selo de status com animação suave no topo e um efeito
de entrada (scroll reveal) nas seções, ambos em CSS/JS simples.
- **O que foi alterado/rejeitado e por quê:** Mantivemos apenas esses dois detalhes,
descartando sugestões mais pesadas, para preservar a clareza exigida pelo professor.


## Interação 2 — Comentários no código
- **O que foi solicitado:** Adicionar comentários explicativos ao código JavaScript e CSS do projeto.
- **O que a IA retornou:** Comentários de seção nos arquivos `js/app.js` (separando troca de tema, slideshow, formulário e quiz) e blocos de comentário nos arquivos CSS identificando cada módulo de estilo.
- **O que foi alterado/rejeitado e por quê:** Mantivemos todos os comentários sugeridos, pois facilitam a leitura e manutenção do código pela equipe.


## Interação 3 — Canvas de estrelas animadas
- **O que foi solicitado:** Adicionar uma animação de estrelas no fundo da página, temática para o projeto espacial.
- **O que a IA retornou:** Um elemento `<canvas>` fixo no fundo da tela (`z-index: -1`) com 200 estrelas geradas aleatoriamente, cada uma piscando com ritmo próprio via função seno com fase e velocidade individuais. A animação usa `requestAnimationFrame` para ser fluida e se adapta ao redimensionamento da janela.
- **O que foi alterado/rejeitado e por quê:** Mantivemos a implementação completa. O número de estrelas (200) e a intensidade de brilho foram considerados adequados para não poluir a leitura do conteúdo.


## Interação 4 — Tooltips em termos técnicos
- **O que foi solicitado:** Adicionar tooltips explicativos ao passar o mouse em termos técnicos do site.
- **O que a IA retornou:** Uso do atributo `data-tooltip` em `<span>` ao redor de quatro termos: "ejeções de massa coronal", "API DONKI", "GPS" e "Edge Computing". O tooltip é exibido via CSS puro com `::after` e `content: attr(data-tooltip)`, sem JavaScript adicional.
- **O que foi alterado/rejeitado e por quê:** Mantivemos os quatro termos escolhidos. A solução em CSS puro foi preferida por ser mais simples e não depender de bibliotecas externas.


## Observações da equipe
- Todo o código foi lido, testado e validado por nós antes da entrega.
- As decisões de tema (OrbitAlert / clima espacial), conteúdo das seções, paleta de
cores e identidade visual partiram da equipe.
- A IA foi utilizada para revisar boas práticas, não substituindo o entendimento do     grupo sobre HTML, CSS e JavaScript.
