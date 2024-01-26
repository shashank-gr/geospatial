const Points = require('../db/schema/pointsSchema')

const createPoint = async (req, res) => {
    try {
        const { name, location, details } = req.body;
        const cretatedPoint = await Points.create({
            name,
            location: {
              type: 'Point',
              coordinates: location.coordinates,
            },
            details,
          })
   
        res.status(201).json({"result":cretatedPoint});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error});
      }
      
}

const updatePoint = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, details='' } = req.body;
    
        const updatedPoint = await Points.findByIdAndUpdate(
          id,
          {
            name,
            location: {
              type: 'Point',
              coordinates: location.coordinates,
            },
            details,
          },
          { new: true } 
        );
    
        if (!updatedPoint) {
          return res.status(404).json({ message: 'Point not found' });
        }
    
        res.status(200).json({"message":updatedPoint});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error});
      }
}


const getPoint = async (req, res) => {
    try {
        const pointId = req.params?.id;

        const pointFound = await Points.findOne({_id:pointId})
        if(pointFound) return res.status(201).json({"result":pointFound});
        
        res.status(404).json({message: 'Point not found'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error});    
    }
}


module.exports = {
    createPoint,
    updatePoint,
    getPoint
}