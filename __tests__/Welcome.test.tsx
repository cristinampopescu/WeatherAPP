import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Welcome from "../src/screens/welcome/Welcome";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));

const mockSet = jest.fn();
jest.mock("react-native-mmkv", () => {
    return {
        createMMKV: () => ({
            set: mockSet,
        }),
    };
});

describe("Welcome screen - button click only", () => {
    beforeEach(() => {
        mockDispatch.mockClear();
        mockSet.mockClear();
    });

    it("runs saveToken when the button is pressed", () => {
        const { getByTestId } = render(<Welcome />);

        const button = getByTestId("welcomeButton");

        fireEvent.press(button);

        // We verify only that the click triggered the action:
        expect(mockSet).toHaveBeenCalled();     // token write happened
        expect(mockDispatch).toHaveBeenCalled(); // redux dispatch happened
    });
});
