import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Style as StyleType } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { placeholderImage } from '../assets/placeholder';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 16;
const ITEM_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

const styleOptions: StyleType[] = [
  {
    id: '1',
    name: 'Classic Portrait',
    description: 'A timeless, elegant portrait style',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Watercolor',
    description: 'Soft, artistic watercolor effect',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Oil Painting',
    description: 'Rich, textured oil painting style',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Pop Art',
    description: 'Bold, vibrant pop art style',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
  },
];

type StylesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Styles'>;

interface Props {
  navigation: StylesScreenNavigationProp;
}

const StylesScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleContinue = () => {
    if (selectedStyle) {
      navigation.navigate('Payment', { styleId: selectedStyle });
    }
  };

  const renderStyleItem = ({ item }: { item: StyleType }) => (
    <TouchableOpacity
      style={[
        styles.styleItem,
        selectedStyle === item.id && styles.selectedStyle,
      ]}
      onPress={() => handleStyleSelect(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.styleImage}
        defaultSource={{ uri: placeholderImage }}
      />
      <View style={styles.styleInfo}>
        <Text style={styles.styleName}>{item.name}</Text>
        <Text style={styles.styleDescription}>{item.description}</Text>
        <Text style={styles.stylePrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Style</Text>
      <FlatList
        data={styleOptions}
        renderItem={renderStyleItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={[styles.button, !selectedStyle && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selectedStyle}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: SPACING,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: SPACING,
  },
  styleItem: {
    width: ITEM_WIDTH,
    margin: SPACING / 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedStyle: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  styleImage: {
    width: '100%',
    height: ITEM_WIDTH,
    resizeMode: 'cover',
  },
  styleInfo: {
    padding: SPACING / 2,
  },
  styleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  stylePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StylesScreen; 