"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        inquiryType: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")
        setErrorMessage("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    inquiryType: formData.inquiryType,
                    message: formData.message,
                    botcheck: false, // Honeypot field
                }),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitStatus("success")
                setFormData({ name: "", email: "", inquiryType: "", message: "" })
            } else {
                console.error("API error:", result.message)
                setSubmitStatus("error")
                setErrorMessage(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            console.error("Submission error:", error)
            setSubmitStatus("error")
            setErrorMessage("An unexpected error occurred. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-serif text-2xl">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot for spam protection */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <select
                            id="inquiryType"
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Select an option</option>
                            <option value="general">General Question</option>
                            <option value="membership">Membership</option>
                            <option value="events">Events</option>
                            <option value="partnership">Partnership</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </div>

                    {submitStatus === "success" && (
                        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                            Thank you for your message! We'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === "error" && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
                            {errorMessage}
                        </div>
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
