"use strict";
const db = require("../models");

module.exports = class MaterialsCotroller {

    constructor() {}

    getMaterialsFromLaboratory(laboratory_id, callback) {
        db.materials.findAll({
                raw: true,
                where: {
                    laboratory_id: laboratory_id
                },
                attributes: ['id', 'name', 'mark']
            }).then(materials => callback(materials, null))
            .catch(error => callback(null, error));
    }

    getMaterialInventory(material_id, callback) {
        db.inventory.findAll({
                raw: true,
                where: {
                    material_id: material_id
                },
                attributes: ['id', 'number', 'plaque', 'purchase']
            }).then(materials => callback(materials, null))
            .catch(error => callback(null, error));
    }

    createMaterial(material, callback) {
        db.materials.create(material, {
                include: [db.inventory]
            }).then(material => callback(material, null))
            .catch(error => callback(null, error));
    }

    updateMaterial(material_id, material, callback) {
        db.materials.update(material, {
                where: {
                    id: material_id
                }
            }).then(material => callback(material, null))
            .catch(error => callback(null, error));
    }

    deleteMaterial(material_id, callback) {
        db.materials.destroy({
                where: {
                    id: material_id
                }
            }).then(material => callback(material, null))
            .catch(error => callback(null, error));
    }

    addItemToMaterialInventory(item, callback) {
        db.inventory.create(item)
            .then(item => callback(item, null))
            .catch(error => callback(null, error));
    }

    removeItemFromMaterialInventory(item_id, callback) {
        db.inventory.destroy({
                where: {
                    id: item_id
                }
            }).then(item => callback(item, null))
            .catch(error => callback(null, error));
    }
}
