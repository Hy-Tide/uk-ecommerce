import React from 'react';
import RecipeHero from '../components/recipes/RecipeHero';
import SmartRecipeSearch from '../components/recipes/SmartRecipeSearch';
import BrowseCuisine from '../components/recipes/BrowseCuisine';
import TrendingRecipes from '../components/recipes/TrendingRecipes';
import SeasonalRecipes from '../components/recipes/SeasonalRecipes';
import ShopIngredients from '../components/recipes/ShopIngredients';
import CookingTips from '../components/recipes/CookingTips';
import RecipeNewsletter from '../components/recipes/RecipeNewsletter';

const Recipes = () => {
  return (
    <div className="bg-white min-h-screen">
      <RecipeHero />
      <SmartRecipeSearch />
      <BrowseCuisine />
      <TrendingRecipes />
      <SeasonalRecipes />
      <ShopIngredients />
      <CookingTips />
      <RecipeNewsletter />
    </div>
  );
};

export default Recipes;
