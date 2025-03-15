import PropTypes from 'prop-types';
import classes from "./CategoryNameEditor.module.css"
import useAuth from "../../hooks/UseAuth.jsx";
import {useEffect, useState} from "react";

function CategoryNameEditor({category, handleEdit, closeEditor}) {

    const { authAxios } = useAuth();
    const [newName, setNewName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null)
    }, [category]);


    async function handleCategoryNameChange() {
        if (!newName) {
            return setError("Name cannot be empty!");
        }

        const userResponse = await authAxios.get("/api/user");
        const categoryUpdateResponse = await authAxios.put(`/api/maps/${userResponse.data.mapIdArray[0]}/categories/${category.id}`, {
            categoryId: category.id,
            categoryNewName: newName,
        });

        if (categoryUpdateResponse.status !== 200) {
            return setError("An error occurred when renaming category!");
        }

        handleEdit(category, newName);

        closeEditor();
    }

    return (
        <div className={classes["category-edit-container"]}>

            {error && (<div className={classes["error-message"]}>{error}</div>)}
            <h4 className={classes["header"]}>Rename category <span className={classes["category-name"]}>{category.name}</span>:</h4>

            <label htmlFor="newCategoryName" className={classes["label"]}>Name:</label>
            <input type="text" id="newCategoryName" className={classes["name-input"]} name="newCategoryName"
                   value={newName} onChange={e => setNewName(e.target.value)}/>

            <button className={`${classes.button} ${classes["confirm-button"]}`}
                    onClick={handleCategoryNameChange}>Confirm
            </button>
            <button className={`${classes.button} ${classes["cancel-button"]}`} onClick={closeEditor}>Cancel</button>
        </div>
    );
}

CategoryNameEditor.propTypes = {
    category: PropTypes.object,
    handleEdit: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
};

export default CategoryNameEditor;