import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import './DropDown.css';
// const options = [
//     'one', 'two', 'three'
// ];
// const defaultOption = options[0];
function DropDownMenu(options) {
    return (
        <div className="DropwDownMenu">
            <Dropdown className="drop-down" options={options.options} value={options.defaultOption} placeholder="Select an option" />
        </div>
    );
}

export default DropDownMenu;
