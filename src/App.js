import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Articles from "./components/articles/Articles";
import TopicSlug from "./components/topicSlug/TopicSlug";
import SingleArticle from "./components/articleId/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/topics/:slug" element={<TopicSlug />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
