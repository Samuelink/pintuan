// 竞拍详情接口
export interface AuctionDetailResponse {
  id: string;
  title: string;
  images: string[];
  startPrice: number;
  deposit: number;
  endTime: string;
  area: number;
  layout: string;
  floor: string;
  address: string;
  currentPrice: number;
  bidders: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  bids: Array<{
    id: string;
    price: number;
    time: string;
    bidder: string;
  }>;
}

// 提交提案接口
export interface SubmitProposalRequest {
  auctionId: string;
  price: number;
  paymentMethod: 'full' | 'mortgage';
  paymentDate: string;
  description?: string;
  qualificationFiles?: string[];
}

// 提案列表接口
export interface ProposalListResponse {
  proposals: Array<{
    id: string;
    buyerId: string;
    buyerName: string;
    price: number;
    paymentMethod: string;
    submitTime: string;
    depositStatus: 'paid' | 'unpaid';
    status: 'pending' | 'accepted' | 'rejected';
  }>;
} 