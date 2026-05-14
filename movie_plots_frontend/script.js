document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");

    const API_URL = "http://localhost:4000/movie/search?movie=";

    // Lista de filmes para exibir
    const moviesToFetch = [
        "Inception",
        "Interstellar",
        "The Dark Knight",
        "The Matrix",
        "The Dark Knight",
        "Inception",
        "Interstellar",
    ];

    async function fetchMovies() {
        try {
            // Fazer requisições em paralelo
            const promises = moviesToFetch.map((moviePlot) =>
                fetch(`${API_URL}${encodeURIComponent(moviePlot)}`)
                    .then((res) => {
                        if (!res.ok)
                            throw new Error(
                                `HTTP error! status: ${res.status}`,
                            );
                        return res.json();
                    })
                    .catch((err) => {
                        console.error(`Erro ao buscar ${movie}:`, err);
                        return null; // Retorna null para filmes que deram erro
                    }),
            );

            const results = await Promise.all(promises);
            const validMovies = results.filter(
                (movie) => movie !== null && (movie.originalPlot || movie.plot),
            );

            renderCarousel(validMovies);
        } catch (error) {
            console.error("Erro geral ao buscar filmes:", error);
            carousel.innerHTML =
                '<div class="loading">Erro ao carregar os filmes. Verifique se o backend está rodando.</div>';
        }
    }

    function renderCarousel(movies) {
        carousel.innerHTML = ""; // Limpar loading

        if (movies.length === 0) {
            carousel.innerHTML =
                '<div class="loading">Nenhum filme encontrado.</div>';
            return;
        }

        movies.forEach((movie) => {
            const card = document.createElement("div");
            card.className = "card";

            if (movie.image) {
                const img = document.createElement("img");
                img.src = movie.image;
                img.alt = `Capa do filme ${movie.title}`;
                img.className = "card-image";

                // Tratar caso a imagem não carregue (link quebrado)
                img.onerror = function () {
                    this.style.display = "none";
                };
                card.appendChild(img);
            }

            const title = document.createElement("h2");
            title.textContent = movie.title || "Título Desconhecido";
            card.appendChild(title);

            const plotContainer = document.createElement("div");
            plotContainer.className = "plot-container";

            // Verifica se tem tradução ou apenas o original
            if (movie.translatedPlot) {
                const ptLabel = document.createElement("div");
                ptLabel.className = "plot-label";
                ptLabel.textContent = "Sinopse (PT-BR)";
                plotContainer.appendChild(ptLabel);

                const ptPlot = document.createElement("div");
                ptPlot.className = "plot-text";
                ptPlot.textContent = movie.translatedPlot;
                plotContainer.appendChild(ptPlot);
            }

            if (movie.originalPlot || movie.plot) {
                const enLabel = document.createElement("div");
                enLabel.className = "plot-label";
                enLabel.textContent = "Original Plot (EN)";
                plotContainer.appendChild(enLabel);

                const enPlot = document.createElement("div");
                enPlot.className = "plot-text";
                enPlot.textContent = movie.originalPlot || movie.plot;
                plotContainer.appendChild(enPlot);
            }

            if (movie.warning) {
                const warningDiv = document.createElement("div");
                warningDiv.className = "warning";
                warningDiv.textContent = movie.warning;
                plotContainer.appendChild(warningDiv);
            }

            card.appendChild(plotContainer);
            carousel.appendChild(card);
        });
    }

    // Iniciar a busca
    fetchMovies();
});
