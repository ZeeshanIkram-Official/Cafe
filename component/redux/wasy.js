OnBoarding

import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Find best place to stay in',
        boldtitle: 'good price ',
        image: require('../Assets/splash.png'),
    },
    {
        key: '2',
        title: 'Fast sell your property just',
        boldtitle: 'one click ',
        image: require('../Assets/Intro3.png'),
    },
    {
        key: '3',
        title: 'Find perfect choice for your',
        boldtitle: 'future home ',
        image: require('../Assets/Intro.png'),
    },
];

const OnBoarding = ({ navigation }) => {

    const sliderRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);

    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: (currentSlide + 1) / slides.length,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentSlide]);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            sliderRef.current.goToSlide(currentSlide + 1, true);
        } else {
            navigation.navigate('LoginScreen');
        }
    };

    const _renderPagination = () => null;

    const onSlideChange = (index) => {
        setCurrentSlide(index);
    };

    const renderSlide = ({ item, index }) => {
        const isLast = index === slides.length - 1;

        return (
            <View style={styles.slide}>

                {/* Skip Button */}
                {/* {!isLast && (
                    <TouchableOpacity
                        style={styles.skipview}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.skiptext}>Skip</Text>
                    </TouchableOpacity>
                )} */}

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.boldtitle}>{item.boldtitle}</Text>
                    <Text style={styles.graytext}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </View>

                {/* Bottom Image */}
                <Image source={item.image} style={styles.image} />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <AppIntroSlider
                ref={sliderRef}
                data={slides}
                renderItem={renderSlide}
                showDoneButton={false}
                showNextButton={false}
                renderPagination={_renderPagination}
                onSlideChange={onSlideChange}
            />

            {/* FIXED Bottom Controls */}
            <View style={styles.fixedNextButton}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fixedBottom}>
                <View style={styles.progressBarContainer}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]}
                    />
                </View>

                
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },

    textContainer: {
        marginHorizontal: 20,
        marginTop: '30%',
    },

    title: {
        fontSize: 31,
    },

    boldtitle: {
        fontSize: 31,
        fontWeight: 'bold',
    },

    graytext: {
        fontSize: 15,
        color: '#808080',
        marginTop: 10,
    },

    skipview: {
        height: '4%',
        width: '13%',
        borderRadius: 15,
        backgroundColor: '#d9ebfdff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '84%',
        marginTop: '2%',
        position: 'absolute',
        top: 0,
        right: 10,
    },

    skiptext: {
        fontSize: 15,
        color: '#007BFF'
    },

    image: {
        width: width,
        height: '55%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    /* -------- FIXED BUTTON & PROGRESS BAR -------- */
    fixedNextButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
    },
    fixedBottom: {
        position: 'absolute',
        bottom: 470,
        left: 20,
        right: 20,
    },

    progressBarContainer: {
        width: '35%',
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 20,
    },

    progressBar: {
        height: 4,
        backgroundColor: '#007BFF',
    },

    nextButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        height: 50,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },

    nextButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default OnBoarding;