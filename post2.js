const a = {
  a:123,
  b:234,
  c:345
}

console.log(a)
const b = JSON.stringify(a)
const c = JSON.parse(b)
console.log(b)
console.log(c)

const url = 'http://example.com/?name=John&age=30';

// URL의 쿼리 문자열 부분을 추출
const queryString = url.split('?')[1]; // "name=John&age=30"

// URLSearchParams 객체 생성
const params = new URLSearchParams(queryString);
console.log(params)