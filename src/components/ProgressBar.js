import React, { Component } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration,
      }).start();
    }
  }

  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });

    return (
      <View
        style={[
          { flexDirection: "row", height },
          row ? { flex: 2 } : undefined,
        ]}
      >
        <View
          style={{
            flex: 1,
            borderColor,
            borderWidth,
            borderRadius,
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor,
            }}
          />
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",   
              marginTop: 8           
            }}
          >
            {this.props.progress * 100} {"%"}
          </Text>
        </View>
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  height: 50,
  borderColor: "#000",
  borderWidth: 2,
  borderRadius: 4,
  barColor: "tomato",
  fillColor: "rgba(0,0,0,.5)",
  duration: 100,
};

export default ProgressBar;
