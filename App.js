import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [lang, setLang] = useState('en'); 
  const [count, setCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0); 
  const [monthlyCount, setMonthlyCount] = useState(0); 

  const t = {
    en: { home: "Home", japa: "Japa", lib: "Library", chalisa: "Chalisa", settings: "Settings", reset: "Reset Count", back: "Back", langTitle: "Select Language", stats: "Your Progress", week: "This Week", month: "This Month" },
    bn: { home: "হোম", japa: "জপ", lib: "লাইব্রেরি", chalisa: "চালিশা", settings: "সেটিংস", reset: "রিসেট করুন", back: "ফিরে যান", langTitle: "ভাষা পরিবর্তন", stats: "আপনার উন্নতি", week: "এই সপ্তাহ", month: "এই মাস" },
    hi: { home: "मुख्य", japa: "जाप", lib: "लाइब्रेरी", chalisa: "चालीसा", settings: "सेटींग्स", reset: "रीसेट करें", back: "पीछे जाएं", langTitle: "भाषा चुनें", stats: "आपकी प्रगति", week: "इस सप्ताह", month: "इस महीने" }
  };

  const mantras = [
    { name: "Om Namah Shivaya", hi: "ॐ नमः शिवाय", en: "Om Namah Shivaya" },
    { name: "Gayatri Mantra", hi: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्", en: "Om Bhur Bhuvah Svah..." },
    { name: "Hare Krishna", hi: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे", en: "Hare Krishna Mahamantra" },
    { name: "Ganesh Mantra", hi: "ॐ गं गणपतये नमः", en: "Om Gan Ganapataye Namah" },
    { name: "Maha Mrityunjaya", hi: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्...", en: "Om Tryambakam Yajamahe..." },
    { name: "Surya Mantra", hi: "ॐ सूर्याय नमः", en: "Om Suryaya Namah" }
  ];

  const handleJapa = () => {
    setCount(count + 1);
    setWeeklyCount(weeklyCount + 1);
    setMonthlyCount(monthlyCount + 1);
    Vibration.vibrate(60);
  };

  // সরাসরি রিসেট ফাংশন (কোনো পপ-আপ ঝামেলা ছাড়াই)
  const handleReset = () => {
    setCount(0);
    Vibration.vibrate(100); // একটি লম্বা ভাইব্রেশন হবে যাতে বোঝা যায় রিসেট হয়েছে
  };

  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>{t[lang].stats}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{t[lang].week}</Text>
            <Text style={styles.statNumber}>{weeklyCount}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{t[lang].month}</Text>
            <Text style={styles.statNumber}>{monthlyCount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#FF9933'}]} onPress={() => setCurrentScreen('Counter')}>
          <Ionicons name="finger-print" size={40} color="white" />
          <Text style={styles.cardText}>{t[lang].japa}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#4CAF50'}]} onPress={() => setCurrentScreen('MantraList')}>
          <Ionicons name="list" size={40} color="white" />
          <Text style={styles.cardText}>{t[lang].lib}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#E91E63'}]} onPress={() => setCurrentScreen('Chalisa')}>
          <Ionicons name="book" size={40} color="white" />
          <Text style={styles.cardText}>{t[lang].chalisa}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, {backgroundColor: '#2196F3'}]} onPress={() => setCurrentScreen('Settings')}>
          <Ionicons name="settings" size={40} color="white" />
          <Text style={styles.cardText}>{t[lang].settings}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>Bhakti Japa</Text></View>
      
      {currentScreen === 'Home' && renderHome()}

      {currentScreen === 'Counter' && (
        <View style={styles.fullScreen}>
           <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.topBack}>
             <Ionicons name="arrow-back" size={30} color="orange" />
           </TouchableOpacity>
           <Text style={styles.countNumber}>{count}</Text>
           <TouchableOpacity style={styles.tapButton} onPress={handleJapa}>
             <Text style={styles.plusOne}>+1</Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress={handleReset} style={styles.resetBtnContainer}>
             <Ionicons name="refresh-circle" size={35} color="red" />
             <Text style={{color:'red', fontSize:20, marginLeft:5, fontWeight:'bold'}}>{t[lang].reset}</Text>
           </TouchableOpacity>
        </View>
      )}

      {currentScreen === 'MantraList' && (
        <ScrollView style={styles.fullScreen}>
          <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.topBack}><Ionicons name="arrow-back" size={24} color="orange" /> <Text style={{color:'orange'}}>{t[lang].back}</Text></TouchableOpacity>
          {mantras.map((m, i) => (
            <View key={i} style={styles.mantraCard}>
              <Text style={styles.mName}>{m.name}</Text>
              <Text style={styles.mHi}>{m.hi}</Text>
              <Text style={styles.mEn}>{m.en}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {currentScreen === 'Chalisa' && (
        <ScrollView style={styles.fullScreen}>
           <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.topBack}><Ionicons name="arrow-back" size={24} color="orange" /> <Text style={{color:'orange'}}>{t[lang].back}</Text></TouchableOpacity>
           <View style={styles.mantraCard}>
             <Text style={styles.mName}>Hanuman Chalisa</Text>
             <Text style={{fontSize:18, lineHeight:28, textAlign:'center', marginTop:10}}>
                {lang === 'bn' ? "॥ দোহা ॥\nশ্রীগুরু চরণ সরোজ রজ নিজ মন মুকুরু সুধারি..." : "॥ दोहा ॥\nश्रीगुरु चरण सरोज रज निज मनु मुकुरु सुधारि..."}
                {"\n\nJai Hanuman Gyan Gun Sagar..."}
             </Text>
           </View>
        </ScrollView>
      )}

      {currentScreen === 'Settings' && (
        <View style={styles.fullScreen}>
          <Text style={styles.title}>{t[lang].langTitle}</Text>
          <TouchableOpacity onPress={() => setLang('en')} style={[styles.langBtn, lang==='en' && styles.activeLang]}><Text>English</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('bn')} style={[styles.langBtn, lang==='bn' && styles.activeLang]}><Text>বাংলা (Bengali)</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('hi')} style={[styles.langBtn, lang==='hi' && styles.activeLang]}><Text>हिन्दी (Hindi)</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={{marginTop:30, alignSelf:'center'}}><Text style={{color:'orange', fontSize:18}}>Go Home</Text></TouchableOpacity>
        </View>
      )}

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}><Ionicons name="home" size={28} color={currentScreen==='Home'?'orange':'gray'}/></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Counter')}><Ionicons name="finger-print" size={28} color={currentScreen==='Counter'?'orange':'gray'}/></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Settings')}><Ionicons name="settings" size={28} color={currentScreen==='Settings'?'orange':'gray'}/></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F2' },
  header: { backgroundColor: '#FF9933', paddingVertical: 40, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  statsCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20, elevation: 3 },
  statsTitle: { textAlign: 'center', fontWeight: 'bold', marginBottom: 10, color: 'orange' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 12, color: 'gray' },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '47%', height: 120, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 4 },
  cardText: { color: 'white', fontWeight: 'bold', marginTop: 10 },
  fullScreen: { flex: 1, padding: 20 },
  topBack: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  countNumber: { fontSize: 100, textAlign: 'center', color: 'orange', marginTop: 30 },
  tapButton: { alignSelf: 'center', backgroundColor: 'orange', width: 200, height: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginTop: 20, elevation: 10 },
  plusOne: { fontSize: 60, color: 'white', fontWeight: 'bold' },
  resetBtnContainer: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 50, padding: 10 },
  mantraCard: { backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 2 },
  mName: { fontWeight: 'bold', color: 'orange', fontSize: 18, textAlign:'center' },
  mHi: { fontSize: 16, marginVertical: 5, textAlign:'center' },
  mEn: { fontSize: 13, color: 'gray', fontStyle: 'italic', textAlign:'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'orange', marginBottom: 20, textAlign: 'center' },
  langBtn: { padding: 15, borderWidth: 1, borderColor: 'orange', borderRadius: 10, marginBottom: 10, alignItems: 'center', width: '100%' },
  activeLang: { backgroundColor: '#FFDAB9' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#eee' }
});
