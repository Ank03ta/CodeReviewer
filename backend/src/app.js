import express from 'express';
const app = express();
import aiRoutes from './routes/ai.routes.js'; 
import cors from "cors";

app.use(express.json()); 
app.use(cors({
    origin:"https://codereviewer-4rgg.onrender.com",
     credentials: true
   
}));

app.get("/",(req, res) =>{
    res.redirect("https://codereviewer-4rgg.onrender.com");
});

app.use("/ai",aiRoutes);

export default app;

