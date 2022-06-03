const socket = io();

const lblonline = document.querySelector('#lblonline');
const lbloffline = document.querySelector('#lbloffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


socket.on('connect', () => {

    lbloffline.style.display = 'none';  
    lblonline.style.display  = '';

} );

socket.on('disconnect', () => {

    lbloffline.style.display = '';  
    lblonline.style.display  = 'none';
} );

//Escuchando lo que viene desde el servidor
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

//Evento para recibir el mensaje y enviarlo al servidor
btnEnviar.addEventListener('click',() => {
    const mensaje = txtMensaje.value;
    const payload = {
        id: 'ASDFASDF1321',
        fecha: new Date().getTime(),
        mensaje: mensaje
    }
    
    socket.emit('enviar-mensaje', payload);

});