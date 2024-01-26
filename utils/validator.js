const Ajv = require('ajv')

const validateSchemas = {
    "point": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "minLength": 1
            },
            "location": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["Point"]
                    },
                    "coordinates": {
                        "type": "array",
                        "items": { "type": "integer" },
                        "maxItems": 2,
                        "minItems": 2
                    }
                },
                "additionalProperties": false,
                "required": ["type", "coordinates"]
            },
            "details": {
                "type": "string"
            }
        },
        "additionalProperties": false,
        "required": ["name", "location"]
    },
    "polygon": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "minLength": 1
            },
            "location": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["Polygon"],
                        "default": "Polygon"
                    },
                    "coordinates": {
                        "type": "array",
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": { "type": "number" },
                                "maxItems": 2,
                                "minItems": 2
                            },
                            "minItems": 4
                        },
                        "minItems": 1
                    }
                },
                "required": ["type", "coordinates"],
                "additionalProperties": false
            },
            "description": {
                "type": "string",
                "default": ""
            }
        },
        "required": ["name", "location"],
        "additionalProperties": false
    }


}

module.exports = function (schemaName) {
    return (req, res, next) => {
        const ajv = new Ajv()
        const validate = ajv.compile(validateSchemas[schemaName]);

        if (validate(req.body)) {
            next();
        } else {
            res.status(400).json({ "message": validate.errors });
        }
    };
}