# Rootchain

이더리움 메인넷에 배포된 컨트렉트로서, 메인체인과 플라즈마체인사이 이더/토큰이 이 컨트렉트를 통해 이동한다.

Rootchain(mainnet) --> Childchain(plasma-evm) 이동은 `Enter`.

Childchain(plasma-evm) --> Rootchain(mainnet) 이동은 `Exit`.


## MappingContract 
토큰의 경우는 `mapRequestableContractByOperator` 를 통해서 Rootchain <-> Childchain의 토큰 컨트렉 주소를 매핑해주어야 한다.
(이더리움 자산 이동에는 해당 과정이 필요 없음)

```shell
curl "/api/rootchain/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params' : {
          'rootchainToken' : <address>,
          'childchainToken': <address>
         },
         'msg': {
           'from': <address>
         }
      }"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

```json
{
  "code": "<Error_Code>",
  "message": "<String>",
  "response":
    {
      "txhash" : "<String>"
    }  
}
```

## Enter

```shell
curl "/api/rootchain/startEnter"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params' : {
          'isTransfer' : <boolean>,
          '_to': <address>,
          '_trieKey' : <bytes32>,
          '_trieValue: <bytes32>,
         },
         'msg': {
           'from': <address>,
           'value': <uint256>
         }
      }"
```

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "startEnter"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params.isTransfer |  Ether 전송 여부 | false
params.to | Requestable Token Address on RootChain | '0x2139b5baf855eee55cdb5f19df50583585581ead'
params._trieKey | User Account Triekey on RootChain(Bytes32) | '0x8b49671235dc6a8145169c5ded903d7f561803b04a91f606e657452210902722'
params._trieValue | Enter Amount of Token from RootChain to ChildChain(Bytes32) | '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000' ( == 1 ether to wei )
msg.from |  User Account in RootChain | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'

- `TrieKey`는 RequestableToken Contract의 `getBalanceTrieKey` method를 사용하여 얻는다.
    ```Solidity
      // User can get the trie key of one's balance and make an enter request directly.
      function getBalanceTrieKey(address who) public pure returns (bytes32) {
          return keccak256(bytes32(who), bytes32(2));
      }
    ```

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"


## Exit

```shell
curl "/api/rootchain/startExit"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params' : {
          '_to': <address>,
          '_trieKey' : <bytes32>,
          '_trieValue: <bytes32>,
         },
         'msg': {
           'from': <address>,
           'value': <uint256>
         }
      }"
```

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "startExit"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params._to | Requestable Token Address on RootChain | '0x2139b5baf855eee55cdb5f19df50583585581ead'
params._trieKey | User Account Triekey on RootChain(Bytes32) | '0x8b49671235dc6a8145169c5ded903d7f561803b04a91f606e657452210902722'
params._trieValue | Exit Amount of Token from ChildChain(Bytes32) | '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000' ( == 1e18 to wei )
msg.from |  User Account on RootChain | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'
msg.value | Cost of ERO | '1e17'

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0x54de3260b0ec82a5c0dba4f241a4ecc20fec8a03c2f2ffa9c0410035a55a2932"