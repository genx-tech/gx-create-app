import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

const Sample = () => {
    return (
        <SafeAreaView style={styles.root}>
            <View center>
                <Text>Me</Text>
                <View style={{ marginTop: 50 }}>
                    <Icon type="icomoon" name="user" />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = 
    StyleSheet.create({
        root: {
            backgroundColor: 'grey',
        },
    });

export default Sample;
