import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type ProfileUser = {
  nome?: string;
  name?: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
  endereco?: string;
  tipo?: string;
};

export type CurrentUser = ProfileUser;

export type ProfilePopupProps = {
  visible: boolean;
  user: ProfileUser | null;
  onClose: () => void;
  onLogout?: () => void;
};

function maskEmail(email?: string): string {
  if (!email) return 'Não informado';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const visible = user.slice(0, 3);
  return `${visible}${'*'.repeat(Math.max(user.length - 3, 2))}@${domain}`;
}

function maskPhone(phone?: string): string {
  if (!phone) return 'Não informado';
  const digits = phone.replace(/\D/g, '');
  return `(••) •••••-${digits.slice(-4)}`;
}

export function ProfilePopup({
  visible,
  user,
  onClose,
  onLogout,
}: ProfilePopupProps) {
  const userName = user?.nome || user?.name || 'Usuário';
  const userType = user?.tipo || 'Lojista';

  const menuItems: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    danger?: boolean;
  }[] = [
    {
      icon: 'mail-outline',
      label: 'Email',
      value: maskEmail(user?.email),
    },
    {
      icon: 'call-outline',
      label: 'Telefone',
      value: maskPhone(user?.telefone),
    },
    {
      icon: 'log-out-outline',
      label: 'Sair',
      danger: true,
      onPress: () => { onClose(); onLogout?.(); },
    },
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.panel}>
          <View style={styles.panelTop}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#fff" />
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.75}>
              <Ionicons name="close" size={18} color={DARK} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.typeBadge}>
            <Ionicons name="briefcase-outline" size={11} color={ACCENT} />
            <Text style={styles.typeText}>{userType}</Text>
          </View>

          <View style={styles.divider} />

          {menuItems.map((item, i) => {
            const isInfo = !!item.value;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.menuRow, item.danger && styles.menuRowDanger]}
                onPress={item.onPress}
                activeOpacity={item.onPress ? 0.7 : 1}
                disabled={!item.onPress}
              >
                <View style={[styles.menuIconWrap, item.danger && styles.menuIconWrapDanger]}>
                  <Ionicons
                    name={item.icon}
                    size={16}
                    color={item.danger ? DANGER : DARK}
                  />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                    {item.label}
                  </Text>
                  {isInfo && <Text style={styles.menuValue}>{item.value}</Text>}
                </View>
                {!isInfo && !item.danger && (
                  <Ionicons name="chevron-forward" size={14} color="#ccc" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

export default ProfilePopup;

const DARK   = '#1a1a1a';
const GRAY   = '#888';
const ACCENT = '#555';
const DANGER = '#c0392b';
const LIGHT  = '#f7f7f5';
const BORDER = '#ebebeb';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  panel: {
    width: 280,
    marginTop: 60,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  panelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: DARK,
    marginBottom: 6,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: LIGHT,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 11,
    color: ACCENT,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    backgroundColor: BORDER,
    marginVertical: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  menuRowDanger: {
    marginTop: 4,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconWrapDanger: {
    backgroundColor: '#fdecea',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK,
  },
  menuLabelDanger: {
    color: DANGER,
  },
  menuValue: {
    fontSize: 11,
    color: GRAY,
    marginTop: 1,
  },
});
