export type Style = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any; // Using any for now to support both local and remote images
};

export type TabParamList = {
  Home: undefined;
  Gallery: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Styles: undefined;
  Payment: {
    styleId: string;
  };
  Gallery: undefined;
  Profile: undefined;
  Home: undefined; // Adding Home to fix the navigation type error
}; 