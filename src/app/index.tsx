import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { Spacing } from '@/constants/theme';

interface HeaderProps {
  text: string;
  color: string;
}

function DynamicHeader({ text, color }: HeaderProps) {
  return (
    <Text style={[styles.headerText, { color }]}>
      {text}
    </Text>
  );
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

function TodoList({ tasks, onToggleTask }: TodoListProps) {
  return (
    <View style={styles.todoList}>
      {tasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() => onToggleTask(task.id)}
          style={[
            styles.todoItem,
            task.completed && styles.todoItemCompleted,
          ]}>
          <Text
            style={[
              styles.todoText,
              task.completed && styles.todoTextCompleted,
            ]}>
            {task.completed ? '✓ ' : '○ '}
            {task.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

interface ThemeContainerProps {
  bgColor: string;
  children: React.ReactNode;
}

function ThemeContainer({ bgColor, children }: ThemeContainerProps) {
  return (
    <View style={[styles.themeContainer, { backgroundColor: bgColor }]}>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const [headerText, setHeaderText] = useState('Привіт, React Native!');
  const [headerColor, setHeaderColor] = useState('#007AFF');

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Вивчити основи JSX', completed: true },
    { id: '2', text: 'Створити власні компоненти', completed: false },
    { id: '3', text: 'Налаштувати пропси та стан', completed: false },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const colors = [
    { name: 'Синій', value: '#007AFF' },
    { name: 'Зелений', value: '#34C759' },
    { name: 'Червоний', value: '#FF3B30' },
    { name: 'Помаранчевий', value: '#FF9500' },
  ];

  const themeBgColor = isDarkMode ? '#1C1C1E' : '#FFFFFF';
  const themeTextColor = isDarkMode ? '#FFFFFF' : '#000000';
  const cardBgColor = isDarkMode ? '#2C2C2E' : '#F2F2F7';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeBgColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
            1. Динамічний заголовок
          </Text>
          <DynamicHeader text={headerText} color={headerColor} />
          
          <TextInput
            style={[
              styles.input,
              {
                color: themeTextColor,
                borderColor: isDarkMode ? '#3A3A3C' : '#E5E5EA',
                backgroundColor: themeBgColor,
              },
            ]}
            value={headerText}
            onChangeText={setHeaderText}
            placeholder="Введіть текст заголовка"
            placeholderTextColor="#8E8E93"
          />

          <View style={styles.colorRow}>
            {colors.map((c) => (
              <Pressable
                key={c.value}
                onPress={() => setHeaderColor(c.value)}
                style={[
                  styles.colorButton,
                  { backgroundColor: c.value },
                  headerColor === c.value && styles.colorButtonActive,
                ]}>
                <Text style={styles.colorButtonText}>{c.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
            2. Список завдань (Props & State)
          </Text>
          <TodoList tasks={tasks} onToggleTask={toggleTask} />
        </View>

        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
            3. Перемикач теми
          </Text>
          
          <ThemeContainer bgColor={isDarkMode ? '#000000' : '#E5E5EA'}>
            <Text style={{ color: isDarkMode ? '#FFFFFF' : '#000000', marginBottom: Spacing.two }}>
              Цей блок змінює свій фон
            </Text>
            <Pressable
              onPress={() => setIsDarkMode(!isDarkMode)}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: isDarkMode ? '#FFFFFF' : '#000000' },
                pressed && { opacity: 0.8 },
              ]}>
              <Text style={[styles.buttonText, { color: isDarkMode ? '#000000' : '#FFFFFF' }]}>
                Увімкнути {isDarkMode ? 'світлу' : 'темну'} тему
              </Text>
            </Pressable>
          </ThemeContainer>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    gap: Spacing.four,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    opacity: 0.8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Spacing.one,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    fontSize: 16,
  },
  colorRow: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  colorButton: {
    flex: 1,
    height: 36,
    borderRadius: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButtonActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  colorButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  todoList: {
    gap: Spacing.two,
  },
  todoItem: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  todoItemCompleted: {
    opacity: 0.6,
  },
  todoText: {
    fontSize: 16,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
  },
  themeContainer: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  button: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
  },
  buttonText: {
    fontWeight: '600',
  },
});
