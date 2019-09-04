"use strict";
const db = require("../models");

module.exports = class MaterialsCotroller {

	constructor(){}

	/*getLaboratories(callback) {
   		db.laboratories.findAll({raw: true}).then(function (laboratories) {
			callback(laboratories, null);
    		});
	};*/

	getMaterialsFromLaboratory(laboratory_id, callback){

	}

	getMaterialInventory(material_id, callback){

	}

	createMaterial(material, callback){

	}

	updateMaterial(material, callback){

	}

	deleteMaterial(material_id, callback){

	}

	addItemToMaterialInventory(item, callback){

	}

	removeItemFromMaterialInventory(item_id, callback){

	}

}

exports.getMaterialsFromLaboratory = function(req, res){

}

exports.getMaterialInventory = function(req, res){

}

exports.createMaterial = function(req, res){

}

exports.updateMaterial = function(req, res){

}

exports.deleteMaterial = function(req, res){

}
