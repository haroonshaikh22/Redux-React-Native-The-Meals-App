import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesMealsScreen from "../screens/CategoriesMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import  FiltersScreen from '../screens/FiltersScreen'
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

const defaultStackNavOptions = {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.primaryColor : "white",
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle:{
        fontFamily: 'open-sans'
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
      headerTitle: "A Screen",
};
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoriesMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  { //initialRouteName : Categories
    defaultNavigationOptions: defaultStackNavOptions
  }
);
 
 const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
{ //initialRouteName : Categories
  defaultNavigationOptions: defaultStackNavOptions
});


const tabScreenConfig = {
    
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={25}
                color={tabInfo.tintColor}
              />
            );
          },
          tabBarColor : Colors.primaryColor
        },
      },
      Favorites: {
        screen: FavNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="ios-star"
                size={25}
                color={tabInfo.tintColor}
              />
            );
          },tabBarColor: Colors.accentColor
        }
      }
}

const MealsFavTabNavigator = createBottomTabNavigator(tabScreenConfig,
        {
          tabBarOptions: {
            activeTintColor: Colors.accentColor,
          },
        }
      );

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
},
{
  // navigationOptions: {
  //   drawerLabel: 'Filters!!!!'
  // },
  defaultNavigationOptions: defaultStackNavOptions
})


const MainNavigator = createDrawerNavigator( {
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
},
{
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator);
