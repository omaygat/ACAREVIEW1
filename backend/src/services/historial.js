// Historial.js

async function cargarHistorial() {
  const lista = document.getElementById("historial-lista");

  try {
    const res = await fetch("http://localhost:4000/api/history");
    const data = await res.json();

    if (!data.length) {
      lista.innerHTML = `
        <p class="text-gray-600 text-center py-10">
          No hay análisis registrados aún.
        </p>
      `;
      return;
    }

    lista.innerHTML = ""; // Limpiar lista

    data.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200";

      li.innerHTML = `
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-600" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>

          <div>
            <p class="font-semibold text-gray-800">${item.filename}</p>
            <p class="text-gray-500 text-sm">Fecha: ${
              new Date(item.createdAt).toLocaleDateString()
            }</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M13 16h-4l4-8h-4"></path>
          </svg>

          <span class="text-lg font-bold text-green-600">
            ${
              item.resultado?.porcentaje
                ? item.resultado.porcentaje + "%"
                : "Sin datos"
            }
          </span>
        </div>
      `;

      lista.appendChild(li);
    });
  } catch (error) {
    lista.innerHTML = `
      <p class="text-red-600 text-center py-10">
        Error cargando el historial.
      </p>
    `;
    console.error(error);
  }
}

// Ejecutar cuando la página cargue
document.addEventListener("DOMContentLoaded", cargarHistorial);
