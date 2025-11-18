import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import WrapperContainer from "../../components/WrapperContainer";
import {moderateScale, scale} from "../../styles/ResponsiveSize";
import colors from "../../styles/Colors";
import {useNavigation} from "@react-navigation/native";

const SearchScreen = () => {
    const [searchItem, setSearchItem] = useState();
    const navigation = useNavigation();
    return (
        <WrapperContainer>
            <View style={styles.mainStyle}>
                <View style={styles.searchStyle}>
                    <TextInput style={styles.textInputStyle} onChangeText={setSearchItem} value={searchItem} />
                </View>
                <Pressable
                    onPress={() => {
                        setSearchItem("")
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.pressableTextStyle}>Cancel</Text>
                </Pressable>
            </View>
        </WrapperContainer>
    )
}

export default SearchScreen;
const styles = StyleSheet.create({
    mainStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: moderateScale(20),
    },
    searchStyle: {
        width: "76%",
        backgroundColor: colors.sectionBackgroundColor,
        height: moderateScale(44),
        borderRadius: moderateScale(12),
    },
    pressableTextStyle: {
        color: colors.white,
        fontSize: scale(16),
        marginRight: moderateScale(20),
    },
    textInputStyle: {
        flex: 1,
        paddingHorizontal: moderateScale(12),
        color: colors.white,
        fontSize: scale(14),
    },
})