## Getting Started

1. 프로젝트 root에서 패키지 설치
```bash
$ yarn
```
2. 프로젝트 구동
```bash
$ yarn start:dev
```
3. `localhost:3001` 으로 서버가 뜸

## Api
`src/todos/totos.controller.ts` 에서 확인 가능

- 기본 인터페이스
```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
```

- 모든 todo 가져오기
  - method: Get
  - uri: `todos/`
  - requestParms: 없음
  - response: `TODO[]`
- 특정 id를 가진 todo 가져오기
  - method: Get
  - uri: `todos/{id}`
  - requestParms: 없음
  - response: `TODO`
- todo 생성하기
  - method: Post
  - uri: `todos/`
  - requestParams
  ```json
  {
    title: string
    description: string
  }
  ```
  - response: `TODO`
- todo 제거하기
  - method: Delete
  - uri: `todos/{id}`
  - requestParams: 없음
  - response: `TODO`
- todo 상태 업데이트 하기
  - method: Delete
  - uri: `todos/{id}/status`
  - requestParams: TodoStatus
  - response: `TODO`
