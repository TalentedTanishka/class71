import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import db from '../config.js';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
      studentscanneddata:'',
      bookidscanneddata:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
     const {buttonState}=this.state
     if(buttonState==="bookid")
     {
       this.setState({
         scanned:true,
         studentscanneddata:data,
         buttonState:'normal'
       })
     }
     else if(buttonState==="studentid")
     {
      this.setState({
        scanned:true,
        bookidscanneddata:data,
        buttonState:'normal'
      })
     }
    }
    handleTransaction=async()=>{
      db.collection("books").doc(this.state.bookidscanneddata).get()
      .then((doc)=>{
        console.log(doc.data())
      })
    }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

          <View style={styles.inputview}>
            <TextInput style={styles.inputbox} placeholder="book id" value={this.state.bookidscanneddata}></TextInput>
            <TouchableOpacity style={styles.scanButton} onPress={()=>{
              this.getCameraPermissions("bookid")
            }}>
              <Text style={styles.buttonText}>
                Scan
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputview}>
          <TextInput style={styles.inputbox} placeholder="student id" value={this.state.studentscanneddata}></TextInput>
            <TouchableOpacity style={styles.scanButton} onPress={()=>{
              this.getCameraPermissions("studentid")
            }}>
              <Text style={styles.buttonText}>
                Scan
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitbutton} onPress={this.handleTransaction}>
<Text style={styles.submitbuttontext}>
  Sumbit
</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitbutton:{
     backgroundColor:"pink",
width:100,
height:50
    },
    submitbuttontext:{
      textAlign:"center",
      fontSize:20,
      fontWeight:30,
      fontFamily:"Comic Sans MS",
      color:"black"
        }
  });