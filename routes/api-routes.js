const router = require('express').Router();
// const apiRoutes = require('./api-routes');
// router.use('/api', apiRoutes);
const Workout = require('../models/Workout');

router.get('/api/workouts', (req, res) => {
    //add total duration field to homepage
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
        // {new: true} NOTE: *return original alias
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/api/workouts', (req, res) => {
    Workout.create(req.body)
        .then(data => {
        res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// render workout summary on dashboard
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
