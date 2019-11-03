"use strict";
const db = require("../models");

module.exports = class MaterialsController {

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
    db.laboratories.findOne({
        where: {
          id: material.laboratory_id
        },
        attributes: ['id'],
      })
      .then(laboratory => {
        if (laboratory) {
          db.materials.create(material, {
              include: [db.inventory]
            }).then(material => callback(material, null))
            .catch(error => callback(null, error));
        } else {
          callback(null, 'Laboratory not found')
        }
      })
      .catch(error => callback(null, error));
  }

  updateMaterial(material_id, material, callback) {
    if (material.laboratory_id) {
      db.laboratories.findOne({
          where: {
            id: material.laboratory_id
          },
          attributes: ['id']
        })
        .then(laboratory => {
          if (laboratory) {
            db.materials.update(material, {
                where: {
                  id: material_id
                }
              }).then(result => callback(result, null))
              .catch(error => callback(null, error));
          } else {
            callback(null, 'Laboratory not found');
          }
        })
        .catch(error => callback(null, error));
    } else {
      db.materials.update(material, {
          where: {
            id: material_id
          }
        }).then(result => callback(result, null))
        .catch(error => callback(null, error));
    }
  }

  deleteMaterial(material_id, callback) {
    db.materials.destroy({
        where: {
          id: material_id
        }
      }).then(result => callback(result, null))
      .catch(error => callback(null, error));
  }

  addItemToMaterialInventory(item, callback) {
    db.materials.findOne({
        where: {
          id: item.material_id
        },
        attributes: ['id']
      })
      .then(material => {
        if (material) {
          db.inventory.create(item)
            .then(item => callback(item, null))
            .catch(error => callback(null, error));
        } else {
          callback(null, 'Material not found')
        }
      })
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
