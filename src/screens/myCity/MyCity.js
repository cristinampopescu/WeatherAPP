import {FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView} from "react-native";
import React, {useState} from "react";
import WrapperContainer from "../../components/WrapperContainer";
import colors from "../../styles/Colors";
import {moderateScale, scale} from "../../styles/ResponsiveSize";
import {useNavigation} from "@react-navigation/native";
import imagePath from "../../constants/imagePath";
import {Swipeable} from "react-native-gesture-handler";

const MyCity = () => {
    const navigation = useNavigation();
    const [data,setData]=useState([
        {id: 1, city: "Cluj-Napoca", temperature: 5, time:"10:23", isCurrentLocation: true},
        {id: 2, city: "Madrid", temperature: 20, time:"10:23", isCurrentLocation: false},
        {id: 3, city: "Athens", temperature: 15, time:"10:23", isCurrentLocation: false},
        {id: 4, city: "Bucharest", temperature: 10, time:"10:23", isCurrentLocation: false},
    ]);
    const deleteItem = (id) => {
        const newData = data.filter(item => item.id !== id )
        setData(newData)
    }
    const renderRightActions = (item) => {
        return (
            <TouchableOpacity
                style={styles.deleteStyle}
                onPress={() => deleteItem(item?.id)}
                testID={`delete${item.id}`}
            >
                <Text style={styles.deleteTextStyle}>X</Text>
            </TouchableOpacity>
        )
    }
    return (
        <WrapperContainer>
            <Text style={styles.headerTextStyle}>My Cities</Text>
            <ScrollView style={{flex: 1}} bounces={false}>
                <TouchableOpacity style={styles.searchButtonStyle} onPress={()=>navigation.navigate("SearchScreen")}>
                    <Text style={styles.searchTextStyle}>Search for cities</Text>
                </TouchableOpacity>
                <FlatList
                    scrollEnabled={false}
                    scroll
                    style={styles.listStyle}
                    data={data}
                    itemSeparatorComponent={()=><View style={styles.itemSeparatorStyle}/>}
                    keyExtractor={item => item.id}
                    renderItem={({item, index})=>{
                        return(
                            <Swipeable renderRightActions={()=>renderRightActions(item)}>
                                <View style={styles.renderViewStyle}>
                                    <View>
                                        <View style={styles.cityViewStyle}>
                                            <Text style={styles.cityNameTextStyle}>{item.city}</Text>
                                            {item.isCurrentLocation && (
                                                <Image
                                                    source={imagePath.navigation}
                                                    style={styles.navigationImgStyle}
                                                    tintColor={colors.white}
                                                />
                                            )}
                                        </View>
                                        <Text style={styles.timeTextStyle}>{item.time}</Text>
                                    </View>
                                    <Text style={styles.headerTextStyle}>{item.temperature}º</Text>
                                </View>
                            </Swipeable>
                        );
                    }}
                />
            </ScrollView>
        </WrapperContainer>
    );
}

export default MyCity;
const styles = StyleSheet.create({
    headerTextStyle: {
        color: colors.white,
        fontSize: scale(32),
        marginTop: moderateScale(8),
    },
    searchButtonStyle: {
        backgroundColor: colors.sectionBackgroundColor,
        height: moderateScale(54),
        borderRadius: moderateScale(16),
        justifyContent: "center",
        paddingHorizontal: moderateScale(15),
        marginTop: moderateScale(20),
    },
    searchTextStyle: {
        color: colors.white,
        fontSize: scale(14),
    },
    cityNameStyle: {
        color: colors.white,
        fontSize: scale(14),
    },
    cityNameTextStyle: {
        color: colors.white,
        fontSize: scale(18),
    },
    timeTextStyle: {
        color: colors.white,
        fontSize: scale(14),
        opacity: 0.5,
        marginTop: moderateScale(6),
    },
    navigationImgStyle: {
        height: moderateScale(24),
        width: moderateScale(24),
        resizeMode: "contain",
        marginLeft: moderateScale(6),
    },
    renderViewStyle: {
        flexDirection: "row",
        backgroundColor: colors.sectionBackgroundColor,
        borderRadius: moderateScale(16),
        height: moderateScale(82),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
        marginTop: moderateScale(20),
    },
    deleteStyle: {
        backgroundColor: colors.red,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(64),
        height:moderateScale(82),
        marginLeft: moderateScale(12),
        marginTop: moderateScale(20),
    },
    deleteTextStyle: {
        color: colors.white,
        fontSize: scale(24),
    },
    cityViewStyle: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemSeparatorStyle: {
        height: moderateScale(12),
    },
    listStyle: {
        marginTop: moderateScale(32),
    },
})