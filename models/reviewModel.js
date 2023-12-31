const mongoose = require('mongoose');
const Tour = require('./tourModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'review cannot be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    //creating references
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'review must belong to a tour document!']
        //each review in a tour must know exactly what tour it belongs to.
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to a user.']
    }
    //end of references.
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true} 
});

reviewSchema.index({ tour: 1, user: 1}, {unique:true})

reviewSchema.pre(/^find/, function(next){
    // this.populate({
    //     path: 'user',
    //     select: 'name photo'
    // }).populate({
    //     path: 'tour',
    //     select: 'name'
    // })

    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next();
})

reviewSchema.statics.calcAverageRatings = async function(tourId){
  const stats = await this.aggregate([
        {
            $match: {tour : tourId}
        },
        {
            $group: {
                _id : '$tour',
                nRating : { $sum : 1 },
                avgRating: {$avg : '$rating'}
            }
        }
    ])
    console.log(stats);

   await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRatings,
        ratingsAverage: stats[0].avgRating,
    })
}

reviewSchema.post('save', function() {
    //this points to current review 
    this.constructor.calcAverageRatings(this.tour);

    
})

reviewSchema.pre(/^findOneAnd/, async function(next) {
    await this.findOne
})


const Review = mongoose.model('Review', reviewSchema)
module.exports = Review

