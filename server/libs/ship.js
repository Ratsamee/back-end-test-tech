const axios = require('axios');
const dbPool = require('../db');

class Ship {
  validateInput = (filter) => {
    const re = /^\d*(\.\d+)?$/;
    if (filter.weight && !filter.weight.match(re)) {
      throw 'weight must be integer';
    }
  }

  async getShipListByApi(payload) {
    const arrParams = [];
    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        const newKey = key.split(/(?=[A-Z])/).join('_').toLowerCase();
        arrParams.push(`${newKey}=${payload[key]}`);
      }
    });
    const params = arrParams.length > 0 ? `?${ arrParams.join('&') }` : '';
    const url = `https://api.spacexdata.com/v3/ships${params}`;

    let result = null;
    const response = await axios.get(url).catch((err) => { 
      console.log(err);
      return null;
    });

    if (response && response.data) {
      const data = response.data;
      result = data.map(r => {
        return {
          ship_type: r.ship_type,
          weight_kg: r.weight_kg,
          weight_lbs: r.weight_lbs,
          ship_name: r.ship_name,
          home_port: r.home_port,
          class: r.class
        };
      });
      
    }
    return result;
  }

  async getShipListByDatabase(key) {
    let result = null;
    // get ship list data from db
    const rows = await dbPool.query('SELECT * FROM spaceData where id = ? and DATEDIFF(fetchAt, NOW()) = 0', key);
    if (rows && rows.length !== 0) {
      result = JSON.parse(JSON.parse(JSON.stringify(rows))[0].spaceItem);
    }
    return result;
  }

  async insertShipData(key, shipData) {
    if (shipData) {
      await dbPool.query('INSERT INTO spaceData(id, spaceItem, fetchAt) values(?,?, now()) ON DUPLICATE KEY UPDATE spaceItem = ?', [key, JSON.stringify(shipData), JSON.stringify(shipData)]);
    }
  }

  async getShipTypeList() {
    let result = [];
    const url = 'https://api.spacexdata.com/v3/ships?filter=ship_type&sort=ship_type&order=asc';
    const response = await axios.get(url).catch((err) => { 
      console.log(err);
      return null;
    });
    if (response && response.data) {
      result = [...new Set(response.data.map(x => x.ship_type))];
    }
    return result;
  }
}

module.exports = Ship;
