import { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

import * as FilesSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import * as tensorflow from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

import { Button } from './src/components/Button';
import { StatuBar } from './src/components/StatusBar';
import { Classification, ClassificationProps } from './src/components/Classification';

import { styles } from './styles'; 

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImageUri, setSelectedImageUri] = useState('')
  const [results, setResults] = useState<ClassificationProps[]>([])


  async function hanbleSelecImage() {
    setIsLoading(true)
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true
      })
      if (!result.canceled){
        const { uri } = result.assets[0];
        await imageClassification(uri)
        setSelectedImageUri( uri )
      }

    } catch( error ) {
      console.log(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  async function imageClassification(imageUri:string) {
    setResults([])
    await tensorflow.ready();
    const model = await mobilenet.load();

    const imageBase64 = await FilesSystem.readAsStringAsync(imageUri, {
      encoding: FilesSystem.EncodingType.Base64
    });

    const imgBuffer = tensorflow.util.encodeString(imageBase64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);

    const imageTensor = decodeJpeg(raw)
    const classificationResult = await model.classify(imageTensor)
    setResults(classificationResult);
    
  }

  return (
    <View style={styles.container}>
      <StatuBar/>
      <Image 
        source={{uri:selectedImageUri? selectedImageUri : "https://img.freepik.com/vecteurs-premium/icone-photo-icone-photo-signe-symbole-image-illustration-vectorielle_64749-4409.jpg"}}
        style = {styles.image}
      />
      <View style={styles.results}>
        {
          results.map((result)=>(
            <Classification key={result.className} data={result} />
          ))
        }
      </View>
      {
        isLoading
        ? <ActivityIndicator color={"#5F1BBF"}/>
        : <Button title='Selecionar Imagem' onPress={hanbleSelecImage}/>
      }

    </View>
  );
}


