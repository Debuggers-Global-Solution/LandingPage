/* ============================================================
   app.js — Web Development · OrbitAlert
   Watermark | Canvas | Tema | Slideshow | Formulário | Quiz
   ============================================================ */


/* ========== WATERMARK RODAPÉ ========== */

function ajustarWatermark() {
  var rodape = document.querySelector('.rodape');
  if (!rodape) return;
  var temp = document.createElement('span');
  temp.style.position    = 'absolute';
  temp.style.visibility  = 'hidden';
  temp.style.fontFamily  = 'Manrope, sans-serif';
  temp.style.fontWeight  = '700';
  temp.style.fontStyle   = 'italic';
  temp.style.letterSpacing = '-0.045em';
  temp.style.whiteSpace  = 'nowrap';
  temp.style.fontSize    = '100px';
  temp.textContent = 'OrbitAlert';
  document.body.appendChild(temp);
  var fontSize = (rodape.offsetWidth / temp.offsetWidth) * 100 * 0.97;
  document.body.removeChild(temp);
  var bottom = Math.max(0, (rodape.offsetHeight - fontSize) / 2) - 34;
  document.documentElement.style.setProperty('--rodape-watermark-size', fontSize + 'px');
  document.documentElement.style.setProperty('--rodape-watermark-bottom', bottom + 'px');
}

document.fonts.ready.then(ajustarWatermark);
window.addEventListener('resize', ajustarWatermark);


/* ========== CANVAS ESTRELAS ========== */

const canvas = document.getElementById('canvas-estrelas');
const ctx    = canvas.getContext('2d');
let estrelas = [];

function ajustarCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function gerarEstrelas(qtd) {
  estrelas = [];
  for (var i = 0; i < qtd; i++) {
    estrelas.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.4 + 0.3,
      vel:  Math.random() * 0.006 + 0.002,
      fase: Math.random() * Math.PI * 2,
    });
  }
}

function animarEstrelas(t) {
  var bg = getComputedStyle(document.documentElement).getPropertyValue('--fundo').trim() || '#0B0D12';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  estrelas.forEach(function (e) {
    var brilho = (Math.sin(t * e.vel + e.fase) + 1) / 2;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (brilho * 0.7 + 0.15) + ')';
    ctx.fill();
  });
  requestAnimationFrame(animarEstrelas);
}

ajustarCanvas();
gerarEstrelas(200);
requestAnimationFrame(animarEstrelas);
window.addEventListener('resize', function () {
  ajustarCanvas();
  gerarEstrelas(200);
});


/* ========== TROCA DE TEMA (3 opções de cor) ========== */

const temas = {
  escuro: {
    '--fundo':       '#0B0D12',
    '--fundo-card':  '#141823',
    '--borda':       '#232A38',
    '--texto':       '#E6E8EC',
    '--texto-suave': '#9AA3B2',
  },
  roxo: {
    '--fundo':       '#0D0618',
    '--fundo-card':  '#160D26',
    '--borda':       '#2A1A45',
    '--texto':       '#E8D8FF',
    '--texto-suave': '#9B7EC8',
  },
  azul: {
    '--fundo':       '#050A18',
    '--fundo-card':  '#0A1228',
    '--borda':       '#101E40',
    '--texto':       '#D0E0FF',
    '--texto-suave': '#7090C0',
  },
};

function aplicarTema(nome) {
  const raiz = document.documentElement;
  Object.keys(temas[nome]).forEach(function (prop) {
    raiz.style.setProperty(prop, temas[nome][prop]);
  });
  document.querySelectorAll('.btn-tema').forEach(function (btn) {
    btn.classList.toggle('ativo', btn.dataset.tema === nome);
  });
}

document.querySelectorAll('.btn-tema').forEach(function (btn) {
  btn.addEventListener('click', function () { aplicarTema(btn.dataset.tema); });
});


/* ========== SLIDESHOW (3 slides do tema) ========== */

const slides     = document.querySelectorAll('.slide');
const pontos     = document.querySelectorAll('.ponto-slide');
let   slideAtual = 0;
let   ticker;

function irParaSlide(indice) {
  slides[slideAtual].classList.remove('ativo');
  pontos[slideAtual].classList.remove('ativo');
  slideAtual = (indice + slides.length) % slides.length;
  slides[slideAtual].classList.add('ativo');
  pontos[slideAtual].classList.add('ativo');
}

function reiniciarTicker() {
  clearInterval(ticker);
  ticker = setInterval(function () { irParaSlide(slideAtual + 1); }, 4500);
}

if (slides.length > 0) {
  reiniciarTicker();

  document.querySelector('.btn-proximo-slide').addEventListener('click', function () {
    irParaSlide(slideAtual + 1);
    reiniciarTicker();
  });

  document.querySelector('.btn-anterior-slide').addEventListener('click', function () {
    irParaSlide(slideAtual - 1);
    reiniciarTicker();
  });

  pontos.forEach(function (ponto, i) {
    ponto.addEventListener('click', function () {
      irParaSlide(i);
      reiniciarTicker();
    });
  });
}


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

/* ========== CONTADOR DE CARACTERES ========== */

const textarea = document.getElementById('mensagem');
const contador = document.getElementById('contador-chars');

if (textarea && contador) {
  textarea.addEventListener('input', function () {
    contador.textContent = textarea.value.length + ' / 500 caracteres';
  });
}
