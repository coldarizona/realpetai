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
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Style } from '../types/navigation';
import * as ImagePicker from 'expo-image-picker';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.2;

const stylesList: Style[] = [
  {
    id: '1',
    name: 'Classic Portrait',
    description: 'A timeless, elegant portrait style perfect for capturing your pet\'s personality',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Watercolor',
    description: 'A beautiful watercolor effect that turns your pet into a work of art',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Pop Art',
    description: 'A vibrant, colorful style inspired by Andy Warhol',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Oil Painting',
    description: 'A sophisticated oil painting style that looks like a masterpiece',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
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

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
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
    >
      <Image
        source={{ uri: item.image }}
        style={styles.styleImage}
      />
      <View style={styles.styleInfo}>
        <Text style={styles.styleName}>{item.name}</Text>
        <Text style={styles.styleDescription}>{item.description}</Text>
        <Text style={styles.stylePrice}>${item.price}</Text>
      </View>
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
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Transform Your Pet into Art</Text>
          <Text style={styles.heroSubtitle}>Choose a style, upload a photo, and get a beautiful portrait</Text>
        </View>

        {/* Style Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Style</Text>
          <FlatList
            data={stylesList}
            renderItem={renderStyleItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.styleList}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
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
    backgroundColor: '#fff',
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  styleList: {
    paddingRight: 20,
  },
  styleCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: '#f4511e',
    borderWidth: 3,
  },
  styleImage: {
    width: '100%',
    height: CARD_WIDTH,
    resizeMode: 'cover',
  },
  styleInfo: {
    padding: 15,
  },
  styleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  styleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stylePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  uploadButton: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  uploadText: {
    fontSize: 18,
    color: '#666',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  createButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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