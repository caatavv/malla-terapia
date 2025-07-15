const ramos = [
  // [ID, Nombre, [Requisitos]]
  ["RLM", "Razonamiento Lógico Matemático", []],
  ["BIO", "Principios de la Biología", []],
  ["FTO", "Fundamentos de Terapia Ocupacional", []],
  ["TCC", "Taller de Competencias Comunicativas", []],
  ["TCA", "Taller de Competencias para el Aprendizaje", []],
  ["TDP1", "Taller de Desarrollo Personal I", []],

  ["ANA", "Anatomía Descriptiva", []],
  ["PGD", "Psicología General y del Desarrollo", []],
  ["OH", "Ocupación Humana", ["FTO"]],
  ["CV", "Cultura y Valores", []],
  ["TDP2", "Taller de Desarrollo Personal II", []],
  ["ABU", "Atención Básica de Urgencia", []],
  ["SS", "Salud y Sociedad", []],

  ["FMH", "Fundamentos del Movimiento Humano", ["RLM"]],
  ["AFS", "Anatomía y Fisiología de los Sistemas", []],
  ["ISM", "Introducción a la Salud Mental", ["PGD"]],
  ["DPO", "Desempeño y Participación Ocupacional", ["OH"]],
  ["PST", "Psicología Social y del Trabajo", []],
  ["PS", "Persona y Sentido", []],
  ["ING1", "Inglés Básico I", []],

  ["BIOM", "Biomecánica", ["FMH"]],
  ["PAT", "Patología General", []],
  ["AAAE", "Análisis y Adaptación de la Actividad y del Entorno", ["DPO"]],
  ["PSICO", "Psicomotricidad", []],
  ["ET", "Ética en Salud", []],
  ["ING2", "Inglés Básico II", ["ING1"]],

  ["NNA", "Neurología en Niños", []],
  ["TRAUMA", "Traumatología", ["ANA"]],
  ["SMNNA", "Salud Mental en NNA", ["ISM"]],
  ["RP", "Razonamiento Profesional", ["DPO"]],
  ["PSICOA", "Psicomotricidad Aplicada", ["PSICO"]],
  ["GTO", "Gestión y Terapia Ocupacional", []],
  ["ELECT1", "Electivo I", []],

  ["ERG", "Ergonomía y Salud en el Trabajo", []],
  ["NAPM", "Neurología Adulto y PM", ["AFS"]],
  ["SMAPM", "Salud Mental Adulto y PM", ["ISM"]],
  ["PTO", "Procesos de Terapia Ocupacional", ["RP"]],
  ["DIC", "Diagnóstico e Intervención en Comunidad", []],
  ["ELECT2", "Electivo II", []],

  ["DOA", "Diagnóstico Ocupacional Adultos", ["PTO"]],
  ["ORTTEC", "Órtesis y Tecnología", ["NAPM"]],
  ["DOPM", "Diagnóstico Ocupacional PM", ["SMAPM"]],
  ["DONNA", "Diagnóstico Ocupacional NNA", ["PTO", "ISM"]],
  ["ESTEPI", "Estadística y Epidemiología", ["RLM"]],
  ["INCL", "Inclusión Educacional y Laboral", ["NAPM"]],

  ["IOA", "Intervención Ocupacional Adultos", ["DOA"]],
  ["ORT", "Órtesis", ["ORTTEC"]],
  ["IOPM", "Intervención Ocupacional PM", ["DOPM"]],
  ["IONNA", "Intervención Ocupacional NNA", ["DONNA"]],
  ["METINV", "Metodología e Investigación", ["ESTEPI"]],
  ["ELECT3", "Electivo III", []],

  ["INT1", "Internado Profesional I", []],
  ["INT2", "Internado Profesional II", []],
  ["SEMI", "Seminario de Investigación", ["METINV"]],
  ["INT3", "Internado Profesional III", []],
  ["INT4", "Internado Profesional IV", []],
];

const aprobados = new Set();

function crearRamo([id, nombre, requisitos]) {
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.textContent = nombre;
  div.dataset.id = id;
  div.dataset.requisitos = JSON.stringify(requisitos);

  if (requisitos.length === 0) {
    div.classList.remove("bloqueado");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    if (div.classList.contains("aprobado")) {
      aprobados.delete(id);
      div.classList.remove("aprobado");
    } else {
      aprobados.add(id);
      div.classList.add("aprobado");
    }

    actualizarEstadoRamos();
  });

  return div;
}

function actualizarEstadoRamos() {
  document.querySelectorAll(".ramo").forEach(ramo => {
    const requisitos = JSON.parse(ramo.dataset.requisitos);
    const cumplidos = requisitos.every(req => aprobados.has(req));

    if (cumplidos) {
      ramo.classList.remove("bloqueado");
    } else if (!aprobados.has(ramo.dataset.id)) {
      ramo.classList.add("bloqueado");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("malla");
  ramos.forEach(ramo => contenedor.appendChild(crearRamo(ramo)));
});
