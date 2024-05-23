import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { getRecipe } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { getAllIngredients } from "../api/ingredients.api";
import estrella from "../images/estrella.png";
import tiempo from "../images/tiempo.png";
import recetaPlaceholder from "../images/receta.jpg";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: 10,
  },
});

export function PDF( props ) {
    const { id } = props;

  const [recipe, setRecipe] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [recipePhotos, setRecipePhotos] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      const [categoriesRes, recipePhotosRes, ingredientsRes] =
        await Promise.all([
          getAllCategories(),
          getAllPhotos(),
          getAllIngredients(),
        ]);
      setCategories(categoriesRes.data);
      setRecipePhotos(recipePhotosRes.data);
      setIngredients(ingredientsRes.data);
    }
    loadData();
  }, []);

  React.useEffect(() => {
    async function fetchRecipe() {
      const { data } = await getRecipe(id);
      setRecipe(data);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Document><Page></Page></Document>; // Empty document while loading
  }

  const recipeCategories = categories.filter(category => category.recipe === recipe.id);
  const recipePhotosData = recipePhotos.filter(photo => photo.recipe === recipe.id);
  const recipeIngredients = ingredients.filter(ingredient => ingredient.recipe === recipe.id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: recipe.valoration }).map((_, index) => (
              <Image key={index} style={styles.image} src={estrella} />
            ))}
          </View>
          <Text style={styles.text}>Duration: {recipe.duration} MIN</Text>
          {recipePhotosData.length > 0 && (
            <Image style={styles.image} src={recipePhotosData[0].photo} />
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Ingredientes</Text>
          {recipeIngredients.map(ingredient => (
            <Text key={ingredient.id} style={styles.text}>{ingredient.name}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Preparación</Text>
          <Text style={styles.text}>{recipe.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Categorías</Text>
          {recipeCategories.map(category => (
            <Text key={category.id} style={styles.text}>{category.name}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
