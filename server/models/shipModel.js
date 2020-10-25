const Ship = require('../libs/ship');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const ShipModel = {
  async getShipList(payload) {
    const ship = new Ship();
    payload.sort = payload.sort ? payload.sort : 'ship_name';

    // generate key by filter
    const keys = [];
    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        keys.push(`${key}-${payload[key]}`);
      }
    });
    const key = keys.join('|')
    ship.validateInput(payload);

    // get data from cache
    let shipData = myCache.get(key);
    if (shipData) {
      console.log('get data from cache');
      return shipData;
    }

    // get data from db
    shipData = await ship.getShipListByDatabase(key);
    if (!shipData) {
      // get data from api
      console.log('get api');
      shipData = await ship.getShipListByApi(payload);
      if (shipData) {
        // insert to db after fetch data from api
        await ship.insertShipData(key, shipData);
      }
    }

    if (shipData) {
      myCache.set(key, shipData, 60 * 60 * 24);
    }

    return shipData;
  },

  async getShipTypeList() {
    const key = 'shipType';
    let shipTypeData = myCache.get(key);
    
    if (shipTypeData) {
      return shipTypeData;
    }

    const ship = new Ship();
    shipTypeData = await ship.getShipTypeList();
    if (shipTypeData && shipTypeData.length > 0) {
      myCache.set(key, shipTypeData, 60 * 60 * 24);
    }

    return shipTypeData;
  }
};

module.exports = ShipModel;
