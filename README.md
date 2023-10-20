## TeamFresh [시스템개발3팀] 과제 
voc - api 개발하기

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

## 테이블 스키마 
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/bad4e5b5-e673-4428-aa58-eb6194dd3158)



## 클래스 다이어그램
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/96b79977-47e2-46e8-b8e1-d66fe8a5ab25)

## 개발 방식 
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/6982fb70-48e4-4203-8d35-bfc60e895f2a)
![image](https://github.com/solfany/TeamFresh-VOC-API/assets/123814718/76c265c7-ba37-41c5-bed5-6f852c653fef)
Github에서 프로젝트, 스프린트, 이슈, 마일스톤 사용하여 진행 
