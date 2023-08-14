import { View,Text } from 'react-native';

import { styles } from './styles'; 
import { string } from '@tensorflow/tfjs';

export type ClassificationProps = {
    probability: number;
    className: string
}

type Props = {
    data: ClassificationProps;
}


export function Classification( {data}:Props){
    return(
        <View style={styles.container}>
            <Text style={styles.probability}>
                {data.probability.toFixed(2)}
            </Text>

            <Text style={styles.className}>
                {data.className}
            </Text>
            
        </View>
    )
}