let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");

        // Recorrer cada barra de habilidad y ajustar su ancho según el porcentaje
        for (let i = 0; i < habilidades.length; i++) {
            let porcentaje = parseInt(habilidades[i].querySelector("span").innerText); // Obtener el porcentaje
            habilidades[i].style.width = porcentaje + "%"; // Establecer el ancho de la barra de progreso
        }
    }
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

document.getElementById("enviarMensajeBtn").addEventListener("click", function(event){
    event.preventDefault();
    enviarFormulario();
});

function enviarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const tema = document.getElementById("tema").value;
    const mensaje = document.getElementById("mensaje").value;

    if (!nombre || !telefono || !direccion || !tema || !mensaje) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const formData = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        tema: tema,
        mensaje: mensaje
    };

    fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Mensaje enviado exitosamente");
        } else {
            alert("Hubo un problema al enviar el mensaje. Inténtalo nuevamente.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al enviar el mensaje. Inténtalo nuevamente.");
    });
}
