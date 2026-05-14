import dotenv from "dotenv";

dotenv.config();

async function fetchMovie(movieName) {
    const URL = `http://www.omdbapi.com/?apikey=${process.env.api_key}&t=${movieName}&plot=full`;

    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`Falha: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        return error;
    }
}

export default fetchMovie;

export async function fetchTranslation(text) {
    if (!text) return { translatedText: "" };
    try {
        const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(text)}`,
        );
        if (!res.ok) {
            throw new Error(`Translation API failed: ${res.status}`);
        }
        const json = await res.json();
        return { translatedText: json[0].map((item) => item[0]).join("") };
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
}
