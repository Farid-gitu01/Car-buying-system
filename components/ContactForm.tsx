"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { databaseUtils } from "@/lib/firebase"
import { toast } from "react-hot-toast"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await databaseUtils.saveContactForm({
        ...formData,
        createdAt: new Date().toISOString(),
      })

      if (success) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        })
      }
    } catch (error) {
      console.error("Error submitting form: ", error)
      toast.error("Failed to send your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">Get in Touch</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or looking for a specific car? Fill out the form below and we'll get back to you.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg md:p-8">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="focus-visible:ring-yellow-500"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="focus-visible:ring-yellow-500"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="focus-visible:ring-yellow-500"
            />
            <Textarea
              name="message"
              placeholder="What kind of car are you looking for?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="focus-visible:ring-yellow-500 resize-y"
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
