document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const loadMoreBtn = document.getElementById("load-more");

    const API_URL = "http://localhost:4000/movie/search?movie=";

    // Lista de filmes para exibir
    const allMovies = [
        "Inception", "Interstellar", "The Dark Knight", "The Matrix",
        "Pulp Fiction", "Forrest Gump", "The Godfather", "The Lord of the Rings",
        "Fight Club", "Gladiator", "Titanic", "Avatar", "Jurassic Park",
        "The Avengers", "Spider-Man", "Iron Man", "Toy Story", "The Lion King"
    ];
    let currentIndex = 0;
    const itemsPerLoad = 5;

    async function fetchMovies() {
        if (currentIndex >= allMovies.length) return;
        
        const loadingDiv = document.getElementById("loading");
        if (!loadingDiv && currentIndex === 0) {
            carousel.innerHTML = '<div class="loading" id="loading">Carregando filmes...</div>';
        }
        
        // Hide load more while fetching
        if (loadMoreBtn) loadMoreBtn.style.display = "none";

        const moviesToFetch = allMovies.slice(currentIndex, currentIndex + itemsPerLoad);
        currentIndex += itemsPerLoad;

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
                        console.error(`Erro ao buscar ${moviePlot}:`, err);
                        return null; // Retorna null para filmes que deram erro
                    }),
            );

            const results = await Promise.all(promises);
            const validMovies = results.filter(
                (movie) => movie !== null && (movie.originalPlot || movie.plot),
            );

            renderCarousel(validMovies);

            if (currentIndex < allMovies.length) {
                loadMoreBtn.style.display = "block";
            }
        } catch (error) {
            console.error("Erro geral ao buscar filmes:", error);
            carousel.innerHTML =
                '<div class="loading">Erro ao carregar os filmes. Verifique se o backend está rodando.</div>';
        }
    }

    function renderCarousel(movies) {
        const loadingDiv = document.getElementById("loading");
        if (loadingDiv) {
            loadingDiv.remove();
        }

        if (movies.length === 0 && carousel.children.length === 0) {
            carousel.innerHTML =
                '<div class="loading">Nenhum filme encontrado.</div>';
            return;
        }

        movies.forEach((movie) => {
            const card = document.createElement("div");
            card.className = "card";
            
            // Adicionar evento de clique para abrir o trailer (pesquisa no YouTube)
            card.addEventListener("click", () => {
                const query = encodeURIComponent(`${movie.title} official trailer`);
                window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
            });

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

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", fetchMovies);
    }

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            themeToggleBtn.textContent = "🌙 Modo Escuro";
        }

        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                themeToggleBtn.textContent = "🌙 Modo Escuro";
            } else {
                localStorage.setItem("theme", "dark");
                themeToggleBtn.textContent = "☀️ Modo Claro";
            }
        });
    }

    // Iniciar a busca
    fetchMovies();
});
