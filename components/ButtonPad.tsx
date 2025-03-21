import { ReactElement } from "react"
import { Pressable, View, StyleSheet, PressableProps, Text, ViewProps, TextStyle, StyleProp } from "react-native"


interface ButtonPadMemberProps extends PressableProps {
    value: string;
    textStyle?: StyleProp<TextStyle>
}

interface ButtonPadProps extends ViewProps {
    
}

export const ButtonPad = ({ children, ...props }: ButtonPadProps) => {
    return (
        <View style={styles.buttonPad} {...props}>
            {children}
        </View>
    )
}
{/* <ButtonPadMember value="1" />
            <ButtonPadMember value="2" />
            <ButtonPadMember value="3" />
            <ButtonPadMember value="4" /> */}




export const ButtonPadMember = ({ value, textStyle, ...props}: ButtonPadMemberProps) => {

    return (
        <Pressable style={[styles.buttonPadMember]} {...props}>
            <Text style={[{color: "white", fontSize: 20}, textStyle]}>{ value }</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    buttonPad: {
        width: "100%",
        backgroundColor: "black",
        height: 90,
        display: "flex",
        flexDirection: "row",
        padding: 5,
        columnGap: 10,
        justifyContent: "center",

    },
    
  buttonPadMember: {
      flex: 1,
      borderRadius: 15,
      alignItems: "center",
    //   height: 50,
      justifyContent: "center",
      backgroundColor: "#011C27",

      
  }
})


const colors = ["#31393C", "13070C", "#2F2F2F", "#011C27"]