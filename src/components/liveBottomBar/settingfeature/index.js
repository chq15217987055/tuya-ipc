import React from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, Button, Alert, ScrollView } from 'react-native';
import { TYSdk, TopBar, TYText } from "tuya-panel-kit";
import * as DataBase from "../../../utils/database";

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;
class settingfeature extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            LogMsg: [],
            text: '',
            All: '',
         };
    }
    

    
    componentDidMount() {
        this.getLogMsg();
        TYEvent.on('deviceDataChange', data => {
            const changedp = data.payload;
            if (changedp["reserved1"] !== undefined) {
               
                console.log("111111111111111111111111111111111111111111111111111");
                var val = "";
                var a="";
                for (var i = 0; i < changedp["reserved1"].length; i++) {
                    if (val == "")
                        {val = changedp["reserved1"].charCodeAt(i).toString(16);
                            a = changedp["reserved1"].charCodeAt(i);
                        }   else
                        val += "," + changedp["reserved1"].charCodeAt(i).toString(16);
                }
                console.log("changedp reserved1: " + val);
                console.log("changedp reserved1: " + a);

            }
            
        });
    }
    componentWillUnmount() {
        TYEvent.off('deviceDataChange');
    }

    render() {
        return (
            <View style={styles.flex}>
                <TopBar
                    style={{ marginTop: 24 }}
                    background="#fff"
                    title="调试面板"
                    color="#123"
                    onBack={this.goback}
                />
                <View style={styles.flex}>
                    {this.state.All !== '' && this.state.All!==null  && <ScrollView><TYText>{this.state.All}</TYText></ScrollView>}


                    {this.state.LogMsg.map((item, index) => {
                        return <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'skyblue',
                            height: 25,
                            marginBottom: 10
                        }}
                            key={index}>
                            <TYText
                                weight="bold"
                                size={16}>{item}
                            </TYText>
                        </View>
                    })}
                    <TextInput 
                        onChangeText={(text)=>{this.setState({
                            text: text
                        })}}
                    />
                    <Button onPress={()=>{
                        var str = this.state.text;
                        var val = "";
                        var arr = str.split(",");
                        for (var i = 0; i < arr.length; i++) {
                            val += String.fromCharCode(parseInt(arr[i], 16));
                        }
                        TYDevice.putDeviceData({ [238]: val });
                    }}  title="点击"></Button>
                    <Button onPress={this.tes} title="添加"></Button>
                    <Button onPress={this.getAll} title="获取"></Button>

                    <Button onPress={this.clear} title="清除"></Button>
                </View> 
               
            </View>
        );
    }

    clear = ()=>{
        DataBase.clear().then(data => {
            if (data == "a") {
                Alert("clear");
            } else {
                Alert("err");
            }
        })
        
        

    }
    tes = ()=> {
        var test = '0123456789';
        var add = function (num) {
            num += num;
            if (num.length == 10240) {
                msg = num;
                return;
            }
            add(num);
        }
        add(test);
        var sum = msg;
        for(let i=451;i<551;i++){
            const key = "test"+i;
            console.log(key);
            console.log(msg);
            DataBase.setItem(key, msg).then(value =>{
                console.log("success"+value)
            }).catch(error => {
                error && console.log(error)
                console.log(i);
                return;
            });
            console.log(sum.length / 1024 * i + 'KB');
        }
    }


     
    // send1 = ()=>{
    //     var str = "0x00,0x01,0x30";
    //     var val = "";
    //     var arr = str.split(",");
    //     for (var i = 0; i < arr.length; i++) {
    //         val += String.fromCharCode(parseInt(arr[i], 16));
    //     }
    //     TYDevice.putDeviceData({ [238]: val });
    // }

    getLogMsg() {
        DataBase.getItem("LogMsg").then(data => {
            if (data == null) {
                this.setState({
                    LogMsg: [],
                })
            } else {
                this.setState({
                    LogMsg: data,
                })
            }
        })
    }

    getAll=()=> {
        DataBase.getItem("test450").then(data => {
            if (data == null) {
                    this.setState({
                    All: ''
                })
            }else{
                this.setState({
                    All: data
                })
            }
            
        }).catch(err => {
            console.log("err"+err);
        })
    }

    goback = ()=>{
        const TYNavigator = TYSdk.Navigator;
        TYNavigator.pop()
    }

 
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    topStatus: {
        marginTop: 25,
    },
    row: {
        flexDirection: 'row',
        height: 45,
        marginBottom: 10
    },
    head: {
        width: 70,
        marginLeft: 5,
        backgroundColor: '#23BEFF',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    input: {
        height: 45,
        borderWidth: 1,
        marginRight: 5,
        paddingLeft: 10,
        borderColor: '#ccc'
    },
    btn: {
        flex: 1,
        backgroundColor: '#FF7200',
        height: 45,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 5,
        marginRight: 5,
        lineHeight: 45,
        fontSize: 15,
    },
});
export default settingfeature;
