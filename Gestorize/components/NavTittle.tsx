import { StyleSheet, Text, View } from "react-native";

type props = {
  tittle: string;
};

const NavTittle = ({ tittle }: props) => {
    const styes = StyleSheet.create({
        container:{
            display:'flex',
            backgroundColor:'#193A69',
            borderRadius:25,
            minWidth:'55%',
            marginRight:15 ,
            marginLeft:-15,
        },
        tittle:{
            color:'#fff',
            fontSize:25,
            fontWeight:'bold',
            textAlign:'center',
            paddingHorizontal:15,
            paddingVertical:5,
        }
    })
  return (
    <View style={styes.container}>
      <Text style={styes.tittle}>{tittle}</Text>
    </View>
  );
};


export default NavTittle;

