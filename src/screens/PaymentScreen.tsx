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
import { Style } from '../types/navigation';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
}

// Mock styles data - in a real app, this would come from a context or API
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

const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { styleId } = route.params;
  const selectedStyle = stylesList.find(style => style.id === styleId);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handlePayment = () => {
    // In a real app, this would process the payment
    Alert.alert(
      'Payment Successful',
      'Your pet portrait is being created! You will receive it via email.',
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
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Style:</Text>
          <Text style={styles.summaryValue}>{selectedStyle.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Price:</Text>
          <Text style={styles.summaryValue}>${selectedStyle.price}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>${selectedStyle.price}</Text>
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Payment Details</Text>
        
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>
        
        <Text style={styles.inputLabel}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Pay ${selectedStyle.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    margin: 10,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen; 