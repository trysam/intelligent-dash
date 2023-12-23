const rna = require('../model/rna');
const cellDescription = require('../model/cellDescription');
const mongoose = require('mongoose');

const appRouter = require('express').Router();

appRouter.get('/', async (req, res) => {
    const rnaData = await rna.find();
    res.json(rnaData);
});

appRouter.get('/average-rna/:siteId', async (req, res) => {
    const siteId = req.params.siteId;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    console.log(startDate, endDate, siteId);
  
    if (!siteId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      const pipeline = [
        { 
            $match: { siteId: siteId, 
            date: { $gte: startDate, $lte: endDate } } }, // filter by site ID and dates
        { $group: { _id: { year: { $year: '$date' }, month: { $month: '$date' } }, avgRna: { $avg: '$rna' } } }, // group by year and month, calculate average RNA
      ];
  
      const results = await rna.aggregate(pipeline);
  
      if (!results.length) {
        return res.status(404).json({ error: 'No data found for given parameters' });
      }
  
      const averageRna = results.map(result => result.avgRna).reduce((a, b) => a + b) / results.length;
  
      return res.json({ siteId, startDate, endDate, averageRna });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

appRouter.get('/average-rna', async (req, res) => {
   
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
   
  
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      const pipeline = [
        { 
           $match: { date: { $gte: startDate, $lte: endDate } } }, // filter by site ID and dates
        { $group: { _id:{siteid: '$siteId', date: '$date'}, sumRna: { $sum: '$rna' } } }, // group by year and month, calculate average RNA
      ];
  
      const results = await rna.aggregate(pipeline);
  
      if (!results.length) {
        return res.status(404).json({ error: 'No data found for given parameters' });
      }
      
      let a = 0;
      const averageRnaBySite = results.reduce((obj, result) => {
        const id = JSON.stringify(result._id);
        obj[a++] = {...result._id, sumRna: result.sumRna };
        return obj;
      }, {});
  
  
      return res.json(averageRnaBySite);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  

appRouter.post('/', async (req, res) => {
    const rnaData = req.body;
    const rnaTimeSeries = new rna(rnaData);
    await rnaTimeSeries.save();
    res.json(rnaTimeSeries);
});

module.exports = appRouter;

 