import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import WrapperContainer from "../../components/WrapperContainer";
import colors from "../../styles/Colors";
import imagePath from "../../constants/imagePath";
import {height, moderateScale, scale} from "../../styles/ResponsiveSize";
import fontFamily from "../../constants/fontFamily";
import { createMMKV } from 'react-native-mmkv';
import {useDispatch} from "react-redux";
import {saveUserData} from "../../redux/reducers/AuthSlice";

const Welcome = () => {
    const dispatch = useDispatch();
    const storage = new createMMKV();
    const saveToken = () => {
        storage.set("token", "123456789")
        dispatch(saveUserData({
            userData: {name:"Cristina", Gender: "F", Country: "Ro"},
            isLogin: true,
        }));
    };

    return (
        <WrapperContainer>
            <View style={styles.mainViewStyle}>
                <Image source={imagePath.umbrella} />
                <Text style={styles.textStyle}>DEMO</Text>
                <Text style={styles.descriptionStyle}>Weather App</Text>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>saveToken()} testID="welcomeButton">
                    <Image styles={styles.imageBtnStyle} source={imagePath.arrow} />
                </TouchableOpacity>
            </View>
        </WrapperContainer>
    )
}

export default Welcome;
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontSize: scale(40),
        marginTop: height/8,
        color: colors.white,
        fontFamily: fontFamily.bold,
    },
    descriptionStyle: {
        fontSize: scale(20),
        color: colors.white,
    },
    buttonView: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center",
    },
    imageBtnStyle: {
        height: moderateScale(32),
        width: moderateScale(32),
        resizeMode: "contain",
    }
})