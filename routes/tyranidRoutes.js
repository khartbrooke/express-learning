const router = require("express").Router();
const Tyranid = require("../db");

router.get("/getAll", (req, res, next) => {
    Tyranid.find((err, tyranids) => {
        if (err)
            return next({status: 400, message: err.message});
        else 
            return res.json(tyranids);
    })

});

router.get("/get/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    Tyranid.find((err, tyranids) => {
        if (err)
            return next({status: 400, message: err.message});
        else 
            return res.json(tyranids[id]);
    })
})

router.post("/create", (req, res, next) => {
    const tyranid = req.body;
    
    new Tyranid(tyranid).save().then(() => {
        res.status(201).send("Successfully created");
    }).catch(err => next({status: 400, message: err.message}));    
});

router.put("/replace/:id", (req, res) => {
    const newTyranid = req.query;
    const id = Number.parseInt(req.params.id);   
    
    Tyranid.findOneAndReplace(id, newTyranid);
    res.status(202).json(Tyranid[id]);
});

module.exports = router;