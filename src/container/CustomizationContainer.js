import React from 'react';
// import CustomizationComponent from '../component/CustomizationComponent';
import CustomizationComponentForm from '../component/CustomizationFormComponent';

function CustomizationContainer(props) {
    return (
        <div>
            {/* <CustomizationComponent /> */}
            <CustomizationComponentForm {...props} />
        </div>
    )
}

export default CustomizationContainer;
