import classes from "./IconSelector.module.css"
import PropTypes from "prop-types";
import {useState} from "react";
import Resizer from "react-image-file-resizer";


const IconSelectorState = {
    ICON_DISPLAY: 1,
    ICON_CHANGE: 2,
};

function IconSelector({icon, setIcon, icons}) {

    const [selectorState, setSelectorState] = useState(IconSelectorState.ICON_DISPLAY);

    function setSelectedIcon(icon) {
        setIcon(icon)
        setSelectorState(IconSelectorState.ICON_DISPLAY)
    }

    async function handleNewIconUpload(file) {
        const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
            const img = new Image()
            img.onload = () => {
                resolve({
                    height: img.height,
                    width: img.width
                })
            }
            img.src = dataURL
        })

        const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(file,35,63,"PNG",100,0,
                    (uri) => {
                        resolve(uri);
                    },
                    "base64"
                );
            });

        const image = await resizeFile(file);
        const {width, height} = await getHeightAndWidthFromDataUrl(image)
        setIcon({id: -1, image: file, iconName: file.name, width: width, height: height});
        setSelectorState(IconSelectorState.ICON_DISPLAY)
    }

    return (<div className={classes["main_container"]}>
        <div className={classes["preview_container"]}>
            {icon &&
                <img id="icon" className={classes.preview} src={icon.id > 0 ? `data:image/png;base64,${icon.image}` : URL.createObjectURL(icon.image)} alt="Selected pin icon"/>
            }
        </div>

        {selectorState === IconSelectorState.ICON_DISPLAY &&
        <div className={classes["state_icon_display_container"]}>
            <div>
                {/*<p> The current icon for this map can be seen on the left.</p>*/}
                <button onClick={() => setSelectorState(IconSelectorState.ICON_CHANGE)}>Change pin icon</button>
            </div>
        </div>
        }

        {selectorState === IconSelectorState.ICON_CHANGE &&
            <div className={classes["state_icon_change_container"]}>
                <div>
                    <p> Select a new icon below:</p>
                    <div className={classes["icon_grid_container"]}>
                        {icons.map(icon => (
                            <input type="image" key={icon.id} className={classes["icon_grid_button"]} src={`data:image/png;base64,${icon.image}`}
                                   onClick={() => setSelectedIcon(icon)}/>
                        ))}
                    </div>
                    <p className={classes["upload_text"]}> Upload a new icon:</p>
                    <input type="file" className={classes["upload_button"]} id="upload_button" accept="image/png"
                           onChange={(e) => handleNewIconUpload(e.target.files[0])}
                    />
                </div>
            </div>
        }


    </div>);
}

IconSelector.propTypes = {
    icon: PropTypes.shape({
        id: PropTypes.number,
        iconName: PropTypes.string.isRequired,
        image: PropTypes.any.isRequired,
    }),
    setIcon: PropTypes.func.isRequired,
    icons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        iconName: PropTypes.string.isRequired,
        image: PropTypes.any.isRequired,
    }))
}

export default IconSelector;