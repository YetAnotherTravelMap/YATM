import PropTypes from 'prop-types';
import classes from "./CategoryFilter.module.css"
import {useState} from "react";

function CategoryFilter({ mainCategories, selectedMainCategories, setSelectedMainCategories, categories, selectedCategories, setSelectedCategories, handleCategoryEdit}) {

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // State for filter menu toggle

    const handleMainCategoryChange = (category) => {
        setSelectedMainCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    return (
        <>
            {/* Circular Button for Filter Menu */}
            <button
                className={classes["filter-button"]}
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
                &#x2630;
            </button>

            {isFilterMenuOpen && (
                <div className={classes["category-menu"]}>
                    <h4>Main Categories</h4>
                    {mainCategories.map((category) => (
                        <label key={category} className={classes["category-label"]}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedMainCategories.includes(category)}
                                onChange={() => handleMainCategoryChange(category)}
                            />
                            {category}
                        </label>
                    ))}

                    {categories.length > 0 && <h4>Subcategories</h4>}
                    {categories.map((category) => (
                        <div key={category.id} className={classes["category-items-container"]}>
                            <label className={classes["category-label"]}>
                                <input
                                    type="checkbox"
                                    value={category.name}
                                    checked={selectedCategories.includes(category.name)}
                                    onChange={() => handleCategoryChange(category.name)}
                                />
                                {category.name}
                            </label>
                            { handleCategoryEdit &&
                                <button className={`${classes["edit-icon-button"]}`}
                                        onClick={() => handleCategoryEdit(category)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         className={`${classes["edit-icon"]}`}>
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"/>
                                    </svg>
                                </button>
                            }
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

CategoryFilter.propTypes = {
    mainCategories: PropTypes.array.isRequired,
    selectedMainCategories: PropTypes.array.isRequired,
    setSelectedMainCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    selectedCategories: PropTypes.array.isRequired,
    setSelectedCategories: PropTypes.func.isRequired,
    handleCategoryEdit: PropTypes.func,
};

export default CategoryFilter;