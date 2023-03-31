// src/api/helpers/auth/index.js

import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const SECRET_TOKEN = serverRuntimeConfig.SECRET_TOKEN;
const SECRET_RTOKEN = serverRuntimeConfig.SECRET_RTOKEN;

// https://upstash.com/blog/authenticated-api-redis

export function generateAccessToken(payload) {
  return jwt.sign(payload, SECRET_TOKEN, {
    expiresIn: "1h",
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, SECRET_RTOKEN, {
    expiresIn: "30d",
  });
}

export async function tokenRefresh(refreshtoken, res) {
  var decoded = "";
  try {
    decoded = jwt.verify(refreshtoken, SECRET_RTOKEN);
  } catch (error) {
    return res.status(401).send("Can't refresh. Invalid Token");
  }
  if (decoded) {
    try {
      const payload = {
        id_user: decoded.id_user,
        username: decoded.username,
      };
      const token = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return {
        access: token,
        refresh: refreshToken,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export async function verifyToken(token, res) {
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    return decoded;
  } catch (err) {
    return res.status(405).send("Token is invalid");
  }
}
