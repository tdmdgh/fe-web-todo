# FE-WEB-TODO

## 1. TODOs - 추가 개선사항
- [ ] 변수명 바꾸기: 좀더 직관적이고, 일관성 있게
- [ ] Css 정리하기: border, background 수정
- [ ] Css 정리하기: 중복 제거(cascading활용)
- [ ] Css 정리하기: css파일 나누기
- [ ] Log class의 time 로직 구현: 
    - 사이드바 버튼을 누를 때마다, 모든 로그 들의 시간텍스트가 업데이트 되야됨
    - 그러기 위해서 Log_List를 만들어서 관리할까 생각중임
- [ ] 템플릿 모듈 이용해서 리펙토링
- [ ] 드래그 앤 드랍: 같은 칼럼내 이동
- [ ] 드래그 앤 드랍: 다른 칼럼내 이동
- [ ] 카테고리 이름 바꿀 때, 현재 엔터가 trigger임. input 태그 이외에 부분을 클릭하는 것으로 저장되는 것이 요구사항.
## 2. Term
**Work_Box: 카드 하나**  
**Category: 카테고리 이름과 Work_Box 리스트로 구성되어 있음.**  

## 3. HTML 구조
```bash
├── Header
│   ├── Title(Text)
│   └── Menu icon(Sidebar trigger)
└── Body
    ├── Category_list (Category 클래스 노드 리스트)
    │   ├── Category_header
    │   └── Work_Box_list (카드 노드 리스트)
    │       ├── Work_Box_Row(카드의 가로열)
    │       │   ├── Work_Box_Contents
    │       │   └── Work_Box_Icons(삭제, 수정 아이콘)
    │       └── Work_Box_Buttons(취소, 등록, 수정 버튼)
    ├── Modal
    ├── FBA
    └── Sidebar
        ├── Sidebar_Icon(닫기 버튼)
        └── Log_list
``` 

## 4. 설계
**현재 4개의 클래스를 기반으로 실행됨.**

### Work_box | 박스 클래스
변수: title, content, input_value(=title), textarea_value(=content), category(어디 카테고리에 속해 있는지 확인하기 위해), node(본인의 노드)  
기능: 등록 기능, content 수정 기능, 수정 취소 기능, 삭제 버튼 hover, input 체크 기능(빈문자열 확인)  


### Category | 칼럼 클래스
변수: title, Work_Box_list, node(본인의 노드)  
기능: Work_Box 추가 기능, 삭제 기능, 제목 수정 기능,  


### Modal | modal창 클래스  
생성 시기:   
1. work_box의 삭제기능을 누르는 경우
2. FAB를 눌러 Category를 추가하는 경우


type에 따라 display와 기능이 달라짐.
- 생성시기-1을 통해 생성될 경우, 선택된 work_box 삭제 기능
- 생성시기-2를 통해 생성될 경우, input태그를 이용해 사용자에게 입력값을 받아서 category 생성  


### Log | 이벤트 알림 클래스
action에 따라 텍스트 내용이 달라짐.
1. work_box 생성
2. category 생성
3. work_box 수정
4. category 수정
5. work_box 삭제
6. category 삭제
- [ ] 7.  work_box 이동 알림 (진행 중)