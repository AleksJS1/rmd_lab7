import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';
import AppField from '../components/AppField';
import Screen from '../components/Screen';
import SectionHeader from '../components/SectionHeader';
import { colors } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';
import { clearCheckoutInfo, selectCheckoutUser, setCheckoutField, setCheckoutInfo } from '../store/slices/usersSlice';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutScreen() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const customer = useAppSelector(selectCheckoutUser);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof customer, string>> = {};

    if (!customer.fullName.trim()) next.fullName = "Вкажіть ПІБ.";
    if (!customer.email.trim() || !emailPattern.test(customer.email.trim())) next.email = 'Вкажіть коректний email.';
    if (!customer.phone.trim()) next.phone = 'Вкажіть телефон.';
    if (!customer.address.trim()) next.address = 'Вкажіть адресу доставки.';

    return next;
  }, [customer]);

  const handleSubmit = () => {
    if (!cartItems.length) {
      Alert.alert('Кошик порожній', 'Додайте товари перед оформленням замовлення.');
      return;
    }

    if (Object.keys(errors).length) {
      Alert.alert('Помилка валідації', 'Перевірте поля форми та спробуйте ще раз.');
      return;
    }

    setSubmitting(true);

    try {
      const order = {
        id: `${Date.now()}`,
        date: new Date().toISOString(),
        customer: {
          fullName: customer.fullName.trim(),
          email: customer.email.trim(),
          phone: customer.phone.trim(),
          address: customer.address.trim(),
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          lineTotal: item.lineTotal,
        })),
        total: cartTotal,
      };

      dispatch(setCheckoutInfo(order.customer));
      dispatch(addOrder(order));
      dispatch(clearCart());
      dispatch(clearCheckoutInfo());
      Alert.alert('Замовлення оформлено', 'Кошик очищено, а замовлення збережено в історії.');
      router.replace('/(tabs)/orders');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scroll={false} contentStyle={styles.content}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.container}>
          <SectionHeader
            title="Оформлення замовлення"
            subtitle="Заповніть форму, пройдіть базову валідацію та підтвердьте покупку."
          />

          <View style={styles.formCard}>
            <AppField
              label="ПІБ"
              value={customer.fullName}
              onChangeText={(value) => dispatch(setCheckoutField({ field: 'fullName', value }))}
              placeholder="Іван Петренко"
              error={errors.fullName}
            />
            <AppField
              label="Email"
              value={customer.email}
              onChangeText={(value) => dispatch(setCheckoutField({ field: 'email', value }))}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <AppField
              label="Телефон"
              value={customer.phone}
              onChangeText={(value) => dispatch(setCheckoutField({ field: 'phone', value }))}
              placeholder="+380"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            <AppField
              label="Адреса"
              value={customer.address}
              onChangeText={(value) => dispatch(setCheckoutField({ field: 'address', value }))}
              placeholder="Місто, вулиця, будинок"
              error={errors.address}
            />
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Товарів у замовленні</Text>
              <Text style={styles.summaryValue}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Загальна сума</Text>
              <Text style={styles.summaryValue}>{cartTotal.toLocaleString('uk-UA')} грн</Text>
            </View>
            <AppButton title="Підтвердити замовлення" loading={submitting} onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 28,
  },
  container: {
    gap: 18,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryCard: {
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
    fontSize: 18,
    fontWeight: '900',
  },
});
