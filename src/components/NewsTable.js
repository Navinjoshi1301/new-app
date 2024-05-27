
import React, { useState, useEffect } from 'react';
import './NewsTable.css';

const NewsTable = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const apiKey = '98ad194ad18c49afa4c57825510e03b9';
    const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-10-04&to=2023-10-04&sortBy=popularity&apiKey=${apiKey}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container NewsTable">
      <div className="row">
        {currentNews.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <p className="card-text">Source: {article.source.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {news.length > itemsPerPage &&
          Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className="btn btn-primary">
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default NewsTable;
