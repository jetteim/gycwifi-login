module.exports = () => {
  return {
    index: (request, response, next) => {
      response.render('index');
    }
  };
};
