const App = {
  //Acesso ao DOM
  input: document.getElementById('mainText'),
  btnEncript: document.querySelector('.encript'),
  btnDecript: document.querySelector('.decript'),
  btnCopy: document.querySelector('.copy'),
  output: document.querySelector('.outputText'),

  // As "chaves" de criptografia que utilizaremos são:
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
    //Inverte o objeto
    const flip = (data) =>
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [value, key])
      );

    var chars = flip(App.keys);
    App.output.innerHTML = text.replace(
      /(ai|enter|imes|ober|ufat)/g,
      (m) => chars[m]
    );
  },

  //funcao copiar
  copy(text) {
    try {
      navigator.clipboard.writeText(text);
      console.log('Texto copiado!: ' + text);
    } catch (err) {
      console.log('Copia do texto falhou: ' + err);
    }
  },

  //
  init() {
    App.btnEncript.addEventListener('click', () => {
      App.encript(App.input.value);
    });

    App.btnDecript.addEventListener('click', () => {
      App.decript(App.input.value);
    });

    App.btnCopy.addEventListener('click', () => {
      App.copy(App.output.innerHTML);
    });
  },
};

window.onload = App.init();
