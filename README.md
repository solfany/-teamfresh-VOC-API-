## 프로젝트 소개 
물류사와 고객사에서 입입된 클레임건을 처리할 수 있는 VOC 처리 시스템 


## 요구 사항 
### VOC 목록 API
VOC 의 귀책 당사자, 귀책 내용, 패널티 내용, 기사 확인 여부, 이의제기 여부, 배상정보 등의 정보가 포함
### 배상 목록 API
배상정보의 VOC 정보, 배상금액 정보 등이 포함
### 공통
VOC 등록
패널티 등록
배송기사의 패널티 확인 여부 등록
배상정보 등록
배상정보의 부모정보인 VOC 정보를 참조할 수 있게 관계를 고려해서 개발

## 기술 스택 
- java 17
- Spring Boot 3.1.3
- Mysql 8.0.27
- React
- Javascript
- GitKarken


## 개발기간 
2023.10.15 ~ 2023.10.20 (5일간 진행)

## 테이블 스키마 
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/bad4e5b5-e673-4428-aa58-eb6194dd3158)


## 클래스 다이어그램
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/96b79977-47e2-46e8-b8e1-d66fe8a5ab25)

## 개발 방식 
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/6982fb70-48e4-4203-8d35-bfc60e895f2a)
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/76c265c7-ba37-41c5-bed5-6f852c653fef)
Github에서 프로젝트, 스프린트, 이슈, 마일스톤 사용하여 진행 


## 사용자 화면

### 메인 
<img width="1265" alt="스크린샷 2023-10-27 오후 3 29 42" src="https://github.com/solfany/VOC-API/assets/123814718/0adc40f7-6450-493b-b119-2aff9aa208c0">

### 로그인 
<img width="1265" alt="스크린샷 2023-10-27 오후 3 46 39" src="https://github.com/solfany/VOC-API/assets/123814718/0bd777fe-2d5e-45a3-bc85-72fa424196ff">


### 클레임 접수 
https://github.com/solfany/VOC-API/assets/123814718/814f9b20-6009-4f6a-b7f6-cddb583352b1

### 클레임 접수 목록
https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/93347d31-e120-4215-8940-a770645f2ace


### 이의제기
https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/a05ea284-c149-4ab4-b831-a4d9162da051


### 귀책인정

https://github.com/solfany/VOC-API/assets/123814718/b99f4d45-d0c0-4a1b-b174-d6451a2394ec

### 배상 상세정보

https://github.com/solfany/VOC-API/assets/123814718/953d1a35-7895-4af2-9cad-b9ac0a937c5f

### 회고 
프로젝트를 진행하면서 5일이라는 제한된 시간에 적응하려다 보니, 테이블 설계나 양방향 무한 참조와 같은 이슈에 부딪혔다. 더 많은 시간이 주어졌다면 더 품질 높은 로직을 만들 수 있었을 것이라는 아쉬움이 든다. 그럼에도 불구하고, 이 프로젝트에는 나의 애정이 깊이 담겨 있다.

데이터를 어떻게 분산 저장하고 처리할지, 대용량 트래픽에서도 시스템이 원활하게 동작하게 하려면 어떻게 해야 할지에 대한 깊은 고민을 할 수 있었던 시간이었다. 그 과정에서 많은 것을 배웠다.

지금까지 내가 관심있는 주제에 기반하여 개발을 진행해왔다면, 이번에는 주어진 요구사항을 바탕으로 개발하는 경험을 했다. 두 방식 모두 나에게는 새로운 도전과 자극을 주었다. 앞으로도 이런 다양한 경험을 계속해서 누리고 싶다.

