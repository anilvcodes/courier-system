const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let parcels=[]


app.get("/api/parsel",(req,res)=>{
  res.json(parcels);
})
app.get("/api/parsel/:id", (req, res) => {
  const id = Number(req.params.id);

  const courier = parcels.find(
    (item) => item.id === id
  );

  if (!courier) {
    return res.json({
      message: "Parcel not found"
    });
  }

  res.json(courier);
});

 app.post("/api/parsel",(req,res)=>{

   const { senderName, receiverName, pickupAddress, deliveryAddress } = req.body;

   if(!senderName|| !receiverName || !pickupAddress || !deliveryAddress){
    return res.status(400).json({
      message: "All fields are required"
    });
   }
 const courier={
  id:parcels.length+1,
  senderName,
  receiverName,
  pickupAddress,
  deliveryAddress,
   status: "Pending",
    createdAt: new Date()

 }
 parcels.push(courier);
 
  res.status(201).json({
    message: "Courier created successfully",
    courier
  });

 });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
