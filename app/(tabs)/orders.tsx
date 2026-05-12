import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import SectionHeader from '../../components/SectionHeader';
import OrderCard from '../../components/OrderCard';
import { colors } from '../../constants/theme';
import { useAppSelector } from '../../store/hooks';
import { selectOrders } from '../../store/slices/ordersSlice';

export default function OrdersScreen() {
  const orders = useAppSelector(selectOrders);

  return (
    <Screen contentStyle={styles.content}>
      <SectionHeader
        title="Історія замовлень"
        subtitle="Список оформлених замовлень зберігається через redux-persist і не очищується після перезапуску."
      />

      {orders.length ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderCard order={item} />}
        />
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Поки немає замовлень</Text>
          <Text style={styles.emptyText}>Після оформлення замовлення воно з'явиться тут разом із товарами та сумою.</Text>
        </View>
      )}
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
});
