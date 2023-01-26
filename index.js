const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//QMu5HMJVxWBhVBzc
//hotelUser



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iikigzo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const hotelCollection = client.db('hotelReview').collection('hotels');
        const reviewCollection = client.db('hotelReview').collection('reviews');

        app.get('/hotels', async (req, res) => {
            const query = {}
            const cursor = hotelCollection.find(query);
            const hotels = await cursor.toArray();
            res.send(hotels);
        })
        app.get('/hotels/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const hotel = await hotelCollection.findOne(query);
            res.send(hotel);
        })
        app.get('/review', async (req, res) => {
            let query = {}
            if (req.query.id) {
                query = {
                    id: req.query.id
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
        app.get('/', async (req, res) => {
            let query = {}
            if (req.query.name) {
                query = {
                    name: req.query.name
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })

        app.post('/addhotel', async (req, res) => {
            const hotel = req.body;
            const result = await hotelCollection.insertOne(hotel);
            res.send(result);
        })
        app.post('/addreview', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('hotel review server is running')
})

app.listen(port, () => {
    console.log(`hotel review server running on ${port}`);
})