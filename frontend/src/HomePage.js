import { React, useState, useContext } from "react";
import "./HomePage.css";
import "./components/Elfbar";
import Elfbar from "./components/Elfbar";
import { IngredientsContext } from "./components/IngredientsProvider";
import { UserProfileContext } from "./components/auth/UserProfileProvider";

function HomePage() {
  const { ingredients } = useContext(IngredientsContext);
  const { server, token, dietaryRestrictions } = useContext(UserProfileContext);
  const [cuisine, setCuisine] = useState("american");
  const [chatResponse, setChatResponse] = useState("");
  const [toggle, setToggle] = useState(false);
  const handleGenerate = async (e) => {
    e.preventDefault();
    setToggle(true);
    if (chatResponse) {
      setChatResponse("");
    }
    // send ingredients to backend
    const body = {
      foods: ingredients,
      cuisine,
      dietaryRestrictions,
    };
    const res = await fetch(`${server}/recipegen`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setChatResponse(data.response);
  };

  return (
    <div className="home">
      <div>
        <Elfbar />
      </div>
      <div className="line-4"></div>

      <div className="prompt">
        <h1>Generate your customized recipes according to your grocery!</h1>
        <p>
          Click Generate to Recieve Chat GPT Prompt. Train the AI Bot with the
          Message
        </p>

        <div className="g">
          <form
            onSubmit={(e) => {
              handleGenerate(e);
            }}
          >
            <label>
              Cuisine:
              <input
                name="cuisine"
                type="text"
                placeholder="name of cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </label>
            <button className="b mb-5" type="submit">
              Generate
            </button>
          </form>
          {toggle && <p className="gText">{chatResponse || "loading"}</p>}
        </div>
        <p className="generator"></p>
      </div>
    </div>
  );
}
export default HomePage;
