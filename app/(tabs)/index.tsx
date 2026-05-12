import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, selectCartCount } from '../../store/slices/cartSlice';
import { selectProducts } from '../../store/slices/productsSlice';
import Screen from '../../components/Screen';
import ProductCard from '../../components/ProductCard';
import SectionHeader from '../../components/SectionHeader';
import { colors } from '../../constants/theme';

export default function CatalogScreen() {
  const products = useAppSelector(selectProducts);
  const cartCount = useAppSelector(selectCartCount);
  const dispatch = useAppDispatch();

  return (
    <Screen scroll={false} contentStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.kicker}>Redux Toolkit Lab 7</Text>
            <Text style={styles.heroTitle}>Каталог товарів</Text>
          </View>
          <View style={styles.counterPill}>
            <Text style={styles.counterValue}>{cartCount}</Text>
            <Text style={styles.counterLabel}>у кошику</Text>
          </View>
        </View>
        <Text style={styles.heroText}>
          Додавайте товари в кошик, оформлюйте замовлення та переглядайте історію навіть після перезапуску.
        </Text>
      </View>

      <SectionHeader
        title="Обрані товари"
        subtitle="Кожен товар можна відкрити окремо, подивитися деталі та додати до кошика."
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAdd={() => dispatch(addToCart(item.id))}
            onDetails={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },
  heroText: {
    color: colors.muted,
    lineHeight: 20,
    fontSize: 14,
  },
  counterPill: {
    minWidth: 74,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
  },
  counterValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  counterLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    gap: 16,
    paddingBottom: 20,
  },
});
