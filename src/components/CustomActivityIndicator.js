import React from "react";
import {ActivityIndicator, View} from "react-native";

const CustomActivityIndicator = ({size, color}) => {
    return (
        <View>
            <ActivityIndicator
                size={size}
                color={color}
            />
        </View>
    )
}

export default CustomActivityIndicator;
