import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import ScreenNavigator from "./src/navigation/ScreenNavigator";

export default function App() {
  const paperTheme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1C9A4E",
      accent: "#FFC10D",
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <ScreenNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
