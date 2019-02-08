# Stamina

관리자는 토큰 스왑 / 원아이디 입력 / 수정 등의 권한을 가지고 있다.
관리자의 키는 API 서버에서 관리된다.

- [init](https://github.com/Onther-Tech/plasma-evm-api/blob/master/api/stamina/README.md#init)
- [Delegator 지정](https://github.com/Onther-Tech/plasma-evm-api/tree/master/api/stamina#delegator-%EC%A7%80%EC%A0%95)
- [Deposit](https://github.com/Onther-Tech/plasma-evm-api/blob/master/api/stamina/README.md#deposit)
- [addStamina](https://github.com/Onther-Tech/plasma-evm-api/blob/master/api/stamina/README.md#addStamina)
- [Delegatee확인](https://github.com/Onther-Tech/plasma-evm-api/blob/master/api/stamina/README.md#getDelegatee)
- [Stamina 잔량 확인](https://github.com/Onther-Tech/plasma-evm-api/blob/master/api/stamina/README.md#getStamina)


## init
init은 스태미나를 사용하기전 초기 값들을 세팅하는 함수이다. 세팅되어야 할 초기값은 최소 예치량, 회복주기, 인출기간이 있다.

```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params': {
          'minDeposit': '<String>',
          'recoveryEpoch': '<String>',
          'withdrawalDelay': '<String>',
        },
        'msg':{
          'from': '<address>',
          'gas': <String> 
        }
      }"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

// return 값 고려해야
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 메소드 명 | "init"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params | init 파라미터 | ['1e17', 10, 30]
params.minDeposit |  최소 예치량 | '1e17'
params.recoveryEpoch |  회복 주기 | '10'
params.withdrawalDelay |  인출 기간 | '30'
msg | msg 파라미터 | ['0x491c9a23db85623eed455a8efdd6aba9b911c5df']
msg.from |  owner 계정 | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'
msg.gas | gas비 | '2e6'


### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
code | 성공 혹은 에러코드 | "0"
message | 성공 혹은 에러 메시지 | "success"
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"
<!-- <aside class="success">
Tx
</aside> -->



## Delegator 지정
Delegatee가 수수료를 대신 납부해 줄 Delegator를 지정하는 과정

```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params': {
          'to': '<address>',
        },
        'msg': {
          'from': '<address>',
        }
      }"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

// return 값 고려해야
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 메소드 명 | "setDelegator"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params | setDelegator 파라미터 | ['0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9']
params.to |  Delegator 주소(수수료 위임을 받을 계정) | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
msg | Delegatee 파라미터 | ['0x491c9a23db85623eed455a8efdd6aba9b911c5df']
msg.from |  Delegatee(수수료 수임 계정) | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'


### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
code | 성공 혹은 에러코드 | "0"
message | 성공 혹은 에러 메시지 | "success"
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"
<!-- <aside class="success">
Tx
</aside> -->



## Deposit
수수료를 대납할 때 사용될 금액을 delegatee에 예치시키는 과정
```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params' : {
          'to': <address>
         },
         'msg': {
           'from': <address>,
           'value': <String>
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "deposit"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params | deposit 파라미터 | ['0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9']
params.to |  Delegatee 주소(수수료 대납 계정) | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
msg | msg 파라미터 | ['0x491c9a23db85623eed455a8efdd6aba9b911c5df','1e18']
msg.from |  Delegatee에 스태미나를 예치시킬 계정 | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'
msg.value | 스태미나로 예치할 금액의 양 | '1e18'

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->

## withdrawalRequest

```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'params': {
          'to': <address>,
          'value': <String>
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "withdrawalRequest"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params | deposit 파라미터 | ['0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9','1e18']
params.to |  Delegatee 주소(수수료 대납 계정) | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
params.amount | 인출할 금액 | '1e18'
msg | msg 파라미터 | ['0x491c9a23db85623eed455a8efdd6aba9b911c5df']
msg.from |  Delegatee에 예치된 스태미나를 되찾을 계정 | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->


## addStamina
// 보류
```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'from': <address>
        'params' : {
          'to': <address>,
          'value': <String>
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "addStamina"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
params | addStamina 파라미터 | ['0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9','1e18']
params.to |  Delegatee 주소 | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
params.value | 추가로 예치할 금액 | '1e18'
msg | msg 파라미터 | ['0x491c9a23db85623eed455a8efdd6aba9b911c5df']
msg.from |  Delegatee에 스태미나를 추가 할 계정 | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->


## subtractStamina
// 보류
```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'from': <address>
        'params' : {
          'to': <address>,
          'value': <String>
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

### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | 호출 할 함수명 | "subtractStamina"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
from |  Delegatee에 스태미나를 추가 할 계정 | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'
params | deposit 파라미터 | ['0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9','1e18']
params.to |  Delegatee 주소 | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
params.value | 추가로 예치할 금액 | '1e18'

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->


// Getter
## getDelegatee

이 요청은 해당 delegator의 delegatee를 조회한다.

```shell
curl "/api/stamina/<method>"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

```json
{
  "code": "<Error_Code>",
  "message": "<string>",
  "response": {
      "delegatee" : "<string>"
      }
}
```
<aside class="success">

</aside>


### HTTP Request

`GET /api/tokens/<method>/<delegator>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | method 명 | getDelegatee
delegator | delegator 주소 | "0x491c9a23db85623eed455a8efdd6aba9b911c5df"


### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
code | 성공 혹은 에러코드 | "0"
message | 성공 혹은 에러 메시지 | "success"
r.delegatee | delegatee의 주소 | "0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9"


## getStamina

이 요청은 해당 delegatee의 현재 stamina양을 조회한다.

```shell
curl "/api/stamina/<method>/<delegatee>"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

```json
{
  "code": "<Error_Code>",
  "message": "<string>",
  "response": {
      "delegatee" : "<string>"
      }
}
```
<aside class="success">

</aside>


### HTTP Request

`GET /api/tokens/<method>/<delegatee>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
method | method 명 | getStamina
delegatee | 스태미나를 확인할 delegatee | "0x491c9a23db85623eed455a8efdd6aba9b911c5df"


### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
code | 성공 혹은 에러코드 | "0"
message | 성공 혹은 에러 메시지 | "success"
r.stamina | 해당 delegatee가 현재 보유하고있는 stamina양 | "1e17"

