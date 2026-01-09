document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const form = document.querySelector(".form-invitados");
    const apellidoInput = document.querySelector("input[name='Apellidos']");
    const apellidoSpan = document.getElementById("apellidoFamilia");
    const btnSi = document.getElementById("btnSi");
    const btnNo = document.getElementById("btnNo");

    let invitadoId = null;

    // Abrir sobre
    if (sobre) {
        sobre.addEventListener("click", () => {
            sobre.classList.add("abierto");
        });
    }

    // Mostrar apellido en confirmación
    if (apellidoInput && apellidoSpan) {
        apellidoInput.addEventListener("input", () => {
            apellidoSpan.textContent = apellidoInput.value;
        });
    }

    // Registrar familia (AJAX)
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const tokenInput = document.querySelector('input[name="__RequestVerificationToken"]');

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: tokenInput
                        ? { "RequestVerificationToken": tokenInput.value }
                        : {}
                });

                if (!response.ok) {
                    mostrarMensaje("Ocurrió un error al registrar", true);
                    return;
                }

                const data = await response.json();
                invitadoId = data.id;

                mostrarMensaje(data.message);
                form.reset();
                if (apellidoSpan) apellidoSpan.textContent = "";

            } catch {
                mostrarMensaje("No se pudo conectar con el servidor", true);
            }
        });
    }

    // Confirmación SI
    if (btnSi) {
        btnSi.addEventListener("click", async () => {
            await enviarConfirmacion("SI");
            mostrarMensaje("Gracias por confirmar su asistencia");
        });
    }

    // Confirmación NO
    if (btnNo) {
        btnNo.addEventListener("click", async () => {
            await enviarConfirmacion("NO");
            mostrarMensaje("Gracias por avisarnos");
        });
    }

    // Enviar confirmación al servidor
    async function enviarConfirmacion(respuesta) {
        if (!invitadoId) return;

        await fetch("/Home/Confirmar", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `id=${invitadoId}&respuesta=${respuesta}`
        });
    }

    // Mensaje flotante
    function mostrarMensaje(texto, error = false) {
        const msg = document.createElement("div");
        msg.textContent = texto;

        msg.style.position = "fixed";
        msg.style.bottom = "30px";
        msg.style.left = "50%";
        msg.style.transform = "translateX(-50%)";
        msg.style.padding = "18px 36px";
        msg.style.borderRadius = "40px";
        msg.style.background = error ? "#8b0000" : "#000000";
        msg.style.color = "#ffffff";
        msg.style.fontFamily = "'Playfair Display', serif";
        msg.style.fontSize = "18px";
        msg.style.zIndex = "9999";
        msg.style.boxShadow = "0 15px 30px rgba(0,0,0,0.35)";
        msg.style.pointerEvents = "none";

        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3500);
    }
});