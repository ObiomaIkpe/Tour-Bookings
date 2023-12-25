const customAPIError =require('../errors/customAPIError');

exports.deleteOne = Model => async (req, res, next) => {

   const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc){
        throw new  customAPIError(`no ${Model} found`, 404)
    }
           res.status(204).json({
           data: null
       })    
}


exports.updateOne = Model => async (req, res, next) => {

    const tour = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
         if (!doc){
        throw new customAPIError(`No tour with id:  ${req.params.id} `, StatusCodes.NOT_FOUND)
    }
            res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })    
 }

exports.getOne = (Model, populateOptions) => async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

if (doc){
    throw new customAPIError('no tour found with that ID', StatusCodes.NOT_FOUND)
}

res.status(StatusCodes.OK).json({
    data : {
       data: doc
    }
})

 }
 