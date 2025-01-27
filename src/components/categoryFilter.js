import { useState } from "react";
import { images } from "../data"; 
const CategoryFilter = () => {
  const [img, setImg] = useState(images);
  const categories = [
    { id: 1, label: "Kwiaty" },
    { id: 2, label: "Zwierzęta" },
    { id: 3, label: "Samochody" },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category) 
          : [...prevSelected, category] 
    );
  };

  const filteredItems = img.filter((item) =>
    selectedCategories.includes(item.category)
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Kategorie zdjęć</h2>

      <div className="mb-4">
        {categories.map((category) => (
          <div key={category.id} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value={category.id}
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCheckboxChange(category.id)}y
            />
            <label
              className="form-check-label"
              htmlFor={`category-${category.id}`}
            >
              {category.label}
            </label>
          </div>
        ))}
      </div>

      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={item.filename}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="card-text">Pobrań: {item.downloads}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setImg((prevImg) => prevImg.map((el) => el.id === item.id ? { ...el, downloads: el.downloads + 1 } : el ));}}>
                    Pobierz
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Brak zdjęć do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
