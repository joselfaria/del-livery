import { StyleSheet } from 'react-native';

const DARK = '#1a1a1a';
const GRAY = '#888';
const LIGHT_GRAY = '#e5e5e5';
const BG = '#ffffff';

export { DARK };

export const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: BG },
  scroll:       { flex: 1 },
  scrollContent:{ paddingBottom: 32 },

  header:       { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerLogo:   { fontSize: 16, fontWeight: '700', color: DARK },

  hero:         { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 8 },
  heroTitle:    { fontSize: 28, fontWeight: '800', color: DARK, textAlign: 'center', lineHeight: 36, marginBottom: 16 },
  heroSub:      { fontSize: 14, color: GRAY, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  btnPrimary:   { backgroundColor: DARK, borderRadius: 10, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  btnPrimaryText:   { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnSecondary: { backgroundColor: '#f0f0f0', borderRadius: 10, paddingVertical: 16, alignItems: 'center' },
  btnSecondaryText: { color: DARK, fontSize: 15, fontWeight: '500' },
  
  section:      { paddingHorizontal: 20, paddingTop: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: DARK, marginBottom: 16 },

  howRow:       { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#f7f7f5', borderRadius: 12, padding: 14, marginBottom: 10 },
  howIconWrap:  { width: 44, height: 44, borderRadius: 10, backgroundColor: '#ebebeb', alignItems: 'center', justifyContent: 'center' },
  howLabel:     { fontSize: 14, fontWeight: '600', color: DARK },
  howSub:       { fontSize: 12, color: GRAY, marginTop: 2 },

  partnersList: { gap: 12, flexDirection: 'row' },
  partnerCard:  { width: 140, backgroundColor: '#f7f7f5', borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: LIGHT_GRAY },
  partnerImg:   { width: '100%', height: 90, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
  partnerImage: { ...StyleSheet.absoluteFillObject },
  partnerName:  { fontSize: 13, fontWeight: '600', color: DARK, paddingHorizontal: 10, paddingTop: 8 },
  partnerRating:{ fontSize: 11, color: GRAY, paddingHorizontal: 10, paddingBottom: 10, marginTop: 2 },

  social:       { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingTop: 32 },
  footer:       { textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 12, paddingBottom: 8 },

  navbar:       { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 12, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: LIGHT_GRAY },
  navItem:      { alignItems: 'center', gap: 3 },
  navLabel:     { fontSize: 10, color: '#ccc' },
  navLabelActive: { color: DARK, fontWeight: '600' },

});
