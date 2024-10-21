import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args.length > 0) {
    console.log("List command should not have any argument");
    return;
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join("\n");
  console.log("Your recipes:");
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  const id = args[0]
  if (args.length !== 1) {
    console.log("You can only pass an ID as argument");
    return;
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const selectedRecipe = recipes.find(
    (recepie) => recepie.id === Number(id)
  );

  console.log(`ID: ${selectedRecipe.id} Name: ${selectedRecipe.name}`);
}
