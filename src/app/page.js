import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ShoppingCart } from "lucide-react";

export default function RecipeApp() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([
    { name: "Pad Thai", ingredients: ["Rice Noodles", "Tofu", "Eggs", "Peanuts"], category: "Thai" },
    { name: "Shepherd's Pie", ingredients: ["Lamb", "Potatoes", "Onions", "Carrots"], category: "British" },
    { name: "Blueberry Scones", ingredients: ["Flour", "Butter", "Blueberries", "Milk"], category: "British" },
  ]);
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const addToMealPlan = (recipe) => {
    setMealPlan([...mealPlan, recipe]);
  };

  const generateShoppingList = () => {
    const ingredients = new Set();
    mealPlan.forEach((recipe) => recipe.ingredients.forEach((item) => ingredients.add(item)));
    setShoppingList([...ingredients]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>
      <Input placeholder="Search recipes..." value={search} onChange={handleSearch} className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes
          .filter((r) => r.name.toLowerCase().includes(search))
          .map((recipe, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <p className="text-sm">Category: {recipe.category}</p>
                <p className="text-sm">Ingredients: {recipe.ingredients.join(", ")}</p>
                <Button className="mt-2" onClick={() => addToMealPlan(recipe)}>
                  Add to Meal Plan
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Meal Plan</h2>
        <Calendar className="mb-4" />
        {mealPlan.length > 0 && (
          <ul>
            {mealPlan.map((meal, index) => (
              <li key={index}>{meal.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Shopping List</h2>
        <Button onClick={generateShoppingList} className="mb-2 flex items-center gap-2">
          <ShoppingCart /> Generate Shopping List
        </Button>
        {shoppingList.length > 0 && (
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
