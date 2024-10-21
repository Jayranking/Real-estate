const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const Buy = require("../models/buy");
const Build = require('../models/build');

module.exports = {
  dashboard: (req, res) => {
    res.render("dashboard");
  },

  view_buy_property: async(req, res) => {
    const context = {};
    try {
      const _listedBuy = await Buy.find();
      context['listedBuy'] = _listedBuy;
      
      return res.render("buy", {context, res});
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },
  post_buy_property: async(req, res) => {
    const {
      estate_name,
      location,
      amount,
      description,
      phone_no,
      email,
      bedroom,
      sitting_room,
      kitchen,
      toilet,
    } = req.body;

    // Regex for validation
    const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
    const amountReg = /^[0-9]+$/;
    const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;
    const phone_noReg = /^[0-9]+$/;
    const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

    try {
      const img = req.file ? req.file.filename : null;
      // Validation checks
      if (!estate_nameReg.test(estate_name)) {
        throw new Error("Estate name is required");
      }

      if (!locationReg.test(location)) {
        throw new Error("Location is required");
      }

      if (!amountReg.test(amount)) {
        throw new Error("Amount is required");
      }

      if (!descriptionReg.test(description)) {
        throw new Error("Description is required");
      }

      if (!phone_noReg.test(phone_no)) {
        throw new Error("Phone number is required");
      }

      if (!emailReg.test(email)) {
       throw new Error("Email is required");
      }

      if (!amountReg.test(bedroom)) {
        throw new Error("Enter number of bedroom");
      }

      if (!amountReg.test(sitting_room)) {
        throw new Error("Enter number of sitting room");
      }

      if (!amountReg.test(kitchen)) {
        throw new Error("Enter number of kitchen");
      }

      if (!amountReg.test(toilet)) {
        throw new Error("Enter number of toilet");
      }

      // db
      const buy = await Buy.create({
        estate_name,
        location,
        amount,
        description,
        phone_no,
        email,
        bedroom,
        sitting_room,
        kitchen,
        toilet,
        img
      });
      console.log(buy);
      return res.status(200).json({
        success: true,
        msg: "Building published successfully",
        redirectURL: '/buy'
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  view_edit_buy: async(req, res) => {
    const context = {};
    try {
      const _buyById = await Buy.findOne({_id: req.query.buyId})
      context['buy'] = _buyById

      return res.render("edit_buy", {res, context});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  edit_buy_property: async(req, res) => {
    const {
      buyId,
      estate_name,
      location,
      amount,
      description,
      phone_no,
      email,
      bedroom,
      sitting_room,
      kitchen,
      toilet,
    } = req.body;

    // Regex for validation
    const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
    const amountReg = /^[0-9]+$/;
    const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;
    const phone_noReg = /^[0-9]+$/;
    const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

    try {
      const img = req.file ? req.file.filename : null;
      // Validation checks
      if (!estate_nameReg.test(estate_name)) {
        throw new Error("Estate name is required");
      }

      if (!locationReg.test(location)) {
        throw new Error("Location is required");
      }

      if (!amountReg.test(amount)) {
        throw new Error("Amount is required");
      }

      if (!descriptionReg.test(description)) {
        throw new Error("Description is required");
      }

      if (!phone_noReg.test(phone_no)) {
        throw new Error("Phone number is required");
      }

      if (!emailReg.test(email)) {
       throw new Error("Email is required");
      }

      if (!amountReg.test(bedroom)) {
        throw new Error("Enter number of bedroom");
      }

      if (!amountReg.test(sitting_room)) {
        throw new Error("Enter number of sitting room");
      }

      if (!amountReg.test(kitchen)) {
        throw new Error("Enter number of kitchen");
      }

      if (!amountReg.test(toilet)) {
        throw new Error("Enter number of toilet");
      }

      // db
      const buy = await Buy.findOneAndUpdate({_id: buyId},{
        estate_name,
        location,
        amount,
        description,
        phone_no,
        email,
        bedroom,
        sitting_room,
        kitchen,
        toilet,
        img
      });
      console.log(buy);
      return res.status(200).json({
        success: true,
        msg: "Post edited successfully",
        redirectURL: '/buy'
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
 
  view_build_property: async(req, res) => {
    const context = {};
    try {
      const _listedBuild = await Build.find();
      context['listedBuild'] = _listedBuild;
      
      return res.render("build", {res, context});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  post_build_property: async(req, res) => {
    const {
      estate_name,
      location,
      amount,
      land_size,
      phone_no,
      email,
      description,
    } = req.body;

    // Regex for validation
    const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
    const amountReg = /^[0-9]+$/;
    const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;
    const phone_noReg = /^[0-9]+$/;
    const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

    try {
      const land_img = req.files['land_img'] ? req.files['land_img'][0].filename : null;
      const plan_img = req.files['plan_img'] ? req.files['plan_img'][0].filename : null;

      // Validation checks
      if (!estate_nameReg.test(estate_name)) {
        throw new Error("Estate name is required");
      }

      if (!locationReg.test(location)) {
        throw new Error("Location is required");
      }

      if (!amountReg.test(amount)) {
        throw new Error("Amount is required");
      }

      if (!amountReg.test(land_size)) {
        throw new Error("Land size is required");

      }

      if (!phone_noReg.test(phone_no)) {
        throw new Error("Phone number is required");
      }

      if (!emailReg.test(email)) {
       throw new Error("Email is required");
      }

      if (!descriptionReg.test(description)) {
        throw new Error("Description is required");
      }

      // db
      const build = await Build.create({
        estate_name,
        location,
        amount,
        land_size,
        phone_no,
        email,
        description,
        land_img,
        plan_img
      });
      console.log(build);
      return res.status(200).json({
        success: true,
        msg: "Land property published successfully",
        redirectURL: '/build'
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  view_edit_build: async(req, res) => {
    const context = {}
    try {
      const _buildById =  await Build.findOne({_id: req.query.buildId})
      context['build'] = _buildById
      return res.render("edit_build", {res, context});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  edit_build_property: async(req, res) => {
    const {
      buildId,
      estate_name,
      location,
      amount,
      land_size,
      phone_no,
      email,
      description,
    } = req.body;

    // Regex for validation
    const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
    const amountReg = /^[0-9]+$/;
    const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;
    const phone_noReg = /^[0-9]+$/;
    const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

    try {
      const land_img = req.files['land_img'] ? req.files['land_img'][0].filename : null;
      const plan_img = req.files['plan_img'] ? req.files['plan_img'][0].filename : null;

      // Validation checks
      if (!estate_nameReg.test(estate_name)) {
        throw new Error("Estate name is required");
      }

      if (!locationReg.test(location)) {
        throw new Error("Location is required");
      }

      if (!amountReg.test(amount)) {
        throw new Error("Amount is required");
      }

      if (!amountReg.test(land_size)) {
        throw new Error("Land size is required");

      }

      if (!phone_noReg.test(phone_no)) {
        throw new Error("Phone number is required");
      }

      if (!emailReg.test(email)) {
       throw new Error("Email is required");
      }

      if (!descriptionReg.test(description)) {
        throw new Error("Description is required");
      }

      // db
      const build = await Build.findOneAndUpdate({_id: buildId},{
        estate_name,
        location,
        amount,
        land_size,
        phone_no,
        email,
        description,
        land_img,
        plan_img
      });
      console.log(build);
      return res.status(200).json({
        success: true,
        msg: "Post edit successfully",
        redirectURL: '/build'
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  list_buy_property: (req, res) => {
    res.render("buyForm");
  },

  list_build_property: (req, res) => {
    res.render("buildForm");
  },

  get_login: (req, res) => {
    res.render("login");
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pwdReg = /^(?:[0-9A-Za-z!@#$%^&*()\-+=_{}\[\]|:;"'<>,.?\\/ ])+$/;

    try {
      if (!emailReg.test(email)) {
        throw new Error("Invalid email address");
      }

      if (!pwdReg.test(password)) {
        throw new Error("Incorrect password");
      }

      // invoke the static login method
      const isLoggedIn = await Admin.login(email, password);

      if (isLoggedIn) {
        // Generate JWT token
        const token = jwt.sign(
          { id: isLoggedIn._id },
          process.env.TOKEN_SECRET,
          { expiresIn: 1000 * 60 * 60 * 24 }
        );
        // console.log(token);

        // send JWT to cookie
        res.cookie("jwt", token, { maxAge: 4000 * 60 * 60 });

        return res.status(200).json({
          success: true,
          msg: "Login Successfully",
          redirectURL: "/dashboard",
          admin: isLoggedIn,
        });
      }
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  register_admin: async (req, res) => {
    const { fullname, email, phone_no } = req.body;

    const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneReg = /^0[1-9]\d{9}$/;

    try {
      if (!fullnameReg.test(fullname)) {
        throw new Error("Invalid name format");
      }

      if (!emailReg.test(email)) {
        throw new Error("Invalid email address");
      }

      if (!phoneReg.test(phone_no)) {
        throw new Error("Invalid phone number input");
      }

      // Create user and put in db
      const admin = await Admin.create({
        fullname,
        email,
        phone_no,
        password: "Password@2",
      });
      console.log(admin);

      return res.status(200).json({
        success: true,
        msg: "Account created successfully",
        redirectURL: "/sign-in",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  admin_logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/sign-in");
  },

  delete_buy_post: async (req, res) => {
    const { post_id } = req.body
    try {
        if (post_id == "") {
            throw Error('Invalid Data')
        }
        const _deletePost = await Buy.findOneAndDelete({ _id: post_id })
        return res.status(200).json({ success: true, msg: 'Post deleted Successfully', redirectURL: '/buy' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
  },

  
  delete_build_post: async (req, res) => {
    const { post_id } = req.body
    try {
        if (post_id == "") {
            throw Error('Invalid Data')
        }
        const _deletePost = await Build.findOneAndDelete({ _id: post_id })
        return res.status(200).json({ success: true, msg: 'Post deleted Successfully', redirectURL: '/build' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
  },
};
