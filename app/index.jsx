import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    // Animation value
    const bounceAnim = useRef(new Animated.Value(0)).current;

    // Animation logic
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true, // Uses the native driver for better performance
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [bounceAnim]);

    // Interpolate bounce animation to scale transformation
    const bounce = bounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.3], // Scale the text between 1 and 1.3 times its original size
    });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, { transform: [{ scale: bounce }] }]}>
                Aura!
            </Animated.Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black", // Light background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40, // Larger text size
        color: '#3aeee3', // Light blue text color
        fontWeight: 'bold',
        textShadowColor: '#aaa', // Adding shadow to the text
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
});
