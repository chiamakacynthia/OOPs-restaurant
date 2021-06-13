const express =require("express")
const port = 5050
const app = express();
app.use(express.json())

const meals=[
 {id:1, meal:"beans"},
 {id:2, meal:"fried rice"},
 {id:3, meal:"egg and bread"},
 {id:4, meal:"plantain sauce"},
 {id:5, meal:"pounded yam"}
]

app.get("/", (req, res)=>{
res.send("server is runing")
})

app.get("/api/meals", (req, res)=>{
res.send(meals)
})

app.get("/api/meals/:id", (req, res)=>{
    const Mealid= meals.find((m)=>m.id===parseInt(req.params.id))
  if (!Mealid)  { 
      res.status(404).send(`invalid meal id:${req.params.id}`)
    }
    res.send(Mealid)
})

app.post("/api/meals", (req,res)=>{
    if (!req.body.meal){
        res.status(400).send("invalid")
    }
    const newmeal={
        id: meals.length + 1,
        meal: req.body.meal
    }
    meals.push(newmeal)
    res.send(newmeal)
})

app.put("/api/meals/:id", (req, res)=>{
    const mealid = meals.find((meal)=>meal.id===parseInt(req.params.id))
    if(!mealid) {
        res.status(404).send(`wrong id, please put in the correct id: ${req.params.id}`)
    }
    mealid.meal = res.body.meal
   res.send(mealid)
 })

 app.delete("/api/meals/:id", (req, res)=>{
     const mealid =meals.find((meal)=>meal.id===parseInt(req.params.id))
     if(!mealid){
          res.status(404).send(`invalid id: ${req.params.id}`)
      }
      const Mealid=meals.indexOf(mealid)
        meals.splice(mealid, 2)
        res.status(200).send(mealid)      
 });

app.listen(port, (req, res)=>{
    (console.log(`server is listening: ${port}`))
})

