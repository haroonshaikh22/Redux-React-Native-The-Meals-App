import React from 'react'
import { View,Text,FlatList,StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealList = props => {

  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const renderMealItem = (itemData) => {
      const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
          <MealItem
            title={itemData.item.title}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity.toUpperCase()}
            affordability={itemData.item.affordability.toUpperCase()}
            image={itemData.item.imageUrl}
            onSelectMeal={() => {
                props.navigation.navigate({routeName: 'MealDetail', 
                params: {
                    mealId : itemData.item.id,
                    mealTitle: itemData.item.title,
                    isFav : isFavorite,
                }})
            }}
          />
        );
      };
    

    return(
        <View style={styles.lists}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
    )
}

const styles = StyleSheet.create({
    lists: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
});

export default MealList;