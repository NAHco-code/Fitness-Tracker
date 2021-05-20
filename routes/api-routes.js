const router = require('express').Router();
// const apiRoutes = require('./api-routes');
// router.use('/api', apiRoutes);
const Workout = require('../models/Workout');

router.get('/api/workouts', (req, res) => {
    Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// router.put('/api/workouts', (req, res) => {
//     Workout.findByIdAndUpdate(req.params.id,
//         { $push: { exercises: req.body } },
//         {new: true})
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

// router.post('/api/workouts')

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                durationSnapshot: { $sum: '$exercises.duration' },
                weightSnapshot: { $sum: '$exercises.weight' }
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
