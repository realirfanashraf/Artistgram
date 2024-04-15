
import { Server } from 'socket.io';
import messageSchema from './server/model/userModels/messageModel.js';

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", 'http://localhost:3000'],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

const users = {};

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.emit("myID", socket.id);
    socket.on('newUser', (userId) => {
        users[userId] = socket.id;
        console.log(users,"Active Users List")
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        Object.keys(users).forEach((userId) => {
            if (users[userId] === socket.id) {
                delete users[userId];
            }
        });
    });

    socket.on('message', (data) => {
        const { sender, receiver, content, senderName } = data;
        const message = new messageSchema({ sender, receiver, content, senderName });
        message.save();
        const userSocketId = users[receiver];
        io.to(userSocketId).emit('message', message);
    });

    socket.on('typing', ({ receiver, isTyping }) => {
      
      const userSocketId = users[receiver];
      console.log(userSocketId,"sokcetid is here")
      if (userSocketId) {
        io.to(userSocketId).emit('typing', { isTyping, receiver });
      }
    });

    socket.on('follow', (data) => {
      console.log(data.user, "inside follow socket");
      const userSocketId = users[data.user];
      if (userSocketId) {
        io.to(userSocketId).emit('follow');
      }
    });
    



    socket.on("callUser", (data) => {
        const userToCallId = users[data.userToCall]
        if (userToCallId) {
          io.to(userToCallId).emit("callUser", {
            signal: data.signalData,
            from: data.from,
            name: data.name,
          });
        }
      });
    
      socket.on("ice-candidate", ({ target, candidate }) => {
        const userSocketId = users[target]
        
        console.log(userSocketId, "ice-candidate event received", target, candidate);
    
        if (userSocketId) {
          io.to(userSocketId).emit("ice-candidate", {
            candidate: candidate,
            sender: target,
          });
        }
      });
    

      socket.on("answerCall", (data) => {
        const userSocketId = users[data.to]
        io.to(userSocketId).emit("callAccepted", data.signal);
      });


      socket.on("callEnded", (data) => {
        const {userId} = data
        const userSocketId = users[userId]
    console.log(userSocketId,"socketId")
        if (userSocketId) {
          io.to(userSocketId).emit("callEnded");
        } else {
          console.log("User not found");
        }
      });


});
}

export default initializeSocket;