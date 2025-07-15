const ramos = {
  "Razonamiento Lógico Matemático": [],
  "Fundamentos del Movimiento Humano": ["Razonamiento Lógico Matemático"],
  "Estadística y Epidemiología": ["Razonamiento Lógico Matemático"],
  "Principios de la Biología": [],
  "Fundamentos de Terapia Ocupacional": [],
  "Ocupación Humana": ["Fundamentos de Terapia Ocupacional"],
  "Taller de Competencias Comunicativas": [],
  "Taller de Competencias para el Aprendizaje": [],
  "Taller de Desarrollo Personal I": [],
  "Anatomía Descriptiva": [],
  "Traumatología": ["Anatomía Descriptiva"],
  "Psicología General y del Desarrollo": [],
  "Introducción a la Salud Mental": ["Psicología General y del Desarrollo"],
  "Desempeño y Participación Ocupacional": ["Ocupación Humana"],
  "Cultura y Valores": [],
  "Taller de Desarrollo Personal II": [],
  "Atención Básica de Urgencia": [],
  "Salud y Sociedad": [],
  "Anatomía y Fisiología de los Sistemas": [],
  "Neurología del Adulto y la Persona Mayor": ["Anatomía y Fisiología de los Sistemas"],
  "Salud Mental del Adulto y la Persona Mayor": ["Introducción a la Salud Mental"],
  "Diagnóstico Ocupacional en Niños, Niñas y Adolescentes": ["Introducción a la Salud Mental", "Procesos de Terapia Ocupacional"],
  "Análisis y Adaptación de la Actividad y del Entorno": ["Desempeño y Participación Ocupacional"],
  "Razonamiento Profesional": ["Desempeño y Participación Ocupacional"],
  "Psicología Social y del Trabajo": [],
  "Persona y Sentido": [],
  "Inglés Básico I": [],
  "Inglés Básico II": ["Inglés Básico I"],
  "Biomecánica": ["Fundamentos del Movimiento Humano"],
  "Patología General": [],
  "Psicomotricidad": [],
  "Psicomotricidad Aplicada": ["Psicomotricidad"],
  "Ética en Salud": [],
  "Neurología en niños, niñas y adolescentes": [],
  "Salud Mental en niños, niñas y adolescentes": [],
  "Procesos de Terapia Ocupacional": ["Razonamiento Profesional"],
  "Gestión y Terapia Ocupacional": [],
  "Electivo I": [],
  "Ergonomía y Salud en el Trabajo": [],
  "Diagnóstico e Intervención en la Comunidad": [],
  "Diagnóstico Ocupacional en Adultos": ["Procesos de Terapia Ocupacional"],
  "Intervención Ocupacional en Adultos": ["Diagnóstico Ocupacional en Adultos"],
  "Órtesis y Tecnología para la Inclusión": ["Neurología del Adulto y la Persona Mayor"],
  "Órtesis": ["Órtesis y Tecnología para la Inclusión"],
  "Diagnóstico Ocupacional en Personas Mayores": ["Salud Mental del Adulto y la Persona Mayor"],
  "Intervención Ocupacional en Personas Mayores": ["Diagnóstico Ocupacional en Personas Mayores"],
  "Inclusión Educacional y Laboral": ["Neurología del Adulto y la Persona Mayor"],
  "Estadística y Epidemiología": [],
  "Metodología y Diseño de Investigación": ["Estadística y Epidemiología"],
  "Intervención Ocupacional en Niños, Niñas y Adolescentes": ["Diagnóstico Ocupacional en Niños, Niñas y Adolescentes"],
  "Electivo II": [],
  "Electivo III": [],
  "Internado Profesional I": [],
  "Internado Profesional II": [],
  "Internado Profesional III": [],
  "Internado Profesional IV": [],
  "Seminario de Investigación": ["Metodología y Diseño de Investigación"]
};

// Agrupación semestral para mostrar ordenadamente
const semestres = [
  ["Razonamiento Lógico Matemático", "Principios de la Biología", "Fundamentos de Terapia Ocupacional", "Taller de Competencias Comunicativas", "Taller de Competencias para el Aprendizaje", "Taller de Desarrollo Personal I"],
  ["Anatomía Descriptiva", "Psicología General y del Desarrollo", "Ocupación Humana", "Cultura y Valores", "Taller de Desarrollo Personal II", "Atención Básica de Urgencia", "Salud y Sociedad"],
  ["Fundamentos del Movimiento Humano", "Anatomía y Fisiología de los Sistemas", "Introducción a la Salud Mental", "Desempeño y Participación Ocupacional", "Psicología Social y del Trabajo", "Persona y Sentido", "Inglés Básico I"],
  ["Biomecánica", "Patología General", "Análisis y Adaptación de la Actividad y del Entorno", "Psicomotricidad", "Ética en Salud", "Inglés Básico II"],
  ["Neurología en niños, niñas y adolescentes", "Traumatología", "Salud Mental en niños, niñas y adolescentes", "Razonamiento Profesional", "Psicomotricidad Aplicada", "Gestión y Terapia Ocupacional", "Electivo I"],
  ["Ergonomía y Salud en el Trabajo", "Neurología del Adulto y la Persona Mayor", "Salud Mental del Adulto y la Persona Mayor", "Procesos de Terapia Ocupacional", "Diagnóstico e Intervención en la Comunidad", "Electivo II"],
  ["Diagnóstico Ocupacional en Adultos", "Órtesis y Tecnología para la Inclusión", "Diagnóstico Ocupacional en Personas Mayores", "Diagnóstico Ocupacional en Niños, Niñas y Adolescentes", "Estadística y Epidemiología", "Inclusión Educacional y Laboral"],
  ["Intervención Ocupacional en Adultos", "Órtesis", "Intervención Ocupacional en Personas Mayores", "Intervención Ocupacional en Niños, Niñas y Adolescentes", "Metodología y Diseño de Investigación", "Electivo III"],
  ["Internado Profesional I", "Internado Profesional II", "Seminario de Investigación"],
  ["Internado Profesional III", "Internado Profesional IV"]
];

const aprobado = new Set();

function crearRamo(nombre) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = nombre;
  div.dataset.nombre = nombre;
  div.addEventListener("click", () => {
    if (!div.classList.contains("habilitado") || div.classList.contains("aprobado")) return;
    div.classList.add("aprobado");
    aprobado.add(nombre);
    actualizarEstado();
  });
  return div;
}

function actualizarEstado() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    const requisitos = ramos[nombre] || [];
    const cumplidos = requisitos.every(req => aprobado.has(req));
    if (!div.classList.contains("aprobado")) {
      div.classList.toggle("habilitado", cumplidos);
    }
  });
}

function cargarMalla() {
  const contenedor = document.getElementById("malla");
  semestres.forEach((semestre, index) => {
    const titulo = document.createElement("div");
    titulo.classList.add("semestre-titulo");
    titulo.textContent = `${Math.floor(index / 2) + 1}° Año - ${index % 2 === 0 ? "I" : "II"} Semestre`;
    contenedor.appendChild(titulo);

    semestre.forEach(ramo => {
      const divRamo = crearRamo(ramo);
      contenedor.appendChild(divRamo);
    });
  });

  actualizarEstado();
}

document.addEventListener("DOMContentLoaded", cargarMalla);
