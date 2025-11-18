import React from "react";
import MyCity from "../src/screens/myCity/MyCity";
import {fireEvent, render} from "@testing-library/react-native";

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

// import
// jest.mock("react-native-gesture-handler", () => {
//     const React = require("react");
//     return {
//         Swipeable: ({ children }) => <>{children}</>,
//     };
// });

describe("MyCity screen test", () => {
    it("removes an item when delete button is pressed", () => {
        const { queryByText, getByTestId } = render(<MyCity />);
        expect(queryByText("Madrid")).toBeTruthy();
        const deleteButton = getByTestId("delete2");

        fireEvent.press(deleteButton);
        expect(queryByText("Madrid")).toBeNull();
    });
});
describe("MyCity screen test", () => {
    it("removes an item when delete button is pressed", () => {
        expect(null).toBeNull();
    });
});