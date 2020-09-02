import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Share,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

console.disableYellowBox = true;

class App extends Component {


  state = {
    news: [],
    loading: true,
  };

  fetchNews = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=hk&apiKey=e1e2d8fdd15b4e2db11c78901e1769d6"
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchNews();
  }

  shareArticle = async (article) => {
    try {
      await Share.share({
        message: "Checkout this article\n" + article,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#333",
          }}
        >
          <ActivityIndicator size="large" coloe="#fff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 35, color: "#fff" }}>Top</Text>
            <Text style={{ fontSize: 35, color: "#fff" }}>Headlines</Text>
          </View>
          <View style={styles.news}>
            <FlatList
              data={this.state.news}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <View
                      style={{
                        width: width - 50,
                        height: 200,
                        backgroundColor: "#fff",
                        marginBottom: 15,
                        borderRadius: 15,
                      }}
                    >
                      <Image
                        source={{ uri: item.urlToImage }}
                        style={[StyleSheet.absoluteFill, { borderRadius: 15 }]}
                      />
                      <View style={styles.gradien}>
                        <Text
                          style={{
                            position: "absolute",
                            bottom: 0,
                            color: "#fff",
                            fontSize: 20,
                            padding: 5,
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: 5,
                            fontWeight: "bold",
                          }}
                          onPress={() => this.shareArticle(item.url)}
                        >
                          Share
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              KetExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#333",
  },
  header: {
    paddingTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  news: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  gradien: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
  },
});

export default App;
