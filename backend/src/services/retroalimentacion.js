document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("retroForm");
    const estado = document.getElementById("estado");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            asunto: document.getElementById("asunto").value,
            mensaje: document.getElementById("mensaje").value,
            fecha: new Date().toLocaleString()
        };

  
        const res = await fetch("http://localhost:4000/api/retro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        estado.textContent = "Retroalimentación enviada correctamente";
        

        // TEMPORAL: guardar en localStorage
        let lista = JSON.parse(localStorage.getItem("retroalimentacion")) || [];
        lista.push(data);
        localStorage.setItem("retroalimentacion", JSON.stringify(lista));

        estado.textContent = "Retroalimentación registrada ✔️";
        form.reset();
    });
});
