const express = require('express');
const { allExercises, filterData } = require('./db');
const app = express();

const PORT = 5000;

app.get('/exercises', (req, res) => {
    const reqObj = req.query;
    let list = allExercises;
    const pageNo = Number(reqObj.pageNo);
    const pageQty = Number(reqObj.pageQty);
    if(pageNo && pageQty){
        list = allExercises.slice(pageQty*pageNo, (pageQty*pageNo)+pageQty)
    }
    res.statusCode = 200;
    res.json({exercises: list, count: allExercises.length});
})

app.get('/filter-terms', (req, res) => {
    const { category } = req.query;
    if(!category){
        res.statusCode = 400;
        res.json({error: 'Missing query parameter "category".'});
    }
    else if(category !== "bodyParts" && category !== "targetMuscles" && category !== "equipment"){
        res.statusCode = 400;
        res.json({error: 'Bad category parameter value, only "bodyParts", "targetMuscles" and "equipment" is allowed.'});
    }
    else{
        res.statusCode = 200;
        if(category === 'all')res.json(filterData);
        else res.json(filterData[category]);
    }
})

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.json({status: "I'm alive"})
})

app.listen(PORT, () => {
    console.log("API is ready on port = " + PORT);
})