import "./App.css";
import React, { useState, useMemo, useCallback } from "react";

function Search() {
  const articles = [
    {
      id: 1,
      title: "Understanding Node.js event-driven architecture",
      description:
        "Node.js is built on an event-driven, non-blocking I/O model that makes it lightweight and efficient. This allows Node.js to handle multiple connections simultaneously with minimal overhead.",
    },
    {
      id: 2,
      title: "Getting started with React and Node.js",
      description:
        "React and Node.js are a powerful combination for building full-stack applications. This article explores how to set up a basic project using these two technologies.",
    },
    {
      id: 3,
      title: "Best practices for structuring a Node.js project",
      description:
        "When working with Node.js, it's essential to organize your project structure in a scalable and maintainable way. In this article, we discuss the best practices for Node.js project structure.",
    },
    {
      id: 4,
      title: "React hooks: What are they and why should you use them?",
      description:
        "React hooks allow you to use state and other React features without writing a class. Learn how hooks like useState and useEffect simplify your component logic.",
    },
    {
      id: 5,
      title: "Optimizing Node.js performance with clustering",
      description:
        "Node.js is single-threaded, but clustering allows you to create multiple instances of your application, each on a separate core. This boosts performance for Node.js apps.",
    },
    {
      id: 6,
      title: "State management in React: Context vs Redux",
      description:
        "Managing state in React can be tricky. Context and Redux are popular solutions for handling global state. In this article, we compare the two approaches.",
    },
  ];

  const [searchWord, setSearchWord] = useState("");

  const { filteredArticles, highlightedCount } = useMemo(() => {
    if (!searchWord) return { filteredArticles: articles, highlightedCount: 0 };

    const regex = new RegExp(searchWord, "gi");
    let count = 0;

    const filtered = articles.map((article) => {
      const isTitleHighlighted = article.title.match(regex);
      const isDescriptionHighlighted = article.description.match(regex);

      if (isTitleHighlighted || isDescriptionHighlighted) {
        count++;
      }

      return {
        ...article,
        title: article.title.replace(regex, (match) => `<mark>${match}</mark>`),
        description: article.description.replace(regex, (match) => `<mark>${match}</mark>`),
      };
    });

    return { filteredArticles: filtered, highlightedCount: count };
  }, [searchWord, articles]);

  const handleOnChange = useCallback((e) => {
    setSearchWord(e.target.value);
  }, []);

  return (
    <div className="container">
      <h1>Search</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Type to search..."
        value={searchWord}
        onChange={handleOnChange}
      />
      <p>Total highlighted articles: {highlightedCount}</p>
      <div>
        {filteredArticles &&
          filteredArticles.map((article) => (
            <div key={article.id}>
              <h3 dangerouslySetInnerHTML={{ __html: article.title }}></h3>
              <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
