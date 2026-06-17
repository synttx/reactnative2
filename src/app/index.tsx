import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'calc' | 'image' | 'counter'>('calc');

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState<number | null>(null);

  const [isSecondImage, setIsSecondImage] = useState(false);

  const [count, setCount] = useState(0);

  const calculateSum = () => {
    const val1 = parseFloat(num1);
    const val2 = parseFloat(num2);
    if (!isNaN(val1) && !isNaN(val2)) {
      setSum(val1 + val2);
    } else {
      setSum(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            React Native Apps
          </ThemedText>
        </ThemedView>

        <View style={styles.tabBar}>
          {(['calc', 'image', 'counter'] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && { backgroundColor: theme.backgroundSelected },
              ]}>
              <ThemedText
                type="smallBold"
                style={[
                  styles.tabLabel,
                  activeTab === tab && { color: theme.text },
                ]}>
                {tab === 'calc' ? 'Калькулятор' : tab === 'image' ? 'Зміна фото' : 'Лічильник'}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {activeTab === 'calc' && (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Калькулятор
              </ThemedText>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.backgroundSelected,
                    backgroundColor: theme.background,
                  },
                ]}
                placeholder="Введіть перше число"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.backgroundSelected,
                    backgroundColor: theme.background,
                  },
                ]}
                placeholder="Введіть друге число"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
              />

              <Pressable
                onPress={calculateSum}
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: '#007AFF' },
                  pressed && { opacity: 0.8 },
                ]}>
                <ThemedText style={styles.buttonText}>
                  Обчислити суму
                </ThemedText>
              </Pressable>

              {sum !== null && (
                <ThemedView style={styles.resultContainer}>
                  <ThemedText type="default">
                    Результат: <ThemedText type="subtitle">{sum}</ThemedText>
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          )}

          {activeTab === 'image' && (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Зміна зображення
              </ThemedText>

              <Pressable onPress={() => setIsSecondImage(!isSecondImage)}>
                <Image
                  source={{
                    uri: isSecondImage
                      ? 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=600&auto=format&fit=crop'
                      : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop',
                  }}
                  style={styles.image}
                />
              </Pressable>

              <ThemedText type="small" style={styles.imageHint}>
                Натисніть на зображення, щоб змінити його
              </ThemedText>
            </ThemedView>
          )}

          {activeTab === 'counter' && (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Лічильник натискань
              </ThemedText>

              <ThemedView style={styles.counterDisplay}>
                <ThemedText type="title">
                  {count}
                </ThemedText>
              </ThemedView>

              <View style={styles.counterButtons}>
                <Pressable
                  onPress={() => setCount(count + 1)}
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: '#34C759', flex: 1 },
                    pressed && { opacity: 0.8 },
                  ]}>
                  <ThemedText style={styles.buttonText}>
                    Натисни мене
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setCount(0)}
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: '#FF3B30', flex: 1 },
                    pressed && { opacity: 0.8 },
                  ]}>
                  <ThemedText style={styles.buttonText}>
                    Скинути
                  </ThemedText>
                </Pressable>
              </View>
            </ThemedView>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: '#888',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: Spacing.two,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: Spacing.two,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: Spacing.three,
    backgroundColor: '#eee',
  },
  imageHint: {
    color: '#888',
    marginTop: Spacing.one,
  },
  counterDisplay: {
    paddingVertical: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
    width: '100%',
  },
});
