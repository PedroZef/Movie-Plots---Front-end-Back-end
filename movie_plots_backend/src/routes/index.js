import express from "express";
import MovieController from "../controller/MovieController.js";

const routes = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Movie Plots API</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #121212;
                    color: #091cf4;
                    padding: 20px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                main,
                main p
                    {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .footer,
                .footer p {
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    padding: 1.5rem 1rem;
                    background-color: #484d4e;
                    color: #ffffff;
                    width: 100%;
                   
                    font-weight: 300;
                    letter-spacing: 1px;
                    box-shadow: 0 -5px 15px rgba(111, 72, 218, 0.5);
                }
                    @media (max-width: 768px) {
                    .footer,
                    .footer p {
                    padding: 1rem 0.5rem;
                    
                    }
                }   
            </style>
        </head>
        <body>
            <main>
                <h1>Movie Plots Backend</h1>
                <p>A API está em execução.</p>
            </main>
            <footer class="footer">
                <p>&copy; 2026 - Pedro Zeferino da Silva. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
    `),
    );
    app.use(express.json());
    app.get("/movie/search", MovieController.getMoviePlot);
};

export default routes;
