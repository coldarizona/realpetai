import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type PaymentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Payment'>;
  route: RouteProp<RootStackParamList, 'Payment'>;
};

// Mock styles data - in a real app, this would come from a context or API
const stylesList = [
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

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation, route }) => {
  const { styleId } = route.params;
  const selectedStyle = stylesList.find(style => style.id === styleId);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handlePayment = () => {
    // Here you would typically integrate with a payment processor
    Alert.alert(
      'Payment Successful',
      'Your pet portrait will be generated shortly!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };
  
  if (!selectedStyle) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Style not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.orderSummary}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Style:</Text>
          <Text style={styles.summaryValue}>{selectedStyle.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Price:</Text>
          <Text style={styles.summaryValue}>${selectedStyle.price.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.paymentForm}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          maxLength={19}
        />
        
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
              maxLength={5}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>
        
        <Text style={styles.inputLabel}>Name on Card</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
        />
        
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>
            Pay ${selectedStyle.price.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  orderSummary: {
    padding: 20,
    backgroundColor: colors.background.paper,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[800],
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  paymentForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.grey[800],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  payButton: {
    backgroundColor: colors.secondary.main,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  payButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: colors.error.main,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: colors.primary.main,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  backButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen; 