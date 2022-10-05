// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Searchbar } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// import useDataFetching from "../hooks/useDataFetching";
// import { config } from "../constants/config";
// import { Error, Loader } from "../components";

// const HomeScreen = () => {
//   const navigation = useNavigation();

//   const [loading, error, merchant1, fetchData] = useDataFetching(
//     `${config.app.api_url}/merchant/query/55_water_st_10041`
//   );

//   //   useEffect(() => {
//   //     const updateData = navigation.addListener("focus", () => {
//   //       fetchData();
//   //       fetchData2();
//   //     });
//   //     return updateData;
//   //   }, [navigation]);

//   const merchants = merchant1?.merchants?.concat(merchant2?.merchants);

//   //   console.log("====================================");
//   //   console.log("merchant data", merchants);
//   //   console.log("====================================");

//   //function to convert address

//   const [searchQuery, setSearchQuery] = useState("");
//   const onChangeSearch = (query) => {
//     setSearchQuery(query.split(" ").join("_").toLowerCase());
//   };

//   const [load, error1, merchant2, fetchData2] = useDataFetching(
//     `${config.app.api_url}/merchant/query/${searchQuery}`
//   );
//   console.log("====================================");
//   console.log("searchQuery", merchant2?.merchants);
//   console.log("====================================");

//   return (
//     <>
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView>
//           <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
//             <Searchbar
//               placeholder="Search Restaurant"
//               placeholderTextColor="#D2D1D1"
//               onChangeText={onChangeSearch}
//               value={searchQuery}
//               style={{
//                 elevation: 0,
//                 borderWidth: 0.5,
//                 borderColor: "gray",
//               }}
//               inputStyle={{
//                 fontSize: 14,
//                 // fontFamily: "Poppins_Regular",
//               }}
//               iconColor="#D2D1D1"
//             />
//           </View>
//           {load || error1 ? (
//             <>{load === true && <Loader />}</>
//           ) : (
//             <View>
//               <Text>Loaded</Text>
//             </View>
//           )}
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";

import useDataFetching from "../hooks/useDataFetching";
import { config } from "../constants/config";
import { Error, Loader } from "../components";
import categories from "../constants/categories";
import COLORS from "../constants/colors";
import foods from "../constants/food";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  // const navigation = useNavigation();

  const [loading, error, merchant1, fetchData] = useDataFetching(
    `${config.app.api_url}/merchant/query/55_water_st_10041`
  );

  useEffect(() => {
    const updateData = navigation.addListener("focus", () => {
      fetchData();
    });
    return updateData;
  }, [navigation]);

  const merchants = merchant1?.merchants?.concat(merchant2?.merchants);

  //function to convert address
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query.split(" ").join("_").toLowerCase());
  };

  const [load, error1, merchant2, fetchData2] = useDataFetching(
    `${config.app.api_url}/merchant/query/${searchQuery}`
  );

  const cuisine = merchant1?.merchants?.map((item) => item.cuisines[0]);
  let uniqueCuisine = cuisine?.filter((c, index) => {
    return cuisine?.indexOf(c) === index;
  });

  const meal = [];
  uniqueCuisine.map((item) => {
    meal.push({ name: item });
  });

  console.log("====================================");
  console.log(meal);
  console.log("====================================");

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {meal.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}
            >
              <View style={style.categoryBtnImgCon}>
                <Icons
                  name="restaurant-outline"
                  size={18}
                  color={COLORS.primary}
                />
                {/* <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: "cover" }}
                /> */}
              </View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  width: 65,
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const Card = ({ food }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", food)}
      >
        <View style={style.card}>
          <View style={{ alignItems: "center", top: -40 }}>
            <Image
              source={{ uri: food.logo_url }}
              style={{ height: 120, width: 120 }}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.name}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {`${food.location.state}, ${food.location.zip}`}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.cuisines[0]}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 28 }}>Hello,</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}>
              Ariz
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require("../../assets/imgaes/person.png")}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for food"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      {loading || error ? (
        <Loader />
      ) : (
        <>
          {merchant1?.merchants?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={merchant1?.merchants}
              renderItem={({ item }) => <Card food={item} />}
            />
          ) : (
            <View>
              <Text>There are no restaurants</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
