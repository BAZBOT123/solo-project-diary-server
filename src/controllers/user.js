const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const key = process.env.KEY;
const saltRounds = 10;

const createUser = async (req, res) => {
  console.log("hello", req.body)
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(3).max(30).required(),
      confirm_password: Joi.ref('password'),
      firstName: Joi.string().min(1).max(15).required(),
      lastName: Joi.string().min(1).max(15).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400);
      res.json({ error: error.details[0].message });
      return;
    }

    const { username, password, email, firstName, lastName } = value;
    const userByEmail = await prisma.profile.findUnique({ where: { email } });
    const userByUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (userByEmail) {
      res.status(406);
      res.json({ error: 'This email is already exists' });
      return;
    }
    if (userByUsername) {
      res.status(406);
      res.json({ error: 'This username is already exists' });
      return;
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hash,
        profile: {
          create: {
            firstName,
            lastName,
            email,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    res.json({ data: createdUser });
  } catch (e) {
    return res.json({ err: e.message });
  }
};

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, key);
        res.json({ token });
      } else {
        res.status(404);
        res.json({ error: 'username or password is incorrect' });
      }
    } else {
      res.status(404);
      res.json({ error: 'username or password is incorrect' });
    }
  } catch (e) {
    return res.json({ err: e.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.userId) },
      include: {
        profile: true,
      },
    });
    res.json({ user });
  } catch (e) {
    return res.json({ err: e.message });
  }
}

module.exports = { createUser, loginUser, getUser }  