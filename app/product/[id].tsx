import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AppButton from '../../components/AppButton';
import Screen from '../../components/Screen';
import { colors } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { selectProductById } from '../../store/slices/productsSlice';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductById(String(id ?? '')));

  if (!product) {
    return (
      <Screen contentStyle={styles.emptyContent}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Товар не знайдено</Text>
          <Text style={styles.emptyText}>Можливо, посилання застаріло або товар був видалений.</Text>
          <AppButton title="Повернутися до каталогу" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.body}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} грн</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Опис товару</Text>
          <Text style={styles.sectionText}>
            Це демонстраційна картка товару з каталогу. Користувач може швидко перейти сюди з головного екрана,
            переглянути фото, ціну та додати позицію до кошика одним натисканням.
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton title="Додати до кошика" onPress={() => dispatch(addToCart(product.id))} />
          <AppButton title="Назад до каталогу" variant="secondary" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: colors.surfaceMuted,
  },
  body: {
    padding: 18,
    gap: 10,
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  price: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  description: {
    color: colors.muted,
    lineHeight: 21,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionText: {
    color: colors.muted,
    lineHeight: 21,
  },
  actions: {
    gap: 12,
    paddingBottom: 8,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.muted,
    lineHeight: 20,
  },
});
