import React from 'react';
import {Image} from "react-native";

function CustomHeader(props) {
    return (
        <Image
            style={{width: 50, height: 50}}
            source={require('@expo/snack-static/react-native-logo.png')}
        />
    );
}

export default CustomHeader;