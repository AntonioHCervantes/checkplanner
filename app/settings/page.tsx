'use client';

import SettingsView from '../../components/Settings/SettingsView';
import useSettingsPage from '../../components/Settings/useSettingsPage';

export default function SettingsPage() {
  const { state, actions } = useSettingsPage();

  return (
    <SettingsView
      state={state}
      actions={actions}
    />
  );
}
