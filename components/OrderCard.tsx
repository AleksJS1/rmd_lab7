import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';
import type { OrderRecord } from '../store/slices/ordersSlice';

type Props = {
  order: OrderRecord;
};

export default function OrderCard({ order }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{new Date(order.date).toLocaleString('uk-UA')}</Text>
        <Text style={styles.total}>{order.total.toLocaleString('uk-UA')} грн</Text>
      </View>
      <Text style={styles.customer}>{order.customer.fullName}</Text>
      <Text style={styles.meta}>{order.customer.email} · {order.customer.phone}</Text>
      <Text style={styles.meta}>{order.customer.address}</Text>
      <View style={styles.items}>
        {order.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={styles.itemTotal}>{item.lineTotal.toLocaleString('uk-UA')} грн</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  date: {
    color: colors.muted,
    fontSize: 13,
    flex: 1,
  },
  total: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  customer: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  items: {
    gap: 8,
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemName: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  itemTotal: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
