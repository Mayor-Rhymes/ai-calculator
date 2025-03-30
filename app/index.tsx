import { View, Text, StyleSheet, Pressable } from "react-native";
import { CalculatorDisplay } from "@/components/Display";
import { ButtonPad, ButtonPadMember } from "@/components/ButtonPad";
import { Delete, Brain, StopCircle } from "lucide-react-native";
import { useState } from "react";

import {
  evaluate,
  pi,
  abs,
  factorial,
  sqrt,
  sin,
  cos,
  tan,
  unit,
  asin,
  acos,
  atan
} from "mathjs";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import axios from "axios";

export default function Page() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [recording, setRecording] = useState<Recording>();
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
 

  //Recording functionality
  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);

    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording?.getURI();

    setIsRecording(false);
    const formData = new FormData();
    formData.set("file", uri as string);
    const response = await axios.post(
      "http://localhost:3000/analyze-speech",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.status);
    console.log("Recording stopped and stored at", uri);
  };

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
    const newDisplay = cos(unit(Number(display), "deg"));
    setDisplay(newDisplay.toString());
  };


  const handleAcos = () => {
    
    const newDisplay = Number(acos(Number(display))) * (180/Math.PI);
    setDisplay(newDisplay.toString());
  
};

  const handleSin = () => {
    const newDisplay = sin(unit(Number(display), "deg"));
    setDisplay(newDisplay.toString());
  };

  const handleAsin = () => {
    
      const newDisplay = Number(asin(Number(display))) * (180/Math.PI);
      setDisplay(newDisplay.toString());
    
  };


  
  const handleTan = () => {
    const newDisplay = tan(unit(Number(display), "deg"));
    setDisplay(newDisplay.toString());
  };


  const handleAtan = () => {
    const newDisplay = Number(atan(Number(display))) * 180/Math.PI;
    setDisplay(newDisplay.toString());
  }

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
  };


  const handleSignInversion = () => {

    let newDisplay = Number(display);
    if (newDisplay < 0) {
      newDisplay = abs(newDisplay);
      setDisplay(newDisplay.toString());
      return;
    }

    else {

      newDisplay = -newDisplay;
      setDisplay(newDisplay.toString());
      return;
    }
  }

  const handleEqual = () => {
    if (
      display[display.length - 1] !== "*" ||
      display[display.length - 1] !== "-" ||
      display[display.length - 1] !== "+" ||
      display[display.length - 1] !== "/" ||
      display[display.length - 1] === "%"
    ) {
      if (display.includes("+")) {
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("-")) {
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("*")) {
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("/")) {
        const result1 = evaluate(display);
        setResult(result1.toString());
        setDisplay(result1.toString());
      } else if (display.includes("^")) {
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
          {isRecording ? (
            <StopCircle color="red" size={30} onPress={stopRecording} />
          ) : (
            <Brain color="gray" size={30} onPress={startRecording} />
          )}
          <Pressable onPress={handleBackSpace}>
            <Delete color="green" size={30} />
          </Pressable>
        </ButtonPad>
        <ButtonPad>
          <ButtonPadMember
            style={styles.largeClear}
            value="C"
            textStyle={{ color: "red" }}
            onPress={handleClear}
          />
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
          <ButtonPadMember value="+/-" onPress={handleSignInversion} />
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
          <ButtonPadMember value="SIN" onPress={handleSin} onLongPress={handleAsin} />
          <ButtonPadMember value="COS" onPress={handleCos} onLongPress={handleAcos} />
          <ButtonPadMember value="TAN" onPress={handleTan} onLongPress={handleAtan}/>
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

      {/* {isRecording ? (
        <StopCircle
          size={50}
          color="red"
          style={styles.floatingButton}
          onPress={stopRecording}
        />
      ) : (
        <Brain
          size={50}
          color="white"
          style={styles.floatingButton}
          onPress={startRecording}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },

  text: {
    fontSize: 16,
  },

  largeClear: {
    flex: 2,
    borderRadius: 15,
    alignItems: "center",
    //   height: 50,
    justifyContent: "center",
    backgroundColor: "#011C27",
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

  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
