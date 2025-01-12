import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AuctionDetail from '../views/AuctionDetail.vue'
import Proposal from '../views/Proposal.vue'
import SellerProposals from '../views/seller/Proposals.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auction/:id',
    name: 'AuctionDetail',
    component: AuctionDetail
  },
  {
    path: '/auction/:id/proposal',
    name: 'Proposal',
    component: Proposal
  },
  {
    path: '/seller/auctions/:id/proposals',
    name: 'SellerProposals',
    component: SellerProposals
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 