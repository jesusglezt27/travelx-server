
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User.model");

const saltRounds = 10;

exports.signupCtrl = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    console.log(" ess req.body", req.body)
    if (email === "" || password === "" || username === "") {
      res
        .status(400)
        .json({ messageError: "Por favor manda los datos completos" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({
          messageError:
            "Por favor manda correo valido por ejemplo demo@example.com",
        });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res
        .status(400)
        .json({
          messageError:
            "La contraseña debe contener almenos 6 caracteres, un numero, una minuscula y una mayuscula",
        });
      return;
    }


    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ messageError: "Este usuario ya existe" });
      return;
    }

    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const {
      email: emailCreated,
      username: usernameCreated,
      _id,
    } = await User.create({ email, username, password: hashedPassword });

    const payload = {
      email: emailCreated,
      username: usernameCreated,
      _id,
    }
    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {algorithm:"HS256",expiresIn:"6h"}
  )

  res.status(200).json({authToken})

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ messageError: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        messageError: "El correo electronico ya esta en uso",
      });
    }
    return res.status(500).json({ messageError: error.message });
  }
};



exports.loginCtrl = async(req,res,next)=>{
    try {
        //validar que nos manden los datos
        if(req.body.email === "" || req.body.password === ""){
            res.status(400).json({messageError:"Por favor agrega los datos correctos"})
            return;
        }

        /*if para validar el password con el regex
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            if (!passwordRegex.test(req.body.password)) {
            res
                .status(400)
                .json({
                messageError:
                    "La contraseña debe contener almenos 6 caracteres, un numero, una minuscula y una mayuscula",
                });
            return;
            }
        */
        
        const foundUser = await User.findOne({email:req.body.email})
        
        if(!foundUser){
            res.status(401).json({messageError:"Usuario no encontrado"})
            return;
        }

        const passwordCorrect = bcryptjs.compareSync(req.body.password, foundUser.password)

        if(passwordCorrect){
            //evito usar toObject() y asi limpio mi password para no mandarlo
            const { _id, email,username} = foundUser

            //Creare mi payload (osea la info que se guardara en el JWT)
            const payload = { _id,email,username}

            //crear el JWT

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {algorithm:"HS256",expiresIn:"6h"}
            )

            res.status(200).json({authToken})

        }else{
            res.status(401).json({messageError:"Usuario no encontrado"})
            return;
        }


    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
              messageError: "Error en el Login",
            });
          }
          return res.status(500).json({ messageError: error.message });
    }
}


exports.verifyCtrl = (req,res,next)=>{
    res.status(200).json(req.payload)
}