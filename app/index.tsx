import { View, Text, StyleSheet, Pressable } from "react-native";
import { CalculatorDisplay } from "@/components/Display";
import { ButtonPad, ButtonPadMember } from "@/components/ButtonPad";
import { History, Delete, Parentheses, Pi } from "lucide-react-native";
import { useState } from "react";
import {
  evaluate,
  pi,
  isPositive,
  abs,
  log,
  factorial,
  e,
  sqrt,
  sin,
  cos,
  tan,
  unit,
  asin,
} from "mathjs";

export default function Page() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const maxHistoryLength = 10;
  const handleEntry = (value: string) => {
    const newDisplay = display + value;
    setDisplay(newDisplay);
  };

  const handleOperatorEntry = (value: string) => {
    if (
      display[display.length - 1] === "*" ||
      display[display.length - 1] === "-" ||
      display[display.length - 1] === "+" ||
      display[display.length - 1] === "/" ||
      display[display.length - 1] === "%" ||
      display[display.length - 1] === "^"
    ) {
      const newDisplay = display.substring(0, display.length - 1) + value;
      setDisplay(newDisplay);
    } else {
      const newDisplay = display + value;
      setDisplay(newDisplay);
    }
  };

  const handleBackSpace = () => {
    if (display.length === 1) {
      setDisplay("");
    } else {
      const newDisplay = display.substring(0, display.length - 1);
      setDisplay(newDisplay);
    }
  };

  const handleClear = () => {
    if (display.length > 0) {
      setDisplay("");
      setResult("");
    }
  };

  const handleCos = () => {
    if (Number(display) >= 0) {
      const newDisplay = cos(unit(Number(display), "deg"));
      setDisplay(newDisplay.toString());
    }
  };
  const handleSin = () => {
    if (Number(display) >= 0) {
      const newDisplay = sin(unit(Number(display), "deg"));
      setDisplay(newDisplay.toString());
    }
  };
  const handleTan = () => {
    if (Number(display) >= 0) {
      const newDisplay = tan(unit(Number(display), "deg"));
      setDisplay(newDisplay.toString());
    }
  };

  const handleFactorial = () => {
    const newDisplay = factorial(Number(display));
    setDisplay(newDisplay.toString());
  };

  const handleSqrt = () => {
    const newDisplay = sqrt(Number(display));
    setDisplay(newDisplay.toString());
  };

  const handlePi = () => {
    
      const newDisplay = display + pi.toString();
      setDisplay(newDisplay.toString());
    
  }

  // handleInversion = () => {

  // }

  const handleEqual = () => {
    if (
      display[display.length - 1] !== "*" ||
      display[display.length - 1] !== "-" ||
      display[display.length - 1] !== "+" ||
      display[display.length - 1] !== "/" ||
      display[display.length - 1] === "%"
    ) {
      if (display.includes("+")) {
        const firstOperand = display.substring(0, display.indexOf("+"));
        const secondOperand = display.substring(
          display.indexOf("+") + 1,
          display.length
        );
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("-")) {
        const firstOperand = display.substring(0, display.indexOf("-"));
        const secondOperand = display.substring(
          display.indexOf("-") + 1,
          display.length
        );
        // const result1 = Number(firstOperand) - Number(secondOperand);
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("*")) {
        const firstOperand = display.substring(0, display.indexOf("*"));
        const secondOperand = display.substring(
          display.indexOf("*") + 1,
          display.length
        );
        // const result1 = Number(firstOperand) * Number(secondOperand);
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("/")) {
        const firstOperand = display.substring(0, display.indexOf("/"));
        const secondOperand = display.substring(
          display.indexOf("/") + 1,
          display.length
        );
        // const result1 = Number(firstOperand) / Number(secondOperand);
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("^")) {
        const firstOperand = display.substring(0, display.indexOf("/"));
        const secondOperand = display.substring(
          display.indexOf("/") + 1,
          display.length
        );
        // const result1 = Number(firstOperand) / Number(secondOperand);
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display[display.length - 1] === "%") {
        const firstOperand = display.substring(0, display.indexOf("%"));
        const result1 = Number(firstOperand) / 100;
        setResult(result1.toString());
        setDisplay(result1.toString());
      }
    }
  };
  return (
    <View style={styles.container}>
      <CalculatorDisplay display={display} result={result} />
      <View style={styles.buttonSection}>
        <ButtonPad style={styles.specialPad}>
          <Pressable>
            <History color="gray" size={30} />
          </Pressable>
          <Pressable onPress={handleBackSpace}>
            <Delete color="green" size={30} />
          </Pressable>
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember
            value="C"
            textStyle={{ color: "red" }}
            onPress={handleClear}
          />
          <ButtonPadMember value="( )" textStyle={{ color: "lightgreen" }} />
          <ButtonPadMember
            value="%"
            textStyle={{ color: "lightgreen" }}
            onPress={() => handleEntry("%")}
          />
          <ButtonPadMember
            value="÷"
            textStyle={{ color: "lightgreen" }}
            onPress={() => handleOperatorEntry("/")}
          />
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="7" onPress={() => handleEntry("7")} />
          <ButtonPadMember value="8" onPress={() => handleEntry("8")} />
          <ButtonPadMember value="9" onPress={() => handleEntry("9")} />
          <ButtonPadMember
            value="x"
            textStyle={{ color: "lightgreen" }}
            onPress={() => handleOperatorEntry("*")}
          />
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="4" onPress={() => handleEntry("4")} />
          <ButtonPadMember value="5" onPress={() => handleEntry("5")} />
          <ButtonPadMember value="6" onPress={() => handleEntry("6")} />
          <ButtonPadMember
            value="-"
            textStyle={{ color: "lightgreen" }}
            onPress={() => handleOperatorEntry("-")}
          />
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="1" onPress={() => handleEntry("1")} />
          <ButtonPadMember value="2" onPress={() => handleEntry("2")} />
          <ButtonPadMember value="3" onPress={() => handleEntry("3")} />
          <ButtonPadMember
            value="+"
            textStyle={{ color: "lightgreen" }}
            onPress={() => handleOperatorEntry("+")}
          />
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="+/-" />
          <ButtonPadMember value="0" onPress={() => handleEntry("0")} />
          <ButtonPadMember value="." onPress={() => handleEntry(".")} />
          <ButtonPadMember value="Pi" onPress={handlePi} />
          {/* <ButtonPadMember
            value="="
            textStyle={{ color: "lightgreen" }}
            onPress={handleEqual}
          /> */}
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="SIN" onPress={handleSin} />
          <ButtonPadMember value="COS" onPress={handleCos} />
          <ButtonPadMember value="TAN" onPress={handleTan} />
          <ButtonPadMember
            value="!"
            textStyle={{ color: "lightgreen" }}
            onPress={handleFactorial}
          />
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember value="^" onPress={() => handleOperatorEntry("^")} />
          <ButtonPadMember value="Sqrt" onPress={handleSqrt} />
          <ButtonPadMember value="!" onPress={handleFactorial} />
          <ButtonPadMember
            value="="
            textStyle={{ color: "lightgreen" }}
            onPress={handleEqual}
          />
        </ButtonPad>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  text: {
    fontSize: 16,
  },

  buttonSection: {
    flex: 1,
    backgroundColor: "black",
    rowGap: 2,
    justifyContent: "center",
  },

  specialPad: {
    borderBottomWidth: 0.2,
    borderBottomColor: "white",
    width: "100%",
    height: 80,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
