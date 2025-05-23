import { View, StyleSheet, Text } from "react-native";
interface CalculatorDisplayProps {
  display: string;
  result: string;
}

export const CalculatorDisplay = ({
  display,
  result,
}: CalculatorDisplayProps) => {
  return (
    <View style={styles.calculatorScreen}>
      <Text style={{ color: "white", fontSize: display.length > 12 ? 30 : 40 }}>
        {Number(display) > 0
          ? new Intl.NumberFormat().format(Number(display))
          : display}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calculatorScreen: {
    height: 120,
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "flex-end",
    paddingTop: 50,
    paddingInline: 20,
  },
});
