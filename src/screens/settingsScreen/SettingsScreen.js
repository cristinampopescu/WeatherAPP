import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import WrapperContainer from "../../components/WrapperContainer";
import colors from "../../styles/Colors";
import {moderateScale, scale} from "../../styles/ResponsiveSize";
import { createMMKV } from 'react-native-mmkv';
import {useDispatch} from "react-redux";
import {logoutUserData} from "../../redux/reducers/AuthSlice";

const SettingsScreen = () => {
    const storage = new createMMKV();
    const temperatureItem = [
        {id: 1, label: "Celsius"},
        {id: 2, label: "Farenhiet"},
    ];
    const dispatch = useDispatch();
    const deleteUserCall = () => {
        storage.remove("token");
        dispatch(logoutUserData());
    };
    const [temperatureSaveItem, setTemperatureSaveItem] = useState(1);
    return (
        <WrapperContainer style>
            <ScrollView bounces={false} style={{marginTop: moderateScale(20)}}>
                <Text style={styles.settingTitleStyle}>{"Settings"}</Text>
                <View >
                    <Text style={styles.titleStyle}>{"Units"}</Text>
                    <View style={styles.cardStyle}>
                        <Text style={styles.subtitleStyle}>{"TEMPERATURE"}</Text>
                        <View style={styles.selectionStyle}>
                            {temperatureItem?.map((item) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => setTemperatureSaveItem(item?.id)}
                                        style={{
                                            ...styles.btnStyle,
                                            backgroundColor: temperatureSaveItem == item?.id
                                                ? colors.sectionBackgroundColor
                                                : colors.mainBackgroundColor,
                                       }}
                                    >
                                        <Text style={styles.buttonTextStyle}>{item?.label}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <Text style={styles.subtitleStyle}>{"WIND SPEED"}</Text>
                        <Text style={styles.subtitleStyle}>{"PREASSURE"}</Text>
                        <Text style={styles.subtitleStyle}>{"PRECIPITATION"}</Text>
                        <Text style={styles.subtitleStyle}>{"DISTANCE"}</Text>
                    </View>
                </View>
                <Pressable onPress={()=> deleteUserCall()}>
                    <Text style={{color:colors.white, fontSize: scale(40)}}>Delete User</Text>
                </Pressable>
            </ScrollView>
        </WrapperContainer>
    )
}

export default SettingsScreen;
const styles = StyleSheet.create({
    settingTitleStyle: {
        color: colors.white,
        fontSize: scale(25),
    },
    titleStyle: {
        color: colors.grey,
        fontSize: scale(18),
        marginTop: moderateScale(20),
    },
    cardStyle: {
        backgroundColor: colors.sectionBackgroundColor,
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(12),
        marginTop: moderateScale(16),

    },
    subtitleStyle: {
        color: colors.grey,
        fontSize: scale(12),
    },
    selectionStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.mainBackgroundColor,
        height: moderateScale(44),
        alignItems: "center",
        paddingHorizontal: moderateScale(4),
        borderRadius: moderateScale(8),
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: scale(14),
        alignSelf: "center",
    },
    btnStyle: {
        backgroundColor: colors.btnSelection,
        height: moderateScale(34),
        width: "50%",
        alignItem: "center",
        justifyContent: "center",
        borderRadius: moderateScale(6),
    },
})