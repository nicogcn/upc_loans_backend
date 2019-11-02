"use strict";
const db = require("../models");

module.exports = class MaterialsCotroller {

  constructor() {}

  getMaterialsFromLaboratory(laboratory_id, callback) {
    db.laboratories.findOne({
        where: {
          id: laboratory_id
        },
        attributes: ['id'],
        include: [{
          model: db.materials,
          as: 'materials',
          attributes: ['id', 'name', 'mark'],
          include: [{
            model: db.inventory,
            as: 'inventories',
            attributes: ['id', 'number', 'plaque', 'purchase']
          }]
        }]
      })
      .then(laboratory => callback(laboratory, null))
      .catch(error => callback(null, error));
  }

  getMaterialInventory(material_id, callback) {
    db.materials.findOne({
        where: {
          id: material_id
        },
        attributes: ['id'],
        include: [{
          model: db.inventory,
          as: 'inventories',
          attributes: ['id', 'number', 'plaque', 'purchase']
        }]
      })
      .then(material => callback(material, null))
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
