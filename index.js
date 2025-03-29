const { MongoClient } =require( 'mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db ("testDB");
        const collection = db.collection("users");

        await collection.insertOne({name: "Nis", age:21});
        console.log("Documented inserted!");

        const result = await collection.findOne({name:"Nis"});
        console.log("Query result:", result);
        }catch (err) 
        {
            console.error("Error:", err);
         } finally {
                await client.close();
            }
} 


main();