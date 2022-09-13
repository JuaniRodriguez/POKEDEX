const $cuadros = document.querySelectorAll('.col');
const $completarPaginado = document.querySelectorAll('.page-item');

async function llamarListaPokes(pagina) {
  const response = await fetch(`${pagina}`);
  const resultado = await response.json();
  return resultado.results;
}

function removerTexto(lista) {
  lista.forEach((elementolista) => {
    const el = elementolista;
    el.textContent = '';
    el.removeAttribute('link');
  });
}

async function completarCuadros(pokeData) {
  pokeData.forEach((el, i) => {
    $cuadros[i].textContent = `${pokeData[i].name}`;
    $cuadros[i].setAttribute('link', `${pokeData[i].url}`);
  });
}

const mostrarPokes = async (linkPokes) => {
  removerTexto($cuadros);
  const infoPokes = await llamarListaPokes(linkPokes);
  completarCuadros(infoPokes);
};

function iniciarPokedex() {
  mostrarPokes('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0');

  $completarPaginado.forEach((li, i) => {
    const offset = (i * 20);
    li.setAttribute('link', `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
  });
}

iniciarPokedex();

function desmarcarPaginaActiva() {
  $completarPaginado.forEach((li) => {
    li.classList.remove('active');
  });
}

$completarPaginado.forEach((elementoli) => {
  const li = elementoli;
  li.onclick = function clickPaginado() {
    desmarcarPaginaActiva();
    li.classList.add('active');
    const linkcompletarCuadros = li.getAttribute('link');
    mostrarPokes(linkcompletarCuadros);
  };
});

function asignarPropiedadesPokes(objeto) {
  const tipoPoke = [];
  const $nombre = document.querySelector('.card-title');
  const $altura = document.querySelector('.altura');
  const $peso = document.querySelector('.peso');
  const $tipo = document.querySelector('.tipo');
  const $imagen = document.querySelector('.card img');

  if (objeto.sprites.other.dream_world.front_default !== null) {
    $imagen.removeAttribute('style');
    $imagen.setAttribute('src', `${objeto.sprites.other.dream_world.front_default}`);
  } else if (objeto.sprites.front_default !== null) {
    $imagen.removeAttribute('style');
    $imagen.setAttribute('src', `${objeto.sprites.front_default}`);
  } else {
    $imagen.setAttribute('src', './poke-default.png');
    $imagen.setAttribute('style', 'opacity:0.5');
  }

  $nombre.textContent = `${(objeto.species.name)}`;
  $altura.textContent = `${`${objeto.height}mm`}`;
  $peso.textContent = `${`${objeto.weight / 10}kg`}`;
  objeto.types.forEach((el) => {
    tipoPoke.push(el.type.name);
  });
  $tipo.textContent = `${tipoPoke}`;
}

async function llamarPropiedadPoke(url) {
  const response = await fetch(`${url}`);
  const resultado = await response.json();
  return asignarPropiedadesPokes(resultado);
}

$cuadros.forEach((elementocuadro) => {
  let link;
  const cuadro = elementocuadro;
  cuadro.onclick = function clickCuadro() {
    link = cuadro.getAttribute('link');
    if (link !== null) {
      llamarPropiedadPoke(link);
    }
  };
});
