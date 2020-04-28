import React, { Component } from "react";
import { StyleProvider, Root } from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import App from "../navigation";

export default class Setup extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(variables)}>
        <Root>
          <App />
        </Root>
      </StyleProvider>
    );
  }
}
