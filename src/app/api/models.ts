export interface WithName {
  id: number;
  name: string;
}

export type InterestGroupCreate = Omit<InterestGroup, 'id'>;

export interface InterestGroup {
  id: number;
  name: string;
  bidder: number;
  description?: string;
  data_fee: number;
  advertiser: number;
  availability: boolean;
}
