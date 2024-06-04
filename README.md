# kakao api 를 이용한 카카오톡 메시지 전송 ( + 엑셀 )

[참고 링크](https://k1my3ch4ns.notion.site/5338f03377b34ffb8c9eca9c6d4fcfa4?pvs=25) 작성중

<div align="center">

<a href='http://stg-lp-mp.taras.twinny.ai/' target="_blank">
  <img src='https://img.shields.io/badge/ETK-PROD-00A3FF?style=for-the-badge&labelColor=4C566A'>
</a>

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

<div align="center">

[**Prerequisites**](#prerequisites) · [**Installation**](#installation) · [**Technology Stack**](#technology-stack) · [**References**](#references) · [**Folder Structure**](#folder-structure)

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

<h2 id="prerequisites">🍴&nbsp;Prerequisites</h2>

1. **노드 버전 확인 (>= 16.0.0)**

   ```sh
   node --version
   ```

2. **yarn 설치**

   ```sh
   npm install --global yarn
   ```

3. **yarn 버전 확인 (>= 1.22.10)**
   ```sh
   yarn --version
   ```

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

<h2 id="installation">🚀&nbsp;Installation</h2>

1. **레포지토리 클론**

   ```sh
   git clone git@github.com:twinnylab/taras-web.git
   ```

2. **패키지 설치**

   ```sh
   yarn install
   ```

3. **GitHub 토큰 발급 및 등록**  
   [TARAS-Web 토큰 발급 및 관리 팁](https://www.notion.so/twinny/TARAS-Web-8abdc2093a004657ac533c714e07b362?pvs=4) 문서를 참고하여 토큰을 발급한 후 터미널 환경변수로 등록해 주세요.

4. **로컬 서버 실행**

   ```sh
   ## LP MP 실행
   yarn lp start

   ## TS MP 실행
   yarn ts start
   ```

   _VSCode에서 [ZipFS 익스텐션 설치](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)를 안내한다면 그대로 설치해 주세요._  
   _정상적으로 실행하기 위해서는 로컬 환경 변수가 필요합니다. 웹팀에 문의해 주세요._

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

<h2 id="technology-stack">🔶&nbsp;Technology Stack</h2>

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://ko.vitejs.dev/guide/)
- [Jest](https://jestjs.io/)
- [Sass](https://sass-lang.com/)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

<h2 id="folder-structure">🌵&nbsp;Folder Structure</h2>

```sh
packages
├── core
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── hooks
│   │   ├── setupTests.ts
│   │   └── vite-env.d.ts
│   ├── components.d.ts
│   ├── hooks.d.ts
│   ├── index.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── lp
│   ├── __mock__
│   ├── src
│   │   ├── apis
│   │   ├── assets
│   │   ├── clients
│   │   ├── components
│   │   ├── constants
│   │   ├── fixtures
│   │   ├── graphql
│   │   ├── hooks
│   │   ├── interfaces
│   │   ├── mocks
│   │   ├── pages
│   │   ├── recoil
│   │   ├── utils
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── reportWebVitals.ts
│   │   ├── router.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── jest.config.cjs
│   ├── jest.setup.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── ts
    ├── __mock__
    ├── src
    │   ├── apis
    │   ├── assets
    │   ├── clients
    │   ├── components
    │   ├── constants
    │   ├── fixtures
    │   ├── graphql
    │   ├── hooks
    │   ├── recoil
    │   ├── routes
    │   ├── ts
    │   ├── utils
    │   ├── App.stories.tsx
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── index.html
    ├── jest.config.cjs
    ├── package.json
    ├── setupTests.ts
    ├── tsconfig.json
    └── vite.config.ts
```
