const ShipModel = require('../models/shipModel');

describe('ship type', () => {
  it('test ship type', async () => {
    const result = await ShipModel.getShipTypeList();
    expect(result).not.toBeNull();
  });
});

describe('ship list', () => {
  it('test ship list', async () => {
    const result = await ShipModel.getShipList({ ship_type: 'Tug'});
    expect(result).not.toBeNull();
  })
})

