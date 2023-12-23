const e = require('cors');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSeriesSchema = new mongoose.Schema({
  siteId: {
    type: String, 
    required: true
  },
  cellId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  rna: {
    type: Number,
    required: true
  }
},{
    timestamps: true, // automatically track createdAt and updatedAt
    timeseries: { // configure time series properties
      timeField: 'date', // field used for time dimension
      metaField: { // define metadata fields
        siteId: 'siteId',
        cellId: 'cellId',
        date: 'date',
      },
      granularity: 'days', // daily aggregation
      expireAfterSeconds: 365 * 24 * 60 * 60, // expire data after a year      
    }
}
);

timeSeriesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

//set the shard key
timeSeriesSchema.index({ date: 1 }, { unique: true }); // create unique index on date to 
//ensures that no duplicate data points exist for the same date, cell, and site combination.

//create model from schema
const TimeSeries = mongoose.model('TimeSeries', timeSeriesSchema);

module.exports = TimeSeries;