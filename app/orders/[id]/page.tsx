'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-500 mb-4">
            {error || 'Order not found'}
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Order Details</h2>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <h2 className="font-semibold">Shipping Information</h2>
              <p>{order.shippingInfo.name}</p>
              <p>{order.shippingInfo.email}</p>
              <p>{order.shippingInfo.phone}</p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Order Items</h2>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>Item x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-center">
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 