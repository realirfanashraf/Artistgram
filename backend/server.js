import express from "express";
import dotenv from "dotenv";
dotenv.config()
import http from 'http';
import { Server } from 'socket.io'; // Importing Server from 'socket.io'
import morgan from "morgan";
import nocache from "nocache";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./server/connection/database.js"
import userRoute from './server/router/userRoutes/authRoutes.js'
import adminRoute from './server/router/adminRoutes/authRoutes.js'
import uploadRoutes from './server/router/userRoutes/uploadRoutes.js'
import apiRoutes from './server/router/adminRoutes/apiRoutes.js'
import userApiRoute from './server/router/userRoutes/userApiRoute.js'
import actionRoute from './server/router/adminRoutes/actionRoute.js'
import messageSchema from './server/model/userModels/messageModel.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", 'http://localhost:3000'],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(nocache())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()

app.use('/', userRoute)
app.use('/api', userApiRoute)
app.use('/upload', uploadRoutes)
app.use('/admin', adminRoute)
app.use('/admin/api', apiRoutes)
app.use('/admin/action/', actionRoute)

const users = {};

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.emit("myID", socket.id);

    socket.on('authenticate', (userId) => {
        console.log("authenticate from server socket",userId)
        users[userId] = socket.id;
        console.log(users,"this is users list current")
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


   
    socket.on('iceCandidate', ({ recipient, signalData  }) => {
        const recipientSocketId = users[recipient];
        if(recipientSocketId){
            io.to(recipientSocketId).emit('incomingSignal', signalData);
        }else{
            console.log("Recipient not found:", recipient)
        }
    });

    socket.on('offerSignal', ({ recipient,signalData,senderId}) => {
        const recipientSocketId = users[recipient];
        console.log(signalData,"inside the offer signal")
        console.log(senderId,"senderId")
        io.to(recipientSocketId).emit('incomingOfferSignal', {signalData,senderId});
    });

    socket.on('answerSignal', ({ signalData,senderId }) => {

        const recipientSocketId = users[senderId];
        io.to(recipientSocketId).emit('offerAnswerSignal', {signalData});
    });
    

    socket.on('acceptCall', ({ userId }) => {
        const recipientSocketId = users[userId];
        io.to(recipientSocketId).emit('callAnswered')
    });

    socket.on('endCall', ({ recipient }) => {
        // Logic to handle call ending, if any
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
