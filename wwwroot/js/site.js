document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const hoja = document.getElementById("hoja");
    const form = document.querySelector(".form-invitados");
    const apellidoInput = document.querySelector("input[name='Apellidos']");
    const apellidoSpan = document.getElementById("apellidoFamilia");

    sobre.addEventListener("click", () => {
        sobre.classList.add("abierto");
    });

    apellidoInput.addEventListener("input", () => {
        apellidoSpan.textContent = apellidoInput.value;
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "RequestVerificationToken":
                        document.querySelector('input[name="__RequestVerificationToken"]').value
                }
            });

            if (response.ok) {
                mostrarMensaje("Familia registrada correctamente 💌");
                form.reset();
            } else {
                mostrarMensaje("Ocurrió un error al registrar", true);
            }
        } catch {
            mostrarMensaje("No se pudo conectar con el servidor", true);
        }
    });

    document.getElementById("btnSi").addEventListener("click", () => {
        mostrarMensaje("Gracias por confirmar su asistencia 💍");
    });

    document.getElementById("btnNo").addEventListener("click", () => {
        mostrarMensaje("Gracias por avisarnos 💐");
    });

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

        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 3500);
    }
});