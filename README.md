# Fitness recoder

## TODO list
1. update ui/ux
2. categorize workout

## featured
1. clone schedule & preset
2. save / load recode data as json file
3. record training data with 
4. display recorded data by date or workout type
5. create graph of progress

## Development Environment

* OS: macOS Mojave
* IDE: Visual Studio Code
* Node version: v20
* Library: React, Sqlite3(Worker), Graphql(Service worker), Storybook, Jest

## When you develop more?
1. This Project are need to use HTTPS protocol. Because of opfs, that is depends on Browser security.
2. If you don't want to use opfs just reconfig vite.config.js
3. If you want use opfs. Follow this command. That will be make self signed ssl.
```
On Mac book's terminal
mkdir ./ssl
openssl req -x509 -out ./ssl/server.crt -keyout ./ssl/server.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

## Preview

1. Connect to https://cjhih456.github.io/fitness-recoder/

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
    -> 기록된 이력은 sqlite형태로 opfs에 저장 중!
    -> 백업 필요시 json타입으로 db의 총 데이터를 dump하여 저장 가능하게 하면 될듯
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
- exercise list : https://github.com/wrkout/exercises.json/
