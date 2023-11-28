import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, TextInput, ActivityIndicator, View, Text } from 'react-native';
import axios from "axios";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "red"
  },

  image: {
    flex: 1,
    flexDirection: "column"
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "darkblue"
  },

  infoView: {
    alignItems: "center"
  },

  cityCountyText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  dateText: {
    color: "white",
    fontSize: 22,
    marginVertical: 10,
  },

  tempatureText: {
    fontSize: 45,
    color: "white",
    marginVertical: 10
  },
  
  minMaxText: {
    color: "white",
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 500
  }
});

function App() {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: "****",
    baseUrl: "https://api.****"
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `${api.baseUrl}/weather?q=${input}&units=metric&appid=${api.key}`
,
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
    .catch(e => console.dir(e))
    .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <SafeAreaView
      style={styles.root}>

      <ImageBackground source={require("./src/assets/images/sky.png")}
        resizeMode='cover'
        style={styles.image}>

        <View>
          <TextInput placeholder='Yer Arayın'
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={"black"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler} />
        </View>

        {loading && (<View>
          <ActivityIndicator
            size={"large"}
            color={"blue"} />
        </View>)}

        {data && 
        <View
          style={styles.infoView}>

            <Text
              style={styles.cityCountyText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text> 

            <Text
              style={styles.dateText}>
                {new Date().toLocaleString()}
            </Text>

            <Text
              style={styles.tempatureText}>
                {`${Math.round(data?.main?.temp)} °C`}
            </Text>

          
        </View>}

      </ImageBackground>

    </SafeAreaView>
  )
}

export default App;
