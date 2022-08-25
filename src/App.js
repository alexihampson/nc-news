import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Articles from "./components/articles/Articles";
import TopicSlug from "./components/topicSlug/TopicSlug";
import SingleArticle from "./components/articleId/SingleArticle";
import { UserContext } from "./context/user";
import { useState } from "react";
import { ErrContext } from "./context/err";

function App() {
  const [user, setUser] = useState({ username: null });
  const [err, setErr] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ErrContext.Provider value={{ err, setErr }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/topics/:slug" element={<TopicSlug />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </div>
      </ErrContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
