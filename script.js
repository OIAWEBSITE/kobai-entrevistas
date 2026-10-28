
const entrevistas = [
  {
    titulo: "Vivir para narrar lo invisible",
    persona: "Entrevista con Ritsuko Kudo",
    autores: "María Camila Neira Villegas",
    numero: 10,
    anio: 2025,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/12574",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK10-100.jpg"
  },
  {
    titulo: "Kawaii, identidad y revolución",
    persona: "Entrevista con Sebastian Masuda",
    autores: "Betsy Forero-Montoya y María Camila Neira Villegas",
    extra: "Colaborador: Leonardo Caro Cataño",
    numero: 9,
    anio: 2025,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/11717/10862",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK9-100.jpg"
  },
  {
    titulo: "Diálogos con Japón",
    persona: "Entrevista con Fernando Barbosa",
    autores: "Betsy Forero-Montoya",
    numero: 8,
    anio: 2024,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/10851/9947",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK8-100.jpg"
  },
  {
    titulo: "Impulsando el cambio",
    persona: "Entrevista con Miyoko Kojima",
    autores: "María Camila Neira Villegas",
    numero: 7,
    anio: 2024,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/10272/9574",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK7-100.jpg"
  },
  {
    titulo: "Una promoción alimentaria con personalidad",
    persona: "Entrevista con Yui Itani",
    autores: "Betsy Forero-Montoya",
    numero: 6,
    anio: 2023,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/issue/view/657",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK6-100.jpg"
  },
  {
    titulo: "La sociedad japonesa y el sistema laboral",
    persona: "Entrevista con el profesor Kazuhiko Odaki",
    autores: "Betsy Forero-Montoya y Humberto López",
    numero: 5,
    anio: 2023,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/8709/8927",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK5-100.jpg"
  },
  {
    titulo: "El dorso del brocado",
    persona: "Entrevista con la traductora Keiko Yaguchi",
    autores: "Betsy Forero-Montoya y Sergio Cruz Romero",
    numero: 4,
    anio: 2022,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/7762/8347",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK4-100.jpg"
  },
  {
    titulo: "Antes y después de la modernización de Japón",
    persona: "Entrevista con el profesor Kaoru Iokibe",
    autores: "Betsy Forero-Montoya, Humberto López Cobos y Paula Eslava Lozzi",
    numero: 3,
    anio: 2021,
    enlace: "https://revistas.uniandes.edu.co/index.php/kobai/article/view/7754/8331",
    imagen: "images/CJ_WEB_Kōbai_EntrevistasK3-100.jpg"
  }
];

const cards = document.querySelector("#cards");
const search = document.querySelector("#search");
const year = document.querySelector("#year");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const clear = document.querySelector("#clear");

const escapeHtml = (texto) => {
  return String(texto).replace(/[&<>"']/g, (caracter) => {
    const caracteres = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return caracteres[caracter];
  });
};

function render() {
  const busqueda = search.value
    .trim()
    .toLocaleLowerCase("es");

  const anioSeleccionado = year.value;

  const resultados = entrevistas.filter((entrevista) => {
    const coincideAnio =
      anioSeleccionado === "all" ||
      String(entrevista.anio) === anioSeleccionado;

    const contenido = [
      entrevista.titulo,
      entrevista.persona,
      entrevista.autores,
      entrevista.extra || "",
      String(entrevista.numero),
      String(entrevista.anio)
    ]
      .join(" ")
      .toLocaleLowerCase("es");

    const coincideBusqueda = contenido.includes(busqueda);

    return coincideAnio && coincideBusqueda;
  });

  const cantidad = resultados.length;

  count.textContent = `${String(cantidad).padStart(2, "0")} ${
    cantidad === 1 ? "entrevista" : "entrevistas"
  }`;

  empty.hidden = cantidad > 0;

  cards.innerHTML = resultados
    .map((entrevista) => {
      const titulo = escapeHtml(entrevista.titulo);
      const persona = escapeHtml(entrevista.persona);
      const enlace = escapeHtml(entrevista.enlace);
      const imagen = escapeHtml(entrevista.imagen);

      return `
        <a
          class="card"
          href="${enlace}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Leer ${titulo}. ${persona}. Se abre en una pestaña nueva."
          title="${titulo} — ${persona}"
        >
          <img
            class="card-image"
            src="${imagen}"
            alt="Kōbai, edición ${entrevista.numero}: ${titulo}"
            width="471"
            height="151"
            loading="lazy"
            decoding="async"
          >
        </a>
      `;
    })
    .join("");
}

search.addEventListener("input", render);

year.addEventListener("change", render);

clear.addEventListener("click", () => {
  search.value = "";
  year.value = "all";
  render();
  search.focus();
});

render();
