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
    if(err) throw err;
    console.log(JSON.parse(data).items);
    res.status(200).json(JSON.parse(data).items);
  })
})

app.post('/saveItem',(req,res)=>{
  console.log(req.body);
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const db = JSON.parse(data);
    const id = uuid();
    req.body.id = id;
    console.log(db);
    db.items[db.items.length] = req.body;
    console.log(db);
    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"New item Saved", id:id});
  })
})

app.delete('/deleteItem/:id',(req,res)=>{
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const db = JSON.parse(data);
    db.items.filter((obj, index)=>{
      if (obj.id === req.params.id) {
        db.items.splice(index, 1);
      }
    })
    
    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"Item Removed"});
  })
});

app.patch('/updateItem/:id', (req,res)=>{
  console.log(req.params.id);
  fs.readFile(__dirname+'/db.json', (err,data)=>{
    const db = JSON.parse(data);
    db.items.filter((obj, index)=>{
      if (obj.id === req.params.id) {
        obj.checked = !obj.checked;
      }
    })

    fs.writeFileSync(__dirname+'/db.json', JSON.stringify(db));
    res.status(200).json({message:"Item is updated"});
  })
});


 
app.listen(PORT, ()=>{
  console.log("server is running on localhost:"+PORT);
})