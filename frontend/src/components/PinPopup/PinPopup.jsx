import classes from "./PipPopup.module.css"
import CategoryTag from "../CategoryTag/CategoryTag.jsx";

// eslint-disable-next-line react/prop-types
function PinPopup({pin, onEditRequest, canEditPin}) {

    return (<>
            <h2>{pin.name}</h2>
            <br/>
            {pin.categories.length > 0 && (
                <div>
                    <h3>Categories: </h3>
                    <CategoryTag value={pin.mainCategory}/>
                    <div>
                        {pin.categories.map(category => (<CategoryTag value={category.name} key={category.id}/>))}
                    </div>
                </div>
            )}
            <br/>
            <h3>Description: </h3>
            <div>{pin.description}</div>
            <br/>
            <small>Latitude: {pin.latitude.toFixed(6)}, Longitude: {pin.longitude.toFixed(6)}</small>
            <br/>
            {canEditPin && <button onClick={onEditRequest}>Edit
            </button>}
        </>);
}

export default PinPopup;