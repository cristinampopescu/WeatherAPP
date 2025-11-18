import Routes from "./src/navigation/Routes";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-redux";
import {createMMKV} from "react-native-mmkv";
import {saveUserData} from "./src/redux/reducers/AuthSlice";
import {useEffect} from "react";
import store from "./src/redux/Store";

const {dispatch} = store;

export default function App() {
    // @ts-ignore
    const storage = new createMMKV();
    const getUserDataFromStore = () => {
        const token = storage.getString("token");
        if (token) {
            dispatch(saveUserData({
                userData: {name:"Cristina", Gender: "F", Country: "Ro"},
                isLogin: true,
            }))
        }
    };
    useEffect(() => {
        getUserDataFromStore()
    }, []);
    return (
      <Provider store={store}>
          <GestureHandlerRootView>
            <Routes/>
          </GestureHandlerRootView>
      </Provider>
  );
}
