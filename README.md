# Fitness recoder

## TODO list
1. add alert, confirm provider - Done!
3. update ui/ux
4. categorize workout
5. manage workout preset

## featured
1. save / load recode data as json file
2. record training data with 
3. display recorded data by date or workout type
4. create graph of progress

## 개발 환경 설정

* OS: macOS Mojave
* IDE: Visual Studio Code
* Node version: v18
* Library: React, Zustand, MobX

## 사용법

1. https://cjhih456.github.io/fitness-recoder으로 접속한다.
2. 운동할 

## 화면 구성
1. 메인 - 달력형식 -- done
  - 운동한 날에는 숫자 아래에 운동 횟수를 점으로 표시
  - 쉬는 날의 경우 특수 색으로 글자를 표시 (warning-500, font: content3)
  - 달력에서 오늘의 경우 강조 필요 (success-300)
  - 달력에서 특정 날짜를 선택하면 하단에 해당 날짜의 내역을 보여줌
    - 운동 안한 날인 경우
      - 운동하지 않음 표시, 운동 추가 / 쉬는 날 지정 버튼 표시
    - 운동 진행중 인 경우
      - 운동추가
    - 운동 한 날인 경우
      - 운동시간, 종류, 운동 부위별 총 무개를 보여줌
2. 특정 날짜의 운동 기록 - 예정인/기록된 운동 목록
  - 운동의 detail한 일정정보를 볼 수 있다. - done
  - 운동을 추가를 위해 [운동 리스트 - 운동 추가용]가 dialog 형식으로 뛰어진다. - done
  - 운동을 완료한 경우 체크박스를 표시하고, 상태를 저장한다. - done
  - 선택한 날짜가 오늘이 아닌 경우 변경 작업을 할 수 없다.
  - 운동 제목을 클릭하면 운동의 상세정보를 볼 수 있다. -> 6번 사항
3. 저장 => 다이얼로그
  - json 파일에서 데이터를 불러오거나, save할 수 있다.
4. 운동 리스트 -- done
  - 기록 가능한 운동들의 목록을 확인할 수 있습니다. - done
  - 선택하면 detail 화면이 나오고 detail에서는 운동의 설명데이터를 확인할 수 있다.
5. 운동 리스트 - 운동 추가용 -- done
  - 추가하고자 하는 운동을 선택하여 상단에 추가 버튼을 눌러 추가할 수 있다.
6. 운동 상세정보 => 다이얼로그 형식
  - 운동 리스트에서 운동 이름, 이미지영역을 누른경우 보여진다.
  - 운동의 설명데이터를 확인할 수 있습니다.
7. 통계 페이지
  - 각 부위별 운동량을 그래프로 표시
8. Preset 설정 화면
  - 운동 목록을 만들어 놓고 template처럼 복사할 수 있다.
  - 기존의 완료한 운동 목록을 preset으로 만들 수 도 있다.


### Reference
- exercise list : https://github.com/wrkout/exercises.json/blob/master/CONTRIBUTING.md
