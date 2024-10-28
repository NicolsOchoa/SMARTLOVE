document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const chatIcon = document.getElementById('chat-icon');
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const exitBtn = document.getElementById('exit-btn');

    let currentCase = null; // Variable para controlar el flujo de conversación
    let initialLoad = true; // Variable para controlar la carga inicial del chat

    // Función para iniciar la conversación con un saludo del bot
    function startConversation() {
        messages.innerHTML = ''; // Limpia el chat antes de empezar
        appendMessage('bot', '¡Bienvenido a Smart Love! Estoy aquí para ayudarte con cualquier pregunta que tengas sobre nuestro hotel.');
        appendMessage('bot', 'Por favor, selecciona una opción de las siguientes para continuar:');
        appendMessage('bot', '1. Reservas y disponibilidad');
        appendMessage('bot', '2. Servicios del hotel');
        appendMessage('bot', '3. Instalaciones específicas');
        appendMessage('bot', '4. Habitaciones');
        appendMessage('bot', '5. Políticas del hotel');
        appendMessage('bot', '6. Amenidades y extras');
        currentCase = 'menu';
    }

    // Agregar evento de clic al ícono del chat
    chatIcon.addEventListener('click', function () {
        if (chatBox.style.display === "none" || !chatBox.style.display) {
            chatBox.style.display = "block"; // Muestra el chat
            if (initialLoad) {
                startConversation(); // Iniciar la conversación al abrir el chat solo una vez
                initialLoad = false; // Marcar como cargado para evitar duplicación
            }
        } else {
            chatBox.style.display = "none"; // Ocultar el chat
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
    }

    sendBtn.addEventListener('click', function () {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage('user', userMessage);
            handleUserResponse(userMessage.toLowerCase()); // Process user message here
            userInput.value = ''; // Clear input after sending
        }
    });

    exitBtn.addEventListener('click', function () {
        appendMessage('bot', '¡Hasta luego! Gracias por usar nuestro chatbot.');
        setTimeout(function() {
            chatBox.style.display = 'none'; // Ocultar el chat después de mostrar el mensaje
            startConversation(); // Reiniciar la conversación cuando se vuelva a abrir
        }, 1000); // Tiempo de espera de 2 segundos antes de ocultar el chat
    });

    function handleUserResponse(message) {
        if (currentCase === 'menu') {
            messages.innerHTML = ''; // Limpiar el chat antes de mostrar las nuevas opciones
            switch (message) {
                case '1':
                    currentCase = 'reservas';
                    appendMessage('bot', 'Has seleccionado Reservas y Disponibilidad. Elige una opción:');
                    appendMessage('bot', 'A. ¿Cómo puedo reservar una habitación con jacuzzi?');
                    appendMessage('bot', 'B. ¿Hay disponibilidad de habitaciones para ciertas fechas?');
                    break;
                case '2':
                    currentCase = 'servicios';
                    appendMessage('bot', 'Has seleccionado Servicios del Hotel. Elige una opción:');
                    appendMessage('bot', 'A. ¿Qué servicios se incluyen en el rooftop?');
                    appendMessage('bot', 'B. ¿El sauna está incluido en el precio de la habitación?');
                    break;
                case '3':
                    currentCase = 'instalaciones';
                    appendMessage('bot', 'Has seleccionado Instalaciones Específicas. Elige una opción:');
                    appendMessage('bot', 'A. ¿Qué servicios se incluyen en el rooftop?');
                    appendMessage('bot', 'B. ¿Hay alguna política de uso para el sauna?');
                    break;
                case '4':
                    currentCase = 'habitaciones';
                    appendMessage('bot', 'Has seleccionado Habitaciones. Elige una opción:');
                    appendMessage('bot', 'A. ¿Qué diferencias hay entre las habitaciones estándar y las habitaciones con jacuzzi?');
                    appendMessage('bot', 'B. ¿Puedo solicitar un servicio especial para la habitación con jacuzzi?');
                    break;
                case '5':
                    currentCase = 'politicas';
                    appendMessage('bot', 'Has seleccionado Políticas del Hotel. Elige una opción:');
                    appendMessage('bot', 'A. ¿Cuál es la política de cancelación del hotel?');
                    appendMessage('bot', 'B. ¿El hotel permite mascotas en las habitaciones con jacuzzi?');
                    break;
                case '6':
                    currentCase = 'amenidades';
                    appendMessage('bot', 'Has seleccionado Amenidades y Extras. Elige una opción:');
                    appendMessage('bot', 'A. ¿Puedo solicitar decoración especial o algún paquete romántico para mi estancia?');
                    appendMessage('bot', 'B. ¿Ofrecen servicios de spa o masajes en el hotel?');
                    break;
                default:
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                    currentCase = 'menu';
                    startConversation(); // Reiniciar el menú principal si la entrada no es válida
                    break;
            }
        } else {
            // Respuestas detalladas basadas en la selección específica del usuario
            processDetailedUserResponse(message);
        }
    }

    function processDetailedUserResponse(message) {
        messages.innerHTML = ''; // Limpiar el chat antes de mostrar la respuesta
        switch (currentCase) {
            case 'reservas':
                if (message === 'a') {
                    appendMessage('bot', 'Para reservar una habitación con jacuzzi, puedes contactarnos directamente al 906 498 973 o enviar un correo a reservas@smartlove.com.pe');
                } else if (message === 'b') {
                    appendMessage('bot', 'Para verificar la disponibilidad de habitaciones para fechas específicas, por favor comunícate con nosotros al 906 498 973 o consulta a través de reservas@smartlove.com.pe');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            case 'servicios':
                if (message === 'a') {
                    appendMessage('bot', 'El rooftop ofrece una vista espectacular de la ciudad y cuenta con un bar exclusivo para nuestros huéspedes. Este servicio está incluido para todos nuestros visitantes.');
                } else if (message === 'b') {
                    appendMessage('bot', 'El acceso al sauna no tiene costo adicional y está incluido en el precio de todas nuestras habitaciones.');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            case 'instalaciones':
                if (message === 'a') {
                    appendMessage('bot', 'El rooftop está abierto hasta las 12:00 AM para que puedas disfrutar de la vista nocturna del lugar.');
                } else if (message === 'b') {
                    appendMessage('bot', 'Para el uso del sauna, recomendamos reservar con anticipación. No se permite la entrada a menores de 16 años sin supervisión adulta.');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            case 'habitaciones':
                if (message === 'a') {
                    appendMessage('bot', 'Las habitaciones con jacuzzi ofrecen un espacio más amplio y comodidades premium, incluyendo un jacuzzi privado. Las habitaciones estándar son cómodas y completamente equipadas, pero sin jacuzzi.');
                } else if (message === 'b') {
                    appendMessage('bot', 'Para solicitudes especiales en la habitación con jacuzzi, como decoración para ocasiones especiales, por favor contáctanos al 906 498 973.');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            case 'politicas':
                if (message === 'a') {
                    appendMessage('bot', 'Nuestra política de cancelación permite cancelar sin penalización hasta 48 horas antes de la fecha de llegada. Para más detalles, contáctanos al 906 498 973.');
                } else if (message === 'b') {
                    appendMessage('bot', 'Sí, permitimos mascotas en todas nuestras habitaciones, incluyendo las habitaciones con jacuzzi. Se aplican cargos adicionales y términos específicos.');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            case 'amenidades':
                if (message === 'a') {
                    appendMessage('bot', 'Ofrecemos paquetes románticos que incluyen decoración especial, una botella de champagne y más. Para más detalles y reservas, llama al 906 498 973.');
                } else if (message === 'b') {
                    appendMessage('bot', 'Actualmente ofrecemos servicios de masajes en el hotel por un costo adicional. Para reservar, por favor contacta a nuestro personal en recepción o al 906 498 973.');
                } else {
                    appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                }
                break;
            default:
                appendMessage('bot', 'Lo siento, no entendí tu elección. ¿Podrías repetirla?');
                break;
        }
        currentCase = 'menu'; // Reinicia al menú principal después de responder
    }

    // Llama a la función startConversation al cargar la página para iniciar la conversación
    startConversation();
});
