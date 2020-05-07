<p align="center" >
<p align="center" >
   <a href="https://reactnative.gallery/FaridSafi/gifted-chat">
    <img alt="react-native-gifted-chat" src="./assets/readme/IMG-3155.gif" width="260" height="510" />
 </a>

</p>

<h3 align="center">
  ☮ Udaci Cards
</h3>
<p align="center">
  React Developer NanoDegree Final Project
</p>

## Features

- Create ,Update, Delete a Deck
- Create, Update, Delete a Card of a Deck
- Display The List of All Deck and Card
- Start a Quiz
- Display Stats About a Quiz

## Core Dependency

- React Native `~0.61.5`
- Expo Sdk `~37.0.3`
- NodeJs `8+`
- Yarn `1.22` (**recommended**) or Npm `6+`
- Redux `4+`
- React Navigation `5x`
- Android or Ios Emulator
  
## Installation and Deployment

### Installation

- Clone the application using git :
  
  ```bash
    $~ git clone https://github.com/kemsty2/udaci-cards.git
  ```

- Install the dependency
  - Using [npm](https://www.npmjs.com/#getting-started) :
  
  ```bash
  $~ npm install
  ```

  - Using [Yarn](https://yarnpkg.com/) :
  
  ```bash
  $~ yarn install
  ```

### Deployment

- To Deploy the application, simply run
  - For Android Emulator `yarn run android`
  - For Ios Emulator `yarn run ios`

## Models Description

> Deck Object

```js
{  
  title: 'Deck Title',
  createdAt: new Date(),  
}
```

> Card Object

```js
{  
  id: 'Card Id'
  question: 'Card Question',
  answer: 'Card Answer'  
}
```

## License

- [MIT](LICENSE)

## Author

- Aymard Moyo [kemsty2](https://github.com/kemsty2)

## Contributors

- Aymard Moyo [kemsty2](https://github.com/kemsty2)
