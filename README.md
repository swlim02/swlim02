# 사용방법
1. App 요구사항
  - React App 입니다. React-app 을 실행할 수 있는 환경이 준비되어야 합니다.
    This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  - Kakao map Open API를 사용하고 있어서 인터넷에 접속되어 있는 환경이여야 합니다.

2. App 실행방법
  - node_modules 폴더가있는 폴더에 본소스를 deploy 하고, 해당폴더에서 yarn start 명령어로 실행하면 됩니다.
  - 실행후 브라우저로 아래 URL로 접근하면 app을 볼 수 있습니다. (포트번호 설정은 꼭 3000 이여야 합니다.)
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. App 설정방법
   - 본 app은 default동작이 데모모드로 설정 되어 있습니다. (default: 2021년 12월1일 14:00 데이터로 보입니다.)
   - 관련 하여 날짜를 변경하거나 현재시간의 데이터로 보고 싶은경우 App.js 에서 관련 설정을 수정하면 됩니다.

   /* App.js 데모모드 관련 설정 */
   const demo_mode = 'y'; // 'y' or 'n'
   // year 은 2021년으로 고정되어 있음.
   const demo_month = 12; // 데이터 제약으로 month는 12로 고정되어 있음.
   // (참고로 9~12월 실제데이터가 매주 반복됨. 대학수업 정보이기 때문)
   const demo_date = 1 // 일, 실제 day와 맞게 설정해야함.
   const demo_day = 3; // 요일, 0~6 일요일=0, 월요일=1 ~ 토요일=6
   const demo_time = '14:00'; // 9:30~18:00, 30분단위 설정, 데이터 제약으로 이외시간 사용 금지
   const exception_time = '14:00' // 9:30~18:00 이외 시간에 사용할 값 (이외시간에는 수업이 거의 없어서 데이터가 없음)

 4. 데이터 제약사항
  - 밀집도 트랜드는 301동, 302동에 한하여 (11월22일~12월3일)기간 데이터만 제공됩니다.
  - 학교,건물,층,룸 밀집도 데이터는 2021년 9월~12월 (2학기) 데이터만 제공됩니다.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
