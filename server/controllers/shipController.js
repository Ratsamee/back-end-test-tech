const ShipModel = require('../models/shipModel');

exports.getShipList = async (req, res) => {
  try {
    const filter = {
      shipType: req.query.shipType ? decodeURIComponent(req.query.shipType) : null, 
      weightKg: req.query.weightKg, 
      homePort: req.query.homePort ? decodeURIComponent(req.query.homePort) : null,
      sort: req.query.sort ? decodeURIComponent(req.query.sort) : null, // sort by field
      order: req.query.order ? decodeURIComponent(req.query.order) : null, // order by 'asc', 'desc'
      limit: req.query.limit,
      skip: req.query.skip
    };

    let order = filter.order;
    if (!order || order.trim().length === 0) {
      order = 'asc'; // default is asc
    }

    const result = await ShipModel.getShipList(filter);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(`There is no the ship data`);
    }

  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json('something went wrong');
  }
}

exports.getShipTypeList = async (req, res) => {
  try {
    const result = await ShipModel.getShipTypeList();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(`There is no the ship data`);
    }
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json('something went wrong');
  }
}