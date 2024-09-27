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

## Please, Follow this, when you want develop more
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

## Site map
1. Home - Feature
    - content
      - What to do on today?
        - If have schedule 
          - If that schedule is break day - display break day Image
          - Else display plans
        - Else - Display direct start schedule btn
      - What did i do on last week?
        - Display neally schedule of weeks
          - Start with Schedule

2. Calander & Daily schedule list
    - Schedule List page
      - content
        - calander - date
        - display Step list
          - menu
            - Quick start with this Schedule
            - Share this schedule (QR code)
            - Modify Step
            - Delete Step
          - onClick
            - goto Workout page
    - Create / Modify Page
      - top menu
        - load preset
      - content
        - selected exercise list
    - Workout Page
      - content

3. Schedule Preset List
    - Detail Page
    - Modify Page
    - Create Dialog

4. Workout list
    - Workout Detail page - ~ing
      - muscle usage
      - preview Images
      - display instructions - Done
      - display recorded newest history (Max. 10 items)

5. Share Fallback page
    - shared schedule clone page
      - choice save as Preset or Schedule of date
    - 

### Reference
- exercise list : https://github.com/wrkout/exercises.json/
