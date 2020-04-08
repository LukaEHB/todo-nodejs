const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const {v1:uuid} = require('uuid');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.get('/getItems',(req,res)=>{
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    console.log(JSON.parse(data).items);
    res.status(200).json(JSON.parse(data).items);
  })
})

app.post('/saveItem',(req,res)=>{
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const id = uuid();
    console.log(id);

    const db = JSON.parse(data);
    req.body.id = id;
    db.items[db.items.length] = req.body;
    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"New item Saved", id:id});
  })
})

app.delete('/deleteItem/:id',(req,res)=>{
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const db = JSON.parse(data);
    db.items.forEach((item, index) => {
      if (item.id === req.params.id) {
        db.items.splice(index,1);
      }
    });
    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"task deleted"});
  })
})

app.patch('/updateItem/:id',(req,res)=>{
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const db = JSON.parse(data);
    db.items.forEach(item => {
      if (item.id === req.params.id) {
        item[req.body.prop] = req.body.value;
      }
    });
    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"task updated"});
  })
});

app.listen(PORT, ()=>{
  console.log("server is running on localhost:"+PORT);
})