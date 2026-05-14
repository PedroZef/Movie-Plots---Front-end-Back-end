import MovieService from "../services/MovieService.js";
import { formatMovieObject } from "../utils/helpers.js";

class MovieController {
    static async getMoviePlot(req, res) {
        const movieName = req.query.movie;
        try {
            const moviePlot = await MovieService.getMovieInfo(movieName);
            const response = formatMovieObject(moviePlot);

            try {
                const translationResult =
                    await MovieService.getTranslation(response);

                if (translationResult) {
                    if (translationResult.translatedPlot) {
                        response.translatedPlot = translationResult.translatedPlot;
                    }
                    if (translationResult.translatedTitle) {
                        response.title = translationResult.translatedTitle;
                    }
                }
            } catch (translationError) {
                console.warn(
                    "Translation failed, returning original text only:",
                    translationError.message,
                );
                response.warning = "Tradução indisponível no momento.";
            }

            // Image formatting expected by frontend
            if (moviePlot.Poster && moviePlot.Poster !== "N/A") {
                response.image = moviePlot.Poster;
            }
            response.originalPlot = response.plot;

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default MovieController;
