
export default function Collapse() {
 
  return (
    <>
    <div className="container mt-3">

      {/* Accordion - Visible on large screens and up */}
      <div className="accordion d-none d-lg-block" id="RecommendedAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Recommended
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#RecommendedAccordion"
          >
            <div className="accordion-body">
              <p>Price: Low to High</p>
              <p>Price: High to Low</p>
              <p>Newest First</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown - Visible on small and medium screens */}
      <div className="dropdown d-lg-none">
        <button
          className="btn btn-light border dropdown-toggle w-100"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Recommended
        </button>
        <ul className="dropdown-menu w-100">
          <li><button className="dropdown-item">Price: Low to High</button></li>
          <li><button className="dropdown-item">Price: High to Low</button></li>
          <li><button className="dropdown-item">Newest First</button></li>
        </ul>
      </div>

    </div>


    </>
  );
}
