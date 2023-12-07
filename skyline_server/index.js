const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3300;
require('dotenv').config()
const stripe = require('stripe')(process.env.SECRET_KEY);

//middleware
app.use(express.json())
// app.use(cors({
//     origin: ['http://localhost:5173','https://skyline-fb8da.web.app'],
//     // credentials: true
// }))

//custom middleware
// const = (req,res,next)=>{
//     const token = req?.cookies?.token
//     if (!token) {
//         return res.status(401).send({message: "unauthorized access"})
//     }
//     jwt.verify(token, process.env.AUTH_TOKEN,(err,decoded)=>{
//         if(err){
//             return res.status(401).send({message:"unauthorized"})
//         }
//         req.user = decoded
//         next()
//     })
// }
app.use(cors({
    origin: [
        'http://localhost:5173', 'https://skyline-fb8da.web.app'
    ],
    // credentials:true
}))


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8gn4coa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        const db = client.db('skyline')
        app.post('/jwt', async (req, res) => {
            const email = req.body
            console.log(email);
            const token = jwt.sign(email, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            res.send("User Successed")
        })

        //get sliders data api
        app.get('/api/v1/slider', async (req, res) => {
            const sliders = db.collection('slider')
            const data = await sliders.find().toArray()
            res.send(data)
        })

        const pCollection = db.collection('properties')

        //get features data api
        app.get('/api/v1/features', async (req, res) => {
            const datas = await pCollection.find().toArray()
            const data = datas.slice(0, 4)
            res.send(data)
        })

        //get reviews data api
        const reviewCollection = db.collection('reviews')
        app.get('/api/v1/reviews', async (req, res) => {
            const datas = await reviewCollection.find().toArray()
            const sortdatas = datas.sort((a, b) => new Date(b.time) - new Date(a.time))
            // console.log(sortdatas);
            const data = sortdatas.slice(0, 3)
            res.send(data)
        })
        //get my review data api
        app.get('/api/v1/myreviews', async (req, res) => {
            const email = req.query.email
            console.log(email);
            const data = await reviewCollection.find({ "review.email": email }).toArray()
            res.send(data)
        })
        //get manage review data api
        app.get('/api/v1/managereviews', async (req, res) => {
            const data = await reviewCollection.find().toArray()
            res.send(data)
        })
        //remove review 
        app.delete("/api/v1/removereview", async (req, res) => {
            const id = req.query.id
            const result = await reviewCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
            console.log(result);
        })

        //post reviews
        app.post('/api/v1/review', async (req, res) => {
            const reviewdata = req.body.review
            const data = await reviewCollection.insertOne(reviewdata)
            res.send(data)
        })
        //add property api
        app.post('/api/v1/addproperty', async (req, res) => {
            const data = req.body.offerdata
            const result = await pCollection.insertOne(data)
            res.send(result)
        })


        //get all properties data
        app.get('/api/v1/allproperties', async (req, res) => {
            // console.log('requested');
            const data = await pCollection.find({ verification_status: "verified" }).toArray();
            res.send(data)
        })
        //get mange properties data
        app.get('/api/v1/manageproperties', async (req, res) => {
            // console.log('requested');
            const data = await pCollection.find().toArray();
            res.send(data)
        })
        app.get('/api/v1/myproperties', async (req, res) => {
            const email = req.query.email
            // console.log('requested');
            const data = await pCollection.find({ "agent.email": email }).toArray();
            res.send(data)
        })
        //property verified api
        app.patch('/api/v1/verifyproperty', async (req, res) => {
            const id = req.query.id
            const upadate = {
                $set: {
                    verification_status: 'verified'
                }
            }
            const result = await pCollection.updateOne({ _id: new ObjectId(id) }, upadate)
            res.send(result)
            console.log(result);
        })
        //property verified api
        app.patch('/api/v1/rejectproperty', async (req, res) => {
            const id = req.query.id
            const upadate = {
                $set: {
                    verification_status: 'rejected'
                }
            }
            const result = await pCollection.updateOne({ _id: new ObjectId(id) }, upadate)
            res.send(result)
            console.log(result);
        })

        //get single data
        app.get('/api/v1/details/:id', async (req, res) => {
            const idd = req.params.id
            // console.log(idd);
            const propertiesdata = await pCollection.findOne({ _id: new ObjectId(idd) })
            const reveiwdata = await reviewCollection.find({ "id": idd }).toArray()
            // console.log(reveiwdata);
            let data = [propertiesdata];
            if (reveiwdata.length > 0) {
                data.push(reveiwdata)
                // console.log(data);
                res.send(data)
            } else {
                res.send(data)
            }
        })
        //get single data
        app.get('/api/v1/update/:id', async (req, res) => {
            const idd = req.params.id
            // console.log(idd);
            const data = await pCollection.findOne({ _id: new ObjectId(idd) })
            res.send(data)
        })
        //update properties
        app.patch('/api/v1/update', async (req, res) => {
            const id = req.query.id
            const data = req.body.offerdata
            // console.log("id :",id);
            // console.log("data :", data);
            const updatedata = {
                $set: {
                    "title": data.title,
                    "location": data.location,
                    "time": data.time,
                    "img": data.img,
                    "price": data.price,
                }
            }
            const result = await pCollection.updateOne({ _id: new ObjectId(id) }, updatedata)
            console.log(result);
            res.send(result)
        })

        //get single user data 
        const usercollection = db.collection('user')
        app.get('/api/v1/user', async (req, res) => {
            const id = req.query.email
            const data = await usercollection.findOne({ email: id })
            res.send(data)
        })
        //make admin api
        app.patch('/api/v1/makeadmin', async (req, res) => {
            const id = req.query.id
            const data = await usercollection.updateOne({ _id: new ObjectId(id) }, { $set: { role: 'admin' } })
            res.send(data)
        })
        //make agent api
        app.patch('/api/v1/makeagent', async (req, res) => {
            const id = req.query.id
            const data = await usercollection.updateOne({ _id: new ObjectId(id) }, { $set: { role: 'agent' } })
            res.send(data)
        })
        //mark fraud api
        app.patch('/api/v1/markfraud', async (req, res) => {
            const id = req.query.id
            const data = await usercollection.updateOne({ _id: new ObjectId(id) }, { $set: { role: 'fraud' } })
            res.send(data)
        })
        //delete user api
        app.delete('/api/v1/deleteuser', async (req, res) => {
            const id = req.query.id
            const data = await usercollection.deleteOne({ _id: new ObjectId(id) })
            res.send(data)
        })
        //get all user
        app.get('/api/v1/alluser', async (req, res) => {
            const data = await usercollection.find().toArray()
            res.send(data)
        })
        //post user data
        app.post('/api/v1/user', async (req, res) => {
            const user = req.body.user
            const result = await usercollection.findOne({ email: user.email })
            if (!result) {
                const data = await usercollection.insertOne(user)
                res.send(data)
            }
            // console.log(user);
        })

        //added wishlist
        const wishlistCollection = db.collection('wishlists')
        app.post("/api/v1/wishlist", async (req, res) => {
            const data = req.body.datas
            const result = wishlistCollection.insertOne(data)
            res.send(result)
        })
        //get wishlist
        app.get("/api/v1/wishlist", async (req, res) => {
            const email = req.query.email
            console.log("wisher", email);
            const data = await wishlistCollection.find({ "u_email": email }).toArray()
            res.send(data)
        })
        //get single wishlist data
        app.get('/api/v1/makeoffer', async (req, res) => {
            const id = req.query.id
            console.log(id);
            const data = await wishlistCollection.findOne({ _id: new ObjectId(id) })
            res.send(data)
        })

        //remove properties from wishlist
        app.delete('/api/v1/removeitem', async (req, res) => {
            const id = req.query.id
            const result = await wishlistCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
        })

        //make offer 
        const offerCollection = db.collection('makeoffer')
        app.post('/api/v1/makeoffer', async (req, res) => {
            const offerdata = req.body.offerdata
            const result = offerCollection.insertOne(offerdata)
            res.send(result)
        })
        //get all sold properties
        app.get('/api/v1/soldproperties', async (req, res) => {
            const result = await offerCollection.find({ status: "accepted" }).toArray()
            res.send(result)
        })
        //get all offered data
        app.get('/api/v1/alloffered', async (req, res) => {
            const result = await offerCollection.find({ status: "pending" }).toArray()
            res.send(result)
        })
        //remove offer
        app.delete('/api/v1/removeoffer', async (req, res) => {
            const id = req.query.id
            const result = await offerCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
        })
        //accept propertiy
        app.patch('/api/v1/acceptproperty', async (req, res) => {
            const id = req.query.id
            const result = await offerCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: "accepted" } })
            res.send(result)
        })
        //reject all property
        app.patch('/api/v1/rejectproperties', async (req, res) => {
            const id = req.query.id
            const result = await offerCollection.updateOne({ id: id, verification_status: 'pending' }, { $set: { status: "rejected" } })
            res.send(result)
        })
        //reject property
        app.patch('/api/v1/rejectproperty', async (req, res) => {
            const id = req.query.id
            const result = await offerCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: "rejected" } })
            res.send(result)
        })

        // get bought data 
        app.get('/api/v1/makeoffered', async (req, res) => {
            const email = req.query.email
            const data = await offerCollection.find({ "email": email }).toArray()
            res.send(data)
        })

        //payment intent
        app.post('/api/v1/payment-intent', async (req, res) => {
            const id = req.body.id
            // console.log(id);
            const data = await offerCollection.findOne({ _id: new ObjectId(id) })
            const price = data.amount
            // console.log(price);
            const amount = parseInt(price * 100)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
            })
            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })
        //payment success
        app.patch("/api/v1/paymentsuccess", async (req, res) => {
            const { id, tid } = req.body
            console.log(id + " " + tid);
            const update = {
                $set: {
                    status: "bought",
                    transaction_id: tid
                }
            }
            const result = await offerCollection.updateOne({ _id: new ObjectId(id) }, update, { upsert: true })
        })




        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Skyline server is running...");
})

app.listen(port, () => {
    console.log(`Skyline server listening on port ${port}`)
})
