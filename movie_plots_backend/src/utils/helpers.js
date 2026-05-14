export function formatMovieObject(json) {
    return {
        title: json.Title,
        plot: json.Plot,
        year: json.Year,
        genre: json.Genre,
        actors: json.Actors,
        director: json.Director,
        language: json.ptBR || json.Language,
        image: json.Poster && json.Poster !== "N/A" ? json.Poster : null,
        originalPlot: json.Plot,
        translatedPlot: json.translatedPlot || null,
    };
}
