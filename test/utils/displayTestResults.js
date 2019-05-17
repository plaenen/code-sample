module.exports = (result) => {
  // Can be extended with flags to display or hide results in unit tests
  console.log(JSON.stringify(result, null, 2));
};
