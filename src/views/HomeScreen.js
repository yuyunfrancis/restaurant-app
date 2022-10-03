import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import useDataFetching from "../hooks/useDataFetching";
import { config } from "../constants/config";
import { Error, Loader } from "../components";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [loading, error, merchant1, fetchData] = useDataFetching(
    `${config.app.api_url}/merchant/query/55_water_st_10041`
  );

  //   useEffect(() => {
  //     const updateData = navigation.addListener("focus", () => {
  //       fetchData();
  //       fetchData2();
  //     });
  //     return updateData;
  //   }, [navigation]);

  const merchants = merchant1?.merchants?.concat(merchant2?.merchants);

  //   console.log("====================================");
  //   console.log("merchant data", merchants);
  //   console.log("====================================");

  //function to convert address

  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query.split(" ").join("_").toLowerCase());
  };

  const [load, error1, merchant2, fetchData2] = useDataFetching(
    `${config.app.api_url}/merchant/query/${searchQuery}`
  );
  console.log("====================================");
  console.log("searchQuery", merchant2?.merchants);
  console.log("====================================");

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <Searchbar
              placeholder="Search Restaurant"
              placeholderTextColor="#D2D1D1"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                elevation: 0,
                borderWidth: 0.5,
                borderColor: "gray",
              }}
              inputStyle={{
                fontSize: 14,
                // fontFamily: "Poppins_Regular",
              }}
              iconColor="#D2D1D1"
            />
          </View>
          {load || error1 ? (
            <>{load === true && <Loader />}</>
          ) : (
            <View>
              <Text>Loaded</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
