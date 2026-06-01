/* ===================================================
   menu.js
   Marca no menu qual seção está visível na tela,
   adicionando a classe "ativo" no link correspondente.
=================================================== */

const secoes = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".menu a");

function marcarSecaoAtiva() {
  let atual = "";

  secoes.forEach(function (secao) {
    const topo = secao.offsetTop - 120;
    if (window.scrollY >= topo) {
      atual = secao.getAttribute("id");
    }
  });

  links.forEach(function (link) {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
}

window.addEventListener("scroll", marcarSecaoAtiva);
window.addEventListener("load", marcarSecaoAtiva);


/* ===================================================
   Scroll reveal: faz as seções aparecerem ao rolar.
=================================================== */

const blocos = document.querySelectorAll("main section");

blocos.forEach(function (bloco) {
  bloco.classList.add("revelar");
});

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
}, { threshold: 0.15 });

blocos.forEach(function (bloco) {
  observador.observe(bloco);
});
