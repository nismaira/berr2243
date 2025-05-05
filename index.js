const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const port = 3000;

const app = express();
app.use(express.json());

let db;

async function connectToMongoDB() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db("eventDB");
    } catch (err) {
        console.error("Error:", err);
    }
}

connectToMongoDB();

// ✅ FIXED: Added backticks to console.log template string
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// -------------------- EVENTS --------------------

// ✅ FIXED: Incorrect variable name (was "rides")
app.get('/events', async (req, res) => {
    try {
        const events = await db.collection('events').find().toArray();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// ✅ FIXED: Endpoint was incorrectly named '/rides'
app.post('/events', async (req, res) => {
    try {
        const result = await db.collection('events').insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ error: "Invalid event data" });
    }
});

// ✅ FIXED: Endpoint and route were both still using '/rides'
app.delete('/events/:id', async (req, res) => {
    try {
        const result = await db.collection('events').deleteOne(
            { _id: new ObjectId(req.params.id) }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ deleted: result.deletedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid event ID" });
    }
});


// -------------------- TICKETS --------------------

app.post('/tickets', async (req, res) => {
    try {
        const { userId, eventId } = req.body;
        if (!userId || !eventId) return res.status(400).send("Missing data");

        const result = await db.collection('tickets').insertOne({
            userId,
            eventId,
            createdAt: new Date()
        });
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ error: "Failed to book ticket" });
    }
});

app.delete('/tickets/:id', async (req, res) => {
    try {
        const result = await db.collection('tickets').deleteOne(
            { _id: new ObjectId(req.params.id) }
        );
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: "Invalid ticket ID" });
    }
});



