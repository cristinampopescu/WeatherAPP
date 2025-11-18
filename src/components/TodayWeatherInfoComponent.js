import React from "react";
import {Text, StyleSheet, View, Image, FlatList} from "react-native";
import colors from "../styles/Colors";
import {height, moderateScale, scale} from "../styles/ResponsiveSize";
import imagePath from "../constants/imagePath";

const TodayWeatherInfoComponent = ({data}) => {
    return (
        <View style={styles.mainStyle}>
            <Text style={styles.textStyle}>Today's Forecast</Text>
            <FlatList
                horizontal={true}
                data={data?.hour}
                renderItem={ ({item, index}) => {
                    return (
                        <View style={styles.containView}>
                            <View style={{...styles.itemViewStyle, borderRightWidth: index == 23 ? 0 : 0.5 }}>
                                <Text style={styles.timeTextStyle}>{`${item?.time?.split(" ")[1]}`}</Text>
                                <Image
                                    source={item?.is_day == 1 ? imagePath.sun : imagePath.sunWithCloud}
                                    style={styles.cloudSun}
                                />
                                <Text style={styles.timeTextStyle}>{`${item?.temp_c}º`}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default TodayWeatherInfoComponent;

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: colors.sectionBackgroundColor,
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
        borderRadius: moderateScale(10),
        alignItems: "center",
        height: height/5,
        width: "100%",
    },
    textStyle: {
        color: colors.grey,
        fontSize: scale(16),
    },
    containView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(16),
        marginHorizontal: moderateScale(6),
    },
    timeTextStyle: {
        color: colors.grey,
    },
    itemViewStyle: {
        borderRightWidth: 0.5,
        borderColor: colors.grey,
        alignItems: "center",
        paddingHorizontal: moderateScale(30),
    },
    cloudSun: {
        width: moderateScale(42),
        height: moderateScale(42),
        resizeMode: "contain",
        marginTop: moderateScale(10),
        marginVertical: moderateScale(10),
    },
})