const Buy = require("../models/buy");
const Build = require('../models/build');

module.exports = {
  index: async(req, res) => {
    const context = {};
    try {
        const _buy = await Buy.find()
        context['buy'] = _buy

        const _build = await Build.find()
        context['build'] = _build

      return res.render("index", {res, context});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
  },
 
  view_build: async(req, res) => {
    const context = {}
    try {
      const _listedBuild = await Build.findOne({_id: req.query.build_id});
      
      context['listedBuild'] = _listedBuild;
      console.log(_listedBuild);
       
      res.render("view_build", {res, context});
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  view_buy: async(req, res) => {
    const context = {}
    try {
      const _listedBuy = await Buy.findOne({_id: req.query.buy_id});
      
      context['listedBuy'] = _listedBuy;
       
      res.render("view_buy", {res, context});
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
};
 