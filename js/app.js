/* ============================================================
   app.js — Web Development · OrbitAlert
   Formulário | Quiz | Canvas | Tema | Slideshow
   ============================================================ */


/* ========== FORMULÁRIO COM VALIDAÇÃO ========== */

const form = document.getElementById('formulario-contato');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;

    form.querySelectorAll('[required]').forEach(function (campo) {
      const msgErro = campo.parentElement.querySelector('.msg-erro');
      let erro = !campo.value.trim();

      if (!erro && campo.type === 'email') {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim());
        if (!emailOk) {
          erro = true;
          if (msgErro) msgErro.textContent = 'Por favor, insira um e-mail válido.';
        }
      }

      campo.classList.toggle('campo-erro', erro);
      if (msgErro) msgErro.style.display = erro ? 'block' : 'none';
      if (erro) valido = false;
    });

    if (valido) {
      const aviso = document.getElementById('msg-sucesso');
      aviso.style.display = 'block';
      form.reset();
      setTimeout(function () { aviso.style.display = 'none'; }, 4000);
    }
  });

  form.querySelectorAll('[required]').forEach(function (campo) {
    campo.addEventListener('input', function () {
      campo.classList.remove('campo-erro');
      const msgErro = campo.parentElement.querySelector('.msg-erro');
      if (msgErro) msgErro.style.display = 'none';
    });
  });
}


/* ========== QUIZ (10 perguntas + resultado) ========== */

const perguntas = [
  {
    p: 'Qual API da NASA o OrbitAlert usa para monitorar o clima espacial?',
    ops: ['APOD', 'DONKI', 'EONET', 'EPIC'],
    c: 1,
  },
  {
    p: 'O que é uma tempestade geomagnética?',
    ops: [
      'Chuva de meteoros na atmosfera terrestre',
      'Perturbação no campo magnético da Terra causada pelo Sol',
      'Explosão de uma estrela distante',
      'Furacão atmosférico em Júpiter',
    ],
    c: 1,
  },
  {
    p: 'Qual escala mede a intensidade de tempestades geomagnéticas?',
    ops: ['Escala Richter', 'Escala Beaufort', 'Escala Kp', 'Escala Saffir-Simpson'],
    c: 2,
  },
  {
    p: 'O que é uma erupção solar (solar flare)?',
    ops: [
      'Explosão de energia na superfície do Sol',
      'Chuva de asteroides',
      'Aurora boreal artificial',
      'Apagão de satélites',
    ],
    c: 0,
  },
  {
    p: 'Qual fenômeno visual é causado por tempestades geomagnéticas?',
    ops: ['Eclipse solar', 'Chuva de estrelas', 'Arco-íris noturno', 'Aurora boreal / austral'],
    c: 3,
  },
  {
    p: 'Por que voos polares são afetados por atividade solar intensa?',
    ops: [
      'Falta de combustível em rotas polares',
      'Maior exposição à radiação em altas latitudes',
      'Problemas de pressurização da cabine',
      'Turbulência causada pelo vento solar',
    ],
    c: 1,
  },
  {
    p: 'O que significa a sigla CME?',
    ops: [
      'Computação em Missões Espaciais',
      'Centro de Monitoramento Espacial',
      'Ejeção de Massa Coronal',
      'Campo Magnético Estendido',
    ],
    c: 2,
  },
  {
    p: 'Qual ODS da ONU o OrbitAlert atende principalmente?',
    ops: [
      'ODS 1 – Erradicação da pobreza',
      'ODS 9 – Inovação e infraestrutura',
      'ODS 14 – Vida na água',
      'ODS 4 – Educação de qualidade',
    ],
    c: 1,
  },
  {
    p: 'Quais tecnologias compõem o sistema completo do OrbitAlert?',
    ops: [
      'Apenas HTML, CSS e JavaScript',
      'React, Node.js e MongoDB',
      'HTML/CSS/JS, Python, Arduino e API NASA DONKI',
      'Flutter, Django e Firebase',
    ],
    c: 2,
  },
  {
    p: 'Qual empresa opera mais de 6.000 satélites em órbita baixa?',
    ops: ['Blue Origin', 'Rocket Lab', 'SpaceX (Starlink)', 'Amazon Kuiper'],
    c: 2,
  },
];

let qi  = 0;
let pts = 0;
let sel = null;
const qBox = document.getElementById('quiz');

function renderPergunta() {
  if (!qBox) return;
  sel = null;
  const q   = perguntas[qi];
  const pct = Math.round((qi / perguntas.length) * 100);

  qBox.innerHTML =
    '<div class="quiz-barra-wrapper"><div class="quiz-barra" style="width:' + pct + '%"></div></div>' +
    '<p class="quiz-progresso">Pergunta ' + (qi + 1) + ' de ' + perguntas.length + '</p>' +
    '<p class="quiz-pergunta">' + q.p + '</p>' +
    '<ul class="quiz-opcoes">' +
      q.ops.map(function (op, i) {
        return '<li><button class="btn-opcao" data-i="' + i + '">' + op + '</button></li>';
      }).join('') +
    '</ul>' +
    '<button class="btn-proxima-quiz" disabled>Próxima →</button>';

  qBox.querySelectorAll('.btn-opcao').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sel = +btn.dataset.i;
      qBox.querySelectorAll('.btn-opcao').forEach(function (b, i) {
        b.disabled = true;
        b.classList.remove('selecionado');
        if (i === q.c)              b.classList.add('correta');
        else if (i === sel)         b.classList.add('errada');
      });
      qBox.querySelector('.btn-proxima-quiz').disabled = false;
    });
  });

  qBox.querySelector('.btn-proxima-quiz').addEventListener('click', function () {
    if (sel === q.c) pts++;
    qi++;
    qi < perguntas.length ? renderPergunta() : renderResultado();
  });
}

function renderResultado() {
  const pct = Math.round((pts / perguntas.length) * 100);
  const msg = pct >= 80
    ? 'Excelente! Você domina o clima espacial!'
    : pct >= 50
    ? 'Bom trabalho! Continue explorando o espaço.'
    : 'Continue estudando sobre clima espacial!';

  qBox.innerHTML =
    '<div class="quiz-resultado">' +
      '<h3>Resultado Final</h3>' +
      '<p class="quiz-pontos">' + pts + ' / ' + perguntas.length + '</p>' +
      '<p class="quiz-porcentagem">' + pct + '% de acerto</p>' +
      '<p class="quiz-mensagem">' + msg + '</p>' +
      '<button class="botao" id="btn-reiniciar">Tentar novamente</button>' +
    '</div>';

  document.getElementById('btn-reiniciar').addEventListener('click', function () {
    qi = 0; pts = 0;
    renderPergunta();
  });
}

if (qBox) renderPergunta();
