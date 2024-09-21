const ApiError = require('../api-error');
const ContactService = require('../services/contact.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the contact'));
    }
};
exports.findAll = async (req, res) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;

        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving contacts'));
    }
    return res.send(documents);
};
exports.findOne = (req, res) => {
    res.send({ message: 'findOne handler' });
};
exports.update = async (req, res) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `
        Error retrieving contact with id=${req.params.id}
        `,
            ),
        );
    }
};
exports.delete = (req, res) => {
    res.send({ message: 'delete handler' });
};
exports.deleteAll = (req, res) => {
    res.send({ message: 'deleteAll handler' });
};
exports.findAllFavorite = (req, res) => {
    res.send({ message: 'findAllFavorite handler' });
};
