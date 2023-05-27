import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=100`).then((res) => {
      setProducts(res.data.products);
      console.log(res.data.products);
    });
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="container">
      <div className="title">Pagination</div> <hr />
      <div>
        {products.length > 0 && (
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map((product) => {
              return (
                <>
                  <div className="card product__single">
                    <img
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="product__thumbnail"
                    />
                    <div className="card-body">
                      <h5 className="card-title mt-3">{product.title}</h5>
                      <a href="#" className="btn btn-primary">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
      {/* button */}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
