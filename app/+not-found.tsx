import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import { colors } from '../constants/theme';

export default function NotFound() {
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Сторінку не знайдено</Text>
        <Text style={styles.subtitle}>Перейдіть назад до каталогу або відкрийте інший розділ.</Text>
        <Link href="/(tabs)" asChild>
          <AppButton title="Повернутися на головну" />
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 20,
  },
});
