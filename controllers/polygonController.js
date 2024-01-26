const Polygons = require('../db/schema/polygonsSchema')

const createPolygon = async (req, res) => {
    try {
        const { name, location, details } = req.body;
        const cretatedPolygons = await Polygons.create({
            name,
            location: {
              type: 'Polygon',
              coordinates: location.coordinates,
            },
            details,
          })
   
        res.status(201).json({"result":cretatedPolygons});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error',error });
      }
}

const updatePolygon = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, description =''} = req.body;
    
        const updatedPolygon = await Polygons.findByIdAndUpdate(
          id,
          {
            name,
            location: {
              type: 'Polygon',
              coordinates: location.coordinates,
            },
            description,
          },
          { new: true } 
        );
    
        if (!updatedPolygon) {
          return res.status(404).json({ message: 'Polygon not found' });
        }
    
        res.status(200).json({"message":updatedPolygon});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error});
      }

}

const getPolygon = async (req, res) => {
    try {
        const polygonId = req.params?.id;

        const polygonFound = await Polygons.findOne({_id:polygonId})
        if(polygonFound) return res.status(201).json({"result":polygonFound});
        
        res.status(404).json({message: 'Point not found'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error});    
    }

}

module.exports = {
    createPolygon,
    updatePolygon,
    getPolygon
}