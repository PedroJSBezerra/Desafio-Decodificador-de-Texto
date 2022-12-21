const App = {
  //Carrega o acesso ao DOM
  input: document.getElementById('mainText'),
  btnEncript: document.querySelector('.encript'),
  btnDecript: document.querySelector('.decript'),
  btnCopy: document.querySelector('.copy'),
  output: document.querySelector('.outputText'),

  //Salva as "chaves" de criptografia que utilizaremos:
  keys: {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
  },

  //funcao encript
  encript(text) {
    var chars = App.keys;
    App.output.innerHTML = text.replace(/[aeiou]/g, (m) => chars[m]);
  },

  //funcao decript
  decript(text) {
    //Inverte o objeto App.keys Ex: {a:"ai"} => {ai:"a"}
    const flip = (data) => {
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [value, key])
      );
    };

    var chars = flip(App.keys);

    App.output.innerHTML = text.replace(
      /(ai|enter|imes|ober|ufat)/g,
      (m) => chars[m]
    );
  },

  showCopy() {
    App.output.innerHTML != ''
      ? App.btnCopy.classList.add('show')
      : App.btnCopy.classList.remove('show');
  },

  //funcao copiar
  copy(text) {
    try {
      navigator.clipboard.writeText(text);
      App.btnCopy.childNodes[1].classList.remove('bi-clipboard');
      App.btnCopy.childNodes[1].classList.add('bi-clipboard-check');
      App.btnCopy.classList.add('check');
      App.btnCopy.childNodes[3].innerText = 'Copiado';
    } catch (err) {
      console.log('Copia do texto falhou: ' + err);
    }
  },

  //Inicializa
  init() {
    //Adiciona os listeners (ouvintes) aos botôes
    App.showCopy();

    App.btnEncript.addEventListener('click', () => {
      App.encript(App.input.value);
      App.showCopy();
    });

    App.btnDecript.addEventListener('click', () => {
      App.decript(App.input.value);
      App.showCopy();
    });

    App.btnCopy.addEventListener('click', () => {
      App.copy(App.output.innerHTML);
    });
  },
};

//carrega o script após a pagina carregar por completo
window.onload = App.init();
