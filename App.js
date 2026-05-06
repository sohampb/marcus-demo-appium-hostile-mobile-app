import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ACCENT = "#d84c63";
const ACCENT_DEEP = "#7a1d3a";
const INK = "#1f2a37";
const SUBTLE = "#637083";
const BORDER = "#dde3ea";
const SURFACE = "#ffffff";
const CANVAS = "#f6f5f2";

const QUICK_ACTIONS = [
  {
    title: "Quick Transfer",
    text: "Move funds between saved beneficiaries in one tap."
  },
  {
    title: "Card Controls",
    text: "Lock cards, update limits, and review recent authorisations."
  },
  {
    title: "Inbox",
    text: "Review secure alerts and service notices from the bank."
  }
];

const BENEFICIARIES = [
  "North Harbor Supplies",
  "Maple Avenue Retail",
  "Crescent Studio"
];

function DemoField({ label, value, onChangeText, secureTextEntry = false, keyboardType = "default" }) {
  return (
    <View style={styles.fieldBlock}>
      <View style={styles.fieldLabelWrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <View style={styles.inputOuterShell}>
        <View style={styles.inputShell}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={styles.input}
            selectionColor={ACCENT}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder=""
          />
        </View>
      </View>
    </View>
  );
}

function SurfaceButton({ text, onPress, tone = "primary" }) {
  const style = tone === "ghost" ? styles.ghostButton : styles.primaryButton;
  const textStyle = tone === "ghost" ? styles.ghostButtonText : styles.primaryButtonText;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.buttonPressed]}
    >
      <View style={styles.buttonInnerShell}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState(QUICK_ACTIONS[0].title);
  const [transfer, setTransfer] = useState({
    beneficiary: BENEFICIARIES[0],
    amount: "",
    note: ""
  });
  const [transferMessage, setTransferMessage] = useState("");

  const canLogin = useMemo(() => {
    return login.username.trim().length > 0 && login.password.trim().length > 0;
  }, [login]);

  const canSubmitTransfer = useMemo(() => {
    return transfer.amount.trim().length > 0 && transfer.note.trim().length > 0;
  }, [transfer]);

  function handleLogin() {
    const valid =
      login.username.trim().toLowerCase() === "demouser" &&
      login.password === "password";

    if (!valid) {
      setLoginMessage("Use demouser / password for this feasibility demo.");
      return;
    }

    setLoginMessage("");
    setScreen("home");
  }

  function openTransfer() {
    setTransferMessage("");
    setScreen("transfer");
  }

  function submitTransfer() {
    if (!canSubmitTransfer) {
      setTransferMessage("Enter an amount and transfer note before submitting.");
      return;
    }

    setTransferMessage(
      `Transfer prepared for ${transfer.beneficiary} in the amount of ${transfer.amount}.`
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.outerFrame}>
          <View style={styles.heroBand}>
            <Text style={styles.heroEyebrow}>Feasibility Demo</Text>
            <Text style={styles.heroTitle}>Hostile Mobile Banking Journey</Text>
            <Text style={styles.heroText}>
              A front-end-only React Native sample designed to be human-usable while staying
              intentionally unfriendly to classic Appium-style element discovery.
            </Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {screen === "login" ? (
              <View style={styles.card}>
                <Text style={styles.sectionEyebrow}>Screen 1</Text>
                <Text style={styles.sectionTitle}>Secure Login</Text>
                <Text style={styles.sectionText}>
                  This demo intentionally omits IDs and test hooks. Visible text and screen
                  understanding are expected to drive automation.
                </Text>

                <DemoField
                  label="Username"
                  value={login.username}
                  onChangeText={(value) => setLogin((current) => ({ ...current, username: value }))}
                />
                <DemoField
                  label="Password"
                  value={login.password}
                  secureTextEntry
                  onChangeText={(value) => setLogin((current) => ({ ...current, password: value }))}
                />

                {loginMessage ? <Text style={styles.inlineMessage}>{loginMessage}</Text> : null}

                <SurfaceButton
                  text="Continue"
                  onPress={handleLogin}
                  tone={canLogin ? "primary" : "ghost"}
                />

                <View style={styles.credentialNote}>
                  <Text style={styles.credentialTitle}>Demo credential</Text>
                  <Text style={styles.credentialText}>demouser / password</Text>
                </View>
              </View>
            ) : null}

            {screen === "home" ? (
              <View style={styles.card}>
                <Text style={styles.sectionEyebrow}>Screen 2</Text>
                <Text style={styles.sectionTitle}>Banking Home</Text>
                <Text style={styles.sectionText}>
                  A simple dashboard with multiple tappable targets so the automation story
                  includes navigation and decision-making.
                </Text>

                <View style={styles.balancePanel}>
                  <View>
                    <Text style={styles.balanceLabel}>Available balance</Text>
                    <Text style={styles.balanceAmount}>$12,480.25</Text>
                  </View>
                  <Text style={styles.balanceMeta}>Savings ending 3204</Text>
                </View>

                <View style={styles.actionStack}>
                  {QUICK_ACTIONS.map((action) => {
                    const isSelected = selectedAction === action.title;

                    return (
                      <Pressable
                        key={action.title}
                        onPress={() => setSelectedAction(action.title)}
                        style={({ pressed }) => [
                          styles.actionCard,
                          isSelected && styles.actionCardSelected,
                          pressed && styles.buttonPressed
                        ]}
                      >
                        <View style={styles.actionCardInner}>
                          <Text style={styles.actionTitle}>{action.title}</Text>
                          <Text style={styles.actionText}>{action.text}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>

                <SurfaceButton text="Open Transfer Flow" onPress={openTransfer} />
              </View>
            ) : null}

            {screen === "transfer" ? (
              <View style={styles.card}>
                <Text style={styles.sectionEyebrow}>Screen 3</Text>
                <Text style={styles.sectionTitle}>Transfer Funds</Text>
                <Text style={styles.sectionText}>
                  This final screen adds selection, text entry, and submission without any
                  automation-specific identifiers.
                </Text>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Transfer from</Text>
                  <Text style={styles.summaryText}>Demo Checking ending 8821</Text>
                </View>

                <View style={styles.fieldLabelWrap}>
                  <Text style={styles.fieldLabel}>Transfer to</Text>
                </View>
                <View style={styles.choiceWrap}>
                  {BENEFICIARIES.map((name) => {
                    const active = transfer.beneficiary === name;

                    return (
                      <Pressable
                        key={name}
                        onPress={() =>
                          setTransfer((current) => ({
                            ...current,
                            beneficiary: name
                          }))
                        }
                        style={({ pressed }) => [
                          styles.choiceChip,
                          active && styles.choiceChipActive,
                          pressed && styles.buttonPressed
                        ]}
                      >
                        <View style={styles.choiceChipInner}>
                          <Text style={active ? styles.choiceChipTextActive : styles.choiceChipText}>
                            {name}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>

                <DemoField
                  label="Amount"
                  value={transfer.amount}
                  keyboardType="numeric"
                  onChangeText={(value) => setTransfer((current) => ({ ...current, amount: value }))}
                />
                <DemoField
                  label="Transfer note"
                  value={transfer.note}
                  onChangeText={(value) => setTransfer((current) => ({ ...current, note: value }))}
                />

                {transferMessage ? <Text style={styles.inlineSuccess}>{transferMessage}</Text> : null}

                <View style={styles.transferButtons}>
                  <SurfaceButton text="Back to Home" onPress={() => setScreen("home")} tone="ghost" />
                  <SurfaceButton text="Submit Transfer" onPress={submitTransfer} />
                </View>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CANVAS
  },
  outerFrame: {
    flex: 1
  },
  heroBand: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: "#efe8dd",
    borderBottomWidth: 1,
    borderBottomColor: BORDER
  },
  heroEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: ACCENT_DEEP,
    fontWeight: "700"
  },
  heroTitle: {
    marginTop: 10,
    fontSize: 29,
    lineHeight: 34,
    color: INK,
    fontWeight: "800"
  },
  heroText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: SUBTLE
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 22
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#171717",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 4
  },
  sectionEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    color: ACCENT,
    fontWeight: "700"
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 30,
    lineHeight: 34,
    color: INK,
    fontWeight: "800"
  },
  sectionText: {
    marginTop: 10,
    marginBottom: 18,
    color: SUBTLE,
    fontSize: 15,
    lineHeight: 22
  },
  fieldBlock: {
    marginTop: 14
  },
  fieldLabelWrap: {
    marginBottom: 8
  },
  fieldLabel: {
    color: INK,
    fontSize: 14,
    fontWeight: "700"
  },
  inputOuterShell: {
    borderRadius: 20,
    backgroundColor: "#f6f7f8",
    padding: 2
  },
  inputShell: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    backgroundColor: "#fbfbfa",
    paddingHorizontal: 14
  },
  input: {
    minHeight: 52,
    color: INK,
    fontSize: 16
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: INK,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#fefefe",
    fontSize: 15,
    fontWeight: "700"
  },
  buttonInnerShell: {
    alignItems: "center",
    justifyContent: "center"
  },
  ghostButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#f2f4f7"
  },
  ghostButtonText: {
    color: INK,
    fontSize: 15,
    fontWeight: "700"
  },
  buttonPressed: {
    opacity: 0.84
  },
  inlineMessage: {
    marginTop: 14,
    color: ACCENT_DEEP,
    fontSize: 14,
    lineHeight: 20
  },
  inlineSuccess: {
    marginTop: 14,
    color: "#226b4d",
    fontSize: 14,
    lineHeight: 20
  },
  credentialNote: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#f7efe6"
  },
  credentialTitle: {
    color: ACCENT_DEEP,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700"
  },
  credentialText: {
    marginTop: 6,
    color: INK,
    fontSize: 15,
    fontWeight: "700"
  },
  balancePanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#f3f6fb",
    borderWidth: 1,
    borderColor: "#dde6f3"
  },
  balanceLabel: {
    color: SUBTLE,
    fontSize: 13,
    fontWeight: "600"
  },
  balanceAmount: {
    marginTop: 8,
    color: INK,
    fontSize: 30,
    fontWeight: "800"
  },
  balanceMeta: {
    color: SUBTLE,
    fontSize: 13,
    fontWeight: "600"
  },
  actionStack: {
    marginTop: 18,
    gap: 12
  },
  actionCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    backgroundColor: "#fcfcfb"
  },
  actionCardInner: {
    gap: 2
  },
  actionCardSelected: {
    borderColor: "#e2b7c1",
    backgroundColor: "#fff7f8"
  },
  actionTitle: {
    color: INK,
    fontSize: 16,
    fontWeight: "700"
  },
  actionText: {
    marginTop: 6,
    color: SUBTLE,
    fontSize: 14,
    lineHeight: 20
  },
  summaryCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#f4f1ec",
    borderWidth: 1,
    borderColor: "#ebe2d5"
  },
  summaryTitle: {
    color: ACCENT_DEEP,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    fontWeight: "700"
  },
  summaryText: {
    marginTop: 6,
    color: INK,
    fontSize: 16,
    fontWeight: "700"
  },
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10
  },
  choiceChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fbfbfa",
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  choiceChipInner: {
    alignItems: "center",
    justifyContent: "center"
  },
  choiceChipActive: {
    backgroundColor: INK,
    borderColor: INK
  },
  choiceChipText: {
    color: INK,
    fontSize: 14,
    fontWeight: "600"
  },
  choiceChipTextActive: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600"
  },
  transferButtons: {
    marginTop: 8
  }
});
