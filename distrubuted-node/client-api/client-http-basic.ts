#!/usr/bin/env node

import * as express from "express";
import fetch from "node-fetch";
import * as https from 'https';
import * as fs from "fs";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 3000;
const TARGET = process.env.TARGET || "localhost:4000";

const server = express();

const certOptions = {
  agent: new https.Agent({
    ca: fs.readFileSync(__dirname + '/../shared/tls/certificate.cert')
  })
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

server.get("/", async (req, res) => {
  const stockReq = await fetch(`https://${TARGET}/stock/products/42`, certOptions);
  const productData = await stockReq.json();

  res.status(200).json({
    client_pid: process.pid,
    product_data: productData,
  });
});

server.listen(PORT, HOST, () => {
  console.log("Client`s server is running on port:", PORT);
});
