import { StyleSheet } from 'react-native';

const LIGHT_GRAY = '#e5e5e5';
const BG = '#ffffff';

export const DARK = '#1a1a1a';
export const GRAY = '#888';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: LIGHT_GRAY },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f0f0f0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: DARK },

  sectionBlock: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: LIGHT_GRAY },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: DARK, textTransform: 'uppercase', letterSpacing: 0.5 },

  fieldWrap: { marginBottom: 12 },
  fieldLabel: { fontSize: 12, color: GRAY, marginBottom: 6, fontWeight: '500' },
  fieldBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 0.5, borderColor: LIGHT_GRAY, paddingHorizontal: 12, height: 46 },
  fieldBoxMulti: { height: 80, alignItems: 'flex-start', paddingVertical: 10 },
  fieldIcon: { marginRight: 8 },
  fieldPrefix: { fontSize: 14, color: DARK, fontWeight: '600', marginRight: 4 },
  fieldInput: { flex: 1, fontSize: 14, color: DARK },
  fieldInputMulti: { flex: 1, fontSize: 14, color: DARK, height: '100%' },

  mapPlaceholder: { height: 120, backgroundColor: '#f0f0f0', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4, gap: 6 },
  mapPlaceholderText: { fontSize: 12, color: '#ccc' },

  confirmBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: DARK, marginHorizontal: 16, marginTop: 24, borderRadius: 14, paddingVertical: 16 },
  confirmBtnDisabled: { opacity: 0.6 },
  confirmBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  footer: { textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 20, paddingBottom: 8 },

  navbar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 12, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: LIGHT_GRAY },
  navItem: { alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10, color: '#ccc' },
  navLabelActive: { color: DARK, fontWeight: '600' },
});
