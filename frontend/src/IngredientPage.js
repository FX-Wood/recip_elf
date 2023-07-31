import "./IngredientPage.css";
import Elfbar from "./components/Elfbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { React, useContext } from "react";
import { IngredientsContext } from "./components/IngredientsProvider";
import IngredientForm from "./components/IngredientForm";
function IngredientPage() {
  const { ingredients } = useContext(IngredientsContext);
  const tableRows = ingredients.map((ingredient, i) => {
    const expiry = new Date(ingredient.expiration);
    return (
      <tr key={i}>
        <td>{ingredient.name}</td>
        <td>{expiry.toDateString()}</td>
      </tr>
    );
  });

  return (
    <div className="auth">
      <Elfbar />
      <h1>Ingredients Dashboard</h1>
      <div direction="horizontal">
        <Container>
          <IngredientForm />
        </Container>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default IngredientPage;
