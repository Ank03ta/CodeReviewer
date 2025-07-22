import express from 'express';
const app = express();
import aiRoutes from './routes/ai.routes.js'; 
import cors from "cors";

app.use(express.json()); 
app.use(cors({
    origin:"http://localhost:5173",
     credentials: true
   
}));

app.get("/",(req, res) =>{
    res.redirect("http://localhost:5173");
});

app.use("/ai",aiRoutes);

export default app;
