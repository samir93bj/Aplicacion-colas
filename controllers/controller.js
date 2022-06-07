
const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

const socketController = (socket) => { 

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);

    socket.on('siguiente-ticket', (payload,callback) => {

        const siguiente = ticketControl.siguiente();        
        callback(siguiente);

        //TODO: Notificar que hay un ticket pendiente de asignar
    });

    socket.on('atender-ticket', ({ escritorio },callback) => {

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

       if(!escritorio){
        return callback({
            ok: false,
            msg: 'El escritorio es necesario'
        });
       }
       
       const ticket = ticketControl.atenderTicket(escritorio);

       if(!ticket || ticket === undefined){
         callback({
            ok: false,
            msg: 'Ya no hay mas tickets pendientes'
         }) 
        }else{
            callback({
                ok: true,
                ticket
            });
        }
       
    })

}



module.exports ={
    socketController
}