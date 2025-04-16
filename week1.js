const { MongoClient } =require( 'mongodb');


async function main() {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db ("testDB");
        const collection = db.collection("users");

        //week 2 : insert drivers
        await collection.insertMany(drivers);
        console.log("All drivers inserted!");
        
        // w2 : query
        const highRated =await collection.find({rating : {$gte:4.5}, isAvailable : true}).toArray();
        console.log("High rate available drivers: ",highRated);
        
        // : update
        await collection.updateOne(
            {
                name : "Nisrina"},
                {$inc: {rating : 0.1}
            }
        );
        console.log("rating updated!");
        
        //delete
        await collection.deleteMany({isAvailable : false});
        console.log("unavailable drivers deleted");        

         await collection.insertOne({name: "Nis", age:21});
        console.log("Document inserted!");

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