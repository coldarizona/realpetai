export type Style = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type TabParamList = {
  Home: undefined;
  Gallery: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Styles: undefined;
  Payment: {
    styleId: string;
  };
  Gallery: undefined;
  Profile: undefined;
}; 