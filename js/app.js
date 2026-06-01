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
