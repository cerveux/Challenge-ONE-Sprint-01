const textarea = document.querySelector(".ingreso"); //text area de ingreso
const alerta = document.querySelector(".alerta"); //texto que informa sobre may y acentos
const btnEncriptar = document.querySelector(".encriptar"); //boton de encriptar
const btnDesencriptar = document.querySelector(".desencriptar"); //boton de desencriptar

const card = document.querySelector(".card");
const cardInner = document.querySelector(".card-inner"); //inner card es lo que sirve para la funcionalidad de flip
const textoResultado = document.querySelector(".texto-resultado"); //text area de salida
const btnCopiar = document.querySelector(".copiar"); //boton de copiar

const bugMozilla = document.querySelector(".card-title");

var mensaje = "";
var resultado;

const regEx = /[A-Zá-ú]/;

var accion = false;

var mobileCardHeight = 0;
var desktopCardHeight = "775px";

var alturaTexto = 0;

function cardDesktop() {
  card.style.height = desktopCardHeight;
  textoResultado.style.height = "620px";
}

function cardMobile() {
  textoResultado.style.height = "135px";
  alturaTexto = textoResultado.scrollHeight + "px";
  textoResultado.style.height = alturaTexto;
  mobileCardHeight = textoResultado.scrollHeight + 160 + "px";
  card.style.height = mobileCardHeight;
}

function cardAction() {
  if (mensaje !== "") {
    textoResultado.style.height = "135px";
    alturaTexto = textoResultado.scrollHeight + "px";
    textoResultado.style.height =
      card.offsetHeight !== 775 ? alturaTexto : "620px";
    mobileCardHeight = textoResultado.scrollHeight + 160 + "px";
(card.offsetHeight !== 775) && (card.style.height = mobileCardHeight);
  

    cardInner.style.transform = "rotateY(180deg)";
    bugMozilla.style.display = "none";
    accion = true;
  }
}

function encriptar() {
  resultado = "";
  mensaje = textarea.value;

  for (var i = 0; i < mensaje.length; i++) {
    switch (mensaje[i]) {
      case "a":
        resultado += "ai";
        break;
      case "e":
        resultado += "enter";
        break;
      case "i":
        resultado += "imes";
        break;
      case "o":
        resultado += "ober";
        break;
      case "u":
        resultado += "ufat";
        break;

      default:
        resultado += mensaje[i];
        break;
    }
  }
  textoResultado.innerHTML = resultado;
  textarea.value = "";
  cardAction();
}

function desencriptar() {
  resultado = "";
  mensaje = textarea.value;

  for (var i = 0; i < mensaje.length; i++) {
    switch (mensaje[i]) {
      case "a":
        resultado += "a";
        i++;
        break;
      case "e":
        resultado += "e";
        i += 4;
        break;
      case "i":
        resultado += "i";
        i += 3;
        break;
      case "o":
        resultado += "o";
        i += 3;
        break;
      case "u":
        resultado += "u";
        i += 3;
        break;

      default:
        resultado += mensaje[i];
        break;
    }
  }
  textoResultado.innerHTML = resultado;
  textarea.value = "";
  cardAction();
}

function copiar() {
  navigator.clipboard.writeText(textoResultado.value);
}

function agrandar() {
  alerta.classList.add("accion");
  setTimeout(() => alerta.classList.remove("accion"), 1000);
}

function reportWindowSize() {
  if (accion) {
    if (window.innerWidth > 912) {
      cardDesktop();
    } else {
      cardMobile();
    }
  }
}

btnEncriptar.onclick = () =>
  regEx.test(textarea.value) ? agrandar() : encriptar();
btnDesencriptar.onclick = () =>
  regEx.test(textarea.value) ? agrandar() : desencriptar();
btnCopiar.onclick = copiar;
window.onresize = reportWindowSize;
