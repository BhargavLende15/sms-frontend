import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { selectCount } from "../../store/counterSlice";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import { BorderRadius, FontSizes, Spacing } from "../../constants/spacing";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const count = useSelector(selectCount);
  const { theme } = useTheme();

  const ActionCard = ({ title, icon, href, color }: any) => (
    <Link href={href} asChild>
      <LinearGradient
        colors={[color, color]} // For now solid, can be gradient
        style={styles.actionCard}
      >
        <Ionicons name={icon} size={32} color="#fff" />
        <Text style={styles.actionCardText}>{title}</Text>
      </LinearGradient>
    </Link>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: theme.text }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Here's what's happening today
            </Text>
          </View>
          <ThemeToggle />
        </View>

        <View style={[styles.statsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.statsTitle, { color: theme.text }]}>Your Progress</Text>
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.primary }]}>85%</Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Attendance</Text>
                </View>
                <View style={styles.statDivider} />
                 <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.secondary }]}>4.2</Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>GPA</Text>
                </View>
            </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
           <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <Text style={[styles.cardTitle, { color: theme.text }]}>Rank List</Text>
             <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>Check your academic standing</Text>
             <Link href="/rank_list" style={[styles.button, { backgroundColor: theme.primary }]}>
                <Text style={styles.buttonText}>View Ranks</Text>
             </Link>
           </View>

           <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <Text style={[styles.cardTitle, { color: theme.text }]}>Courses</Text>
             <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>Manage your enrolled courses</Text>
             <Link href="/courses" style={[styles.button, { backgroundColor: theme.secondary }]}>
                <Text style={styles.buttonText}>View Courses</Text>
             </Link>
           </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },
  welcomeText: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  statsContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  statsTitle: {
      fontSize: FontSizes.lg,
      fontWeight: "600",
      marginBottom: Spacing.md,
  },
  statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  statItem: {
      alignItems: 'center',
  },
  statValue: {
      fontSize: FontSizes.xxxl,
      fontWeight: "bold",
  },
  statLabel: {
      fontSize: FontSizes.sm,
      marginTop: Spacing.xs,
  },
  statDivider: {
      width: 1,
      height: 40,
      backgroundColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  cardDescription: {
      fontSize: FontSizes.sm,
      marginBottom: Spacing.md,
  },
  button: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignSelf: 'flex-start',
      overflow: 'hidden', // for borderRadius to work with Link
  },
  buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: FontSizes.sm,
  },
  actionCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  actionCardText: {
    color: "#fff",
    marginTop: Spacing.sm,
    fontWeight: "600",
    textAlign: "center",
  },
});
