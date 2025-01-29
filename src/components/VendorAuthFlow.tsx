"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Upload, Store } from "lucide-react"
import { auth } from "@/lib/firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createVendor } from "@/services/vendors"
import type { VendorFormData } from "@/types/vendor"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"

const VendorAuthFlow = () => {
  const router = useRouter()

  // Authentication states
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState<VendorFormData>({
    shopName: "",
    ownerName: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    email: "",
    idType: "aadhar",
    idNumber: "",
    idDocument: null,
    shopPhoto: null,
  })

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { user } = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)

      // Check if the user needs to complete their profile
      const vendorDoc = await getDoc(doc(db, "vendors", user.uid))
      if (vendorDoc.exists()) {
        const vendorData = vendorDoc.data()
        if (
          vendorData.pendingUploads &&
          (vendorData.pendingUploads.idDocument || vendorData.pendingUploads.shopPhoto)
        ) {
          router.push("/vendor/dashboard")
        } else {
          router.push("/vendor/dashboard")
        }
      } else {
        setError("Vendor profile not found")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "idDocument" | "shopPhoto") => {
    const file = e.target.files?.[0]
    if (file) {
      setRegisterData((prev) => ({
        ...prev,
        [field]: file,
      }))
    }
  }

  // Replace handleSendOtp with handleRegister
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      const { user } = userCredential

      // Create vendor profile without uploading files
      await createVendor(registerData, user.uid)

      alert("Registration successful! Please log in to complete your profile.")
      router.push("/vendor/dashboard")
    } catch (error) {
      console.error("Error in registration:", error)
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Validate form data
  const validateForm = () => {
    if (!registerData.shopName) return "Shop name is required"
    if (!registerData.ownerName) return "Owner name is required"
    if (!registerData.phone) return "Phone number is required"
    if (!registerData.email) return "Email is required"
    if (!registerData.password) return "Password is required"
    if (!registerData.city) return "City is required"
    if (!registerData.address) return "Address is required"
    if (!registerData.idNumber) return "ID number is required"
    if (!registerData.idDocument) return "ID document is required"
    if (!registerData.shopPhoto) return "Shop photo is required"
    return null
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Store className="w-6 h-6" />
          QuickVeg Vendor Portal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
              Login
            </TabsTrigger>
            <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shop Name</label>
                <Input
                  placeholder="Enter shop name"
                  value={registerData.shopName}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, shopName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Owner Name</label>
                <Input
                  placeholder="Enter owner name"
                  value={registerData.ownerName}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, ownerName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  placeholder="Enter city"
                  value={registerData.city}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, city: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shop Address</label>
                <Input
                  placeholder="Enter shop address"
                  value={registerData.address}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ID Type</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={registerData.idType}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, idType: e.target.value as "aadhar" | "pan" }))}
                  required
                >
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ID Number</label>
                <Input
                  placeholder={`Enter ${registerData.idType} number`}
                  value={registerData.idNumber}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, idNumber: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload ID Document</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "idDocument")}
                          required
                        />
                      </label>
                    </div>
                    {registerData.idDocument && (
                      <p className="text-sm text-gray-500">File selected: {registerData.idDocument.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload Shop Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "shopPhoto")}
                          required
                        />
                      </label>
                    </div>
                    {registerData.shopPhoto && (
                      <p className="text-sm text-gray-500">File selected: {registerData.shopPhoto.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>

              {error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default VendorAuthFlow