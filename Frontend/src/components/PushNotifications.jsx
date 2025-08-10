import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings, X, Check, AlertCircle } from 'lucide-react';

const PushNotifications = ({ isOpen, onClose }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [permission, setPermission] = useState('default');
    const [settings, setSettings] = useState({
        newJobs: true,
        applicationUpdates: true,
        interviewReminders: true,
        salaryAlerts: false,
        companyUpdates: false,
        weeklyDigest: true
    });
    const [loading, setLoading] = useState(false);
    const [isTestNotificationVisible, setIsTestNotificationVisible] = useState(false);

    useEffect(() => {
        checkNotificationPermission();
        checkSubscriptionStatus();
    }, []);

    const checkNotificationPermission = () => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    };

    const checkSubscriptionStatus = () => {
        // Check if user has subscribed to notifications
        const subscribed = localStorage.getItem('pushNotificationsSubscribed') === 'true';
        setIsSubscribed(subscribed);
    };

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support notifications');
            return;
        }

        setLoading(true);
        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                setIsSubscribed(true);
                localStorage.setItem('pushNotificationsSubscribed', 'true');
                showWelcomeNotification();
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        } finally {
            setLoading(false);
        }
    };

    const unsubscribe = () => {
        setIsSubscribed(false);
        localStorage.setItem('pushNotificationsSubscribed', 'false');
        setPermission('default');
    };

    const showWelcomeNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Job Board Notifications', {
                body: 'You\'re all set! You\'ll now receive job alerts and updates.',
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'welcome'
            });
        }
    };

    const sendTestNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Test Notification', {
                body: 'This is a test notification to verify everything is working correctly.',
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'test'
            });
            setIsTestNotificationVisible(true);
            setTimeout(() => setIsTestNotificationVisible(false), 3000);
        }
    };

    const handleSettingChange = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const saveSettings = () => {
        localStorage.setItem('notificationSettings', JSON.stringify(settings));
        // In a real app, you would send these settings to your backend
        alert('Notification settings saved!');
    };

    const getPermissionStatus = () => {
        switch (permission) {
            case 'granted':
                return { text: 'Granted', color: 'text-green-600', bgColor: 'bg-green-100' };
            case 'denied':
                return { text: 'Denied', color: 'text-red-600', bgColor: 'bg-red-100' };
            default:
                return { text: 'Not Set', color: 'text-gray-600', bgColor: 'bg-gray-100' };
        }
    };

    const permissionStatus = getPermissionStatus();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Bell className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Permission Status */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Permission</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${permissionStatus.bgColor} ${permissionStatus.color}`}>
                                {permissionStatus.text}
                            </span>
                        </div>

                        {permission === 'default' && (
                            <div className="flex items-center space-x-4">
                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Enable notifications to receive job alerts and updates
                                </p>
                                <button
                                    onClick={requestPermission}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Requesting...' : 'Enable Notifications'}
                                </button>
                            </div>
                        )}

                        {permission === 'granted' && (
                            <div className="flex items-center space-x-4">
                                <Check className="w-5 h-5 text-green-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Notifications are enabled. You'll receive job alerts and updates.
                                </p>
                                <button
                                    onClick={sendTestNotification}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Test Notification
                                </button>
                            </div>
                        )}

                        {permission === 'denied' && (
                            <div className="flex items-center space-x-4">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Notifications are blocked. Please enable them in your browser settings.
                                </p>
                                <button
                                    onClick={() => window.open('chrome://settings/content/notifications', '_blank')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Open Settings
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Notification Settings */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">New Job Matches</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Get notified when new jobs match your criteria</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.newJobs}
                                        onChange={() => handleSettingChange('newJobs')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Application Updates</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates on your job applications</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.applicationUpdates}
                                        onChange={() => handleSettingChange('applicationUpdates')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Interview Reminders</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Get reminded about upcoming interviews</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.interviewReminders}
                                        onChange={() => handleSettingChange('interviewReminders')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Salary Alerts</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Get notified about salary changes for saved jobs</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.salaryAlerts}
                                        onChange={() => handleSettingChange('salaryAlerts')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Company Updates</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates from companies you follow</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.companyUpdates}
                                        onChange={() => handleSettingChange('companyUpdates')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Weekly Digest</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive a weekly summary of job opportunities</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.weeklyDigest}
                                        onChange={() => handleSettingChange('weeklyDigest')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                        {permission === 'granted' && (
                            <button
                                onClick={unsubscribe}
                                className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                            >
                                Disable Notifications
                            </button>
                        )}
                        <button
                            onClick={saveSettings}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>

                    {/* Success Message */}
                    {isTestNotificationVisible && (
                        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                            <Check className="w-5 h-5" />
                            <span>Test notification sent!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PushNotifications;
