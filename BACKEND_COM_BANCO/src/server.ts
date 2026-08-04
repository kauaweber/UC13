import express, { Application } from "express";
import { AppDataSource } from "./config/dataSource";

import userRoutes from "./routes/UserRoutes";
import postRoutes from "./routes/PostRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import productRoutes from "./routes/ProductRoutes";

const app: Application = express();
const PORT: number = Number(process.env.PORT || "3000");

app.use(express.json());

// Rotas
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Conexão com o banco
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database.", error);
    });