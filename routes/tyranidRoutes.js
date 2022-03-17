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

router.get("/get/:id", ({params: {id}}, res, next) => {
    Tyranid.findById(id, (err, found) => {
        if (err)
            return next({status: 400, message: err.message});
        else if (!found)
            return next({ status: 404, message: "No person found with id: " + id });
        else
            return res.send(found);
    });
})

router.post("/create", ({body: tyranid}, res, next) => {
    new Tyranid(tyranid).save()
        .then(() => res.status(201).send("Successfully created"))
        .catch(err => next({status: 400, message: err.message}));
});

router.put("/replace/:id", ({query: newTyranid, params: {id}}, res) => {
    Tyranid.findByIdAndUpdate(id, newTyranid, (err, replaced) => {
        if (err)
            return next({status: 400, message: err.message});
        else 
            Tyranid.findById(id, (err, updatedTyranid) => {
                if (err)
                    return next({status: 400, message: err.message});
                else
                    return res.status(202).send(updatedTyranid);
            });
    })
   
});

router.delete("/remove/:id", ({params: {id}}, res) => {
    Tyranid.findByIdAndDelete(id, (err) => {
        if (err)
            return next({status: 400, message: err.message});
        else
            return res.sendStatus(204);
    })
});


module.exports = router;