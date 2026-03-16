export interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RandomUserLocation {
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface RandomUserDob {
  date: string;
  age: number;
}

export interface RandomUser {
  name: RandomUserName;
  email: string;
  phone: string;
  cell: string;
  picture: RandomUserPicture;
  location: RandomUserLocation;
  dob: RandomUserDob;
}

export interface RandomUserResponse {
  results: RandomUser[];
}
