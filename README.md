## 사전에 필요한 설치
- Docker 설치 - https://hub.docker.com/editions/community/docker-ce-desktop-mac
- pgAdmin 설치 -- https://pgadmin.org/download 방문. pgAdmin 4 > macOs 선택 -> pgAdmin 4 최신버젼 설치

## 실행
1. 최초 실행 전에 todo 데이터를 저장할 db를 실행
```shell
$ yarn db:run
```
2. todo-app server 실행
```shell
$ yarn start:dev
```
3. todo-app 종료 시 db도 종료하면 좋음
```shell
$ yarn docker ps
$ docker stop todo-postgres-app
```

## 참고
### Postgres
- https://postgresapp.com/downloads.html 방문. Latest Release version download

#### Docker
- https://www.youtube.com/watch?v=RdPYA-wDhTA

#### 배포 참고
- https://bakjuna.tistory.com/95
