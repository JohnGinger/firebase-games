const repeatTile = (tiles, tile, amount) => {
  new Array(amount).fill(0).forEach(() => {
    tiles.push(JSON.parse(JSON.stringify(tile)));
  });
};
export default repeatTile;

