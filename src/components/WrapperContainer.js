import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, StatusBar, View, Platform} from "react-native";
import colors from "../styles/Colors";

const WrapperContainer = ({children}) => {
    return (
        <SafeAreaView style={styles.mainStyle}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={colors.backgroundColor}
            />
            <View style={styles.viewStyle}>{children}</View>
        </SafeAreaView>
    )
}

export default WrapperContainer;

const styles = StyleSheet.create({
    mainStyle: {
        flex: 1,
        backgroundColor: colors.mainBackgroundColor,
    },
    viewStyle: {
        flex: 1,
        backgroundColor: colors.mainBackgroundColor,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    },
})
