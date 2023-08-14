import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type Pros = TouchableOpacityProps  & {
    title: string


}
export function Button({title, ...rest}: Pros) {


    return(
        <TouchableOpacity style = {styles.container} {...rest}>
            <Text style = {styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}