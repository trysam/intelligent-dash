const mongoose = require('mongoose');

const cellSchema = new mongoose.Schema({
  cellId: {
    type: String,
    required: true
  },
  siteId: {
    type: String,
    required: true
  },
  siteClassification: {
    type: String
  },
  status: {
    type: String
  },
  siteOwner: {
    type: String
  },
  towerCoPartner: {
    type: String
  },
  city: {
    type: String
  },
  lga: {
    type: String
  },
  state: {
    type: String
  },
  region: {
    type: String
  },
  zone: {
    type: String
  },
  subZone: {
    type: String
  },
  vendor: {
    type: String
  }
});

const CellDescriptions = mongoose.model('CellDescriptions', cellSchema);

module.exports = CellDescriptions;