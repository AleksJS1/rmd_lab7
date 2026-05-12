import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Screen from '../../components/Screen';
import SectionHeader from '../../components/SectionHeader';
import CartRow from '../../components/CartRow';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../../store/slices/cartSlice';

export default function CartScreen() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    if (!items.length) {
      Alert.alert('Кошик порожній', 'Додайте хоча б один товар перед оформленням.');
      return;
    }

    router.push('/checkout');
  };

  return (
    <Screen contentStyle={styles.content}>
      <SectionHeader
        title="Кошик"
        subtitle="Змінюйте кількість товарів, видаляйте позиції та переходьте до оформлення замовлення."
      />

      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartRow
              item={item}
              onIncrease={() => dispatch(increaseQuantity(item.id))}
              onDecrease={() => dispatch(decreaseQuantity(item.id))}
              onRemove={() => dispatch(removeFromCart(item.id))}
            />
          )}
        />
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Кошик порожній</Text>
          <Text style={styles.emptyText}>Поверніться до каталогу та додайте перший товар.</Text>
        </View>
      )}

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Загальна сума</Text>
          <Text style={styles.summaryValue}>{total.toLocaleString('uk-UA')} грн</Text>
        </View>
        <AppButton title="Оформити замовлення" onPress={handleCheckout} />
        <AppButton title="Очистити кошик" variant="secondary" onPress={() => dispatch(clearCart())} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
  },
  list: {
    gap: 14,
  },
  emptyCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.muted,
    lineHeight: 20,
  },
  summaryCard: {
    marginTop: 4,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  summaryValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
});
