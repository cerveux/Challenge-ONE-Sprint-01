var textarea = document.querySelector(".ingreso"); //text area de ingreso
var alerta = document.querySelector(".alerta"); //texto que informa sobre may y acentos
var btnEncriptar = document.querySelector(".encriptar"); //boton de encriptar
var btnDesencriptar = document.querySelector(".desencriptar"); //boton de desencriptar

var card = document.querySelector(".card");
var cardInner = document.querySelector(".card-inner"); //inner card es lo que sirve para la funcionalidad de flip
var textoResultado = document.querySelector(".texto-resultado"); //text area de salida
var btnCopiar = document.querySelector(".copiar"); //boton de copiar

var bugMozilla = document.querySelector(".card-title");

var mensaje = "";
var resultado;

var comprobacion = true;
const regEx = /[A-Zá-ú]/;

function cardAction() {
  if(mensaje !== ""){
    if((card.offsetHeight) !== 775){
      textoResultado.style.height = ((textoResultado.scrollHeight)) + "px";
      card.style.height = ((textoResultado.scrollHeight)+160) + "px";
    }
    
    cardInner.style.transform = "rotateY(180deg)";
    bugMozilla.style.display = "none";



  };
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
  comprobacion && cardAction();
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
  textoResultado.value = resultado;
  textarea.value = "";
  comprobacion && cardAction();
}

function copiar() {
  navigator.clipboard.writeText(textoResultado.value);
}

function agrandar() {
  alerta.classList.add("accion");
  setTimeout(() => alerta.classList.remove("accion"), 1000);
}

btnEncriptar.onclick = () =>
  regEx.test(textarea.value) ? agrandar() : encriptar();
btnDesencriptar.onclick = () =>
  regEx.test(textarea.value) ? agrandar() : desencriptar();
btnCopiar.onclick = copiar;