import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Style } from '../types/navigation';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';

// Import local images
const classicPortraitImage = require('../../assets/images/classic-portrait.jpg');
const watercolorImage = require('../../assets/images/water-color.jpg');
const popArtImage = require('../../assets/images/pop-art.jpg');
const oilPaintingImage = require('../../assets/images/oil-painting.jpg');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 10;
const ITEM_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const stylesList: Style[] = [
  {
    id: '1',
    name: 'Classic Portrait',
    description: 'A timeless, elegant portrait style perfect for capturing your pet\'s personality',
    price: 29.99,
    image: classicPortraitImage,
  },
  {
    id: '2',
    name: 'Watercolor',
    description: 'A beautiful watercolor effect that turns your pet into a work of art',
    price: 34.99,
    image: watercolorImage,
  },
  {
    id: '3',
    name: 'Pop Art',
    description: 'A vibrant, colorful style inspired by Andy Warhol',
    price: 39.99,
    image: popArtImage,
  },
  {
    id: '4',
    name: 'Oil Painting',
    description: 'A sophisticated oil painting style that looks like a masterpiece',
    price: 44.99,
    image: oilPaintingImage,
  },
];

const recentCreations = [
  { id: '1', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60', name: 'Max' },
  { id: '2', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60', name: 'Luna' },
  { id: '3', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60', name: 'Rocky' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [petImage, setPetImage] = useState<string | null>(null);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleStyleSelect = (styleId: string) => {
    if (selectedStyle === styleId) {
      // Deselect if already selected
      setSelectedStyle(null);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      // Select new style
      setSelectedStyle(styleId);
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setPetImage(result.assets[0].uri);
    }
  };

  const handleCreatePortrait = () => {
    if (selectedStyle && petImage) {
      navigation.navigate('Payment', { styleId: selectedStyle });
    } else if (!selectedStyle) {
      alert('Please select a style first');
    } else if (!petImage) {
      alert('Please upload a pet image first');
    }
  };

  const renderStyleItem = ({ item }: { item: Style }) => (
    <TouchableOpacity
      style={[
        styles.styleCard,
        selectedStyle === item.id && styles.selectedCard
      ]}
      onPress={() => handleStyleSelect(item.id)}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.styleCardContent,
          selectedStyle === item.id && {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image
          source={item.image}
          style={styles.styleImage}
          resizeMode="contain"
        />
        <View style={styles.styleInfo}>
          <Text style={styles.styleTitle}>{item.name}</Text>
          {selectedStyle === item.id && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedText}>Selected</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }: { item: typeof recentCreations[0] }) => (
    <TouchableOpacity style={styles.recentItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.recentImage}
      />
      <Text style={styles.recentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to RealPet AI</Text>
          <Text style={styles.subtitle}>Transform your pet photos into stunning artwork</Text>
        </View>

        {/* Style Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Style</Text>
          <FlatList
            data={stylesList}
            renderItem={renderStyleItem}
            keyExtractor={item => item.id}
            numColumns={COLUMN_COUNT}
            key={`grid-${COLUMN_COUNT}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.styleGrid}
          />
        </View>

        {/* Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Your Pet Photo</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleUploadImage}
          >
            {petImage ? (
              <Image source={{ uri: petImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadText}>Tap to Upload</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={[
            styles.createButton,
            (!selectedStyle || !petImage) && styles.disabledButton
          ]}
          onPress={handleCreatePortrait}
          disabled={!selectedStyle || !petImage}
        >
          <Text style={styles.createButtonText}>Create Portrait</Text>
        </TouchableOpacity>

        {/* Recent Creations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Creations</Text>
          <FlatList
            data={recentCreations}
            renderItem={renderRecentItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: 20,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[800],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  styleGrid: {
    padding: SPACING,
  },
  styleCard: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING / 2,
    backgroundColor: colors.background.paper,
    overflow: 'hidden',
  },
  styleCardContent: {
    flex: 1,
  },
  selectedCard: {
    borderColor: colors.secondary.main,
    borderWidth: 2,
  },
  styleImage: {
    width: '100%',
    height: ITEM_WIDTH * 1.2, // Increased by 20%
    backgroundColor: colors.grey[800],
  },
  styleInfo: {
    padding: 8,
    alignItems: 'center',
  },
  styleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  selectedIndicator: {
    backgroundColor: colors.secondary.main,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  selectedText: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  uploadButton: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
  },
  uploadText: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  createButton: {
    backgroundColor: colors.secondary.main,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.grey[300],
  },
  createButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  recentList: {
    paddingRight: 20,
  },
  recentItem: {
    width: 120,
    marginRight: 15,
    alignItems: 'center',
  },
  recentImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen; 