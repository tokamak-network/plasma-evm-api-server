const path = require("path");
const fs = require("fs");
const express = require("express");
const _ = require('lodash');
const Tx = require("ethereumjs-tx");

const Web3 = require("web3");
const httpProviderUrl = "http://127.0.0.1:8547";

const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));

const abiPath = path.join(__dirname, '..', '..', 'build', 'contracts', 'Stamina.json');
const abi = JSON.parse(fs.readFileSync(abiPath).toString()).abi;
const contract_address = "0x000000000000000000000000000000000000dead";
const contract = new web3.eth.Contract(abi, contract_address);

const app = express();
app.use(express.json());

app.post('/api/:signedTx', async(req, res, next) => {
  const privateKey = new Buffer('3b5cb209361b6457e068e7abdccbcc1d88e1e82d73074434f117d3bb4eab0481', 'hex');

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

app.get('/api/stamina/:method', async(req, res, next) => {
  const method = req.params.method;

  const values = Object.values(req.body.params)
  const checkMethod = await contract.methods[method](...values)
  
  if (!_.isUndefined(checkMethod.send)){ // check the method type
    let nonce;
    try {
      nonce = await web3.eth.getTransactionCount(req.body.msg.from);
    } catch (err) {
      return res.status(400).json({
      code: 1,
      message: err.message,
    });
    }
    let bytecode;
    try{
      bytecode = getBytecode(web3, abi, method, req.body.params);
    } catch(err) {
      return res.status(400).json({
        code: 2,
        message: err.message,
      });
    }
    // if msg.value is not defined, then value is set to 0
    let value;
    if (!_.isUndefined(req.body.msg.value) ){
      value = req.body.msg.value
    } else {
      value = 0;
    }

    const rawTx = {
      nonce: nonce,
      to: contract_address,
      value: value,
      data: bytecode,
      gasPrice: '22e9',
      gasLimit: 4700000
    };
    
    return res.status(200).json({
      code: 0,
      message: 'success',
      response: rawTx
    })

  } else { //when contract method is view function
    try {
      result = await checkMethod.call();
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

  // convert uint256 value to BN
  for (let i = 0; i < values.length; i ++){
    if (types[i] == 'uint256'){
      values[i] = new web3.eth.utils.toBN(values[i]).toString()
    }
  }
  const encodeParamters = web3.eth.abi.encodeParameters(types, values).slice(2);
  
  const bytecode = functionSelector.concat(encodeParamters);
  return bytecode;
}
