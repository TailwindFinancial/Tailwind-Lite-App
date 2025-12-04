/**
 * Custom Alert Component - Integrated Modal System
 * 
 * Beautiful, integrated alert/modal system that matches app styling.
 * No more ugly system popups - everything is branded and consistent.
 * 
 * @module Components/DesignSystem/CustomAlert
 */

import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Typography, Button } from './';
import { colors, spacing, borderRadius } from '@constants/theme';
import { BlurView } from 'expo-blur';

/**
 * Alert Button Props
 */
interface AlertButton {
  /** Button text */
  text: string;
  
  /** Button style */
  style?: 'default' | 'cancel' | 'destructive';
  
  /** On press handler */
  onPress?: () => void;
}

/**
 * Custom Alert Props
 */
export interface CustomAlertProps {
  /** Whether alert is visible */
  visible: boolean;
  
  /** Alert title */
  title: string;
  
  /** Alert message */
  message?: string;
  
  /** Alert buttons */
  buttons: AlertButton[];
  
  /** On dismiss callback */
  onDismiss: () => void;
}

/**
 * Custom Alert Component
 * 
 * Integrated, branded alert modal that matches app aesthetic.
 * 
 * @param {CustomAlertProps} props - Component props
 * @returns {React.ReactElement} Custom alert modal
 */
export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons,
  onDismiss,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
        
        <View style={styles.alertContainer}>
          <View style={styles.alert}>
            {/* Title */}
            <Typography variant="h2" color="text" align="center" style={styles.title}>
              {title}
            </Typography>
            
            {/* Message */}
            {message && (
              <Typography variant="body" color="secondary" align="center" style={styles.message}>
                {message}
              </Typography>
            )}
            
            {/* Buttons */}
            <View style={styles.buttons}>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.style === 'destructive' ? 'secondary' : 'primary'}
                  size="md"
                  fullWidth
                  onPress={() => {
                    button.onPress?.();
                    onDismiss();
                  }}
                  style={[
                    styles.button,
                    button.style === 'destructive' && styles.destructiveButton,
                  ]}
                >
                  <Typography
                    variant="label"
                    color={button.style === 'destructive' ? 'error' : 'text'}
                  >
                    {button.text}
                  </Typography>
                </Button>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 400,
  },
  alert: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    marginBottom: spacing.base,
  },
  message: {
    marginBottom: spacing.xl,
  },
  buttons: {
    gap: spacing.sm,
  },
  button: {
    marginBottom: 0,
  },
  destructiveButton: {
    borderColor: colors.error + '50',
    backgroundColor: colors.error + '10',
  },
});

export default CustomAlert;

