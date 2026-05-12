export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Aurora Headphones',
    description: 'Бездротові навушники з глибоким звуком і шумопоглинанням.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1518441314541-5f0f6d2f0d96?auto=format&fit=crop&w=900&q=80',
    category: 'Audio',
  },
  {
    id: 'p2',
    name: 'Pulse Watch',
    description: 'Розумний годинник для спорту, дзвінків і щоденних нагадувань.',
    price: 5299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: 'Wearable',
  },
  {
    id: 'p3',
    name: 'Nord Backpack',
    description: 'Міський рюкзак із захищеним відділенням для ноутбука.',
    price: 2399,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    category: 'Travel',
  },
  {
    id: 'p4',
    name: 'Studio Lamp',
    description: 'Стильна лампа з теплим світлом для робочого місця.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    category: 'Home',
  },
  {
    id: 'p5',
    name: 'Fit Bottle',
    description: 'Термопляшка для води з вакуумною ізоляцією.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1526401485004-2fda9f8d52b4?auto=format&fit=crop&w=900&q=80',
    category: 'Lifestyle',
  },
  {
    id: 'p6',
    name: 'Cloud Speaker',
    description: 'Компактна Bluetooth-колонка для дому та подорожей.',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1510576378857-299b1d0d3c8f?auto=format&fit=crop&w=900&q=80',
    category: 'Audio',
  },
];
