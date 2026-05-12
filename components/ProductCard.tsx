import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from './AppButton';
import { colors } from '../constants/theme';
import type { Product } from '../store/products';

type Props = {
  product: Product;
  onAdd: () => void;
  onDetails: () => void;
};

export default function ProductCard({ product, onAdd, onDetails }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} грн</Text>
        </View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={onDetails} style={styles.detailsButton}>
            <Ionicons name="information-circle-outline" size={18} color={colors.text} />
            <Text style={styles.detailsText}>Деталі</Text>
          </Pressable>
          <AppButton title="Додати до кошика" onPress={onAdd} style={styles.addButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 190,
    backgroundColor: colors.surfaceMuted,
  },
  body: {
    padding: 16,
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  price: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 10,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
  },
  detailsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  addButton: {
    width: '100%',
  },
});
