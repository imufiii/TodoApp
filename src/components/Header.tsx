import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF'
    },
    headerText: {
        fontSize: 26,
        color: "#7CA1B4"
    }
});

export default Header;