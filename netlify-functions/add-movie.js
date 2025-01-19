// netlify-functions/add-movie.js
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const movie = JSON.parse(event.body);
        console.log("Movie added: ", movie);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Movie added successfully!" })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" })
    };
};
