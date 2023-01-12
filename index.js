const express = require('express')
const app = express();
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 1001;

// Need for enviromental file.
require('dotenv').config()

// This are middleware.
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Laptop Bd Bazar Running');
})

const uri = `mongodb+srv://${process.env.Db_User}:${process.env.Db_Password}@cluster0.ermhfxw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const categories = client.db("laptopBdBazar").collection("Categories");
        const laptops = client.db("laptopBdBazar").collection("laptops");
        const bookingInfo = client.db("laptopBdBazar").collection("bookingInfo");
        const userInfo = client.db("laptopBdBazar").collection("userInfo");

        const database = client.db("laptopBdBazar").collection("Sevices");
        const reviews = client.db("laptopBdBazar").collection("Reviews");


        app.get('/categories', async (req, res) => {
            const query = {};
            const cursor = categories.find(query);
            const category = await cursor.toArray();
            res.send(category);
        });

        app.get('/categories/:Cat_name', async (req, res) => {
            const categoryName = req.params.Cat_name;
            const query = { categoryName: categoryName };
            const cursor = laptops.find(query);
            const category = await cursor.toArray();
            res.send(category);
        });

        app.post('/bookingCollection', async (req, res) => {
            const booking = req.body;
            const result = await bookingInfo.insertOne(booking);
            res.send(result);
        });


        app.get('/review', async (req, res) => {
            let query = {}
            if (req.query.User_email) {
                query = { Email: req.query.User_email }
            }
            const cursor = bookingInfo.find(query);
            const rev = await cursor.toArray();
            res.send(rev);
        });

        app.post('/UserInfo', async (req, res) => {
            const service = req.body;
            const result = await userInfo.insertOne(service);
            res.send(result);
        });


        app.get('/Users', async (req, res) => {
            let query = {}
            if (req.query.Roll) {
                query = { Roll: req.query.Roll }
            }
            console.log(query)
            const cursor = userInfo.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        app.delete('/UserInfo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userInfo.deleteOne(query);
            res.send(result);
        });

        app.post('/categories', async (req, res) => {
            const service = req.body;
            const result = await laptops.insertOne(service);
            res.send(result);
        });

        app.get('/my_product', async (req, res) => {
            let query = {}
            if (req.query.Email) {
                query = { user_email: req.query.Email }
            }
            const cursor = laptops.find(query);
            const rev = await cursor.toArray();
            res.send(rev);
        });

        app.delete('/My_products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await laptops.deleteOne(query);
            res.send(result);
        });


        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    plot: `A harvest of random numbers, such as: ${Math.random()}`
                },
            };
            res.send(result);
        });


        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await database.findOne(query);
            res.send(service);
        });


        app.get('/servicereview', async (req, res) => {
            let query = {}
            if (req.query.ServiceName) {
                query = { ServiceName: req.query.ServiceName }
            }
            const cursor = reviews.find(query);
            const rev = await cursor.toArray();
            res.send(rev);
        });

        app.get('/servicereview/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const corsor = reviews.find(query);
            const result = await corsor.toArray();
            res.send(result);


        })

        app.put('/servicereview/:id', async (req, res) => {

            const id = req.params.id;
            const updatedData = req.body;

            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };

            const reviewUpdate = {
                $set: {
                    Review: updatedData.Review
                }
            }

            const result = await reviews.updateOne(filter, reviewUpdate, options);
            console.log(result)
            res.send(result);

        })

    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})