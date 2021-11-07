import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import MealItem from "../components/MealItem";
import MealList from "../components/MealList";
import Colors from "../constants/Colors";
import { CATEGORIES, MEALS } from "../data/dummy-data";

const CategoriesMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if(displayedMeals.length === 0) {
    return <View style={StyleSheet.content}>
      <DefaultText>
        no meals found, check filter
      </DefaultText>
    </View>
  }
  
  // const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return <MealList listData={displayedMeals} navigation={props.navigation}/>;
};

CategoriesMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  };
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default CategoriesMealsScreen;
