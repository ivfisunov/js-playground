#!/usr/bin/env node

import * as express from "express";
import * as https from "https";
import * as fs from "fs";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 4000;

//
console.log("Stock started. PID:", process.pid);

const server = express();

server.get("/stock/products/:id", (req, res) => {
  console.log("Worker request pid:", process.pid);
  const id = Number(req.params.id);
  if (id !== 42) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.status(200).json({
    stock_pid: process.pid,
    product: {
      id,
      category: "Computers",
      name: "Macbook Pro 16",
      specification: [
        { id: 1, cpu: "I9", manufacturer: "Intel" },
        { id: 2, storage: "SSD", manufacturer: "Samsung" },
      ],
    },
  });
});

const secureOptions: https.ServerOptions = {
  key: fs.readFileSync(__dirname + "/tls/private-key.key"),
  cert: fs.readFileSync(__dirname + '/../shared/tls/certificate.cert'),
};

https.createServer(secureOptions, server).listen(PORT, HOST, () => {
  console.log("Stock server started. Port:", PORT);
});

/*
openssl req -nodes -new -x509 
-keyout stock-api/tls/private-key.key 
-out shared/tls/certificate.cert 
-extensions san 
-config <(
  echo "[req]"; 
  echo distinguished_name=req; 
  echo "[san]"; 
  echo subjectAltName=DNS:localhost,IP:127.0.0.1
) 
-subj "/CN=example.com"

! with config file
openssl req -nodes -new -x509 
-keyout stock-api/tls/private-key.key 
-out shared/tls/certificate.cert 
-extensions san 
-config openssl.conf
*/