# google의 firebase 연동 프로젝트

- firebase.google.com 페이지를 통해서 프로젝트를 설정하고
- Realtime DB(Croud DB 로 업그레이드중) : Cloud DB를 사용하여 CRUD를 구현하기 위한 서비스
- Hosting : 홈페이지(static web)를 외부에서 접근할수 있도록 만들어주는 서비스
- firebase functions : node project를 firebase host에서 실행할수 있도록 지원하는 클라우드

## firebase 연동을 하기위해 tools을 설치

- firebase-tools : npm install -g firebase-tools
- npm install -g firebase-tools@latest

## 프로젝트를 firebase로 설정

- npm install firebase
- firebase 프로젝트 초기화 : firebase init

## 프로젝트 서버에 올리기

- firebase deploy

## 프로젝트를 로컬에서 테스트하기

- firebase serve

# nodejs에서 firebase Realtime database 연동

- npm install firebase
- npm install firebase-admin
- config 설정값 작성
- npm install moment : 날짜와 관련된 미들웨어
- npm install moment-timezone : 날짜 타임존 설정 미들웨어
