export interface AddressI {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean | null;
}
