require("dotenv").config();

const http = require("http");
const path = require("path");
const fs = require("fs");

const Tx = require("ethereumjs-tx");

const Uint256 = require("uint256");

// const { ethers.utils } = require('ethers');
const ethers = require("ethers");
const Web3 = require("web3");
const BigNumber = require("bignumber.js")
const express = require("express");
const httpProviderUrl = "http://127.0.0.1:8547";
const wsProviderUrl = "ws://127.0.0.1:8546";
const web3_utils = require("web3-utils")


const DEFAULT_PAD_LENGTH = 2 * 32;


const wsProvider = new Web3.providers.WebsocketProvider(wsProviderUrl);

const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));

const app = express();

app.post('/stamina/', async(req, res, next) => {
  const abiPath = path.join(__dirname, '..', 'out', 'Stamina.json');
  const abi = JSON.parse(fs.readFileSync(abiPath).toString()).abi;

  const contract_address = "0x000000000000000000000000000000000000dead";

  const contract = new web3.eth.Contract(abi, contract_address);

  const from = "0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9";
  const privateKey = new Buffer('3b5cb209361b6457e068e7abdccbcc1d88e1e82d73074434f117d3bb4eab0481', 'hex');

  const method = 'open';


})