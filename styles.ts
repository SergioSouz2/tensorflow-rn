import { StyleSheet } from "react-native"; 



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
      alignItems: 'center',
      justifyContent: 'center',
      padding:32
    },

    image: {
      marginTop:35,
        width:300,
        height:300,
        borderRadius:7,
    },
    
    results:{
      marginTop:64,
      flex:1,
      flexDirection: "row",
      flexWrap:"wrap",
      gap:16,
      justifyContent:"center",
    }

  });