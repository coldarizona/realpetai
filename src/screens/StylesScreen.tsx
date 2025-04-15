import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 16;
const ITEM_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

type StylesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Styles'>;
  route: RouteProp<RootStackParamList, 'Styles'>;
};

const stylesList = [
  {
    id: '1',
    name: 'Classic Portrait',
    description: 'A timeless, elegant portrait style perfect for any pet',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Watercolor',
    description: 'Soft, artistic watercolor effect that captures your pet\'s personality',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Pop Art',
    description: 'Bold, vibrant colors in a modern pop art style',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Oil Painting',
    description: 'Rich, textured oil painting style for a classic look',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60',
  },
];

const StylesScreen: React.FC<StylesScreenProps> = ({ navigation }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleContinue = () => {
    if (selectedStyle) {
      navigation.navigate('Payment', { styleId: selectedStyle });
    }
  };

  const renderStyleItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.styleCard,
        selectedStyle === item.id && styles.selectedCard,
      ]}
      onPress={() => handleStyleSelect(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.styleImage}
      />
      <View style={styles.styleInfo}>
        <Text style={styles.styleName}>{item.name}</Text>
        <Text style={styles.styleDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.stylePrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Style</Text>
        <Text style={styles.subtitle}>Select the perfect artistic style for your pet's portrait</Text>
      </View>
      
      <FlatList
        data={stylesList}
        renderItem={renderStyleItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.continueButton, !selectedStyle && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selectedStyle}
      >
        <Text style={styles.continueButtonText}>
          Continue to Payment
        </Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  listContainer: {
    padding: SPACING,
  },
  styleCard: {
    width: ITEM_WIDTH,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    margin: SPACING / 2,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.grey[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey[800],
  },
  selectedCard: {
    borderColor: colors.secondary.main,
    borderWidth: 2,
  },
  styleImage: {
    width: '100%',
    height: ITEM_WIDTH,
    backgroundColor: colors.grey[800],
  },
  styleInfo: {
    padding: 12,
  },
  styleName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  stylePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary.main,
  },
  continueButton: {
    backgroundColor: colors.secondary.main,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  disabledButton: {
    backgroundColor: colors.grey[800],
  },
  continueButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StylesScreen; 