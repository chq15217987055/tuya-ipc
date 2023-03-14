import React, { PureComponent } from 'react';
import { Image, StyleSheet } from 'react-native';
import Config from '../../../config';
import Res from '../../../res';

const { cx, cy } = Config;


export default class batteryImg extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        if (this.props.batterySta === 8) {
            return (
                <Image source={Res.pwdLock.batteryHighPower} style={styles.item}></Image>
            );
        } else if (this.props.batterySta === 5) {
            return (
                <Image source={Res.pwdLock.batteryMediumPower} style={styles.item}></Image>
            );
        } else if (this.props.batterySta === 2) {
            return (
                <Image source={Res.pwdLock.batteryLowPower} style={styles.item}></Image>
            );
        } else if (this.props.batterySta === 1){
            return (
                <Image source={Res.pwdLock.batteryLowPower} style={styles.item}></Image>
            );
        }
    }
}

const styles = StyleSheet.create({
    item: {
        height: cy(40),
        width: cx(40),
        resizeMode: 'contain'
    },
});
