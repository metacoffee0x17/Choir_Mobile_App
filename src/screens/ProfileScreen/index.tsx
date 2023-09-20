import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Divider, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { store, type RootState } from '../../store';
import { readUserData } from '../../store/slices/user.slice';
import { readArticleData } from '../../store/slices/article.slice';
import Footer from '../../components/Footer';
import { UserType } from '../../types/common';
import { IProfileScreenProps } from '../../types/router';
import styles from "./styles";
import GoToPrev from '../../components/GoToPrev';
import { testArticleData } from '../../assets/testData';
import BlackButton from '../../components/BlackButton';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import { useWindowDimensions } from 'react-native';

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation, route }) => {
    const userData = useSelector((state: RootState) => state.user.userData)
    const articleData = useSelector((state: RootState) => state.article.articleData)
    const dispatch = store.dispatch

    const [toggleTab, setToggleTab] = useState('');
    const SetToggleArticles = () => {
        setToggleTab('Articles');
    }

    const SetToggleUsers = () => {
        setToggleTab('Users');
    }

    useEffect(() => {
        dispatch(readUserData())
        dispatch(readArticleData())
    }, [])

    // const FirstRoute = () => (
    //     // <View style={{ backgroundColor: 'white' }} />
    //     <Text style={styles.Tab}>

    // </Text>
    // );

    // const SecondRoute = () => (
    //     <View style={{ backgroundColor: 'white' }} />
    // );

    // const renderScene = SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    // });
    const onPressGotoSearch = () => {
        navigation.navigate("SearchScreen");
    }

    const [searchQuery, setSearchQuery] = useState<string>('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    const onPressGotoHome = () => {
      console.log('on press goto HomeScreen');
      navigation.navigate("HomeScreen");
    }
  
    const onPressGotoProfile = () => {
      console.log('on press goto ProfileScreen');
      navigation.navigate("ProfileScreen");
    }

    // const layout = useWindowDimensions();

    // const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //     { key: 'first', title: 'Articles' },
    //     { key: 'second', title: 'Users' },
    // ]);

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.content}>
                    <View style={styles.searchTitle}>
                        <Text style={styles.searchSubject}>
                            {userData[0].name}
                        </Text>
                    </View>
                    <View style={styles.profileSection}>
                        {/* <Searchbar
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            icon="false"
                            iconColor='white'
                            style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}
                            inputStyle={{ position: 'relative', left: -40 }}
                        /> */}
                        <Text style={styles.userId}>
                          @{userData[0].userId}
                        </Text>
                        <BlackButton ButtonName='Follow' />
                    </View>
                    {/* <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                        /> */}
                    <View style={styles.tabTitle}>
                        <TouchableOpacity activeOpacity={0.5} onPress={SetToggleArticles}>
                            <Text style={styles.articles}>Comments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={SetToggleUsers}>
                            <Text style={styles.users}>Tracked Articles</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider bold={true} />
                    <View>
                        {toggleTab !== 'Articles' ?
                            (<FlatList
                                data={articleData}
                                renderItem={({ item }) => (
                                    <>
                                        <View style={styles.articleLine}>
                                            <View>
                                                <Image source={item.image} />
                                            </View>
                                            <View style={styles.articleText}>
                                                <Text>{item.description}</Text>
                                            </View>
                                        </View>
                                        <Divider />
                                    </>
                                )}
                            />)
                             :
                              (
                                <FlatList
                                    data={userData}
                                    renderItem={({ item }) => (
                                        <>
                                            <View style={styles.userLine}>
                                                <View>
                                                    <Image source={item.image} style={styles.imageSize} />
                                                </View>
                                                <View style={styles.usersText}>
                                                    <Text>{item.userId}</Text>
                                                </View>
                                            </View>
                                            <Divider horizontalInset={true} />
                                        </>
                                    )}
                                />
                            )}
                    </View>
                </View>
            </View>
            <GoToPrev />
            <Footer
                onSearch={onPressGotoSearch}
                onHome={onPressGotoHome}
                onProfile={onPressGotoProfile}
            />
        </>
    );
}

export default ProfileScreen;