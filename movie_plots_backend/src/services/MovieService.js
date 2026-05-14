import fetchMovie, { fetchTranslation } from "../utils/apiConnect.js";

class MovieService {
    static async getMovieInfo(movieName) {
        const movie = await fetchMovie(movieName);
        return movie;
    }

    static async getTranslation(movieInfo) {
        const [plotResult, titleResult] = await Promise.all([
            movieInfo.plot ? fetchTranslation(movieInfo.plot) : Promise.resolve({ translatedText: null }),
            movieInfo.title ? fetchTranslation(movieInfo.title) : Promise.resolve({ translatedText: null })
        ]);

        return {
            translatedPlot: plotResult?.translatedText,
            translatedTitle: titleResult?.translatedText
        };
    }
}

export default MovieService;
