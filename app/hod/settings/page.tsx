"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },
    privacySettings: {
      showContactInfo: true,
      showResearchInterests: true,
    },
    interfaceSettings: {
      darkMode: false,
      highContrastMode: false,
    },
  })

  const handleSwitchChange = (category, setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: !prevSettings[category][setting],
      },
    }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Here you would typically send the updated settings to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">HOD Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <Switch
                        id="emailNotifications"
                        checked={settings.notificationPreferences.email}
                        onCheckedChange={() => handleSwitchChange("notificationPreferences", "email")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <Switch
                        id="smsNotifications"
                        checked={settings.notificationPreferences.sms}
                        onCheckedChange={() => handleSwitchChange("notificationPreferences", "sms")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <Switch
                        id="pushNotifications"
                        checked={settings.notificationPreferences.push}
                        onCheckedChange={() => handleSwitchChange("notificationPreferences", "push")}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showContactInfo">Show Contact Information</Label>
                      <Switch
                        id="showContactInfo"
                        checked={settings.privacySettings.showContactInfo}
                        onCheckedChange={() => handleSwitchChange("privacySettings", "showContactInfo")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showResearchInterests">Show Research Interests</Label>
                      <Switch
                        id="showResearchInterests"
                        checked={settings.privacySettings.showResearchInterests}
                        onCheckedChange={() => handleSwitchChange("privacySettings", "showResearchInterests")}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Interface Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <Switch
                        id="darkMode"
                        checked={settings.interfaceSettings.darkMode}
                        onCheckedChange={() => handleSwitchChange("interfaceSettings", "darkMode")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="highContrastMode">High Contrast Mode</Label>
                      <Switch
                        id="highContrastMode"
                        checked={settings.interfaceSettings.highContrastMode}
                        onCheckedChange={() => handleSwitchChange("interfaceSettings", "highContrastMode")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} className="mt-6">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

