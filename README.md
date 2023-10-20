## TeamFresh [시스템개발3팀] 과제 
[시스템개발 3 팀] 백엔드/풀스택 개발자 api 개발하기 과제를 맡게 된 **김솔비** 라고 합니다.   
이번 과제를 진행하면서 5일이라는 시간이 있었습니다.     
요구 사항을 분석하다 보니 어떻게 시나리오를 적절하게 보여줄 수 있을까 라는 고민을 하게 되었고,     
부족하지만 백엔드 기반 풀스택 개발자의 역량을 짧은 시간안에 보여드리기 위해    
지난 프로젝트에서의 프론트 경험을 살려 Spring Boot와 React를 사용하여 구현해보게 되었습니다. 🤩    
요구사항과 시나리오를 분석하기 위해 그림으로도 설계를 해보고, DB 같은 경우 Mysql 워크밴치 다이어그램 기능을 유용하게 사용했습니다.     
해당 과제를 접하면서 실제 고객들이 접하는 로직을 직접 설계한다고 하니 완벽하고 정확하게 구현하고자 하는 욕심이 컸지만   
짧은 시간안에 개발하면서 DB 설계와 참조관계 등 많은 고민을 하며 개발하는 과정이 즐거웠던 과제였던 것 같습니다.    
추가적으로 해당 로직을 조금 더 수정하여 완벽한 로직과 깔끔한 코드로 구현해보고 싶습니다. 👏    


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

### 클레임 접수 
https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/0a1d8c05-312b-40b5-94e7-1efd305b37f1

### 클레임 접수 목록
https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/93347d31-e120-4215-8940-a770645f2ace


### 이의제기
https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/a05ea284-c149-4ab4-b831-a4d9162da051


### 귀책인정

https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/0ff8220f-bb37-4e9b-ba5c-9704c20038fa

### 배상 상세정보

https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/d81c5c46-40a2-4d70-880a-c450cba37946





