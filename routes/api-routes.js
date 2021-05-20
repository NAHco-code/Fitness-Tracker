const router = require('express').Router();
// const apiRoutes = require('./api-routes');
// router.use('/api', apiRoutes);
const Workout = require('../models/Workout');

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        }
    ])
        .limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id,
        { $push: { exercises: req.body } },
        { returnOriginal: false })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}); // *CHECK - insomnia response questionable
    //          maybe something with subdoc

router.post('/api/workouts', (req, res) => {
    Workout.create(req.body)
        .then(data => {
        res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
                totalWeight: { $sum: '$exercises.weight' }
            }
        }
    ])
        .limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;
