//Rferencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) { 
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
lblEscritorio.innerText  = escritorio;
divAlert.style.display = 'none';

// Comando para establecer la conexión
var socket = io();

var label = $('small');

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket',(ultimo)=> {
    //lblNuevoTicket.innerText = 'Ticket: '+ ultimo;
});

btnAtender.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket',{escritorio} , ({ok, msg, ticket}) => {
       
        if(!ok ){
            lblTicket.innerText = 'Nadie.'
            divAlert.style.display = '';
        }

        if(ticket.numero === undefined){
            lblTicket.innerText = 'Nadie.'
        }

        lblTicket.innerText = 'Ticket: ' + ticket.numero;

    });

});