import { Address } from "cluster";
import { Response } from "../../service/Response";

export interface ProductVariation {
  id: number;
  name: string;
  value: string;
  codeOfVariation: string;
  doesAffectPrice: boolean;
  priceOfVariation: number;
  priceOfVariationDiscount: number;
  totalPrice: number;
  isOnDiscount: Boolean;
}

export interface Variation {
  id: number;
  name: string;
  isRequired: boolean;
  productVariationList: ProductVariation[];
}

export interface ProductTag {}

export interface Product {
  id: number;
  nameOfProduct: string;
  codeOfProduct: string;
  priceOfProduct: number;
  discountPrice: number;
  discountPercentage: number;
  isOnDiscount: boolean;
  aboutProduct: string;
  preparationTime: number;
  availability: string;
  productTags: ProductTag[];
  variations: Variation;
}

interface Tag {
  id: number;
  tagType: string;
  tagColor: string;
}

export interface ProductCategory {
  id: number;
  nameOfCategory: String;
  descOfCategory: String;
  categoryVisible: Boolean;
  featured: Boolean;
  productList: Product[];
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  logoImage: string;
  priceOfDelivery: number;
  priceOfOrderForFreeDelivery: number;
  topSeller: Product[];
  productCategories: ProductCategory[];
  businessOwner: string;
  businessLocation: BusinessLocation;
  averageRating: number;
  tags: Tag[];
}

export interface BusinessLocation {
  id: number;
  streetName: string;
  buildingNumber: number;
  flatNumber: number;
  zipCode: number;
  cityNumber: string;
}

export interface RestaurantListResponse extends Response {
  restaurants: Restaurant[];
}

export interface RestaurantDetailResponse extends Response {
  restaurant: Restaurant;
}
