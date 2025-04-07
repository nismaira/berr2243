const { MongoClient } =require( 'mongodb');

const drivers = [                       //week2 
    { name : "Nisrina" ,
        vehicleType : "Myvi",
        isAvailable : true ,
        rating : 4.8
    },
    {
        name:"Yana",
        vehicleType:"Kancil",
        isAvailable: false,
        rating : 4.5
    }
]; 

console.log(drivers);                   //week 2
drivers.forEach(driver => {
    console.log(driver.name);
});
 
drivers.push({                            //week 2
    name : "Humai",
    rating : 4.6,
    available : false
});

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
        console.log("High rate available drivers: ",highRatedDrivers);
        
        // : update
        await collection.updateOne(
            {
                name : "Nisrina"},
                {$inc: {rating : 0.1}
            }
        );
        console.log("rating uodated!");
        
        //delete
        await collection.deleteMany({isAvailable : false});
        console.log("unavailable drivers deleted");        

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