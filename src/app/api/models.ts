export interface WithName {
  id: number;
  name: string;
}

export interface Advertiser extends WithName {
  external_id: number;
}

export type InterestGroupCreate = Omit<
  InterestGroup,
  'id' | 'bidder_name' | 'advertiser_name'
>;

export interface InterestGroup {
  id: number;
  name: string;
  bidder: number;
  bidder_name: string;
  description?: string;
  data_fee: number;
  advertiser: number;
  advertiser_name: string;
  advertiser_external_id: string;
  availability: boolean;
}

export const ADVERTISER_ID = '500002_500329';
