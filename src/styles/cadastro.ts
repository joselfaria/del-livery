import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 30, 
    paddingVertical: 40 
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  logoText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginBottom: 30, 
    lineHeight: 20 
  },
  inputGroup: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 12, 
    color: '#4B5563', 
    marginBottom: 5 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 6, 
    padding: 12, 
    backgroundColor: '#F9FAFB', 
    fontSize: 14, 
    color: '#1F2937' 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30, 
    paddingRight: 20 
  },
  checkbox: { 
    width: 18, 
    height: 18, 
    borderWidth: 1, 
    borderColor: '#1F2937', 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10, 
    backgroundColor: '#1F2937' 
  },
  checkMark: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  termsText: { 
    fontSize: 12, 
    color: '#6B7280', 
    lineHeight: 16 
  },
  buttonSolid: { 
    backgroundColor: '#1F2937', 
    paddingVertical: 16, 
    borderRadius: 6, 
    marginBottom: 30, 
    alignItems: 'center' 
  },
  buttonSolidText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  footerSection: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
  loginLink: { 
    marginBottom: 20 
  },
  loginText: { 
    color: '#6B7280', 
    fontSize: 14 
  },
  loginTextBold: { 
    color: '#1F2937', 
    fontWeight: 'bold' 
  },
  socialContainer: { 
    flexDirection: 'row', 
    gap: 15 
  },
  socialButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#F3F4F6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  socialText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  footerCopyright: { 
    textAlign: 'center', 
    fontSize: 12, 
    color: '#9CA3AF', 
    marginTop: 20 
  }
});