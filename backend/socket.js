
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
        const { sender, receiver, content } = data;
        const message = new messageSchema({ sender, receiver, content });
        message.save();
        io.emit('message', message);
    });

    socket.on('typing', ({ receiver, isTyping }) => {
      console.log("user typing socket");
      console.log(receiver,isTyping,"comes from the fromtend")
      const userSocketId = users[receiver];
      console.log(users,"users list")
      console.log(userSocketId,"socket id")
      if (userSocketId) {
        io.to(userSocketId).emit('typing', { isTyping });
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
        const userSocketId = users[data]
    
        if (userSocketId) {
          io.to(userSocketId).emit("callEnded");
        } else {
          console.log("User not found");
        }
      });


});
}

export default initializeSocket;