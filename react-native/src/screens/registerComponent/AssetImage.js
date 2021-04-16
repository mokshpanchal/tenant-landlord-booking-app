import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from "expo-image-picker-multiple";
export default class AssetImage extends Component {
  state = { headerData: null };
  constructor(props) {
    super(props);
  }

  imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await this._processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
            base64Url: pPhoto.base64,
          });
        }
        this.props.openImage(false, cPhotos);
      })
      .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    return file;
  }

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5694ca",
          paddingVertical: 10,
          shadowOpacity: 0.7,
          shadowOffset: { width: 0, height: 3 },
        }}
        title={"Done"}
        onPress={onSubmit}
      >
        <Text
          style={{
            color: "#FFF",
            fontFamily: "SemiBold",
          }}
          onPress={onSubmit}
        >
          Done
        </Text>
      </TouchableOpacity>
    );
  };

  updateHandler = (count, onSubmit) => {
    this.setState({ headerData: this._renderDoneButton(count, onSubmit) });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        {this.state.headerData}
        <ImageBrowser
          max={4}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});
