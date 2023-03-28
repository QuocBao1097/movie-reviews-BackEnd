import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
    dotenv.config();   //download data env
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI); // Create a new MongoClient
    const port = process.env.PORT || 8000;

try {
    // Connect to the MongoDB cluster
    await client.connect();

    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    });
}    

catch (e) {
    console.error(e);
    process.exit(1);
};
}
//call func Main()
main().catch(console.error);