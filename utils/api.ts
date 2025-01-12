import axios from 'axios';
import type { 
  AuctionDetailResponse, 
  SubmitProposalRequest, 
  ProposalListResponse 
} from '../types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 添加模拟数据
const mockAuctionDetail: AuctionDetailResponse = {
  id: "1",
  title: "现代精装三居室，南北通透",
  images: [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3'
  ],
  startPrice: 2000000,
  deposit: 50000,
  endTime: "2024-04-30 18:00:00",
  area: 120,
  layout: "3室2厅2卫",
  floor: "18/33层",
  address: "北京市朝阳区某某路",
  currentPrice: 2150000,
  bidders: 5,
  status: 'ongoing',
  bids: [
    { id: '1', price: 2150000, time: '2024-03-20 15:30:00', bidder: 'user***789' }
  ]
};

export const auctionApi = {
  // 获取竞拍详情
  getAuctionDetail: (id: string) => 
    Promise.resolve({ data: mockAuctionDetail }),

  // 提交提案
  submitProposal: (data: SubmitProposalRequest) =>
    api.post('/proposals', data),

  // 支付保证金
  payDeposit: (proposalId: string) =>
    api.post(`/proposals/${proposalId}/deposit`),

  // 获取提案列表
  getProposals: (auctionId: string) =>
    api.get<ProposalListResponse>(`/auctions/${auctionId}/proposals`),

  // 处理提案
  handleProposal: (proposalId: string, action: 'accept' | 'reject') =>
    api.post(`/proposals/${proposalId}/${action}`),
}; 