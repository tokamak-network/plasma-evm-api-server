const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const _ = require('lodash');
const Tx = require("ethereumjs-tx");
const Web3 = require("web3");

// This is Rootchain RPC addresss, not plasma-chain.
const httpProviderUrl = "http://172.17.0.3:8545";
const wsProviderUrl = "ws://172.17.0.3:8546";
const wsProvider = new Web3.providers.WebsocketProvider(wsProviderUrl);

const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));

// Initial Parameters, Should replace or Other way.
const privateKey = new Buffer('', 'hex');
const rootchainAddr = '0x880ec53af800b5cd051531672ef4fc4de233bd5d'

// Abi files should Exist `plasma-evm-api-server/build/contracts'
// If no exist, Have to compile
const rootchainAbiPath = path.join(__dirname, '..', '..', 'build', 'contracts', 'RootChain.json');
const rootchainAbi = JSON.parse(fs.readFileSync(rootchainAbiPath).toString()).abi;
const rootchainContract = new web3.eth.Contract(rootchainAbi, rootchainAddr);

const app = express();
app.use(express.json())

app.post('/api/rootchain/:method', async(req, res, next) => {
  // get Nonce before send Tx
  let nonce;
  try {
    nonce = await web3.eth.getTransactionCount(req.body.msg.from);
  } catch (err) {
    return res.status(400).json({
      code: 1,
      message: err.message,
    });
  }

  const method = req.params.method;

  let bytecode;
  try{
    bytecode = getBytecode(web3, rootchainAbi, method, req.body.params);
  } catch(err) {
    return res.status(400).json({
      code: 2,
      message: err.message,
    });
  }

  let value;
  if (!_.isUndefined(req.body.msg.value) ){
    value = req.body.msg.value
  } else {
    value = 0;
  }

  if (!_.isUndefined(req.body.params)) params = Object.values(req.body.params);
  console.log(params)

  const rawTx = {
    nonce: nonce,
    to: rootchainAddr,
    value: value,
    data: bytecode,
    gasPrice: '22e9',
    gasLimit: 4700000
  };


  const tx = new Tx(rawTx);
  tx.sign(privateKey);
  const serializedTx = tx.serialize().toString('hex');

  try {
    web3.eth.sendSignedTransaction('0x' + serializedTx)
    .on('receipt', receipt => {
      return res.status(200).json({
        code: 0,
        message: 'success',
        response: {
          txhash: receipt.transactionHash,
        }
      });
    }).on('error', error => {
      return res.status(400).json({
        code: 5,
        message: error.message,
      });
    });
  } catch (err) {
    return res.status(400).json({
      code: 6,
      message: err.message,
    });
  }
});


app.get('/api/rootchain/:method', async(req, res, next) => {
  const method = req.params.method;

  try {
    result = await rootchainContract.methods[method].call();
    return res.status(200).json({
      code: 0,
      message: 'success',
      response: result
    })
  } catch (err) {
    return res.status(400).json({
      code: 1,
      message: err.message,
    });
  }  
});



app.get('/api/rootchain/:method/:parameter', async(req, res, next) => {
  const method = req.params.method;
  const param  = req.params.parameter;

  try {
    result = await rootchainContract.methods[method](param).call();
    return res.status(200).json({
      code: 0,
      message: 'success',
      response: result
    })
  } catch (err) {
    return res.status(400).json({
      code: 1,
      message: err.message,
    });
  }
});


app.listen(8080, async () => {
  console.log("Express listening 8080");
});


function getBytecode(web3, abi, methodName, params) {
  let method;
  for (let i = 0; i < abi.length; i++) {
    if (abi[i].name == methodName) {
      method = abi[i];
      break;
    }
  }

  const functionSelector = web3.eth.abi.encodeFunctionSignature(method);
  const types = [];
  for (let i = 0; i < method.inputs.length; i++) {
    types.push(method.inputs[i].type);
  }
  const values = Object.values(params);

  for (let i = 0; i < values.length; i ++){
    if (types[i] == 'uint256'){
      values[i] = new web3.eth.utils.toBN(values[i]).toString()
    }
  }
  const encodeParamters = web3.eth.abi.encodeParameters(types, values).slice(2);

  const bytecode = functionSelector.concat(encodeParamters);
  return bytecode;
}

async function getValue(web3, contract, name) {
  const result = await rootchainContract.methods[name]().call();
  return result;
}