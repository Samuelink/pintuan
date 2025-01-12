import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Carousel, Button, Tag, Statistic, List, Modal } from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

// 静态模拟数据
const mockAuction = {
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

export default function AuctionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [auction] = useState(mockAuction);

  const handleBid = () => {
    router.push(`/auction/${id}/proposal`);
  };

  const handleFavorite = () => {
    Modal.success({
      title: '收藏成功',
      content: '该房源已添加到您的收藏列表'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 房屋基本信息区 */}
      <Card className="mb-4">
        <h1 className="text-2xl font-bold mb-4">{auction.title}</h1>
        <Carousel autoplay>
          {auction.images.map((img, index) => (
            <div key={index} className="h-[400px] relative">
              <img 
                src={img} 
                alt={`房屋图片${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p>起拍价：¥{auction.startPrice.toLocaleString()}</p>
            <p>保证金：¥{auction.deposit.toLocaleString()}</p>
            <p>截止时间：{auction.endTime}</p>
          </div>
          <div>
            <p>面积：{auction.area}㎡</p>
            <p>户型：{auction.layout}</p>
            <p>楼层：{auction.floor}</p>
          </div>
        </div>
      </Card>

      {/* 竞拍状态区 */}
      <Card className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Tag color={
            auction.status === 'upcoming' ? 'blue' : 
            auction.status === 'ongoing' ? 'green' : 'red'
          }>
            {auction.status === 'upcoming' ? '即将开始' : 
             auction.status === 'ongoing' ? '竞拍中' : '已结束'}
          </Tag>
          <Statistic title="当前最高价" value={auction.currentPrice} prefix="¥" />
          <Statistic title="参与人数" value={auction.bidders} />
          <Statistic title="剩余时间" value="2天3小时" />
        </div>

        <List
          header="出价记录"
          dataSource={auction.bids}
          renderItem={item => (
            <List.Item>
              <span>{item.bidder}</span>
              <span>¥{item.price.toLocaleString()}</span>
              <span>{item.time}</span>
            </List.Item>
          )}
        />
      </Card>

      {/* 操作区 */}
      <div className="flex justify-center gap-4">
        <Button type="primary" size="large" onClick={handleBid}>
          参与竞拍
        </Button>
        <Button size="large" icon={<HeartOutlined />} onClick={handleFavorite}>
          收藏
        </Button>
        <Button size="large" icon={<ShareAltOutlined />}>
          分享
        </Button>
      </div>
    </div>
  );
} 