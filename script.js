
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

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

function render() {
  const q = search.value.trim().toLocaleLowerCase("es");
  const y = year.value;

  const items = entrevistas.filter((x) => {
    const coincideAnio =
      y === "all" || String(x.anio) === y;

    const texto = [
      x.titulo,
      x.persona,
      x.autores,
      x.extra || "",
      String(x.numero),
      String(x.anio)
    ].join(" ").toLocaleLowerCase("es");

    return coincideAnio && texto.includes(q);
  });

  count.textContent =
    `${String(items.length).padStart(2, "0")} ` +
    (items.length === 1 ? "entrevista" : "entrevistas");

  empty.hidden = items.length > 0;

  cards.innerHTML = items.map((x) => `
    <article class="card">

      <a
        class="card-cover"
        href="${escapeHtml(x.enlace)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir entrevista: ${escapeHtml(x.titulo)}"
      >
        <img
          class="card-image"
          src="${escapeHtml(x.imagen)}"
          alt="Portada Kōbai, edición ${x.numero}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="body">

        <div class="meta">
          EDICIÓN ${x.numero} · ${x.anio}
        </div>

        <h2>${escapeHtml(x.titulo)}</h2>

        <p class="person">
          ${escapeHtml(x.persona)}
        </p>

        <p class="author">
          Por ${escapeHtml(x.autores)}
          ${x.extra ? `<br>${escapeHtml(x.extra)}` : ""}
        </p>

        <a
          class="link"
          href="${escapeHtml(x.enlace)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Leer ${escapeHtml(x.titulo)}"
        >
          Leer entrevista
          <span class="arrow" aria-hidden="true">↗</span>
        </a>

      </div>
    </article>
  `).join("");
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
