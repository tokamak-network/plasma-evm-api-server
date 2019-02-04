# Stamina

관리자는 토큰 스왑 / 원아이디 입력 / 수정 등의 권한을 가지고 있다.
관리자의 키는 API 서버에서 관리된다.

- [토큰 배포](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%ED%86%A0%ED%81%B0-%EB%B0%B0%ED%8F%AC)
- [토큰 스와퍼 배포](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%ED%86%A0%ED%81%B0-%EC%8A%A4%EC%99%80%ED%8D%BC-%EB%B0%B0%ED%8F%AC)
- [가맹점 지정](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%EA%B0%80%EB%A7%B9%EC%A0%90-%EC%A7%80%EC%A0%95)
- [가맹점 해제](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%EA%B0%80%EB%A7%B9%EC%A0%90-%ED%95%B4%EC%A0%9C)
- [토큰 발행](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%ED%86%A0%ED%81%B0-%EB%B0%9C%ED%96%89)
- [토큰 소각](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%ED%86%A0%ED%81%B0-%EC%86%8C%EA%B0%81)
- [스와퍼 지정](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%EC%8A%A4%EC%99%80%ED%8D%BC-%EC%A7%80%EC%A0%95)
- [토큰 스왑](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%ED%86%A0%ED%81%B0-%EC%8A%A4%EC%99%91)
- [OneId 배포](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#oneid-%EB%B0%B0%ED%8F%AC)
- [OneId 생성](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#oneid-%EC%83%9D%EC%84%B1-1)
- [OneId 등록](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#oneid-%EB%93%B1%EB%A1%9D)
- [다른앱정보 추가](https://github.com/Onther-Tech/hanwha-api-doc/blob/master/source/includes/_operators.md#%EB%8B%A4%EB%A5%B8%EC%95%B1%EC%A0%95%EB%B3%B4-%EC%B6%94%EA%B0%80)



## Delegator 지정

```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'from' : '<address>',
        'params' : {
          'to': '<address>',
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
from |  Delegatee(수수료 수임 계정) | '0x491c9a23db85623eed455a8efdd6aba9b911c5df'
params | setDelegator 파라미터 | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'
params.to |  Delegator 주소(수수료 위임을 받을 계정) | '0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9'


### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
code | 성공 혹은 에러코드 | "0"
message | 성공 혹은 에러 메시지 | "success"
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"
<!-- <aside class="success">
Tx
</aside> -->


### HTTP Request

`POST /api/stamina/<method>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
token_id | 토큰 ID | "5b1dc864cb620b291350046a"

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->

## Deposit

```shell
curl "/api/stamina/<method>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'to': <address>
        'params' : {
          'from': <address>,
          'value': 
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

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->

## 토큰 발행

```shell
curl "/api/operators/token/<token_id>"
  -X POST
  -H "Content-Type: application/json; charset=utf-8"
  -d "{
        'method' : 'mint',
        'params' : {
          'owner' : '<oneID>',
          'amout' : '<amount>'
        }
      }"
```

> 위의 명령은 아래의 JSON 객체를 리턴한다:

```json
{
  "code": "<Error_Code>",
  "message": "<String>",
  "response":
    {"txhash" : "<String>"}
}
```

### HTTP Request

`POST /api/operators/token/<token_id>`

### URL Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
token_id | 토큰 ID | "5b1dc864cb620b291350046a"

### Query Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
owner | 토큰을 토큰을 발행할 대상의 원아이디 | "??"
amount | 발행할 토큰의 양 | "100000"

### Response Parameters

Parameter |  Description | Example
--------- |  ----------- | -----------
txhash | transaction id | "0xcff7a350908f2401bb91bd9f0b5fc572fce0e5de0e3c3eaa3b9556e41453afb3"

<!-- <aside class="success">
Tx
</aside> -->


